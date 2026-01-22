// @ts-nocheck
"use client";

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { 
  MousePointer2, Keyboard, RotateCcw, Trophy, ArrowLeft, 
  Grid3X3, Crosshair, Hash, ChevronRight, Brain, Grid, Type 
} from 'lucide-react';

// --- Types ---
type GameState = 'menu' | 'reaction' | 'strafe' | 'sequence' | 'aim' | 'number' | 'chimp' | 'visual' | 'typing';

// --- Main Component ---
export default function GamerBench() {
  const [activeGame, setActiveGame] = useState<GameState>('menu');

  return (
    <div className="min-h-screen bg-black text-zinc-100 font-sans selection:bg-zinc-700 selection:text-white">
      {/* Header */}
      <header className="w-full py-4 px-6 flex items-center justify-between border-b border-zinc-800 bg-black sticky top-0 z-50">
        <div 
          className="flex items-center gap-3 cursor-pointer group" 
          onClick={() => setActiveGame('menu')}
        >
          <div className="w-8 h-8 bg-zinc-100 rounded-md flex items-center justify-center group-hover:bg-zinc-300 transition-colors">
            <span className="font-bold text-black text-lg">G</span>
          </div>
          <h1 className="text-lg font-bold text-zinc-100 group-hover:text-white transition-colors">GamerBench</h1>
        </div>
        <div className="text-xs font-mono text-zinc-500 border border-zinc-800 px-3 py-1 rounded-md">
          v1.2 (Final)
        </div>
      </header>

      {/* Main Content */}
      <main className="flex flex-col items-center justify-center min-h-[calc(100vh-64px)] p-4 md:p-8">
        <div className="w-full max-w-6xl">
            {activeGame === 'menu' && <Menu onSelect={setActiveGame} />}
            {activeGame !== 'menu' && (
              <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
                  {activeGame === 'reaction' && <ReactionGame onBack={() => setActiveGame('menu')} />}
                  {activeGame === 'strafe' && <StrafeGame onBack={() => setActiveGame('menu')} />}
                  {activeGame === 'aim' && <AimGame onBack={() => setActiveGame('menu')} />}
                  {activeGame === 'sequence' && <SequenceGame onBack={() => setActiveGame('menu')} />}
                  {activeGame === 'number' && <NumberMemoryGame onBack={() => setActiveGame('menu')} />}
                  {activeGame === 'chimp' && <ChimpTestGame onBack={() => setActiveGame('menu')} />}
                  {activeGame === 'visual' && <VisualMemoryGame onBack={() => setActiveGame('menu')} />}
                  {activeGame === 'typing' && <TypingGame onBack={() => setActiveGame('menu')} />}
              </div>
            )}
        </div>
      </main>
    </div>
  );
}

// --- Menu Card ---
const MenuCard = ({ game, onSelect }: { game: any, onSelect: (id: GameState) => void }) => (
  <div 
    onClick={() => onSelect(game.id as GameState)}
    className={`
      group relative bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 hover:border-zinc-600 
      rounded-xl p-6 cursor-pointer transition-all duration-200 hover:-translate-y-1 hover:shadow-xl
      ${game.colSpan || ''}
    `}
  >
    <div className="flex items-start justify-between mb-4">
        <div className={`p-3 rounded-lg ${game.iconBg} text-white`}>
          {game.icon}
        </div>
        <ChevronRight className="text-zinc-600 group-hover:text-zinc-400 transition-colors" />
    </div>
    <h2 className="text-xl font-bold text-zinc-100 mb-2">{game.title}</h2>
    <p className="text-zinc-400 text-sm leading-relaxed">
        {game.desc}
    </p>
  </div>
);

