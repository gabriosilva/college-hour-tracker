import axios from "axios";
const API_URL = process.env.NEXT_PUBLIC_BASE_API;

const API = axios.create({ baseURL: API_URL });

export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
}

export const getProducts = async () => {
  const response = await API.get("/products");
  return response.data;
};

export const getProduct = async (id: string) => {
  const response = await API.get(`/products/${id}`);
  return response.data;
};

export const createProduct = async (product: Product) => {
  const response = await API.post("/products", product);
  return response.data;
};

export const updateProduct = async (id: string, product: Product) => {
  const response = await API.patch(`/products/${id}`, product);
  return response.data;
};

export const deleteProduct = async (id: string) => {
  const response = await API.delete(`/products/${id}`);
  return response.data;
};
