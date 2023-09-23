import React, { useState, useEffect } from "react";
import {
  SpeechConfig,
  AudioConfig,
  SpeechRecognizer,
  ResultReason,
} from "microsoft-cognitiveservices-speech-sdk";

const SpeechRecognitionComponent = (props) => {
  const {
    isListening,
    transcript,
    recognizer,
    setIsListening,
    setTranscript,
    setRecognizer,
  } = props;

  useEffect(() => {
    // Initialize the Speech SDK

    const speechConfig = SpeechConfig.fromSubscription(
      "7d4c372990c24e7eb6bf68bff6f09ea0",
      "eastasia"
    );
    speechConfig.speechRecognitionLanguage = "bn-IN";
    const audioConfig = AudioConfig.fromDefaultMicrophoneInput();

    const speechRecognizer = new SpeechRecognizer(speechConfig, audioConfig);

    // Initialize the transcript as an empty string
    setTranscript("");

    // Event handler for recognized speech
    speechRecognizer.recognized = (s, e) => {
      if (e.result.reason === ResultReason.RecognizedSpeech) {
        // Append the recognized text to the current transcript
        setTranscript((prevTranscript) => prevTranscript + " " + e.result.text);
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

  const resetTranscript = () => {
    // Reset the transcript to an empty string
    setTranscript("");
  };
  console.log(transcript)

  return (
    <div>
      <button onClick={startListening} disabled={isListening}>
        Start Listening
      </button>
      <button onClick={stopListening} disabled={!isListening}>
        Stop Listening
      </button>
      <button onClick={resetTranscript}>Reset Transcript</button>
      <div>
        <p>Transcript: {transcript}</p>
      </div>
    </div>
  );
};

export default SpeechRecognitionComponent;
