"use client"

import { useUser } from '@clerk/nextjs'
import { ExternalLink, Github } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import useProject from '~/hooks/use-project'
import CommitLog from './commit-log'

const DashboardPage = () => {

    const {project} = useProject();

  return (
    <div>
      {project?.id}
      <div>
        <Github/>
        <div className="ml-2">
          <p>This project is linked to {''} <Link href={project?.githubUrl??""}>{project?.githubUrl}<ExternalLink/></Link></p>
        </div>

        <div>
          TeamMembers
          InviteButton
          ArchiveButton
        </div>
      </div>

      <div>
        <div className='grid grid-cols-1 gap-4 sm:grid-cols-5'>
          AskQuestionCard
          Meeting card
        </div>
      </div>

      <div></div>
      <CommitLog/>
    </div>
  )
}

export default DashboardPage