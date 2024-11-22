
import waveImg from "../image/waves.jpg"; 
import emailjs from '@emailjs/browser';
import { useAppContext } from '../contexts/AppContext';

const Unsubscribe = () => {
  const { currentUser } = useAppContext();  
  const { showToast } = useAppContext();
  const handleUnsubscribe = async () => {
    if (!currentUser || !currentUser.email) {
      showToast({ message: "No user is logged in!", type: "ERROR" });
      return;
    }

    try {
      const response = await fetch('http://localhost:7000/unsubscribe', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: currentUser.email }),
      });

      const data = await response.json();

      if (response.ok) {
        await emailjs.send(
          'service_cvej6rm',  
          'template_norwrdt', 
          {
            user_email: currentUser.email, 
            user_name: currentUser.firstName,    
          },
          'T6p72Siteec27U9o5'
        );
        showToast({ message: "You have been unsubscribed, A confirmation email has been sent.", type: "SUCCESS" });
      
      } else {
        
        showToast({ message: "Failed to Unsubscribe", type: "ERROR" });
      }
    } catch (error) {
      showToast({ message: error, type: "ERROR" });

      if (error instanceof TypeError && error.message.includes('Failed to fetch')) {
        showToast({ message: 'Network error: Unable to reach the server. Please try again later.', type: "ERROR" });
        
      } else {
        showToast({ message: "An error occurred. Please try again later.", type: "ERROR" });
       
      }
    }
  };

  return (
    <section 
      className="relative py-24 px-4 text-center bg-cover bg-no-repeat bg-center flex justify-center items-center"
      style={{ backgroundImage: `url(${waveImg})` }}
    >
      <div className="absolute inset-0 bg-white opacity-50 z-10" />
      <button 
        onClick={handleUnsubscribe} 
        className="relative z-20 bg-red-600 text-white  py-3 px-12 rounded-full hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-600 text-lg"
      >
        Unsubscribe
      </button>
   
    </section>
  );
};

export default Unsubscribe;
