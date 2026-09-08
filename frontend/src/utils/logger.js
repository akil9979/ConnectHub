/**
 * Production-safe logger utility for ConnectHub
 * Suppresses debug/verbose logs in production while preserving error reporting
 * without exposing sensitive tokens, passwords, or raw response payloads.
 */

const isDev = import.meta.env.DEV;

export const logger = {
  log: (...args) => {
    if (isDev) {
      console.log(...args);
    }
  },

  info: (...args) => {
    if (isDev) {
      console.info(...args);
    }
  },

  warn: (...args) => {
    if (isDev) {
      console.warn(...args);
    }
  },

  error: (message, error) => {
    // In dev, show full error
    if (isDev) {
      console.error(message, error);
      return;
    }

    // In production, log a sanitized summary without sensitive data
    if (error && typeof error === 'object') {
      const sanitizedError = {
        message: error.message || 'An unexpected error occurred',
        status: error.response?.status,
        statusText: error.response?.statusText,
        apiMessage: error.response?.data?.message,
      };
      console.error(message, sanitizedError);
    } else {
      console.error(message);
    }
  },
};

export default logger;
