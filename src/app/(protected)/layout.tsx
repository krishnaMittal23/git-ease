"use client";

import { UserButton, useUser } from "@clerk/nextjs";
import React from "react";
import { SidebarProvider } from "~/components/ui/sidebar";
import AppSidebar from "./app-sidebar";

type Props = {
  children: React.ReactNode;
};

const SidebarLayout = ({ children }: Props) => {

  const {user} = useUser()

  return (
    <SidebarProvider className="bg-gray-900">
      <div className="flex h-screen w-screen overflow-hidden">
        {/* Sidebar */}
        <AppSidebar />

        {/* Main Content Area */}
        <main className="flex-1 flex flex-col min-w-0 min-h-0">
          {/* Top Navbar */}
          <div className="flex items-center gap-2 border-gray-700 bg-gray-800 border shadow rounded-md p-2 px-4 m-2">
            {/* <SearchBar/> */}
            <div className="ml-auto"></div>
            <h1 className="text-white font-semibold">hi, {user?.firstName}</h1>
            <UserButton
              appearance={{
                elements: {
                  userButtonBox: "text-white",
                  userButtonOuterIdentifier: "text-white",
                },
              }}
            />
            
          </div>

          {/* Scrollable Content */}
          <div className="flex-1 min-h-0 border-gray-700 bg-gray-800 border shadow rounded-md overflow-hidden mx-2 mb-2">
            <div className="h-full overflow-y-auto p-4 text-white">
              {children}
            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default SidebarLayout;
