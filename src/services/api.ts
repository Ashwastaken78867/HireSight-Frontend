import axios from "axios";
const API_BASE_URL = import.meta.env.VITE_API_URL;

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: { "Content-Type": "application/json" },
});

// Attach Authorization header if token is available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers = config.headers ?? {};
    (config.headers as any)["Authorization"] = `Bearer ${token}`;
  }
  return config;
});

// Fetch all applications
export const getApplications = async () => {
  const response = await api.get("/");
  return response.data;
};

// Fetch single application
export const getApplicationById = async (id: string) => {
  const response = await api.get(`/${id}`);
  return response.data;
};

// Create new application
export const createApplication = async (data: any) => {
  const response = await api.post("/", data);
  return response.data;
};

// Update status
export const updateApplicationStatus = async (id: string, status: string) => {
  const response = await api.put(`/${id}/status`, { status });
  return response.data;
};

// Delete application
export const deleteApplication = async (id: string) => {
  const response = await api.delete(`/${id}`);
  return response.data;
};
