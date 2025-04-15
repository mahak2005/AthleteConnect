// "use client";
// import { createContext, useContext, useState, ReactNode } from "react";

// interface AuthContextType {
//   token: string | null;
//   login: (token: string) => void;
//   logout: () => void;
//   modalType: string | null;
//   openModal: (type: string) => void;
//   closeModal: () => void;
// }

// const AuthContext = createContext<AuthContextType | undefined>(undefined);

// export function AuthProvider({ children }: { children: ReactNode }) {
//   const [token, setToken] = useState<string | null>(null);
//   const [modalType, setModalType] = useState<string | null>(null);

//   const login = (userToken: string) => {
//     setToken(userToken);
//     localStorage.setItem("token", userToken);
//   };

//   const logout = () => {
//     setToken(null);
//     localStorage.removeItem("token");
//   };

//   const openModal = (type: string) => setModalType(type);
//   const closeModal = () => setModalType(null);

//   return (
//     <AuthContext.Provider value={{ token, login, logout, modalType, openModal, closeModal }}>
//       {children}
//     </AuthContext.Provider>
//   );
// }

// export function useAuth() {
//   const context = useContext(AuthContext);
//   if (!context) {
//     throw new Error("useAuth must be used within an AuthProvider");
//   }
//   return context;
// }
"use client";
import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useRouter } from "next/navigation";
import { LoginModal } from "@/components/auth/login-modal";  // Import Login Modal
import { SignupModal } from "@/components/auth/signup-modal"; // Import Signup Modal

interface AuthContextType {
  token: string | null;
  userId: string | null;
  login: (token: string, userId: string) => void;
  logout: () => void;
  modalType: string | null;
  openModal: (type: string) => void;
  closeModal: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [modalType, setModalType] = useState<string | null>(null);
  const router = useRouter();

  // Load token and userId from localStorage when the app initializes
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedUserId = localStorage.getItem("userId");

    if (storedToken && storedUserId) {
      setToken(storedToken);
      setUserId(storedUserId);
    }
  }, []);

  const login = (userToken: string, userId: string) => {
    setToken(userToken);
    setUserId(userId);
    localStorage.setItem("token", userToken);
    localStorage.setItem("userId", userId);

    // Redirect to the user's profile after login
    router.push(`/profile/${userId}`);
  };

  const logout = () => {
    setToken(null);
    setUserId(null);
    localStorage.removeItem("token");
    localStorage.removeItem("userId");

    // Redirect to home or login page after logout
    router.push("/login");
  };

  const openModal = (type: string) => setModalType(type);
  const closeModal = () => setModalType(null);

  return (
    <AuthContext.Provider value={{ token, userId, login, logout, modalType, openModal, closeModal }}>
      {children}

      {modalType === "login" && <LoginModal />}
      {modalType === "signup" && <SignupModal />}

    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
