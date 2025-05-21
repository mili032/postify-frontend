import axios from "axios";

// Axios instance
const api = axios.create({
  baseURL:
    "https://postify-backend-milijanovic2529-4n76fkfo.leapcell.dev/api/v1",
  headers: {
    "Content-Type": "application/json",
  },
});

// Generic POST
export const post = async <T = any>(url: string, data?: any): Promise<T> => {
  const res = await api.post(url, data);
  return res.data;
};

// Generic GET
export const get = async <T = any>(url: string, params?: any): Promise<T> => {
  const res = await api.get(url, { params });
  return res.data;
};

// Generic PUT
export const put = async <T = any>(url: string, data?: any): Promise<T> => {
  const res = await api.put(url, data);
  return res.data;
};

// Generic DELETE
export const del = async <T = any>(url: string): Promise<T> => {
  const res = await api.delete(url);
  return res.data;
};
