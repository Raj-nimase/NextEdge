import { createContext, useContext, useState, useEffect } from "react";
import { api, setAuthToken } from "../api/axios.js";

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
  const [accessToken, setAccessToken] = useState(null);

  // Keep axios auth header in sync with token
  useEffect(() => {
    setAuthToken(accessToken);
  }, [accessToken]);

  // Initialize auth state on mount using refresh token (HTTP-only cookie)
  useEffect(() => {
    const initAuth = async () => {
      try {
        await refreshToken();
      } finally {
        setLoading(false);
      }
    };

    initAuth();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Login function
  const login = async (username, password) => {
    try {
      const response = await api.post("/admin/login", {
        username,
        password,
      });

      if (response.data.success) {
        const { accessToken: newToken, admin: adminData } = response.data;
        setAccessToken(newToken);
        setAdmin(adminData);
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
      await api.post("/admin/logout");
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      setAccessToken(null);
      setAdmin(null);
    }
  };

  // Refresh token function
  const refreshToken = async () => {
    try {
      const response = await api.post("/admin/refresh");

      if (response.data.success) {
        const { accessToken: newToken, admin: adminData } = response.data;
        setAccessToken(newToken);
        setAdmin(adminData);
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
