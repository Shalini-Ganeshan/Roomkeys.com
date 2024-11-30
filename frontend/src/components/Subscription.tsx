import React, { useRef, useState, useEffect } from 'react';
import emailjs from '@emailjs/browser';
import { useAppContext } from "../contexts/AppContext";
import waveImg from '../image/waves.jpg'
const Subscription = () => {
  const form = useRef<HTMLFormElement>(null); 
  const [email, setEmail] = useState(''); 
  const [username, setUsername] = useState(''); 
  const { showToast } = useAppContext();

  
  useEffect(() => {
    if (email) {
      const extractedUsername = email.substring(0, email.indexOf('@'));
      setUsername(extractedUsername); 
    }
  }, [email]);

  const sendEmailAndSave = async (e: React.FormEvent) => {
    e.preventDefault();

    if (form.current) {
      try {
       
        const response = await fetch('https://roomkeys-backend.onrender.com/subscribe', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email }), 
        });

        if (response.ok) {
          
          await emailjs.sendForm(
            'service_cvej6rm', 
            'template_adgqepr', 
            form.current,
            'T6p72Siteec27U9o5' 
          );


          showToast({ message: "Thank you for subscribing, A confirmation email has been sent to your inbox.", type: "SUCCESS" });
          
          setEmail(''); 
          setUsername(''); 
        } else {
        
          showToast({ message: "Invalid Email", type: "ERROR" });
        }
      } catch (error: unknown) {
        if (error instanceof Error) {
          console.error('Error:', error.message);
          showToast({ message: error.message, type: "ERROR" });
        } else {
          console.error('Unexpected error:', error);
          showToast({ message: "An unexpected error occurred.", type: "ERROR" });
        }}
    }
  };

  return (
  <section
  className="relative py-24 px-8 text-center bg-cover bg-center bg-opacity-80 bg-no-repeat"
  style={{ backgroundImage: `url(${waveImg})` }}
>
  <div className="absolute inset-0 bg-white bg-opacity-50 z-0"></div>
  <div className="relative z-10">
    <h3 className="text-black font-semibold md:text-2xl">Subscribe for exclusive offers and updates!</h3>
    
    <form
      ref={form}
      onSubmit={sendEmailAndSave}
      className="lg:my-4 mx-auto flex justify-center items-center bg-white bg-opacity-75 shadow-lg rounded-full overflow-hidden w-full sm:w-96"
    >
      <input
        type="hidden"
        name="user_name"
        value={username}
      />
      <input
        type="email"
        name="user_email"
        placeholder="Enter your email here"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full sm:w-64 h-12 sm:text-sm md:text-md px-3 focus:outline-none text-black rounded-l-full"
      />
      <button
        type="submit"
        className="w-35 h-12 bg-amber-400 md:text-md sm:text-xs font-medium hover:bg-amber-300 rounded-r-full transition"
      >
        Subscribe
      </button>
    </form>
  </div>
</section>

);
};

export default Subscription;
