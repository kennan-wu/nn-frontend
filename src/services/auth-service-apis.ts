import axios from "axios";

class AuthApi {
  private api;
  constructor() {
    this.api = axios.create({
      baseURL: process.env.NEXT_PUBLIC_AUTH_API_BASE_URL,
      headers: { "Content-Type": "application/json" },
    });
  }

  async signup(credentials: {
    email: string;
    password: string;
    username: string;
  }) {
    try {
      const response = await this.api.post("/signup", credentials);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async oauth(refresh: boolean) {
    const url = new URL(
      `${process.env.NEXT_PUBLIC_AUTH_API_BASE_URL}/oauth/authorize`
    );
    if (refresh) {
      url.searchParams.append("refresh", "true");
    }
    window.location.href = url.toString();
  }

  async login(credentials: { email: string; password: string }) {
    try {
      const response = await this.api.post("/login", credentials);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}

const authApi = new AuthApi();
export default authApi;
