import { RegisterRequest } from "@/types/User";
import apiClient from "../api";
import toast from "react-hot-toast";

export async function registerUser({ name, email, password }: RegisterRequest): Promise<string | null> {
  try {
    const response: { message: string, id: string } = await apiClient.post("/register", { name, email, password });
    toast.success(response.message);
    return response.id;
  } catch (error) {
    // @ts-expect-error Random
    if (error.response?.data?.error) {
      // @ts-expect-error Random
      toast.error(error.response.data.error);
    } else {
      toast.error("An unknown error occurred.");
    }
    return null;
  }
}