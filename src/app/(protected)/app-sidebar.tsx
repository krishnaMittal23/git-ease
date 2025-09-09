"use client"

import { Bot, CreditCard, LayoutDashboard, Presentation, ChevronLeft, ChevronRight, Folder, Plus } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useState } from 'react'
import useProject from '~/hooks/use-project';

const items = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Q&A",
    url: "/qa",
    icon: Bot,
  },
  {
    title: "Meetings",
    url: "/meetings",
    icon: Presentation,
  },
  {
    title: "Billing",
    url: "/billing",
    icon: CreditCard,
  },
];

const AppSidebar = () => {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { projects, projectId, setProjectId } = useProject()

  return (
    <div className={`relative flex flex-col h-screen bg-gray-900 border-r border-gray-800 transition-all duration-300 ${isCollapsed ? 'w-16' : 'w-64'}`}>
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-800">
        {!isCollapsed && (
          <div className="text-xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
            gitEase
          </div>
        )}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-1 rounded-lg hover:bg-gray-800 transition-colors"
        >
          {isCollapsed ? (
            <ChevronRight className="h-5 w-5 text-gray-400" />
          ) : (
            <ChevronLeft className="h-5 w-5 text-gray-400" />
          )}
        </button>
      </div>

      {/* Navigation Items */}
      <nav className="flex-1 p-2 overflow-y-auto">
        <div className="mb-4 px-2">
          {!isCollapsed && (
            <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-2 py-1">
              Navigation
            </div>
          )}
        </div>
        
        <div className="space-y-1">
          {items.map((item) => {
            const isActive = pathname === item.url;
            const Icon = item.icon;
            
            return (
              <Link
                key={item.title}
                href={item.url}
                className={`flex items-center rounded-lg p-3 transition-all duration-200 group ${
                  isActive
                    ? "bg-blue-900/50 text-white shadow-md"
                    : "text-gray-400 hover:bg-gray-800 hover:text-white"
                }`}
              >
                <Icon className={`h-5 w-5 transition-colors ${isActive ? "text-blue-400" : "text-gray-500 group-hover:text-blue-400"}`} />
                {!isCollapsed && (
                  <span className="ml-3 font-medium transition-opacity duration-200">
                    {item.title}
                  </span>
                )}
                {isCollapsed && (
                  <div className="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-sm rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 shadow-lg z-50">
                    {item.title}
                  </div>
                )}
              </Link>
            );
          })}
        </div>

        {/* Projects Section */}
        <div className="mt-8">
          <div className="flex items-center justify-between mb-4 px-2">
            {!isCollapsed && (
              <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Your Projects
              </div>
            )}
            {!isCollapsed && (
              <button className="p-1 rounded-lg hover:bg-gray-800 transition-colors">
                <Plus className="h-4 w-4 text-gray-400" />
              </button>
            )}
          </div>
          
          {/* Create Project Button */}
          {!isCollapsed ? (
            <Link href='/create'>
              <button className="cursor-pointer flex items-center w-full rounded-lg p-3 mb-2 text-gray-400 hover:bg-gray-800 hover:text-white transition-all duration-200 group border border-dashed border-gray-700 hover:border-purple-500">
                <Plus className="h-5 w-5 text-gray-500 group-hover:text-purple-400" />
                <span className="ml-3 font-medium text-sm">Create Project</span>
              </button>
            </Link>
          ) : (
            <Link href='/create'>
              <button className="cursor-pointer flex items-center justify-center w-full rounded-lg p-3 mb-2 text-gray-400 hover:bg-gray-800 hover:text-white transition-all duration-200 group border border-dashed border-gray-700 hover:border-purple-500">
                <Plus className="h-5 w-5 text-gray-500 group-hover:text-purple-400" />
                <div className="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-sm rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 shadow-lg z-50">
                  Create Project
                </div>
              </button>
            </Link>
          )}
          
          <div className="space-y-1">
            {projects?.map((project) => {
              const isActive = project.id === projectId;
              
              return (
                <button
                  key={project.id}
                  onClick={() => setProjectId(project.id)}
                  className={`flex items-center w-full rounded-lg p-3 transition-all duration-200 group ${
                    isActive
                      ? "bg-purple-900/50 text-white shadow-md"
                      : "text-gray-400 hover:bg-gray-800 hover:text-white"
                  }`}
                >
                  <Folder className={`h-5 w-5 transition-colors ${isActive ? "text-purple-400" : "text-gray-500 group-hover:text-purple-400"}`} />
                  {!isCollapsed && (
                    <span className="ml-3 font-medium text-sm transition-opacity duration-200 truncate text-left">
                      {project.name}
                    </span>
                  )}
                  {isCollapsed && (
                    <div className="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-sm rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 shadow-lg z-50">
                      {project.name}
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-gray-800">
        {!isCollapsed && (
          <div className="text-xs text-gray-500 text-center">
            v1.0.0
          </div>
        )}
      </div>
    </div>
  );
};

export default AppSidebar;