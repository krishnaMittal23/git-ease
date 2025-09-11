"use server"

import { streamText } from "ai"
import { createStreamableValue } from "ai/rsc"
import { createGoogleGenerativeAI } from "@ai-sdk/google"
import { generateEmbedding } from "~/lib/gemini"
import { db } from "~/server/db"

const google = createGoogleGenerativeAI({
  apiKey: process.env.GEMINI_API_KEY
})

export async function askQuestion(question: string, projectId: string) {
  // Use string type for the stream
  const stream = createStreamableValue<string>()

  // Fetch relevant documents from DB
  const queryVector = await generateEmbedding(question)
  const vectorQuery = `[${queryVector.join(",")}]`

  const result = await db.$queryRaw`
    SELECT "fileName", "sourceCode", "summary",
      1 - ("summaryEmbedding" <=> ${vectorQuery}::vector) AS similarity
    FROM "SourceCodeEmbedding"
    WHERE 1 - ("summaryEmbedding" <=> ${vectorQuery}::vector) > 0.5
      AND "projectId" = ${projectId}
    ORDER BY similarity DESC
    LIMIT 10
  ` as { fileName: string; sourceCode: string; summary: string }[]

  // Build context for AI
  let context = ""
  for (const doc of result) {
    context += `source ${doc.fileName}\ncode content: ${doc.sourceCode}\nsummary: ${doc.summary}\n\n`
  }

  // Stream AI response
  const { textStream } = await streamText({
    model: google("gemini-1.5-flash"),
    prompt: `
You are an AI code assistant answering questions about the codebase.
CONTEXT:
${context}

QUESTION:
${question}

Answer in markdown, include code snippets if needed, be detailed.
`
  })

  for await (const delta of textStream) {
    stream.update(delta) // plain string
  }

  stream.done() // mark streaming complete

  return {
    output: stream.value,
    filesReferences: result
  }
}
