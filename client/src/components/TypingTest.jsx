import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setInput, incrementErrors, setWPM, setStartTime, reset } from '../store/typingSlice';
import s from './TypingTest.module.css';
import { RefreshCcw } from 'lucide-react';

const generateText = () => {
  const russianWords = ['мама', 'папа', 'сын', 'дочь', 'бабушка', 'кот', 'собака'];
  const randomWords = russianWords.sort(() => Math.random() - 0.5).slice(0, 10);
  return randomWords.join(' ');
};

const TypingTest = () => {
  const dispatch = useDispatch();
  const { input, errors, wpm, startTime } = useSelector((state) => state.typing);
  const [text, setText] = useState(generateText());

  useEffect(() => {
    if (input.length === 0) {
      dispatch(reset());
    }
    if (startTime) {
      const elapsedTime = (new Date() - startTime) / 1000;
      const wordsTyped = input.split(' ').length;
      const wpmValue = Math.round((wordsTyped / elapsedTime) * 60);
      dispatch(setWPM(wpmValue));
    }
  }, [input, dispatch, startTime]);

  const handleInputChange = (e) => {
    const value = e.target.value;
    dispatch(setInput(value));

    if (!startTime) {
      dispatch(setStartTime(new Date()));
    }

    if (value[value.length - 1] !== text[input.length]) {
      dispatch(incrementErrors());
    }
  };

  const reload = () => {
    setText(generateText());
    dispatch(reset());
  };

  return (
    <div className={s.all}>
      <h1 className={s.test}>Тест на скорость печати</h1>
      {/* <p style={{ color: 'grey' }}>{text}</p> */}

      <div className={s.type}>
        <h2 className={s.s}>Текст:</h2>
        {text.split('').map((char, index) => (
          <span
            className={s.text}
            key={index}
            style={{
              color: index < input.length ? (input[index] === char ? 'green' : 'red') : 'white  ',
            }}
          >
            {char}
          </span>
        ))}
        <button className={s.reload} onClick={reload}>
          <RefreshCcw />
        </button>
      </div>
      <input className={s.input} type='text' value={input} onChange={handleInputChange} />

      {input.length === text.length && (
        <div className={s.result}>
          <h2>Результаты:</h2>
          <p>Ошибки: {errors}</p>
          <p>Скорость печати (WPM): {wpm}</p>
        </div>
      )}
    </div>
  );
};

export default TypingTest;
