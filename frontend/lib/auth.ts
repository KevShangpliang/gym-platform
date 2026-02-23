import { jwtDecode } from "jwt-decode";

export function getUserRole() {
  if (typeof window === "undefined") return null;

  const token = localStorage.getItem("token");
  if (!token) return null;

  const decoded: any = jwtDecode(token);
  return decoded.role;
}

