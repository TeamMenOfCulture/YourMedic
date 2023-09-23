import React, { useState, useEffect } from "react";
import {
  SpeechConfig,
  AudioConfig,
  SpeechRecognizer,
  ResultReason,
} from "microsoft-cognitiveservices-speech-sdk";

const SpeechRecognitionComponent = (var1, var2) => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [recognizer, setRecognizer] = useState(null);

  useEffect(() => {
    // Initialize the Speech SDK

    const speechConfig = SpeechConfig.fromSubscription("","");
    speechConfig.speechRecognitionLanguage = "bn-IN";
    const audioConfig = AudioConfig.fromDefaultMicrophoneInput();

    const speechRecognizer = new SpeechRecognizer(speechConfig, audioConfig);

    // Event handler for recognized speech
    speechRecognizer.recognized = (s, e) => {
      if (e.result.reason === ResultReason.RecognizedSpeech) {
        setTranscript(e.result.text);
      }
    };

    setRecognizer(speechRecognizer);
  }, []);

  const startListening = () => {
    if (!isListening && recognizer) {
      recognizer.startContinuousRecognitionAsync(() => {
        setIsListening(true);
      });
    }
  };

  const stopListening = () => {
    if (isListening && recognizer) {
      recognizer.stopContinuousRecognitionAsync(() => {
        setIsListening(false);
      });
    }
  };

  return (
    <div>
      <button onClick={startListening} disabled={isListening}>
        Start Listening
      </button>
      <button onClick={stopListening} disabled={!isListening}>
        Stop Listening
      </button>
      <div>
        <p>Transcript: {transcript}</p>
      </div>
    </div>
  );
};

export default SpeechRecognitionComponent;
