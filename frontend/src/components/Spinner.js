import React, { useState, useEffect } from "react";

const Spinner = () => {
  const messages = [
    "Just flossing through the data. Hang tight, your smile’s almost ready!",
    "Scanning those pearly whites... it’s like a dental selfie session!",
    "Your teeth are getting a VIP check-up. Please wait a moment!",
    "Don’t worry, your teeth are in good hands! Processing... almost there!",
    "Our system is giving your smile a full check-up—almost time for the results!",
    "Hold tight! Your teeth are being analyzed by the experts (that’s us)!",
    "Processing those teeth like a boss—results coming up shortly!",
    "Just brushing up the details! Your dental report is on its way!",
    "Almost done giving your teeth the royal treatment. Hang tight!",
    "Teeth on the screen, smile on the way! Processing in progress!",
  ];

  const [currentMessage, setCurrentMessage] = useState(
    messages[Math.floor(Math.random() * messages.length)]
  );

  useEffect(() => {
    const intervalId = setInterval(() => {
      const nextMessage = messages[Math.floor(Math.random() * messages.length)];
      setCurrentMessage(nextMessage);
    }, 5000);

    return () => clearInterval(intervalId);
  }, [messages]);

  return (
    <div className="flex flex-col justify-center items-center h-screen w-screen bg-black bg-opacity-80">
      <div className="border-8 border-t-8 border-gray-300 border-t-blue-500 rounded-full w-16 h-16 animate-spin"></div>
      <h3 className="text-lg mt-8 text-white">{currentMessage}</h3>
    </div>
  );
};

export default Spinner;
