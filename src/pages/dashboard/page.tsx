"use client"

import { useState, useEffect, useCallback } from "react"
import { Sidebar } from "../../components/Sidebar"

import { FileText, ImageIcon, PlusCircle, Clock, Loader2, X } from "lucide-react"

import { useAuth, useUser } from "@clerk/clerk-react"; 

import { generateContent, getRecentContent, RecentContentResponse } from "../../api/client"; 



// Content type for the content generation

type ContentType = "text" | "image" | null;

interface GeneratedContent {
  id: string;
  title: string;
  type: "text" | "image";
  data: string;
}



export default function Dashboard() {

  const [selectedContentType, setSelectedContentType] = useState<ContentType>(null);

  const [prompt, setPrompt] = useState("");

  const [recentContent, setRecentContent] = useState<RecentContentResponse[]>([]);

  const [loadingContent, setLoadingContent] = useState(true);

  const [errorContent, setErrorContent] = useState<string | null>(null);

  const [isGenerating, setIsGenerating] = useState(false);
  const [generationError, setGenerationError] = useState<string | null>(null);

  const [generatedContent, setGeneratedContent] = useState<GeneratedContent | null>(null);

  const [lastPrompt, setLastPrompt] = useState("");
  
  const [lastType, setLastType] = useState<ContentType>(null);

  const { getToken, isSignedIn } = useAuth();

  const { user } = useUser();

  
  const fetchRecentContent = useCallback(async () => {
    if (!isSignedIn) {
      setLoadingContent(false)
      return
    }
    const token = await getToken()
    if (!token) {
      setErrorContent("Authentication token not found.")
      setLoadingContent(false)
      return
    }
    try {
      setLoadingContent(true)
      const data = await getRecentContent(token)
      setRecentContent(data)
      setErrorContent(null)
    } catch (err) {
      console.error("Failed to fetch recent content:", err)
      setErrorContent("Failed to load recent content.")
    } finally {
      setLoadingContent(false)
    }
  }, [isSignedIn, getToken]);

  useEffect(() => {
    fetchRecentContent()
  }, [fetchRecentContent]);



  const handleGenerateContent = async () => {

    if (!selectedContentType || !prompt.trim()) return;
    
    setIsGenerating(true);
    setGenerationError(null);
    setGeneratedContent(null);
    setLastPrompt(prompt);
    setLastType(selectedContentType);

    try {
      const token = await getToken();
      const result = await generateContent(
        {prompt: prompt.trim(), type: selectedContentType},
        token
      );
      setGeneratedContent({
        id: result.id,
        type: result.type as "text" | "image",
        data: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.", // This will come from the API
        title: result.title
      });
      setPrompt("");
      setSelectedContentType(null);
      await fetchRecentContent();
    } catch (error) {
      console.error("Failed to generate content:", error);
      setGenerationError("Failed to generate content. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  }

  const handleRetry = () => {
    setPrompt(lastPrompt);
    setSelectedContentType(lastType);
    setGenerationError(null);
    handleGenerateContent();
  }

  const handleCloseGeneratedContent = () => {
    setGeneratedContent(null);
  }


  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />

      <div className="flex flex-1 flex-col overflow-y-auto">
        {/* Mobile header */}
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

        <main className="flex-1 p-4 md:p-8">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900">
              Welcome back{user?.firstName ? `, ${user.firstName}` : ""}!
            </h1>
            <p className="mt-1 text-gray-600">Generate and manage your AI-powered content</p>
          </div>

          {/* Generated content display */}
          {generatedContent && (
            <div className="mb-8 rounded-lg border border-teal-200 bg-teal-50 p-6 shadow-sm">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center">
                  <div className={`mr-3 rounded-full p-2 ${
                    generatedContent.type === "text" ? "bg-blue-100" : "bg-purple-100"
                  }`}>
                    {generatedContent.type === "text" ? (
                      <FileText className="h-5 w-5 text-blue-600" />
                    ) : (
                      <ImageIcon className="h-5 w-5 text-purple-600" />
                    )}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{generatedContent.title}</h3>
                    <p className="text-sm text-gray-600">Generated successfully</p>
                  </div>
                </div>
                <button
                  onClick={handleCloseGeneratedContent}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              
              <div className="mt-4 rounded-md bg-white p-4 border border-gray-200">
                {generatedContent.type === "text" ? (
                  <p className="text-gray-800 whitespace-pre-wrap">{generatedContent.data}</p>
                ) : (
                  <img 
                    src={generatedContent.data} 
                    alt={generatedContent.title}
                    className="max-w-full h-auto rounded-md"
                  />
                )}
              </div>
            </div>
          )}

          {/* Content generation section */}
          <div className="mb-8 rounded-lg border bg-white p-6 shadow-sm">
            <h2 className="mb-4 text-xl font-semibold text-gray-900">Create New Content</h2>

            {/* Content type selection */}
            <div className="mb-6 flex flex-wrap gap-4">
              <button
                onClick={() => setSelectedContentType("text")}
                disabled={isGenerating}
                className={`flex items-center rounded-lg border px-4 py-3 ${
                  selectedContentType === "text"
                    ? "border-teal-600 bg-teal-50 text-teal-600"
                    : "border-gray-200 text-gray-600 hover:bg-gray-50"
                } disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                <FileText className="mr-2 h-5 w-5" />
                Text Generation
              </button>
              <button
                onClick={() => setSelectedContentType("image")}
                disabled={isGenerating}
                className={`flex items-center rounded-lg border px-4 py-3 ${
                  selectedContentType === "image"
                    ? "border-teal-600 bg-teal-50 text-teal-600"
                    : "border-gray-200 text-gray-600 hover:bg-gray-50"
                } disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                <ImageIcon className="mr-2 h-5 w-5" />
                Image Generation
              </button>
            </div>

            {/* Prompt input + submit */}
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
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-teal-500 focus:outline-none focus:ring-teal-500 sm:text-sm disabled:bg-gray-100 disabled:cursor-not-allowed"
                    placeholder={
                      selectedContentType === "text"
                        ? "Write a blog post about sustainable living..."
                        : "A futuristic city with flying cars and neon lights..."
                    }
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    disabled={isGenerating}
                  />
                </div>

                {/* Generation error with retry button */}
                {generationError && (
                  <div className="rounded-md bg-red-50 border border-red-200 p-4">
                    <div className="flex items-start justify-between">
                      <p className="text-sm text-red-600">{generationError}</p>
                      <button
                        onClick={handleRetry}
                        className="ml-4 text-sm font-medium text-red-700 hover:text-red-800 underline"
                      >
                        Retry
                      </button>
                    </div>
                  </div>
                )}

                <button
                  onClick={handleGenerateContent}
                  disabled={!prompt.trim() || isGenerating}
                  className="inline-flex items-center rounded-md bg-[#ff7757] px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-[#ff7757]/90 focus:outline-none focus:ring-2 focus:ring-[#ff7757] focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isGenerating ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <PlusCircle className="mr-2 h-4 w-4" />
                      Generate {selectedContentType === "text" ? "Text" : "Image"}
                    </>
                  )}
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
                            {item.type === "text" ? (
                              <FileText className="h-5 w-5 text-blue-600" />
                            ) : (
                              <ImageIcon className="h-5 w-5 text-purple-600" />
                            )}
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
};

