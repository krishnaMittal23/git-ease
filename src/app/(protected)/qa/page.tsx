"use client"

import React, { useState } from 'react'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '~/components/ui/sheet'
import useProject from '~/hooks/use-project'
import { api } from '~/trpc/react'
import AskQuestionCard from '../dashboard/ask-question-card'
import MDEditor from '@uiw/react-md-editor'
import CodeReferences from '../dashboard/code-references'

const QAPage = () => {
  const { projectId } = useProject()
  const { data: questions } = api.project.getQuestions.useQuery({ projectId })

  const [questionIndex, setQuestionIndex] = useState(0)
  const question = questions?.[questionIndex]

  return (
    <div className="w-full max-w-7xl mx-auto p-6">
      {/* Ask Question Card */}
      <AskQuestionCard />

      {/* Saved Questions */}
      <h2 className="text-2xl font-semibold text-white mt-8 mb-6">Saved Questions</h2>
      <div className="flex flex-col gap-4">
        {questions?.map((q, index) => (
          <Sheet key={q.id}>
            <SheetTrigger asChild>
              <div
                onClick={() => setQuestionIndex(index)}
                className="flex items-start gap-4 p-6 bg-gray-800/80 rounded-xl border border-gray-600 hover:bg-gray-700/80 hover:border-cyan-400/30 cursor-pointer transition-all duration-200 group"
              >
                <img
                  className="h-12 w-12 rounded-full object-cover border-2 border-gray-500 group-hover:border-cyan-400 transition-colors"
                  src={q.user.imageUrl ?? ""}
                  alt="User"
                />
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-2">
                    <p className="text-white font-semibold text-lg group-hover:text-cyan-300 transition-colors">
                      {q.question}
                    </p>
                    <span className="text-gray-400 text-sm">{q.createdAt.toLocaleDateString()}</span>
                  </div>
                  <p className="text-gray-300 line-clamp-2">{q.answer}</p>
                </div>
              </div>
            </SheetTrigger>

            {/* Sheet Content */}
            {questionIndex === index && (
              <SheetContent className="bg-gray-900 border-l border-cyan-500/30 w-full sm:max-w-2xl lg:max-w-4xl p-0">
                <div className="h-full flex flex-col">
                  <SheetHeader className="p-6 border-b border-gray-700">
                    <SheetTitle className="text-2xl font-bold text-white">
                      {q.question}
                    </SheetTitle>
                  </SheetHeader>
                  
                  <div className="flex-1 overflow-y-auto p-6">
                    <div className="prose prose-invert prose-cyan max-w-none mb-6 p-4 bg-gray-800/50 rounded-lg border border-gray-700">
                      <MDEditor.Markdown source={q.answer} />
                    </div>
                    <CodeReferences filesReferences={(q.filesReferences ?? []) as any} />
                  </div>
                </div>
              </SheetContent>
            )}
          </Sheet>
        ))}
      </div>
    </div>
  )
}

export default QAPage