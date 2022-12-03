import { FiEdit } from 'react-icons/fi';
// @ts-ignore
import { ReactFuri } from 'react-furi';

interface ModelProps {
  word: string;
  show: boolean;
  close: () => void;
  japWord: string;
}

export default function Modal({ word, show, close, japWord }: ModelProps) {
  const showModal = show;

  return (
    <>
      {showModal ? (
        <>
          <div className='bg-gray-300 border-4 border-gray-300 '>
            <div className='flex justify-between bg-orange-600 '>
              <h1 className='ml-2 text-white'>
                {japWord ? 'DICTIONARY ENTRY' : 'MEANING'}
              </h1>
              <h1
                className='mr-2 text-white'
                style={{ cursor: 'pointer' }}
                onClick={close}
              >
                X
              </h1>
            </div>
            <div className='mt-2 mb-2 ml-2 bg-gray-300 '>
              {japWord ? (
                <h1 className='mt-1 mb-2 '>
                  <ReactFuri word={japWord} reading='おかげ' />
                </h1>
              ) : (
                ''
              )}
              <h1 className={`${japWord} ? 'mt-2 ml-4' :''`}>{word}</h1>

              {japWord && (
                <div className='bg-blue-500  mt-3  p-2 text-white max-w-[360px] flex  rounded-lg'>
                  <FiEdit size={20} className='mr-1' />
                  <p>Create an account to add to your studylist</p>
                </div>
              )}
            </div>
          </div>
        </>
      ) : null}
    </>
  );
}
