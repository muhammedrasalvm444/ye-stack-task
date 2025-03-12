import axios from "axios";

const API_URL = "http://fakestoreapi.in/api";

export const customFetch = axios.create({
  baseURL: API_URL,
});

export const fetchProducts = async (query, page = 1, limit = 15) => {
  try {
    const response = await customFetch(`/products`, {
      params: { search: query, page, limit }, // Added search query and pagination
    });
    return response.data?.products || [];
  } catch (error) {
    console.error("Error fetching products:", error);
    throw new Error("Failed to fetch products");
  }
};
