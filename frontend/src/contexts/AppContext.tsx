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
  const { isError, isLoading, data: userData } = useQuery("validateToken", apiClient.validateToken, {
    retry: false,
  });

  // Query to fetch user data
  const { data: userDataDetails } = useQuery("fetchCurrentUser", apiClient.fetchCurrentUser, {
    enabled: !isLoading && !isError, // Only fetch user data if the token validation succeeds
  });

  // Handle user authentication state based on response
  useEffect(() => {
    if (userDataDetails && userDataDetails.message !== "unauthorized") {
      setCurrentUser(userDataDetails); // Set user data if user is authorized
    } else {
      setCurrentUser(undefined); // Set user data to undefined if unauthorized
    }
  }, [userDataDetails]);

  // Determine if the user is logged in based on userData and error state
  const isLoggedIn = !isLoading && !isError && currentUser !== undefined;

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
