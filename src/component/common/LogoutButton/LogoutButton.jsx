// components/LogoutButton.js
import React from "react";
import { useAuth } from "../context/AuthContext";

function LogoutButton() {
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return <button onClick={handleLogout}>Đăng Xuất</button>;
}

export default LogoutButton;
