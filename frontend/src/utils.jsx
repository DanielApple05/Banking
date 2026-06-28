// utils/getUserFromToken.js
import { jwtDecode } from "jwt-decode";
import { getToken } from "./helpers";
import { useNavigate } from "react-router-dom";
import {
  ArrowDownToLine,
  ArrowUpRight,
  CreditCard,
  MoreHorizontal,

} from "lucide-react";

export const getUserFromToken = () => {
  try {
    const token = getToken();

    const isValidToken =
      typeof token === "string" &&
      token !== "undefined" &&
      token.split(".").length === 3;

    if (!isValidToken) {
      return null;
    }

    return jwtDecode(token);
  } catch {
    return null;
  }
};

export const getGreeting = () => {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 16) return "Good afternoon";
  return "Good evening";
};


export const getTransactionIcon = (category) => {
  if (category === "Income") return { icon: <ArrowDownToLine className="w-5 h-5 text-green-600" />, bg: "bg-green-100" };
  if (category === "Transfer") return { icon: <ArrowUpRight className="w-5 h-5 text-blue-500" />, bg: "bg-blue-100" };
  if (category === "Expense") return { icon: <CreditCard className="w-5 h-5 text-orange-400" />, bg: "bg-orange-100" };
  return { icon: <MoreHorizontal className="w-5 h-5 text-purple-400" />, bg: "bg-purple-100" };
};

export const getFormatDate = (value) =>
  new Date(value).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

export const getFormatTime = (value) =>
  new Date(value).toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });


export const signOut = (navigate) => {
  localStorage.clear();
  navigate('/');
};

 export const getMaskEmail = (email) => {
    if (!email) return '';
    const atIndex = email.indexOf('@');
    if (atIndex === -1) return email;
    const name = email.substring(0, atIndex);
    const domain = email.substring(atIndex + 1);
    return `${name.slice(0, 3)}***@${domain}`;
  };

 export  const getInitials = (value = "") => {
  const name = String(value || "").trim();
  if (!name) return "?";

  const parts = name.split(/\s+/).filter(Boolean);
  if (parts.length === 1) {
    return parts[0].slice(0, 2).toUpperCase();
  }

  return `${parts[0][0]}${parts[1][0]}`.toUpperCase();``
};