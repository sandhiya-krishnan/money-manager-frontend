import axios from "axios";

const API = axios.create({
  baseURL: "https://money-manager-backend-y01u.onrender.com",
});

export const fetchTransactions = () => API.get("/transactions");
export const fetchSummary = () => API.get("/transactions/summary");
export const addTransaction = (data) => API.post("/transactions", data);
export const deleteTransaction = (id) =>
  API.delete(`/transactions/${id}`);
export const updateTransaction = (id, data) =>
  API.put(`/transactions/${id}`, data);