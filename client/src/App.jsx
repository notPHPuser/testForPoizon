import React, { useState, useEffect } from 'react';

const App = () => {
  const [text, setText] = useState('привет мама');
  const [typingSpeed, setTypingSpeed] = useState(0);
  const [errors, setErrors] = useState(0);
  const [inputText, setInputText] = useState('');
  const [correctText, setCorrectText] = useState('');
  const [startTime, setStartTime] = useState(null);

  useEffect(() => {
    const timer = setInterval(() => {
      if (startTime) {
        const time = (new Date().getTime() - startTime) / 1000;
        const wpm = inputText.length / 5 / (time / 60);
        setTypingSpeed(parseFloat(wpm.toFixed(1)));
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [inputText, startTime]);

  const handleInputChange = (event) => {
    const input = event.target.value;
    setInputText(input);

    let correct = 0;
    let errors = 0;
    for (let i = 0; i < input.length; i++) {
      if (input[i] === text[i]) {
        correct++;
      } else {
        errors++;
      }
    }
    setErrors(errors);
    setCorrectText(input.slice(0, correct));

    if (!startTime) {
      setStartTime(new Date().getTime());
    }
  };

  return (
    <div>
      <h1>Typing Speed Test</h1>
      <p>Text to type: {text}</p>
      <p>Typing speed: {typingSpeed} WPM</p>
      <p>Errors: {errors}</p>
      <input type='text' value={inputText} onChange={handleInputChange} />
      <p>
        Correct text: <span style={{ color: 'green' }}>{correctText}</span>
        <span style={{ color: 'red' }}>{inputText.slice(correctText.length)}</span>
      </p>
    </div>
  );
};

export default App;
