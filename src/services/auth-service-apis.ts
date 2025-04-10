import axios, { AxiosRequestConfig } from "axios";

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
    } catch (error: any) {
      if (error.response) {
        const statusCode = error.response.status;
        if (statusCode === 409) {
          throw new Error("Email already exists");
        }
        throw new Error("An unexpected error occured when trying to log in.");
      }
    }
  }

  async oauth(refresh: boolean) {
    const url = new URL(
      `${process.env.NEXT_PUBLIC_AUTH_API_BASE_URL}auth/oauth/authorize`
    );
    if (refresh) {
      url.searchParams.append("refresh", "true");
    }
    window.location.href = url.toString();
  }

  async login(
    credentials: { email: string; password: string },
    refresh: boolean
  ) {
    const params: { refresh?: boolean } = {};
    if (refresh) {
      params.refresh = true;
    }

    const config: AxiosRequestConfig = {
      params: params,
      withCredentials: true,
    };

    try {
      const response = await this.api.post("/auth/login", credentials, config);
      return response.data;
    } catch (error: any) {
      if (error.response) {
        const statusCode = error.response.status;
        if (statusCode === 401) {
          throw new Error("Invalid Password or Username.");
        }
        throw new Error("An unexpected error occurred");
      }
    }
  }

  async validateJwt(idToken: string) {
    try {
      const response = await this.api.get("/me", {
        headers: { Cookie: `id_token=${idToken}` },
        withCredentials: true,
      });
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

  async refreshJwt(refreshToken: string) {
    const response = await this.api.post("/auth/refresh", {
      headers: {
        Cookie: `refresh_token=${refreshToken}`,
      },
      withCredentials: true,
    });
    return response.data;
  }
}

const authApi = new AuthApi();
export default authApi;
