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
       
        const response = await fetch('http://localhost:7000/subscribe', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email }), 
        });

        const data = await response.json();

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
      } catch (error) {
        console.error('Error:', error);
        showToast({ message: error.message, type: "ERROR" });
      }
    }
  };

  return (
    <section className="relative py-24 px-8 text-center bg-cover bg-center bg-opacity-80 bg-no-repeat" style={{ backgroundImage: `url(${waveImg})` }}>
    <div className="absolute inset-0 bg-white bg-opacity-50 z-0"></div>
    <div className="relative z-10  ">
      <h3 className="text-black font-semibold  md:text-2xl">Subscribe for exclusive offers and updates!</h3>
      <form ref={form} onSubmit={sendEmailAndSave} className="lg:my-2 mx-auto max-w-2xl lg:h-20  h-12 flex items-center bg-white bg-opacity-75 shadow-lg rounded-full overflow-hidden">
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
          className="w-full h-full md:text-lg  px-4 focus:outline-none text-black"
        />
        <button type="submit" className="w-44 h-full bg-amber-400 text-lg  sm:text-sm font-medium hover:bg-amber-300 rounded-r-full transition">
          Subscribe
        </button>
      </form>
    
    </div>
  </section>
);
};

export default Subscription;
