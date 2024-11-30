import React, { useContext, useEffect, useState } from "react";
import { useQuery } from "react-query";
import * as apiClient from "../api-client";
import { loadStripe, Stripe } from "@stripe/stripe-js";
import Toast from "../components/Toast";
import { UserType } from "../../../backend/src/shared/types";

const STRIPE_PUB_KEY = import.meta.env.VITE_STRIPE_PUB_KEY || "";

type ToastMessage = {
  message: string;
  type: "SUCCESS" | "ERROR";
};

type AppContext = {
  showToast: (toastMessage: ToastMessage) => void;
  isLoggedIn: boolean;
  stripePromise: Promise<Stripe | null>;
  currentUser?: UserType;
};

const AppContext = React.createContext<AppContext | undefined>(undefined);

const stripePromise = loadStripe(STRIPE_PUB_KEY);

export const AppContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [toast, setToast] = useState<ToastMessage | undefined>(undefined);
  const [currentUser, setCurrentUser] = useState<UserType | undefined>(undefined);

  // Query to validate token (check if user is logged in)
  const { isError, isLoading } = useQuery("validateToken", apiClient.validateToken, {
    retry: false,
  });

  // Query to fetch user data
  const { data: userData } = useQuery("fetchCurrentUser", apiClient.fetchCurrentUser, {
    enabled: !isLoading && !isError, // Only fetch user data if the token validation succeeds
  });

  // Log to see what's happening during each render
  console.log("isLoading:", isLoading, "isError:", isError, "userData:", userData);

  useEffect(() => {
    if (userData) {
      setCurrentUser(userData);
    }
  }, [userData]);

  // Set isLoggedIn only if loading has completed and there is no error
  const isLoggedIn = !isLoading && !isError && currentUser !== undefined;

  // Log isLoggedIn value to debug
  console.log("isLoggedIn:", isLoggedIn);

  return (
    <AppContext.Provider
      value={{
        showToast: (toastMessage) => {
          setToast(toastMessage);
        },
        isLoggedIn,
        stripePromise,
        currentUser,
      }}
    >
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(undefined)}
        />
      )}
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppContextProvider");
  }
  return context;
};
