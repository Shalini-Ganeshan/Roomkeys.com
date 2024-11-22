import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import Layout from "./layouts/Layout";
import Register from "./pages/Register";
import SignIn from "./pages/SignIn";
import AddHotel from "./pages/AddHotel";
import { useAppContext } from "./contexts/AppContext";
import MyHotels from "./pages/MyHotels";
import EditHotel from "./pages/EditHotel";
import Search from "./pages/Search";
import NotFound from "./pages/NotFound";
import Detail from "./pages/Detail";
import Booking from "./pages/Booking";
import MyBookings from "./pages/MyBookings";
import Home from "./pages/Home";
import SplashScreen from "./components/SplashScreen";
import { useEffect, useState } from "react";
import { Webchat, WebchatProvider, Fab, getClient } from "@botpress/webchat";
import { buildTheme } from "@botpress/webchat-generator";
import Unsubscribe from "./pages/Unsubscribe";
import ManageBookings from "./pages/ManageBookings";
import TermsOfService from "./pages/TermsOfService";
import Privacy from "./pages/Privacy";

const { theme, style } = buildTheme({
  themeName: "prism",
  themeColor: "#634433",
});

const clientId = "8ce7d54c-b6e9-4b0b-9fbf-59ea1f389238";

const config = {
  composerPlaceholder: "What would you like to know?",
  botName: "Your Travel Assistant",
  botAvatar: "https://res.cloudinary.com/dn7vsefsk/image/upload/v1728239559/Roomkeys_hbjik3.png",
  botDescription: "Hi! 👋 Roomkeys.com chatbot helps users find the perfect hotel for their next trip by answering questions about bookings, travel tips, and special offers.",
  email: {
    title: "shaliniganeshan2004@gmail.com",
    link: "mailto:shaliniganeshan2004@gmail.com",
  },
  phone: {
    title: "8825520224",
    link: "tel:8825520224",
  },
  termsOfService: {
    title: "Terms of service",
    link: "https://roomkeys-by-shalini.netlify.app/termsofservice",
  },
  privacyPolicy: {
    title: "Privacy policy",
    link: "https://roomkeys-by-shalini.netlify.app/privacy",
  },
};

const App = () => {
  const { isLoggedIn } = useAppContext();
  const [showSplash, setShowSplash] = useState(true);
  const [isWebchatOpen, setIsWebchatOpen] = useState(false);
  const client = getClient({ clientId });

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 8000);

    return () => clearTimeout(timer);
  }, []);

  const toggleWebchat = () => {
    setIsWebchatOpen((prevState) => !prevState);
  };

  if (showSplash) {
    return <SplashScreen />;
  }

  // Determine if the screen is mobile
  const isMobile = window.innerWidth <= 768;

  return (
    <Router>
      <div style={{ width: "100vw", height: "100vh", position: "relative" }}>
        <style>{style}</style>
        <WebchatProvider
          key={JSON.stringify(config)}
          theme={theme}
          configuration={config}
          client={client}
        >
          {!isMobile && (
            <>
              <Fab
                onClick={toggleWebchat}
                style={{
                  position: "fixed",
                  bottom: "20px",
                  right: "20px",
                  zIndex: 7000,
                  backgroundColor: 'darkblue', // Dark blue color
                  color: 'darkblue', // White icon color
                  width: "50px", // Set the width of the FAB
                  height: "50px", // Set the height of the FAB
                }}
              />
              <div
                style={{
                  position: "fixed",
                  bottom: "30px",
                  right: "20px",
                  width: isWebchatOpen ? "400px" : "0",
                  height: isWebchatOpen ? "500px" : "0",
                  overflow: "hidden",
                  transition: "width 0.3s ease, height 0.3s ease",
                  borderRadius: "8px",
                  boxShadow: "0 2px 10px rgba(0, 0, 0, 0.2)",
                  zIndex: 1001,
                }}
              >
                <Webchat style={{ width: "100%", height: "100%" }} />
              </div>
            </>
          )}
        </WebchatProvider>

        <Routes>
          <Route path="/" element={<Layout><Home /></Layout>} />
          <Route path="/search" element={<Layout><Search /></Layout>} />
          <Route path="/detail/:hotelId" element={<Layout><Detail /></Layout>} />
          <Route path="/register" element={<Layout><Register /></Layout>} />
          <Route path="/privacy" element={<Layout><Privacy /></Layout>} />
          <Route path="/termsofservice" element={<Layout><TermsOfService /></Layout>} />
          <Route path="/sign-in" element={<Layout><SignIn /></Layout>} />
          <Route path="/:id/manage" element={<Layout><ManageBookings /></Layout>} />
          {isLoggedIn && (
            <>
              <Route path="/hotel/:hotelId/booking" element={<Layout><Booking /></Layout>} />
              <Route path="/add-hotel" element={<Layout><AddHotel /></Layout>} />
              <Route path="/edit-hotel/:hotelId" element={<Layout><EditHotel /></Layout>} />
              <Route path="/my-hotels" element={<Layout><MyHotels /></Layout>} />
              <Route path="/my-bookings" element={<Layout><MyBookings /></Layout>} />
            </>
          )}
          <Route path="/unsubscribe" element={<Layout><Unsubscribe /></Layout>} />
          <Route path="*" element={<NotFound />} />
        </Routes>

        <style>
          {`
            @media (max-width: 768px) {
              .bp-webchat-fab {
                display: none; /* Hide icon on mobile screens */
              }
            }
            /* Custom styles for Webchat */
            .bpHeaderContainer {
           border:1px solid darkblue;
             
              text-color:white !important;
            }
            .bpComposerContainer {
              color: black !important; 
            }
              .bpContainer{    border:0.5px solid darkblue;
              }
           .bpModalDialogNewConversationButton {
    background-color: #FBBF24 !important;
    color: black !important; 
    transition: background-color 0.3s ease; 
}
       .bpFabIcon {
              background-color: #FBBF24 !important; 
            }

.bpModalDialogNewConversationButton:hover {
    background-color: #D69E14 !important;
    color: black !important; 
}
          `}
        </style>
      </div>
    </Router>
  );
};

export default App;
