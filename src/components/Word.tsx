import { Fragment, useState } from 'react';
import { BsArrowRepeat } from 'react-icons/bs';
import { GrCirclePlay } from 'react-icons/gr';
// @ts-ignore
import translate from 'translate';
// @ts-ignore
import speech from 'speech-js';
// @ts-ignore
import breakString from 'break-string';
import Model from './Model';
import { japanseWords } from '../data';

const Word = () => {
  const [word, setWord] = useState('');
  const [japWord, setJapWord] = useState('');
  const [showModel, setShowModel] = useState(false);

  const translateString = async (str: string) => {
    const r = window.getSelection()?.toString();

    const translated_string = await translate(r ? r : str, {
      to: 'en',
      from: 'ja',
      engine: 'deepl',
      key: '7713eb66-aa46-c1e9-21a3-ef1a6b2bd1f8:fx',
    });

    setShowModel(true);
    str?.length === 1 ? setJapWord(r ? r : str) : setJapWord('');
    setWord(translated_string);
  };

  const speechSynthesis = (text: string) => {
    speech.synthesis(text, 'ja-JP');
  };

  const closeModal = () => {
    setShowModel(false);
  };

  return (
    <>
      <div className='mx-[300px] mt-[200px]'>
        <div className='flex flex-wrap items-center w-full '>
          {japanseWords.map((word: string, idx: number) => {
            return (
              <Fragment key={idx}>
                <GrCirclePlay
                  size={20}
                  className='mr-2 text-gray-500 rounded cursor-pointer hover:bg-blue-100'
                  onClick={() => speechSynthesis(word)}
                />
                {breakString(word, 1).map((w: string, i: number) => {
                  const res = breakString(word, 1);
                  return (
                    <Fragment key={i}>
                      <span
                        key={i}
                        className='text-2xl font-medium flex max-w-[1400px]'
                      >
                        <span onClick={() => translateString(res[i])}>{w}</span>
                      </span>
                    </Fragment>
                  );
                })}
                <BsArrowRepeat
                  size={20}
                  className='ml-1 mr-2 text-gray-500 cursor-pointer hover:bg-blue-100'
                  onClick={() => translateString(word)}
                />
              </Fragment>
            );
          })}
        </div>
        <Model
          word={word}
          japWord={japWord}
          show={showModel}
          close={closeModal}
        />
      </div>
    </>
  );
};

export default Word;
