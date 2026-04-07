
"use client"

import { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import { Sidebar } from "../../../components/Sidebar";
import { FileText, ImageIcon, PlusCircle, Clock, Loader2, ArrowLeft, X } from "lucide-react";
import { useAuth } from "@clerk/clerk-react";
import { getProject, getProjectContent, generateContent, ProjectContentResponse } from "../../../api/client";
import { useNavigate } from "react-router-dom";

type ContentType = "text" | "image" | null;

interface GeneratedContent {
    id: string;
    title: string;
    type: "text" | "image";
    data: string;
}

export default function ProjectDetail() {
    const { id } = useParams<{id: string}>();
    const navigate = useNavigate();
    const { getToken } = useAuth();

    const [project, setProject] = useState<{id: string; name: string} | null>(null);
    const [content, setContent] = useState<ProjectContentResponse[]>([]);
    const [loadingContent, setLoadingContent] = useState(true);
    const [loadingProject, setLoadingProject] = useState(true);
    const [error, setError] = useState<string | null>(null)

    const [selectedContentType, setSelectedContentType] = useState<ContentType>(null);
    const [prompt, setPrompt] = useState("");
    const [isGenerating, setIsGenerating] = useState(false);
    const [generationError, setGenerationError] = useState<string | null>(null);
    const [generatedContent, setGeneratedContent] = useState<GeneratedContent | null>(null);
    const [lastPrompt, setLastPrompt] = useState("");
    const [lastType, setLastType] = useState<ContentType>(null);

    const fetchProject = useCallback(async () => {
        if (!id) return;
        try {
            setLoadingProject(true);
            const token = await getToken();
            const project = await getProject(id, token);
            setProject(project);
        } catch (err) {
            console.error("Failed to fetch project:", err);
            setError(err instanceof Error ? err.message : "Failed to fetch project");
        } finally {
            setLoadingProject(false);
        }
    }, [id, getToken]);
}