import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setInput, incrementErrors, setWPM, setStartTime, reset } from '../store/typingSlice';
import styled from 'styled-components';

// Массив русских слов
const russianWords = ['мама', 'папа', 'сын', 'дочь', 'бабушка', 'кот', 'собака'];

// Выбираем 10 случайных слов из массива
const randomWords = russianWords.sort(() => Math.random() - 0.5).slice(0, 10);

// Объединяем слова в строку
const TEXT = randomWords.join(' ');

const TypingTest = () => {
  const dispatch = useDispatch();
  const { input, errors, wpm, startTime } = useSelector((state) => state.typing);

  useEffect(() => {
    if (input.length === 0) {
      dispatch(reset());
    }
    if (startTime) {
      const elapsedTime = (new Date() - startTime) / 1000; // Время в секундах
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

    // Проверка на ошибки
    if (value[value.length - 1] !== TEXT[input.length]) {
      dispatch(incrementErrors());
    }
  };

  const Main = styled.div`
    width: 100%;
    // display: flex;
    height: 100vh;
    // flex-direction: colomn;
    align-items: center;
    text-align: center;
  `;

  return (
    <div>
      <h1>Тест на скорость печати</h1>
      {/* <p style={{ color: 'grey' }}>{TEXT}</p> */}

      <div>
        <h2>Подсветка:</h2>
        {TEXT.split('').map((char, index) => (
          <span
            key={index}
            style={{
              color: index < input.length ? (input[index] === char ? 'green' : 'red') : 'black',
            }}
          >
            {char}
          </span>
        ))}
      </div>
      <input type='text' value={input} onChange={handleInputChange} />
      {input.length === TEXT.length && (
        <div>
          <h2>Результаты:</h2>
          <p>Ошибки: {errors}</p>
          <p>Скорость печати (WPM): {wpm}</p>
        </div>
      )}
    </div>
  );
};

export default TypingTest;
