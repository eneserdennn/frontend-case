import axios from "axios";
import { ApiResponse } from "../types/RickAndMortyType";

const BASE_URL = "https://rickandmortyapi.com/api";

export const searchCharacters = async (query: string): Promise<ApiResponse> => {
  const response = await axios.get(`${BASE_URL}/character`, {
    params: { name: query },
  });
  return response.data;
};
