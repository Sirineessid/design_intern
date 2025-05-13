// src/context/SocketContext.jsx
import React, { createContext, useContext, useEffect, useState } from "react";
import io from "socket.io-client";
import { toast } from "sonner";

const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Create socket connection
    const newSocket = io("http://localhost:3001", {
      transports: ["websocket"],
      autoConnect: true,
    });

    // Connection events
    newSocket.on("connect", () => {
      console.log("✅ Socket connected");
      setIsConnected(true);
      setError(null);
    });

    newSocket.on("disconnect", () => {
      console.log("❌ Socket disconnected");
      setIsConnected(false);
    });

    newSocket.on("connect_error", (err) => {
      console.error("Socket connection error:", err);
      setError("Failed to connect to server");
      toast.error("Connection error. Please try again.");
    });

    // Handle server errors
    newSocket.on("error", ({ message }) => {
      console.error("Server error:", message);
      setError(message);
      toast.error(message);
    });

    setSocket(newSocket);

    // Cleanup on unmount
    return () => {
      newSocket.close();
    };
  }, []);

  // Provide both socket instance and connection status
  const value = {
    socket,
    isConnected,
    error,
    // Helper method to check if socket is ready
    isSocketReady: () => socket && isConnected,
    // Helper method to emit events safely
    emit: (eventName, data) => {
      if (socket && isConnected) {
        socket.emit(eventName, data);
        return true;
      }
      console.warn("Socket not ready, cannot emit:", eventName);
      return false;
    },
    // Helper method to join a room
    joinRoom: (roomId, user) => {
      if (socket && isConnected) {
        socket.emit("joinRoom", roomId, {
          name: user.name || "Anonymous",
          avatar: user.avatar || "",
          email: user.email || "",
        });
        return true;
      }
      return false;
    },
    // Helper method to leave a room
    leaveRoom: (roomId) => {
      if (socket && isConnected) {
        socket.emit("leaveRoom", roomId);
        return true;
      }
      return false;
    },
    // Helper method to send messages
    sendMessage: (roomId, message) => {
      if (socket && isConnected) {
        socket.emit("sendMessage", { roomId, message });
        return true;
      }
      return false;
    },
  };

  return (
    <SocketContext.Provider value={value}>
      {children}
    </SocketContext.Provider>
  );
};

// Custom hook with error handling
export const useSocket = () => {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error("useSocket must be used within a SocketProvider");
  }
  return context;
};

// Export the context for rare cases where direct access is needed
export default SocketContext;
