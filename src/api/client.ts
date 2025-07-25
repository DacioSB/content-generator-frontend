const API_BASE_URL = "http://localhost:5002/api"; // Your ASP.NET Core backend URL

interface ProjectResponse {
  id: string;
  name: string;
  isPublic: boolean;
  createdAt: string;
}

async function fetchAuthenticated(url: string, token: string | null, options: RequestInit = {}): Promise<Response> {
  const headers = new Headers(options.headers || {});
  headers.set("Authorization", `Bearer ${token}`);
  if (options.method == "POST" || options.method == "PUT") {
    headers.set("Content-Type", "application/json");
  }

  const response = await fetch(
    `${API_BASE_URL}${url}`, {
      ...options,
      headers
    }
  );

  if (!response.ok) {
    const errorData = await response.text;
    console.error("API Error:", errorData);
    throw new Error(`Request failed with status ${response.status}`);
  }
  return response;
}

export const syncBackendUser = async (token?: string | null) => {
  if (!token) {
    throw new Error("Token not available");
  }
  const response = await fetchAuthenticated("/users/sync", token, {method: "POST"});
  return response.json();
};

// --- Project API ---
export const getProjects = async (token?: string | null): Promise<ProjectResponse[]> => {
  if (!token) {
    throw new Error("Token not available");
  }
  const response = await fetchAuthenticated("/projects", token);
  return response.json();
};

export const createProject = async (name: string, isPublic: boolean, token?: string | null): Promise<ProjectResponse> => {
  if (!token) {
    throw new Error("Token not available");
  }
  const response = await fetchAuthenticated(
    "/projects",
    token,
    {
      method: "POST",
      body: JSON.stringify({name, isPublic}),
    }
  );
  return response.json();
}