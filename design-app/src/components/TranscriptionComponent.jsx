import React from 'react';
import { useWhisper } from '@chengsokdara/use-whisper';

const TranscriptionComponent = () => {
  const {
    transcript,
    startRecording,
    stopRecording,
    recording,
    speaking,
    transcribing,
  } = useWhisper({
    apiKey: process.env.REACT_APP_OPENAI_API_KEY,
  });

  return (
    <div>
      <button onClick={startRecording} disabled={recording}>
        Start Recording
      </button>
      <button onClick={stopRecording} disabled={!recording}>
        Stop Recording
      </button>
      <p>{transcript.text}</p>
    </div>
  );
};

export default TranscriptionComponent;
