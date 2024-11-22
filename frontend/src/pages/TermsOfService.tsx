// TermsOfService.js
const TermsOfService = () => {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-2xl font-semibold text-center mb-4">Terms of Service</h1>
        <p className="text-sm mb-4">
          Welcome to RoomKeys.com! These terms outline the rules and regulations for using our hotel booking services.
        </p>
  
        <h2 className="text-lg font-semibold mt-6 mb-2">1. Acceptance of Terms</h2>
        <p className="text-sm mb-4">
          By accessing or using RoomKeys.com, you agree to comply with these Terms of Service. If you do not agree, please do not use our services.
        </p>
  
        <h2 className="text-lg font-semibold mt-6 mb-2">2. User Accounts</h2>
        <p className="text-sm mb-4">
          You may need to create an account to use certain features. You are responsible for maintaining the confidentiality of your account information.
        </p>
  
        <h2 className="text-lg font-semibold mt-6 mb-2">3. Booking Policies</h2>
        <p className="text-sm mb-4">
          All bookings are subject to availability and may require a valid credit card. Please review our cancellation policy before finalizing your booking.
        </p>
  
        <h2 className="text-lg font-semibold mt-6 mb-2">4. Limitation of Liability</h2>
        <p className="text-sm mb-4">
          RoomKeys.com is not liable for any damages resulting from your use of our services, including but not limited to direct, indirect, incidental, and consequential damages.
        </p>
  
        <h2 className="text-lg font-semibold mt-6 mb-2">5. Changes to Terms</h2>
        <p className="text-sm mb-4">
          We reserve the right to modify these Terms of Service at any time. Continued use of the services constitutes acceptance of the new terms.
        </p>
  
        <h2 className="text-lg font-semibold mt-6 mb-2">6. Contact Us</h2>
        <p className="text-sm mb-4">
          If you have any questions about these terms, please contact us at support@roomkeys.com.
        </p>
  
        <div className="mt-8 text-center">
          <button className="bg-indigo-800 text-white py-2 px-4 rounded-md hover:bg-indigo-600">
            Accept Terms
          </button>
        </div>
      </div>
    );
  };
  
  export default TermsOfService;
  