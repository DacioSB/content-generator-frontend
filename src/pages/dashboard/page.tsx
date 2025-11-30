"use client"

import { useState, useEffect } from "react"

import { FileText, ImageIcon, Settings, Folder, LayoutDashboard, LogOut, PlusCircle, Clock } from "lucide-react"

import { useNavigate } from 'react-router-dom';

import { useAuth, useUser } from "@clerk/clerk-react"; 

import { getRecentContent, RecentContentResponse } from "../../api/client"; 



// Content type for the content generation

type ContentType = "text" | "image" | null



export default function Dashboard() {

  const [selectedContentType, setSelectedContentType] = useState<ContentType>(null);

  const [prompt, setPrompt] = useState("");

  const [recentContent, setRecentContent] = useState<RecentContentResponse[]>([]);

  const [loadingContent, setLoadingContent] = useState(true);

  const [errorContent, setErrorContent] = useState<string | null>(null);

  const navigate = useNavigate();

  const { getToken, userId, isSignedIn } = useAuth(); // Get getToken and userId from useAuth

  const { user } = useUser(); // Get user object from useUser



  useEffect(() => {

    const fetchRecentContent = async () => {

      if (!isSignedIn) { // Only fetch if signed in

        setLoadingContent(false);

        return;

      }

      

      const token = await getToken();

      if (!token) {

        setErrorContent("Authentication token not found.");

        setLoadingContent(false);

        return;

      }

      try {

        setLoadingContent(true);

        const data = await getRecentContent(token);

        setRecentContent(data);

      } catch (error) {

        console.error("Failed to fetch recent content:", error);

        setErrorContent("Failed to load recent content.");

      } finally {

        setLoadingContent(false);

      }

    };



    fetchRecentContent();

  }, [isSignedIn, getToken, userId]); // Depend on isSignedIn, getToken, and userId



  const handleGenerateContent = () => {

    // This would connect to your backend API for content generation

    console.log(`Generating ${selectedContentType} with prompt: ${prompt}`)

    // In a real app, you would make an API call here

  }



  return (

    <div className="flex h-screen bg-gray-50">

      {/* Sidebar */}

      <div className="hidden w-64 flex-shrink-0 bg-white border-r md:flex md:flex-col">

        <div className="flex h-16 items-center justify-between border-b px-4">

          <div className="flex items-center space-x-2">

            <div className="h-8 w-8 rounded-full bg-teal-500 flex items-center justify-center">

              <FileText className="h-4 w-4 text-white" />

            </div>

            <span className="text-lg font-semibold">ContentGen</span>

          </div>

        </div>

        

        <div className="flex flex-1 flex-col overflow-y-auto pt-5 pb-4">

          <nav className="mt-5 flex-1 space-y-1 px-2">

            <button

              className="w-full flex items-center rounded-md px-2 py-2 text-sm font-medium text-teal-600 bg-teal-50"

            >

              <LayoutDashboard className="mr-3 h-5 w-5" />

              Dashboard

            </button>

            

            <button

              onClick={() => navigate('/my-content')}

              className="w-full flex items-center rounded-md px-2 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100"

            >

              <FileText className="mr-3 h-5 w-5" />

              My Content

            </button>

            

            <button

              onClick={() => navigate('/projects')}

              className="w-full flex items-center rounded-md px-2 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100"

            >

              <Folder className="mr-3 h-5 w-5" />

              Projects

            </button>

            

            <button

              onClick={() => navigate('/settings')}

              className="w-full flex items-center rounded-md px-2 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100"

            >

              <Settings className="mr-3 h-5 w-5" />

              Settings

            </button>

          </nav>

        </div>

        

        <div className="border-t border-gray-200 p-4">

          <div className="flex items-center justify-between">

            <div className="flex items-center">

              <div className="h-8 w-8 rounded-full bg-gray-200"></div>

              <span className="ml-3 text-sm font-medium text-gray-700">Your Account</span>

            </div>

            <LogOut className="h-5 w-5 text-gray-400 hover:text-gray-500 cursor-pointer" />

          </div>

        </div>

      </div>



      {/* Main content */}

      <div className="flex flex-1 flex-col overflow-y-auto">

        {/* Top navigation for mobile */}

        <div className="border-b border-gray-200 bg-white md:hidden">

          <div className="flex h-16 items-center justify-between px-4">

            <div className="flex items-center space-x-2">

              <div className="h-8 w-8 rounded-full bg-teal-500 flex items-center justify-center">

                <FileText className="h-4 w-4 text-white" />

              </div>

              <span className="text-lg font-semibold">ContentGen</span>

            </div>

            <div className="h-8 w-8 rounded-full bg-gray-200"></div>

          </div>

        </div>



        {/* Dashboard content */}

        <main className="flex-1 p-4 md:p-8">

          <div className="mb-8">

            <h1 className="text-2xl font-bold text-gray-900">Welcome back{user?.firstName ? `, ${user.firstName}` : ""}!</h1>

            <p className="mt-1 text-gray-600">Generate and manage your AI-powered content</p>

          </div>



          {/* Content generation section */}

          <div className="mb-8 rounded-lg border bg-white p-6 shadow-sm">

            <h2 className="mb-4 text-xl font-semibold text-gray-900">Create New Content</h2>



            {/* Content type selection */}

            <div className="mb-6 flex flex-wrap gap-4">

              <button

                onClick={() => setSelectedContentType("text")}

                className={`flex items-center rounded-lg border px-4 py-3 ${

                  selectedContentType === "text"

                    ? "border-teal-600 bg-teal-50 text-teal-600"

                    : "border-gray-200 text-gray-600 hover:bg-gray-50"

                }`}

              >

                <FileText className="mr-2 h-5 w-5" />

                Text Generation

              </button>

              <button

                onClick={() => setSelectedContentType("image")}

                className={`flex items-center rounded-lg border px-4 py-3 ${

                  selectedContentType === "image"

                    ? "border-teal-600 bg-teal-50 text-teal-600"

                    : "border-gray-200 text-gray-600 hover:bg-gray-50"

                }`}

              >

                <ImageIcon className="mr-2 h-5 w-5" />

                Image Generation

              </button>

            </div>



            {/* Prompt input */}

            {selectedContentType && (

              <div className="space-y-4">

                <div>

                  <label htmlFor="prompt" className="block text-sm font-medium text-gray-700">

                    {selectedContentType === "text"

                      ? "Describe the text you want to generate"

                      : "Describe the image you want to create"}

                  </label>

                  <textarea

                    id="prompt"

                    rows={4}

                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-teal-500 focus:outline-none focus:ring-teal-500 sm:text-sm"

                    placeholder={

                      selectedContentType === "text"

                        ? "Write a blog post about sustainable living..."

                        : "A futuristic city with flying cars and neon lights..."

                    }

                    value={prompt}

                    onChange={(e) => setPrompt(e.target.value)}

                  />

                </div>

                <button

                  onClick={handleGenerateContent}

                  disabled={!prompt.trim()}

                  className="inline-flex items-center rounded-md bg-[#ff7757] px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-[#ff7757]/90 focus:outline-none focus:ring-2 focus:ring-[#ff7757] focus:ring-offset-2 disabled:opacity-50"

                >

                  <PlusCircle className="mr-2 h-4 w-4" />

                  Generate {selectedContentType === "text" ? "Text" : "Image"}

                </button>

              </div>

            )}

          </div>



          {/* Recent content section */}

          <div className="rounded-lg border bg-white p-6 shadow-sm">

            <div className="mb-4 flex items-center justify-between">

              <h2 className="text-xl font-semibold text-gray-900">Recent Content</h2>

              <a href="#" className="text-sm font-medium text-teal-600 hover:text-teal-700">

                View all

              </a>

            </div>



            <div className="overflow-hidden">

              {loadingContent && <p className="text-gray-500">Loading recent content...</p>}

              {errorContent && <p className="text-red-500">{errorContent}</p>}

              {!loadingContent && !errorContent && recentContent.length === 0 && (

                <p className="text-gray-500">No recent content found.</p>

              )}

              {!loadingContent && !errorContent && recentContent.length > 0 && (

                <ul className="divide-y divide-gray-200">

                  {recentContent.map((item) => (

                    <li key={item.id} className="py-4">

                      <div className="flex items-center justify-between">

                        <div className="flex items-center">

                          <div

                            className={`mr-4 rounded-full p-2 ${

                              item.type === "text" ? "bg-blue-100" : "bg-purple-100"

                            }`}

                          >

                            <FileText

                              className="h-5 w-5 text-blue-600"

                            />

                          </div>

                          <div>

                            <p className="font-medium text-gray-900">{item.title}</p>

                            <div className="flex items-center">

                              <Clock className="mr-1 h-3 w-3 text-gray-400" />

                              <p className="text-xs text-gray-500">{item.date}</p>

                            </div>

                          </div>

                        </div>

                        <div>

                          {item.status === "flagged" ? (

                            <span className="inline-flex items-center rounded-full bg-red-100 px-2.5 py-0.5 text-xs font-medium text-red-800">

                              Flagged

                            </span>

                          ) : (

                            <button className="rounded-md border border-gray-300 bg-white px-3 py-1 text-xs font-medium text-gray-700 shadow-sm hover:bg-gray-50">

                              View

                            </button>

                          )}

                        </div>

                      </div>

                    </li>

                  ))}

                </ul>

              )}

            </div>

          </div>

        </main>

      </div>

    </div>

  )

}

