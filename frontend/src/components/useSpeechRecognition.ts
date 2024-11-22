import { useEffect, useState } from "react";

const useSpeechRecognition = (onResult: (result: string) => void) => {
  const [isListening, setIsListening] = useState(false);

  useEffect(() => {
    const recognition = new (window as any).webkitSpeechRecognition();
    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.continuous = false;

    recognition.onresult = (event: any) => {
      const result = event.results[0][0].transcript;

      const cleanedResult = result.replace(/[.!?]*$/, '').trim();
      
      onResult(cleanedResult);
      setIsListening(false);
    };

    recognition.onerror = (event: any) => {
      console.error(event.error);
      setIsListening(false);
    };

    if (isListening) {
      recognition.start();
    } else {
      recognition.stop();
    }

    return () => {
      recognition.stop();
    };
  }, [isListening, onResult]);

  return {
    isListening,
    startListening: () => setIsListening(true),
    stopListening: () => setIsListening(false),
  };
};

export default useSpeechRecognition;
