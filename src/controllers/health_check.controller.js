import mongoose from "mongoose";

export const checkDBHealth = (req, res) => {
  try {
    // Check database connection status
    const dbState = mongoose.connection.readyState;
    let dbStatus = "unknown";
    switch (dbState) {
      case 0:
        dbStatus = "disconnected";
        break;
      case 1:
        dbStatus = "connected";
        break;
      case 2:
        dbStatus = "connecting";
        break;
      case 3:
        dbStatus = "disconnecting";
        break;
      default:
        dbStatus = "unknown";
    }

    // If connected, respond with success
    if (dbStatus === "connected") {
      res.status(200).json({
        status: "ok",
        db: dbStatus,
        timestamp: new Date().toISOString(),
      });

    } else {
      // If not connected, respond with error
      res.status(500).json({
        status: "error",
        db: dbStatus,
        message: "Database is not in a healthy state.",
        timestamp: new Date().toISOString(),
      });
    }
  } catch (error) {
    // Catch any unexpected errors
    res.status(500).json({
      status: "error",
      db: "unknown",
      message: "An unexpected error occurred.",
      error: error.message,
      timestamp: new Date().toISOString(),
    });
  }
};