// --- Menu ---
function Menu({ onSelect }: { onSelect: (game: GameState) => void }) {
  const games = [
    {
      id: 'reaction', title: 'Reaction Test',
      desc: 'Test your visual reflexes. Click as soon as the color changes.',
      icon: <MousePointer2 size={24} />, iconBg: 'bg-red-600',
    },
    {
      id: 'strafe', title: 'Counter-Strafe',
      desc: 'FPS skill check. Hold A, then quickly switch to D on signal.',
      icon: <Keyboard size={24} />, iconBg: 'bg-emerald-600',
    },
    {
      id: 'aim', title: 'Aim Trainer',
      desc: 'Hit targets as fast as you can. Tests mouse accuracy.',
      icon: <Crosshair size={24} />, iconBg: 'bg-blue-600',
    },
    {
      id: 'typing', title: 'Typing Test',
      desc: 'Measure your WPM (Words Per Minute) and accuracy.',
      icon: <Type size={24} />, iconBg: 'bg-slate-600',
      colSpan: 'md:col-span-1 lg:col-span-1'
    },
    {
      id: 'chimp', title: 'Chimp Test',
      desc: 'Are you smarter than a monkey? Click numbers in order.',
      icon: <Brain size={24} />, iconBg: 'bg-orange-600',
      colSpan: 'md:col-span-1 lg:col-span-1'
    },
    {
      id: 'visual', title: 'Visual Memory',
      desc: 'Remember the pattern of tiles that light up.',
      icon: <Grid size={24} />, iconBg: 'bg-pink-600',
      colSpan: 'md:col-span-1'
    },
    {
      id: 'sequence', title: 'Sequence Memory',
      desc: 'Memorize the order of the flashing buttons.',
      icon: <Grid3X3 size={24} />, iconBg: 'bg-yellow-600',
    },
    {
        id: 'number', title: 'Number Memory',
        desc: 'Remember the longest number you can.',
        icon: <Hash size={24} />, iconBg: 'bg-violet-600',
        colSpan: 'md:col-span-2'
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {games.map(game => <MenuCard key={game.id} game={game} onSelect={onSelect} />)}
    </div>
  );
}

// --- Game Container ---
const GameContainer = ({ children, onBack }: { children: React.ReactNode, onBack: () => void }) => (
    <div className="w-full max-w-3xl mx-auto flex flex-col">
        <button 
          onClick={onBack}
          className="self-start mb-4 flex items-center gap-2 text-zinc-500 hover:text-zinc-300 transition-colors text-sm font-medium"
        >
          <ArrowLeft size={16} /> Back to Menu
        </button>
        <div className="w-full bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden shadow-lg min-h-[400px]">
            {children}
        </div>
    </div>
);

// ==========================================
// GAMES
// ==========================================

// --- 1. Reaction Test ---
function ReactionGame({ onBack }: { onBack: () => void }) {
  const [state, setState] = useState<'waiting' | 'ready' | 'clicked' | 'early' | 'result'>('waiting');
  const [score, setScore] = useState<number>(0);
  const timer = useRef<any>(null);
  const startT = useRef<number>(0);

  const handleAction = () => {
    if (state === 'waiting') {
        setState('ready');
        const ms = Math.random() * 2000 + 1500;
        timer.current = setTimeout(() => {
          setState('clicked');
          startT.current = Date.now();
        }, ms);
    } else if (state === 'ready') {
      if (timer.current) clearTimeout(timer.current);
      setState('early');
    } else if (state === 'clicked') {
      setScore(Date.now() - startT.current);
      setState('result');
    } else {
      setState('waiting');
    }
  };

  let bg = 'bg-zinc-900';
  let txt = 'Click to Start';
  let sub = 'When red turns green, click.';
  if (state === 'ready') { bg = 'bg-red-700'; txt = 'Wait for Green...'; sub = ''; }
  if (state === 'clicked') { bg = 'bg-emerald-500'; txt = 'CLICK!'; sub = ''; }
  if (state === 'early') { bg = 'bg-zinc-900'; txt = 'Too Early!'; sub = 'Click to retry'; }
  if (state === 'result') { bg = 'bg-zinc-900'; txt = `${score} ms`; sub = 'Click to try again'; }

  return (
    <GameContainer onBack={onBack}>
      <div onMouseDown={handleAction} className={`w-full h-[400px] flex flex-col items-center justify-center cursor-pointer select-none ${bg} transition-colors duration-100`}>
        {state === 'result' && <Trophy className="w-16 h-16 text-yellow-500 mb-4" />}
        <h1 className="text-5xl font-bold text-white mb-4">{txt}</h1>
        <p className="text-zinc-300 text-lg">{sub}</p>
      </div>
    </GameContainer>
  );
}

// --- 2. Counter-Strafe ---
function StrafeGame({ onBack }: { onBack: () => void }) {
  const [state, setState] = useState<'idle' | 'holding' | 'go' | 'result' | 'failed'>('idle');
  const [score, setScore] = useState(0);
  const [msg, setMsg] = useState("Hold 'A' to start");
  
  const stateRef = useRef(state);
  const timerRef = useRef<any>(null);
  const startTRef = useRef(0);

  useEffect(() => { stateRef.current = state; }, [state]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.repeat) return;
      const key = e.key.toLowerCase();
      const current = stateRef.current;

      if (key === 'a') {
        if (current === 'idle' || current === 'result' || current === 'failed') {
          setState('holding');
          setMsg("Wait...");
          const delay = Math.random() * 2000 + 1000;
          timerRef.current = setTimeout(() => {
             setState('go');
             setMsg("PRESS D!");
             startTRef.current = Date.now();
          }, delay);
        }
      } else if (key === 'd') {
        if (current === 'go') {
           const time = Date.now() - startTRef.current;
           setScore(time);
           setState('result');
           setMsg(`${time} ms`);
        } else if (current === 'holding') {
           if (timerRef.current) clearTimeout(timerRef.current);
           setState('failed');
           setMsg("Too Early!");
        }
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === 'a' && stateRef.current === 'holding') {
         if (timerRef.current) clearTimeout(timerRef.current);
         setState('failed');
         setMsg("Released A too soon!");
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  let keyAClass = 'border-zinc-700 text-zinc-600';
  let keyDClass = 'border-zinc-700 text-zinc-600';
  let titleClass = 'text-white';

  if (state === 'holding') keyAClass = 'bg-zinc-100 text-black border-zinc-100';
  if (state === 'go') {
      keyAClass = 'border-zinc-700 text-zinc-600';
      keyDClass = 'bg-emerald-500 text-white border-emerald-500';
      titleClass = 'text-emerald-500';
  }
  if (state === 'failed') titleClass = 'text-red-500';
  if (state === 'result') keyDClass = 'bg-emerald-500 text-white border-emerald-500';

  return (
    <GameContainer onBack={onBack}>
      <div className="w-full h-[400px] flex flex-col items-center justify-center bg-zinc-900">
        <div className="flex gap-8 mb-12">
           <div className={`w-24 h-24 rounded-xl border-4 flex items-center justify-center text-4xl font-bold transition-all duration-75 ${keyAClass}`}>A</div>
           <div className={`w-24 h-24 rounded-xl border-4 flex items-center justify-center text-4xl font-bold transition-all duration-75 ${keyDClass}`}>D</div>
        </div>
        <h1 className={`text-5xl font-bold ${titleClass}`}>{msg}</h1>
      </div>
    </GameContainer>
  );
}

// --- 3. Aim Trainer ---
function AimGame({ onBack }: { onBack: () => void }) {
  const [playing, setPlaying] = useState(false);
  const [finished, setFinished] = useState(false);
  const [targetsLeft, setTargetsLeft] = useState(30);
  const [startTime, setStartTime] = useState(0);
  const [resultTime, setResultTime] = useState(0);
  const [pos, setPos] = useState({ top: '50%', left: '50%' });

  const startGame = () => {
    setPlaying(true); setFinished(false); setTargetsLeft(30); setStartTime(Date.now()); moveTarget();
  };
  const moveTarget = () => {
    setPos({ top: `${Math.random() * 85 + 5}%`, left: `${Math.random() * 85 + 5}%` });
  };
  const hitTarget = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (targetsLeft <= 1) {
      setFinished(true); setPlaying(false); setResultTime(Date.now() - startTime);
    } else {
      setTargetsLeft(p => p - 1); moveTarget();
    }
  };

  return (
    <GameContainer onBack={onBack}>
      <div className="relative w-full h-[500px] bg-zinc-900 cursor-crosshair select-none overflow-hidden group">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        {!playing && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/80 z-20">
             {finished ? (
               <>
                 <div className="text-zinc-500 text-sm uppercase tracking-widest mb-2">Average Time per Target</div>
                 <p className="text-6xl font-bold text-white mb-8">{(resultTime / 30).toFixed(0)}<span className="text-2xl text-zinc-500 ml-2">ms</span></p>
                 <button onClick={startGame} className="px-8 py-3 bg-zinc-700 hover:bg-zinc-600 text-white rounded-md font-bold">Try Again</button>
               </>
             ) : (
               <>
                 <Crosshair size={48} className="text-blue-500 mb-4" />
                 <h2 className="text-3xl font-bold text-white mb-2">Aim Trainer</h2>
                 <p className="text-zinc-400 mb-8">Hit 30 targets quickly.</p>
                 <button onClick={startGame} className="px-8 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-md font-bold">Start</button>
               </>
             )}
          </div>
        )}
        {playing && (
          <>
            <div className="absolute top-4 left-4 text-zinc-500 font-mono text-xl z-10">Remaining: <span className="text-white">{targetsLeft}</span></div>
            <div onMouseDown={hitTarget} style={{ top: pos.top, left: pos.left }} className="absolute w-24 h-24 -ml-12 -mt-12 flex items-center justify-center cursor-pointer">
               <div className="w-10 h-10 rounded-full bg-blue-500 border-2 border-white hover:bg-blue-400 transition-colors shadow-[0_0_15px_rgba(59,130,246,0.5)]"></div>
            </div>
          </>
        )}
      </div>
    </GameContainer>
  );
}

