"use client"

import React, { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "~/components/ui/dialog"
import useProject from "~/hooks/use-project"
import { askQuestion } from "./actions"
import { readStreamableValue } from "ai/rsc"
import MDEditor from '@uiw/react-md-editor'
import { Button } from "~/components/ui/button"
import CodeReferences from "./code-references"
import { api } from "~/trpc/react"
import { toast } from "sonner"
import useRefetch from "~/hooks/use-refetch"

const AskQuestionCard = () => {
  const { project } = useProject()
  const [question, setQuestion] = useState("")
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [filesReferences, setFilesReferences] = useState<{fileName:string; sourceCode: string; summary: string}[]>([])
  const [answer, setAnswer] = useState('')
  const saveAnswer = api.project.saveAnswer.useMutation()


  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!project?.id) return

    setLoading(true)
    setAnswer('')
    setFilesReferences([])

    const { output, filesReferences } = await askQuestion(question, project.id)
    setFilesReferences(filesReferences)
    setOpen(true)

    for await (const delta of readStreamableValue(output)) {
      if (delta) setAnswer(ans => ans + delta)
    }

    setLoading(false)
  }

  const refetch = useRefetch()

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[80vw] bg-gray-900 text-gray-100 rounded-xl shadow-lg">
          <DialogHeader>
            <div className="flex items-center gap-2">
              <DialogTitle className="text-xl font-bold text-white">gitEase</DialogTitle>
              <button
  disabled={saveAnswer.isPending}
  onClick={() => {
    saveAnswer.mutate(
      {
        projectId: project!.id,
        question,
        answer,
        filesReferences
      },
      {
        onSuccess: () => {
          toast.success('Answer saved!')
          refetch();
        },
        onError: () => toast.error('Failed to save answer!')
      }
    )
  }}
  className={`
    relative flex items-center justify-center gap-2 px-5 py-2
    bg-gray-800 text-gray-100 border border-gray-600
    rounded-lg font-semibold text-sm transition-colors duration-200
    hover:bg-gray-700 hover:text-white
    disabled:opacity-50 disabled:cursor-not-allowed
  `}
>
  {saveAnswer.isPending && (
    <svg
      className="animate-spin h-4 w-4 text-gray-100 absolute left-3"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      ></circle>
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8v8H4z"
      ></path>
    </svg>
  )}
  Save Answer
</button>

            </div>

          </DialogHeader>

          <div className="my-4 border border-gray-700 rounded-md overflow-auto max-h-[40vh] p-2 bg-gray-800">
            <MDEditor.Markdown source={answer} />
          </div>

          <CodeReferences filesReferences={filesReferences}/>

          <div className="flex justify-end mt-4">
            <Button
              variant="secondary"
              onClick={()=>setOpen(false)}
            >
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <div className="w-full max-w-xl mx-auto rounded-xl border border-gray-700 bg-gray-900 shadow-lg mt-6 p-4">
        <h2 className="text-lg font-semibold text-white mb-2">Ask a question</h2>
        <form onSubmit={onSubmit} className="space-y-4">
          <textarea
            className="w-full resize-none rounded-lg border border-gray-700 bg-gray-800 px-3 py-2 text-gray-100 placeholder-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            rows={4}
            placeholder="Which file should I edit to change the home page?"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
          />
          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-500 text-white"
          >
            {loading ? "Asking..." : "Ask gitEase!"}
          </Button>
        </form>
      </div>
    </>
  )
}

export default AskQuestionCard
