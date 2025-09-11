"use client";

import { ExternalLink, Github } from "lucide-react";
import Link from "next/link";
import React from "react";
import useProject from "~/hooks/use-project";
import CommitLog from "./commit-log";
import AskQuestionCard from "./ask-question-card";

const DashboardPage = () => {
  const { project } = useProject();

  return (
    <div className="p-6 space-y-8">
      {/* Project Header */}
      <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 shadow-lg">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          {/* Left: Project Info */}
          <div className="flex items-start md:items-center">
            <Github className="h-10 w-10 text-gray-400 flex-shrink-0" />
            <div className="ml-4">
              <h1 className="text-2xl font-bold text-white">{project?.name}</h1>
              <p className="text-gray-400 text-sm mt-1">
                This project is linked to{" "}
                <Link
                  href={project?.githubUrl ?? ""}
                  target="_blank"
                  className="text-blue-400 hover:text-blue-300 underline inline-flex items-center gap-1"
                >
                  {project?.githubUrl}
                  <ExternalLink className="h-4 w-4" />
                </Link>
              </p>
            </div>
          </div>

          {/* Right: Action Buttons */}
          <div className="flex items-center gap-3">
            <button className="px-4 py-2 bg-gray-700 text-gray-300 rounded-md hover:bg-gray-600 transition-colors text-sm font-medium">
              Team Members
            </button>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm font-medium">
              Invite
            </button>
            <button className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors text-sm font-medium">
              Archive
            </button>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
        <div className="bg-gray-800 rounded-xl p-5 border border-gray-700 hover:border-gray-600 hover:shadow-md transition-all col-span-2">
          <AskQuestionCard/>
        </div>
        <div className="bg-gray-800 rounded-xl p-5 border border-gray-700 hover:border-gray-600 hover:shadow-md transition-all col-span-3 cursor-pointer">
          <h3 className="text-lg font-semibold text-white mb-2">
            Schedule Meeting
          </h3>
          <p className="text-gray-400 text-sm">
            Plan your next team sync or discussion
          </p>
        </div>
      </div>

      {/* Commit Log */}
      <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 shadow">
        <h2 className="text-xl font-semibold text-white mb-4">Recent Commits</h2>
        <CommitLog />
      </div>
    </div>
  );
};

export default DashboardPage;
