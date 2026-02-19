/**
 * Enhanced error handler for API requests
 * Provides user-friendly error messages based on error type
 */

export const getErrorMessage = (error, defaultMessage = "Something went wrong") => {
  if (!error) return defaultMessage;

  // Network error (no internet, connection refused, etc.)
  if (error.code === "ERR_NETWORK" || error.message === "Network Error") {
    return "Unable to connect to the server. Please check your internet connection and try again.";
  }

  // Timeout error
  if (error.code === "ECONNABORTED" || error.message?.includes("timeout")) {
    return "The request took too long. Please try again.";
  }

  // HTTP error response
  if (error.response) {
    const status = error.response.status;
    const serverMessage = error.response?.data?.message;

    // Use server message if available
    if (serverMessage) {
      return serverMessage;
    }

    // Otherwise, provide status-specific messages
    switch (status) {
      case 400:
        return "Invalid request. Please try again.";
      case 401:
        return "You are not authorized to view this content.";
      case 403:
        return "Access denied. You don't have permission to view this content.";
      case 404:
        return "The requested resource was not found.";
      case 429:
        return "Too many requests. Please wait a moment and try again.";
      case 500:
        return "Server error. Our team has been notified. Please try again later.";
      case 502:
        return "Bad gateway. The server is temporarily unavailable.";
      case 503:
        return "Service unavailable. The server is temporarily down for maintenance.";
      case 504:
        return "Gateway timeout. The server took too long to respond.";
      default:
        return `Server error (${status}). Please try again later.`;
    }
  }

  // Request was made but no response received
  if (error.request && !error.response) {
    return "No response from server. Please check your connection and try again.";
  }

  // Generic error
  return error.message || defaultMessage;
};

export const logError = (context, error) => {
  const errorInfo = {
    context,
    message: error?.message,
    code: error?.code,
    status: error?.response?.status,
    statusText: error?.response?.statusText,
    url: error?.config?.url,
    timestamp: new Date().toISOString(),
  };

  console.error(`[${context}] Error details:`, errorInfo);
  
  // In production, you might want to send this to an error tracking service
  // e.g., Sentry, LogRocket, etc.
  
  return errorInfo;
};
