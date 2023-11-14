import React, { useEffect, useState } from 'react';
import OptionsSelection from './OptionsSelection';
import BingoCard from './BingoCard';
import LeaderBoard from './LeaderBoard';

const App = () => {
  //const backend_url = 'http://localhost:3001';
  const backend_url = 'https://bingo-backend-0d1a9bd0a890.herokuapp.com';

  const [username, setUsername] = useState('');
  const [leaderboard, setLeaderboard] = useState([]);
  const [bingoOptions, setBingoOptions] = useState([]);
  const [bingoEncoding, setBingoEncoding] = useState(Array(9).fill(''));
  const [showRules, setShowRules] = useState(false);

  const isSubmittable = bingoEncoding.every(tile => tile !== '') && username !== '';

  useEffect(() => {
    try {
      fetch(`${backend_url}/recent`)
        .then(res => res.json())
        .then(data => {
          console.log({ data })
          setLeaderboard([...data.data]);
        });
    } catch (e) {
      console.log(e);
    }

    try {
      fetch(`${backend_url}/options`)
        .then(res => res.json())
        .then(data => {
          console.log({ data })
          setBingoOptions(data)
        });
    } catch (e) {
      console.log(e);
    }
  }, []);

  const handleOptionClicked = (option) => {
    // add option to *random* empty spot in bingoEncoding
    // if no empty spots, do nothing

    console.log({ option, bingoEncoding });

    let emptyIndexes = [];

    for (let i = 0; i < bingoEncoding.length; i++) {
      if (bingoEncoding[i] === '') {
        emptyIndexes.push(i);
      }
    }

    if (emptyIndexes.length === 0) {
      return;
    }

    const randomIndex = emptyIndexes[Math.floor(Math.random() * emptyIndexes.length)];

    let newBingoEncoding = [...bingoEncoding];

    newBingoEncoding[randomIndex] = option.card_value;

    setBingoEncoding(newBingoEncoding);
  }

  const handleTileRemoved = (index) => {
    let newBingoEncoding = [...bingoEncoding];
    newBingoEncoding[index] = '';
    setBingoEncoding(newBingoEncoding);
  }

  const submit = async () => {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: username,
        bingoEncoding: bingoEncoding
      })
    };

    try {
      const response = await fetch(`${backend_url}/submit`, requestOptions);
      const data = await response.json();
      console.log({ data });

      setBingoEncoding(Array(9).fill(''));
      setLeaderboard([username, ...leaderboard]);
      setUsername('');
      setBingoOptions([]);
    } catch (e) {
      console.log(e);
    }
  };


  return (
    <div className="bg-black text-white min-h-screen">

      <div className='container mx-auto p-4 grid grid-cols-12 gap-4'>
        {/* Title Bar */}
        <div className='col-span-12'>
          <h1 className='text-5xl font-bold text-center'>
            Modern Horizons 3 Bingo
          </h1>
        </div>

        {/* Bingo Options */}
        <div className='col-span-3'>
          <div className='text-xl font-bold text-gray-200 m-2 p-2'
          >Click to add, scroll for more: </div>
          <div className='max-h-96 overflow-y-auto'>
            <OptionsSelection options={bingoOptions} onSelect={handleOptionClicked} />
          </div>
        </div>

        {/* Bingo Board */}
        <div className='col-span-6'>
          <BingoCard bingoEncoding={bingoEncoding} tileClicked={handleTileRemoved} />
        </div>

        {/* Leaderboard */}
        <div className='col-span-3'>
          <LeaderBoard users={leaderboard} />
        </div>

        {/* Rules (in a dropdown) */}
        <div className='col-span-12 flex flex-row justify-center w-full'>
          {showRules ? (
            <button
              className='bg-gray-800 hover:bg-gray-700 rounded-lg py-2 px-3 m-4 transition duration-300'
              onClick={() => setShowRules(false)}
            >Hide Rules</button>
          ) : (
            <button
              className='bg-gray-800 hover:bg-gray-700 rounded-lg py-2 px-3 m-4 transition duration-300'
              onClick={() => setShowRules(true)}
            >
              Show Rules
            </button>
          )}
          <input
            className='bg-gray-800 border border-gray-600 rounded py-2 px-3 text-white leading-tight focus:outline-none focus:border-pink-500 m-4'
            type='text'
            placeholder='Username'
            value={username}
            onChange={e => setUsername(e.target.value)}
          />
          <button
            className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded m-4'
            onClick={submit}
          >
            Submit!
          </button>
        </div>
      </div>
      <div className='mx-auto w-1/2'>
        {showRules && (
          <>
            <p className='m-4'>
              Who knows what overpowered madness Modern Horizons 3 will bring to Magic? Cast your bets and we'll see who's the most right.
            </p>
            <p className='m-4'>
              Here's how scoring works:
            </p>
            <ol className='m-4'>
              <li className='p-2'>- Fill up your bingo board and username!</li>
              <li className='p-2'>- Submit your board! (Before spoilers start picking up)</li>
              <li className='p-2'>- Two winners - first row completed and most pieces covered.</li>
              <li className='p-2'>- Earlier submissions will rank higher, scoring will happen EOD on spoiler days.</li>
              <li className='p-2'>- Honor System: Family Friendly and try to make one good submission (not multiple)</li>
            </ol>
          </>
        )}
      </div>
      <br />

    </div>
  );
}

export default App;