// --- 4. Chimp Test ---
function ChimpTestGame({ onBack }: { onBack: () => void }) {
    const [level, setLevel] = useState(4);
    const [gameState, setGameState] = useState<'start' | 'playing' | 'result'>('start');
    const [numbers, setNumbers] = useState<{id: number, val: number, x: number, y: number}[]>([]);
    const [nextNum, setNextNum] = useState(1);
    const [hideNumbers, setHideNumbers] = useState(false);

    const startGame = () => { setLevel(4); startLevel(4); };
    
    const startLevel = (lvl: number) => {
        setGameState('playing'); setNextNum(1); setHideNumbers(false);
        const nums = [];
        const positions = new Set();
        for (let i = 1; i <= lvl; i++) {
            let pos;
            do { pos = Math.floor(Math.random() * 40); } while (positions.has(pos));
            positions.add(pos);
            nums.push({ id: i, val: i, x: pos % 8, y: Math.floor(pos / 8) });
        }
        setNumbers(nums);
    };

    const handleClick = (num: number) => {
        if (num === nextNum) {
            if (num === 1) setHideNumbers(true);
            setNextNum(n => n + 1);
            if (num === level) { setLevel(l => l + 1); startLevel(level + 1); }
        } else {
            setGameState('result');
        }
    };

    return (
        <GameContainer onBack={onBack}>
            <div className="w-full min-h-[500px] flex flex-col items-center justify-center p-4">
                {gameState === 'start' && (
                    <div className="text-center">
                        <Brain size={64} className="text-orange-500 mb-4 mx-auto" />
                        <h2 className="text-3xl font-bold text-white mb-2">Chimp Test</h2>
                        <button onClick={startGame} className="px-8 py-3 bg-orange-600 hover:bg-orange-500 text-white rounded-md font-bold">Start</button>
                    </div>
                )}
                {gameState === 'playing' && (
                    <div className="grid grid-cols-8 gap-2 md:gap-4 w-full max-w-2xl mx-auto aspect-[8/5]">
                        {[...Array(40)].map((_, i) => {
                            const item = numbers.find(n => n.x === i % 8 && n.y === Math.floor(i / 8));
                            if (!item || item.val < nextNum) return <div key={i}></div>;
                            return (
                                <div key={i} onMouseDown={() => handleClick(item.val)} className={`w-full h-full rounded-md border-2 border-zinc-700 flex items-center justify-center text-2xl font-bold cursor-pointer select-none ${hideNumbers ? 'bg-white hover:bg-zinc-200 text-transparent' : 'bg-transparent text-white hover:bg-zinc-800'}`}>{item.val}</div>
                            );
                        })}
                    </div>
                )}
                {gameState === 'result' && (
                    <div className="text-center">
                         <h2 className="text-4xl font-bold text-red-500 mb-2">Game Over</h2>
                         <p className="text-2xl text-white mb-8">Score: {level}</p>
                         <button onClick={startGame} className="px-8 py-3 bg-zinc-700 hover:bg-zinc-600 text-white rounded-md font-bold">Try Again</button>
                    </div>
                )}
            </div>
        </GameContainer>
    );
}

