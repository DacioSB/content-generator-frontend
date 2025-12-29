"use client"

import React, { useEffect, useState } from "react"
import { Folder, PlusCircle} from "lucide-react"
import { useUser, useSession } from "@clerk/clerk-react";
import { getProjects, createProject } from "../../api/client";
import { Sidebar } from "../../components/Sidebar";

// Recent project type
interface Project {
  id: string
  name: string
  isPublic: boolean
  createdAt: string
}

export default function Projects() {
  const {user} = useUser();
  const {session} = useSession();
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [newProjectName, setNewProjectName] = useState("");

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setIsLoading(true);
        const token = await session?.getToken();
        const userProjects = await getProjects(token);
        setProjects(userProjects);
      } catch (error) {
        setError("Failed to load your projects.");
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProjects();
  }, [session]);  
  
    const handleCreateProject = async (e: React.FormEvent) => {
      e.preventDefault();
      if (!newProjectName.trim()) return;
      try {
        const token = await session?.getToken();
        const newProject = await createProject(newProjectName, false, token);
        setProjects([newProject, ...projects]);
        setNewProjectName("");
      } catch (error) {
        alert("Failed to create project. Please try again.");
        console.log(error);
      }
    }
  
    return (
      <div className="flex h-screen bg-gray-50">
      <Sidebar />
  
        {/* Main content */}
        <div className="flex flex-1 flex-col overflow-y-auto">
          {/* Top navigation for mobile */}
          <div className="border-b border-gray-200 bg-white md:hidden">
            <div className="flex h-16 items-center justify-between px-4">
              <div className="flex items-center space-x-2">
                <div className="h-8 w-8 rounded-full bg-teal-500 flex items-center justify-center">
                  <Folder className="h-4 w-4 text-white" />
                </div>
                <span className="text-lg font-semibold">ContentGen</span>
              </div>
              <img src={user?.imageUrl} alt="User profile" className="h-8 w-8 rounded-full bg-gray-200" />
            </div>
          </div>
  
          {/* Dashboard content */}
          <main className="flex-1 p-4 md:p-8">
            <div className="mb-8">
              <h1 className="text-2xl font-bold text-gray-900">Welcome back, {user?.firstName}!</h1>
              <p className="mt-1 text-gray-600">Manage your projects and generate AI content.</p>
            </div>
  
            {/* Create Project section */}
            <div className="mb-8 rounded-lg border bg-white p-6 shadow-sm">
              <h2 className="mb-4 text-xl font-semibold text-gray-900">Create New Project</h2>
              <form onSubmit={handleCreateProject} className="flex gap-4 items-end">
                  <div className="flex-grow">
                      <label htmlFor="projectName" className="block text-sm font-medium text-gray-700">
                          Project Name
                      </label>
                      <input
                          id="projectName"
                          type="text"
                          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-teal-500 focus:outline-none focus:ring-teal-500 sm:text-sm"
                          placeholder="e.g., Q4 Marketing Campaign"
                          value={newProjectName}
                          onChange={(e) => setNewProjectName(e.target.value)}
                      />
                  </div>
                  <button
                      type="submit"
                      disabled={!newProjectName.trim()}
                      className="inline-flex items-center rounded-md bg-[#ff7757] px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-[#ff7757]/90 focus:outline-none focus:ring-2 focus:ring-[#ff7757] focus:ring-offset-2 disabled:opacity-50"
                  >
                      <PlusCircle className="mr-2 h-4 w-4" />
                      Create Project
                  </button>
              </form>
            </div>
  
            {/* Recent projects section */}
            <div className="rounded-lg border bg-white p-6 shadow-sm">
              <h2 className="mb-4 text-xl font-semibold text-gray-900">Your Projects</h2>
              {isLoading && <p>Loading projects...</p>}
              {error && <p className="text-red-500">{error}</p>}
              {!isLoading && !error && (
                <ul className="divide-y divide-gray-200">
                  {projects.length === 0 ? (
                    <p className="py-4 text-gray-500">You haven't created any projects yet.</p>
                  ) : (
                    projects.map((project) => (
                      <li key={project.id} className="py-4 flex items-center justify-between">
                        <div className="flex items-center">
                            <div className="mr-4 rounded-full p-2 bg-blue-100">
                                <Folder className="h-5 w-5 text-blue-600" />
                            </div>
                            <div>
                                <p className="font-medium text-gray-900">{project.name}</p>
                                <p className="text-xs text-gray-500">Created on: {new Date(project.createdAt).toLocaleDateString()}</p>
                            </div>
                        </div>
                        <button className="rounded-md border border-gray-300 bg-white px-3 py-1 text-xs font-medium text-gray-700 shadow-sm hover:bg-gray-50">
                          View
                        </button>
                      </li>
                    ))
                  )}
                </ul>
              )}
            </div>
          </main>
        </div>
      </div>
    );
  }