import { RegisterRequest } from "@/types/User";
import apiClient from "../api";
import toast from "react-hot-toast";

export async function registerUser({ name, email, password }: RegisterRequest): Promise<string | null> {
  try {
    const response = await apiClient.post("/register", { name, email, password });
    const data = response.data;
    
    if (data?.message) {
      toast.error(data.message);
      return null;
    }
    return data.id;
  } catch (error) {
    console.log(error);
    return null;
  }
}