// --- 5. Visual Memory ---
function VisualMemoryGame({ onBack }: { onBack: () => void }) {
    const [level, setLevel] = useState(1);
    const [lives, setLives] = useState(3);
    const [gridSize, setGridSize] = useState(3);
    const [gameState, setGameState] = useState<'start' | 'watch' | 'play' | 'over'>('start');
    const [pattern, setPattern] = useState<number[]>([]);
    const [selected, setSelected] = useState<number[]>([]);
    const [wrong, setWrong] = useState<number[]>([]);

    const startGame = () => { setLevel(1); setLives(3); setGridSize(3); startLevel(1, 3); };

    const startLevel = (lvl: number, size: number) => {
        setGameState('watch'); setSelected([]); setWrong([]);
        const tileCount = Math.min(Math.floor(lvl / 2) + 2, size * size - 1);
        const newPattern = new Set<number>();
        while(newPattern.size < tileCount) newPattern.add(Math.floor(Math.random() * (size * size)));
        setPattern(Array.from(newPattern));
        setTimeout(() => setGameState('play'), 1500);
    };

    const handleTileClick = (index: number) => {
        if (gameState !== 'play') return;
        if (selected.includes(index) || wrong.includes(index)) return;

        if (pattern.includes(index)) {
            const newSelected = [...selected, index];
            setSelected(newSelected);
            if (newSelected.length === pattern.length) {
                setTimeout(() => {
                    const nextLvl = level + 1;
                    const nextSize = nextLvl >= 3 ? 4 : nextLvl >= 6 ? 5 : 3;
                    setLevel(nextLvl); setGridSize(nextSize); startLevel(nextLvl, nextSize);
                }, 500);
            }
        } else {
            setWrong([...wrong, index]);
            const newLives = lives - 1; setLives(newLives);
            if (newLives <= 0) setGameState('over');
        }
    };

    return (
        <GameContainer onBack={onBack}>
            <div className="w-full min-h-[500px] flex flex-col items-center justify-center p-6">
                <div className="mb-6 flex gap-8 text-xl font-bold">
                    <div>Level: <span className="text-white">{level}</span></div>
                    <div>Lives: <span className="text-red-500">{lives}</span></div>
                </div>
                {gameState === 'start' && (
                     <div className="text-center absolute inset-0 bg-zinc-900 z-10 flex flex-col items-center justify-center">
                        <Grid size={64} className="text-pink-500 mb-4" />
                        <h2 className="text-3xl font-bold text-white mb-4">Visual Memory</h2>
                        <button onClick={startGame} className="px-8 py-3 bg-pink-600 hover:bg-pink-500 text-white rounded-md font-bold">Start</button>
                     </div>
                )}
                {gameState === 'over' && (
                     <div className="text-center absolute inset-0 bg-zinc-900 z-10 flex flex-col items-center justify-center">
                        <h2 className="text-4xl font-bold text-white mb-2">Game Over</h2>
                        <p className="text-zinc-400 mb-6">Level {level}</p>
                        <button onClick={startGame} className="px-8 py-3 bg-zinc-700 hover:bg-zinc-600 text-white rounded-md font-bold">Try Again</button>
                     </div>
                )}
                <div className="grid gap-2 bg-zinc-900" style={{ gridTemplateColumns: `repeat(${gridSize}, 1fr)`, width: 'min(100%, 400px)', aspectRatio: '1/1' }}>
                    {[...Array(gridSize * gridSize)].map((_, i) => {
                        let statusClass = 'bg-zinc-800 hover:bg-zinc-700';
                        if (gameState === 'watch' && pattern.includes(i)) statusClass = 'bg-white';
                        if (selected.includes(i)) statusClass = 'bg-pink-500';
                        if (wrong.includes(i)) statusClass = 'bg-zinc-900 border border-zinc-700 opacity-50';
                        return <div key={i} onMouseDown={() => handleTileClick(i)} className={`rounded-lg cursor-pointer transition-colors duration-200 ${statusClass}`} />;
                    })}
                </div>
            </div>
        </GameContainer>
    );
}

