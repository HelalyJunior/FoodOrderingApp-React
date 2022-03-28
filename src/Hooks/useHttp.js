import { useState, useCallback } from "react";

const useHttp = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(null);

  const sendRequest = useCallback(async (request, applyOnData) => {
    setIsLoading(true);
    setHasError(null);
    try {
      const response = await fetch(request.url, {
        method: request.method ? request.method : "GET",
        body: request.body ? JSON.stringify(request.body) : null,
        headers: request.headers ? request.headers : {},
      });

      if (!response.ok) {
        throw new Error("Request Failed");
      }

      const data = await response.json();
      applyOnData(data);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      setHasError(error.message || "Something went wrong!");
    }
  }, []);

  return {
    isLoading,
    hasError,
    sendRequest,
  };
};

export default useHttp;
