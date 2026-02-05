import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

export const fetchTransactions = () => API.get("/transactions");
export const fetchSummary = () => API.get("/transactions/summary");
export const addTransaction = (data) => API.post("/transactions", data);
export const deleteTransaction = (id) =>
  API.delete(`/transactions/${id}`);
export const updateTransaction = (id, data) =>
  API.put(`/transactions/${id}`, data);