// --- 6. Sequence Memory ---
function SequenceGame({ onBack }: { onBack: () => void }) {
  const [sequence, setSequence] = useState<number[]>([]);
  const [userSeq, setUserSeq] = useState<number[]>([]);
  const [level, setLevel] = useState(1);
  const [playing, setPlaying] = useState(false);
  const [showing, setShowing] = useState(false);
  const [activeTile, setActiveTile] = useState<number | null>(null);
  const [gameOver, setGameOver] = useState(false);
  const isMounted = useRef(true);

  useEffect(() => {
      isMounted.current = true; return () => { isMounted.current = false; };
  }, []);

  const startGame = () => { setSequence([]); setUserSeq([]); setLevel(1); setGameOver(false); setPlaying(true); setTimeout(() => nextLevel([]), 500); };

  const nextLevel = useCallback((currentSeq: number[]) => {
    if (!isMounted.current) return;
    const next = [...currentSeq, Math.floor(Math.random() * 9)];
    setSequence(next); setUserSeq([]); setShowing(true);
    let i = 0;
    const interval = setInterval(() => {
      if (!isMounted.current || i >= next.length) {
        clearInterval(interval); if (isMounted.current) { setShowing(false); setActiveTile(null); } return;
      }
      setActiveTile(next[i]); setTimeout(() => { if (isMounted.current) setActiveTile(null); }, 400); i++;
    }, 800);
  }, []);

  const handleTileClick = (index: number) => {
    if (!playing || showing || gameOver) return;
    setActiveTile(index); setTimeout(() => setActiveTile(null), 200);
    const nextUserSeq = [...userSeq, index];
    setUserSeq(nextUserSeq);
    if (nextUserSeq[nextUserSeq.length - 1] !== sequence[nextUserSeq.length - 1]) { setGameOver(true); setPlaying(false); return; }
    if (nextUserSeq.length === sequence.length) { setLevel(p => p + 1); setTimeout(() => nextLevel(sequence), 1000); }
  };

  return (
    <GameContainer onBack={onBack}>
      <div className="w-full py-12 flex flex-col items-center justify-center">
        <div className="mb-8 text-center"><h2 className="text-2xl font-bold text-zinc-200 mb-1">Level: <span className="text-white">{level}</span></h2>{gameOver && <p className="text-red-500 text-lg font-bold">Game Over</p>}</div>
        <div className="grid grid-cols-3 gap-3 p-4 bg-zinc-900 rounded-xl">{[...Array(9)].map((_, i) => (<div key={i} onClick={() => handleTileClick(i)} className={`w-24 h-24 rounded-lg cursor-pointer transition-colors duration-100 border border-zinc-800 ${activeTile === i ? 'bg-white' : 'bg-zinc-800 hover:bg-zinc-700'} ${(showing || gameOver) ? 'pointer-events-none' : ''}`} />))}</div>
        {!playing && (<button onClick={startGame} className="mt-8 px-8 py-3 bg-zinc-100 text-black rounded-md font-bold hover:bg-white transition">{gameOver ? 'Try Again' : 'Start'}</button>)}
      </div>
    </GameContainer>
  );
}

