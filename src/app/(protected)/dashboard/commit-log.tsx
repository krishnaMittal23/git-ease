"use client";

import Link from "next/link";
import React from "react";
import useProject from "~/hooks/use-project";
import { api } from "~/trpc/react";
import { ExternalLink, User, Calendar, MessageSquare } from "lucide-react";

const CommitLog = () => {
  const { projectId, project } = useProject();
  const { data: commits } = api.project.getCommits.useQuery({ projectId });

  return (
    <div className="bg-gray-900 text-white p-6 rounded-lg border border-gray-700 shadow-lg">
      <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
        Commit History
      </h2>

      <ul className="space-y-5">
        {commits?.map((commit) => (
          <li
            key={commit.id}
            className="bg-gray-800 rounded-lg p-5 border border-gray-700 hover:border-gray-600 transition-all duration-200 hover:shadow-md"
          >
            <div className="flex items-start gap-4">
              {/* Author Avatar */}
              <img
                src={commit.commitAuthorAvatar}
                alt={commit.commitAuthorName}
                className="w-12 h-12 rounded-full border-2 border-gray-600 object-cover"
              />

              <div className="flex-1 min-w-0">
                {/* Commit Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4 text-gray-400" />
                    <span className="font-semibold text-gray-200 truncate">
                      {commit.commitAuthorName}
                    </span>
                  </div>

                  <Link
                    target="_blank"
                    href={`${project?.githubUrl}/commit/${commit.commitHash}`}
                    className="flex items-center gap-1 px-3 py-1 bg-gray-700 rounded-md text-sm text-gray-300 hover:bg-gray-600 hover:text-white transition-colors whitespace-nowrap"
                  >
                    <span>View Commit</span>
                    <ExternalLink className="h-3 w-3" />
                  </Link>
                </div>

                {/* Commit Message */}
                <div className="mb-4">
                  <div className="flex items-center gap-2 mb-2">
                    <MessageSquare className="h-4 w-4 text-gray-400" />
                    <span className="text-gray-300 font-medium">
                      Commit Message:
                    </span>
                  </div>
                  <p className="text-gray-200 text-sm bg-gray-700 rounded px-3 py-2 border border-gray-600 break-words whitespace-pre-wrap">
                    {commit.commitMessage}
                  </p>
                </div>

                {/* Summary */}
                {commit.summary && (
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Calendar className="h-4 w-4 text-gray-400" />
                      <span className="text-gray-300 font-medium">Summary:</span>
                    </div>
                    <pre className="text-gray-200 text-sm bg-gray-700 rounded px-3 py-2 border border-gray-600 overflow-x-auto whitespace-pre-wrap break-words max-w-full font-mono scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800">
                      {commit.summary}
                    </pre>
                  </div>
                )}
              </div>
            </div>
          </li>
        ))}
      </ul>

      {!commits?.length && (
        <div className="text-center py-12 text-gray-400">
          <MessageSquare className="h-12 w-12 mx-auto mb-4 opacity-50" />
          <p>No commits found for this project</p>
        </div>
      )}
    </div>
  );
};

export default CommitLog;
