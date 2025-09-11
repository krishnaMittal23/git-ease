"use client"

import React from 'react'
import { Tabs, TabsContent } from '~/components/ui/tabs'
import { cn } from '~/lib/utils'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { lucario } from 'react-syntax-highlighter/dist/esm/styles/prism'

type Props = {
  filesReferences: { fileName: string; sourceCode: string; summary: string }[]
}

const CodeReferences = ({ filesReferences }: Props) => {
  const [tab, setTab] = React.useState(filesReferences[0]?.fileName)

  if (filesReferences.length === 0) return null

  return (
    <div className="max-w-[70vw] mt-4">
      <Tabs value={tab} onValueChange={setTab}>
        <div className="flex overflow-x-auto gap-2 bg-gray-800 p-1 rounded-md">
          {filesReferences.map((file) => (
            <button
              key={file.fileName}
              onClick={() => setTab(file.fileName)}
              className={cn(
                'px-3 py-1.5 text-sm font-medium rounded-md whitespace-nowrap transition-colors',
                {
                  'bg-blue-600 text-white': tab === file.fileName,
                  'bg-gray-700 text-gray-300 hover:bg-gray-600': tab !== file.fileName
                }
              )}
            >
              {file.fileName}
            </button>
          ))}
        </div>

        {filesReferences.map(file => (
          <TabsContent
            key={file.fileName}
            value={file.fileName}
            className='max-h-[40vh] overflow-auto mt-2 bg-gray-800 rounded-md p-2'
          >
            <SyntaxHighlighter language='typescript' style={lucario}>
              {file.sourceCode}
            </SyntaxHighlighter>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}

export default CodeReferences
