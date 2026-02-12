import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:5000/api";

const instance = axios.create({
  baseURL: API_BASE_URL,
});

// Interceptor for adding token to requests
instance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth APIs
export const authAPI = {
  register: (username, password) =>
    instance.post("/auth/register", { username, password }),
  login: (username, password) =>
    instance.post("/auth/login", { username, password }),
};

// Donor APIs
export const donorAPI = {
  addDonor: (data) => instance.post("/donors", data),
  getAllDonors: () => instance.get("/donors"),
  getDonorById: (id) => instance.get(`/donors/${id}`),
  updateDonor: (id, data) => instance.put(`/donors/${id}`, data),
  deleteDonor: (id) => instance.delete(`/donors/${id}`),
};

// Blood Request APIs
export const bloodRequestAPI = {
  createRequest: (data) => instance.post("/blood-requests", data),
  getAllRequests: () => instance.get("/blood-requests"),
  getRequestById: (id) => instance.get(`/blood-requests/${id}`),
  updateRequest: (id, data) => instance.put(`/blood-requests/${id}`, data),
  deleteRequest: (id) => instance.delete(`/blood-requests/${id}`),
  getShortageAlerts: () => instance.get("/blood-requests/alerts"),
};

// Blood Stock APIs
export const bloodStockAPI = {
  getAllStock: () => instance.get("/blood-stock"),
  getStockByGroup: (bloodGroup) =>
    instance.get(`/blood-stock/${bloodGroup}`),
};

export default instance;
