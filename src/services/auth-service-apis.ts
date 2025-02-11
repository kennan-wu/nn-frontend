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
      const response = await this.api.post("/auth/signup", credentials);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async oauth(refresh: boolean) {
    const url = new URL(
      `${process.env.NEXT_PUBLIC_AUTH_API_BASE_URL}/auth/oauth/authorize`
    );
    if (refresh) {
      url.searchParams.append("refresh", "true");
    }
    window.location.href = url.toString();
  }

  async login(credentials: { email: string; password: string }) {
    try {
      const response = await this.api.post("/auth/login", credentials);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async validateJwt() {
    try {
      const response = await this.api.get("/me", { withCredentials: true });
      return response.data;
    } catch (error: any) {
      if (
        error.response &&
        (error.response.status === 401 || error.response.status === 403)
      ) {
        return null;
      } else {
        throw error;
      }
    }
  }
}

const authApi = new AuthApi();
export default authApi;
