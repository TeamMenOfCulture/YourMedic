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
    STYLES,
    setText,
    setSpeak
  } = props;

  useEffect(() => {
    // Initialize the Speech SDK

    const speechConfig = SpeechConfig.fromSubscription(
      "7d4c372990c24e7eb6bf68bff6f09ea0",
      "eastasia"
    );
    speechConfig.speechRecognitionLanguage = "hi-IN";
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

  return (
    <div class="mainarea">
      <textarea
        rows={4}
        type="text"
        style={STYLES.text}
        value={transcript}
        onChange={(e) => setText(e.target.value.substring(0, 200))}
      />
      <div>
        <button
          onClick={startListening}
          class="startButton"
          disabled={isListening}
        >
          TALK
        </button>
      </div>
      <div>
        <button
          onClick={async () => {
            await stopListening();
            await setSpeak();
        
          }}
          class="sendButton"
          disabled={!isListening}
        >
          SEND
        </button>
      </div>
      
    </div>
  );
};

export default SpeechRecognitionComponent;
