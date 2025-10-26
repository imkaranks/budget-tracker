import api from "./api";
import type { AuthResponse, User } from "../types";

export const authService = {
  async register(
    email: string,
    password: string,
    name?: string
  ): Promise<AuthResponse> {
    const response = await api.post("/auth/register", {
      email,
      password,
      name,
    });
    return response.data;
  },

  async login(email: string, password: string): Promise<AuthResponse> {
    const response = await api.post("/auth/login", { email, password });
    return response.data;
  },

  async getCurrentUser(): Promise<User> {
    const response = await api.get("/auth/me");
    return response.data;
  },

  async logout(): Promise<void> {
    // await api.post("/auth/logout")
    this.clearAuth();
  },

  setToken(token: string): void {
    localStorage.setItem("authToken", token);
  },

  getToken(): string | null {
    return localStorage.getItem("authToken");
  },

  clearAuth(): void {
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
  },
};
