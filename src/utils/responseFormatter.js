export const responseFormatter = (
    httpStatusCode,
    message = "Success",
    data = null,
  ) => ({
    httpStatusCode,
    success: true,
    message,
    data,
  });
  