// --- 7. Number Memory ---
function NumberMemoryGame({ onBack }: { onBack: () => void }) {
    const [level, setLevel] = useState(1);
    const [number, setNumber] = useState('');
    const [input, setInput] = useState('');
    const [phase, setPhase] = useState<'start' | 'showing' | 'inputting' | 'result'>('start');
    const [result, setResult] = useState<'correct' | 'wrong' | null>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    const generateNumber = (digits: number) => {
        let num = ''; for (let i = 0; i < digits; i++) num += Math.floor(Math.random() * 10).toString(); return num;
    };
    const startGame = () => { setLevel(1); startLevel(1); };
    const startLevel = (lvl: number) => {
        const newNumber = generateNumber(lvl); setNumber(newNumber); setInput(''); setResult(null); setPhase('showing');
        setTimeout(() => { setPhase('inputting'); setTimeout(() => inputRef.current?.focus(), 50); }, 2000 + (lvl * 300));
    };
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (input === number) { setResult('correct'); setTimeout(() => { setLevel(l => l + 1); startLevel(level + 1); }, 1000); } else { setResult('wrong'); setPhase('result'); }
    };

    return (
        <GameContainer onBack={onBack}>
            <div className="w-full py-12 px-4 flex flex-col items-center justify-center text-center min-h-[400px]">
                {phase === 'start' && (<> <Hash size={48} className="text-violet-500 mb-4" /> <h2 className="text-3xl font-bold text-white mb-4">Number Memory</h2> <button onClick={startGame} className="px-8 py-3 bg-violet-600 hover:bg-violet-500 text-white rounded-md font-bold">Start</button> </>)}
                {phase === 'showing' && (<div className="flex flex-col items-center"> <h2 className="text-6xl font-bold text-white font-mono tracking-widest mb-8">{number}</h2> <div className="w-64 h-1 bg-zinc-800 rounded-full overflow-hidden"> <div className="h-full bg-violet-500 transition-all ease-linear" style={{ width: '0%', transitionDuration: `${2000 + (level * 300)}ms` }} ref={el => setTimeout(() => { if (el) el.style.width = '100%' }, 10)} /> </div> </div>)}
                {phase === 'inputting' && result === null && (<form onSubmit={handleSubmit} className="w-full max-w-sm"> <p className="text-zinc-400 text-lg mb-4">What was the number?</p> <input ref={inputRef} type="text" pattern="[0-9]*" value={input} onChange={(e) => setInput(e.target.value.replace(/[^0-9]/g, ''))} className="w-full bg-black border border-zinc-700 rounded-md px-4 py-3 text-3xl font-bold text-white text-center focus:outline-none focus:border-violet-500 font-mono" autoComplete="off" /> <button type="submit" className="mt-6 w-full px-6 py-3 bg-violet-600 hover:bg-violet-500 text-white rounded-md font-bold">Submit</button> </form>)}
                {phase === 'result' && result === 'wrong' && (<div> <h2 className="text-2xl font-bold text-white mb-6">Game Over</h2> <div className="flex flex-col gap-4 mb-8 text-left bg-zinc-950 p-6 rounded-md border border-zinc-800"> <div><p className="text-zinc-500 text-xs uppercase">Correct</p><p className="text-xl font-bold text-emerald-500 font-mono">{number}</p></div> <div><p className="text-zinc-500 text-xs uppercase">You Typed</p><p className="text-xl font-bold text-red-500 font-mono line-through">{input}</p></div> </div> <button onClick={startGame} className="px-8 py-3 bg-zinc-700 hover:bg-zinc-600 text-white rounded-md font-bold">Try Again</button> </div>)}
                {result === 'correct' && <h2 className="text-2xl font-bold text-emerald-500">Correct!</h2>}
            </div>
        </GameContainer>
    );
}

