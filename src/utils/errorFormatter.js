export const errorFormatter = (
    httpStatusCode,
    message = "Something went wrong",
    error = null,
  ) => ({
    httpStatusCode,
    success: false,
    message,
    error,
  });
  