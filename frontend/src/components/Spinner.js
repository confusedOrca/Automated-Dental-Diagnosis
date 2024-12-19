import React, { useState, useEffect, useMemo } from "react";

const Spinner = ({ mode = "DIAGNOSE" }) => {
  const diagnoseMessages = useMemo(
    () => [
      "Just flossing through the data. Hang tight, your smile’s almost ready!",
      "Scanning those pearly whites... it’s like a dental selfie session!",
      "Don’t worry, your teeth are in good hands! Processing... almost there!",
      "Our system is giving your smile a full check-up—almost time for the results!",
      "Just brushing up the details! Your dental report is on its way!",
      "Teeth on the screen, smile on the way! Processing in progress!",
    ],
    []
  );

  const resetMessages = useMemo(
    () => [
      "Hold tight! We’re giving a little spring cleaning.",
      "Resetting... Just making sure your smile is fresh!",
      "Brushing off the old data, hang tight!",
      "Patience, please! Your diagnosis tool is undergoing a deep clean!",
      "Shuffling things around... Your diagnostic tool is taking a break!",
    ],
    []
  );

  const messages = mode === "RESET" ? resetMessages : diagnoseMessages;

  const [currentMessage, setCurrentMessage] = useState(
    messages[Math.floor(Math.random() * messages.length)]
  );

  useEffect(() => {
    const intervalId = setInterval(() => {
      const nextMessage = messages[Math.floor(Math.random() * messages.length)];
      setCurrentMessage(nextMessage);
    }, 15000);

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
