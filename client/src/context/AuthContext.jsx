import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext(null);

// Hook to use auth context
const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);
  const [accessToken, setAccessToken] = useState(
    localStorage.getItem("accessToken") || null
  );

  const API_URL = "http://localhost:3000/api/admin";

  // Axios interceptor to add token to requests
  useEffect(() => {
    const interceptor = axios.interceptors.request.use(
      (config) => {
        if (accessToken && config.url?.includes("/api/")) {
          config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    return () => axios.interceptors.request.eject(interceptor);
  }, [accessToken]);

  // Verify admin on mount
  useEffect(() => {
    const verifyAdmin = async () => {
      if (!accessToken) {
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(`${API_URL}/verify`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        if (response.data.success) {
          setAdmin(response.data.admin);
        } else {
          // Token invalid, try to refresh
          await refreshToken();
        }
      } catch (error) {
        console.error("Admin verification failed:", error);
        // Try to refresh token
        await refreshToken();
      } finally {
        setLoading(false);
      }
    };

    verifyAdmin();
  }, []);

  // Login function
  const login = async (username, password) => {
    try {
      const response = await axios.post(`${API_URL}/login`, {
        username,
        password,
      });

      if (response.data.success) {
        const { accessToken: newToken, admin: adminData } = response.data;
        setAccessToken(newToken);
        setAdmin(adminData);
        localStorage.setItem("accessToken", newToken);
        return { success: true };
      }

      return { success: false, message: response.data.message };
    } catch (error) {
      console.error("Login error:", error);
      return {
        success: false,
        message: error.response?.data?.message || "Login failed",
      };
    }
  };

  // Logout function
  const logout = async () => {
    try {
      await axios.post(`${API_URL}/logout`);
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      setAccessToken(null);
      setAdmin(null);
      localStorage.removeItem("accessToken");
    }
  };

  // Refresh token function
  const refreshToken = async () => {
    try {
      const response = await axios.post(`${API_URL}/refresh`);

      if (response.data.success) {
        const { accessToken: newToken, admin: adminData } = response.data;
        setAccessToken(newToken);
        setAdmin(adminData);
        localStorage.setItem("accessToken", newToken);
        return true;
      }

      // Refresh failed, logout
      logout();
      return false;
    } catch (error) {
      console.error("Token refresh failed:", error);
      logout();
      return false;
    }
  };

  const value = {
    admin,
    loading,
    accessToken,
    login,
    logout,
    refreshToken,
    isAuthenticated: !!admin,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// eslint-disable-next-line react-refresh/only-export-components
export { useAuth };