// --- 8. Typing Test ---
function TypingGame({ onBack }: { onBack: () => void }) {
    const textSamples = [
        "The quick brown fox jumps over the lazy dog.",
        "Pack my box with five dozen liquor jugs.",
        "Sphinx of black quartz, judge my vow.",
        "To be or not to be, that is the question.",
        "A wizard's job is to vex chumps quickly in fog.",
        "GamerBench is the ultimate tool for testing your skills.",
        "Practice makes perfect, so keep typing every day."
    ];
    
    const [gameState, setGameState] = useState<'start' | 'playing' | 'result'>('start');
    const [targetText, setTargetText] = useState("");
    const [input, setInput] = useState("");
    const [startTime, setStartTime] = useState(0);
    const [wpm, setWpm] = useState(0);
    const [accuracy, setAccuracy] = useState(0);
    const inputRef = useRef<HTMLInputElement>(null);

    const startGame = () => {
        const randomText = textSamples[Math.floor(Math.random() * textSamples.length)];
        setTargetText(randomText);
        setInput("");
        setGameState('playing');
        setStartTime(0);
        setTimeout(() => inputRef.current?.focus(), 100);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value;
        if (startTime === 0 && val.length > 0) setStartTime(Date.now());
        setInput(val);

        if (val === targetText) {
            // Finished
            const timeMin = (Date.now() - startTime) / 60000;
            const words = targetText.length / 5;
            setWpm(Math.round(words / (timeMin || 0.01))); 
            setAccuracy(100); 
            setGameState('result');
        } else if (val.length >= targetText.length) {
            // Finished but with errors
            const timeMin = (Date.now() - startTime) / 60000;
            const words = targetText.length / 5;
            setWpm(Math.round(words / (timeMin || 0.01)));
            let correct = 0;
            for(let i=0; i<targetText.length; i++) {
                if(val[i] === targetText[i]) correct++;
            }
            setAccuracy(Math.round((correct / targetText.length) * 100));
            setGameState('result');
        }
    };

    const handleContainerClick = () => inputRef.current?.focus();

    return (
        <GameContainer onBack={onBack}>
             <div onClick={handleContainerClick} className="w-full min-h-[400px] flex flex-col items-center justify-center p-8 cursor-text">
                {gameState === 'start' && (
                     <div className="text-center">
                        <Type size={64} className="text-slate-500 mb-4 mx-auto" />
                        <h2 className="text-3xl font-bold text-white mb-4">Typing Test</h2>
                        <p className="text-zinc-400 mb-8">Type the sentence as fast as you can.</p>
                        <button onClick={startGame} className="px-8 py-3 bg-slate-700 hover:bg-slate-600 text-white rounded-md font-bold">Start Test</button>
                     </div>
                )}

                {gameState === 'playing' && (
                    <div className="w-full max-w-2xl">
                        <div className="text-2xl md:text-3xl font-mono leading-relaxed tracking-wide text-zinc-600 break-words mb-8 relative">
                            {targetText.split('').map((char, i) => {
                                let colorClass = "text-zinc-600";
                                let bgClass = "";
                                if (i < input.length) {
                                    if (input[i] === char) {
                                        colorClass = "text-emerald-500";
                                    } else {
                                        colorClass = "text-red-500 bg-red-500/10";
                                    }
                                }
                                if (i === input.length) bgClass = "bg-slate-500 animate-pulse text-slate-900"; 
                                return <span key={i} className={`${colorClass} ${bgClass} rounded-sm px-[1px]`}>{char}</span>;
                            })}
                        </div>
                        <input 
                            ref={inputRef}
                            type="text" 
                            value={input} 
                            onChange={handleChange}
                            className="opacity-0 absolute top-0 left-0 w-0 h-0"
                            autoComplete="off"
                        />
                         <p className="text-center text-zinc-500 text-sm mt-8">Start typing...</p>
                    </div>
                )}

                {gameState === 'result' && (
                    <div className="text-center animate-in fade-in zoom-in duration-300">
                         <h2 className="text-4xl font-bold text-white mb-2">Result</h2>
                         <div className="flex gap-8 justify-center my-8">
                            <div className="text-center">
                                <p className="text-6xl font-bold text-emerald-500">{wpm}</p>
                                <p className="text-zinc-500 uppercase text-sm tracking-widest mt-2">WPM</p>
                            </div>
                            <div className="text-center">
                                <p className="text-6xl font-bold text-blue-500">{accuracy}%</p>
                                <p className="text-zinc-500 uppercase text-sm tracking-widest mt-2">Accuracy</p>
                            </div>
                         </div>
                         <button onClick={startGame} className="px-8 py-3 bg-slate-700 hover:bg-slate-600 text-white rounded-md font-bold">Try Again</button>
                    </div>
                )}
             </div>
        </GameContainer>
    );
}