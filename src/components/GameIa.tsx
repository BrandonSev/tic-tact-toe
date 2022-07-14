import { AnimatePresence } from "framer-motion";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Line from "./Line";
import { calculateWinner, playIaIntermediateLevel } from "../utils";

type GameIaProps = {
  setPlayIa: (value: boolean) => void;
};

function GameIa({ setPlayIa }: GameIaProps) {
  const [started, setStarted] = useState<boolean>(false);
  const [iaPlay, setIaPlay] = useState<boolean>(false);
  const [iaLevel, setIaLevel] = useState<number>(0);
  const [state, setState] = useState(Array(9).fill(""));
  const [turn, setTurn] = useState<boolean>(true);
  const [playerName, setPlayerName] = useState<{
    player1: string;
    player2: string;
  }>({ player1: "", player2: "Bot" });
  const [history, setHistory] = useState<{ player1: number; player2: number }>({
    player1: 0,
    player2: 0,
  });
  const [result, setResult] = useState<{
    state: string;
    winner: string;
    dir: string;
  }>({
    state: "",
    winner: "",
    dir: "",
  });

  const setDataOnResult = (results: {
    state: string;
    winner: string;
    dir: string;
  }) => {
    if (results.state === "win") {
      setResult({
        ...result,
        winner:
          results.winner === "x" ? playerName.player1 : playerName.player2,
        state: results.state,
        dir: results.dir,
      });
      setHistory({
        player1: results.winner === "x" ? history.player1 + 1 : history.player1,
        player2: results.winner === "o" ? history.player2 + 1 : history.player2,
      });
    }
    setTimeout(() => reinitialize(), 3000);
  };

  useEffect(() => {
    const results = calculateWinner(state);
    if (results) {
      if (!iaPlay) {
        if (results.state === "win") {
          setDataOnResult(results);
        } else if (results.state === "draw") {
          setDataOnResult(results);
        }
      } else {
        if (results.state === "win") {
          setDataOnResult(results);
        } else if (results.state === "draw") {
          setDataOnResult(results);
        }
      }
    } else {
      if (!iaPlay) {
        setTurn(false);
        setIaPlay(true);
      } else {
        setTurn(true);
        setIaPlay(false);
      }
    }
  }, [state]);

  useEffect(() => {
    if (iaPlay) {
      let squares = [...state];
      if (iaLevel === 0) {
        const countLast: number[] = squares
          .map((el, i) => (el === "" ? i : -1))
          .filter((el) => el !== -1);

        for (let i in squares) {
          let random = Math.floor(Math.random() * squares.length);
          if (
            squares[random] === "" ||
            countLast.length === 1 // Si ne reste qu'une case vide est que le random ne correspondent pas a une case de jeu vide
          ) {
            squares[random] === ""
              ? (squares[random] = "o")
              : (squares[countLast[0]] = "o");
            break;
          }
        }
      }
      if (iaLevel === 1) {
        const { newSquares, index } = playIaIntermediateLevel(state);
        if (index) {
          squares[index] = "o";
        } else if (newSquares) {
          squares = newSquares;
        }
      }
      setState(squares);
    }
  }, [iaPlay]);

  const reinitialize = () => {
    setState(Array(9).fill(""));
    setResult({ state: "", winner: "", dir: "" });
  };

  // Gere le comportement lors du click sur un carré de jeu
  const handleClickCase = (index: number) => {
    const squares = [...state];
    if (squares[index] !== "" || result.state !== "" || !turn) return;
    squares[index] = "x";
    setState(squares);
  };

  return (
    <>
      <AnimatePresence>
        {!started && (
          <motion.div
            initial={{ x: "400px", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ ease: "easeInOut" }}
          >
            <h1 className="text-center text-white py-8 text-4xl sm:text-5xl">
              Qui va jouer ?
            </h1>
            <motion.form className="p-4 sm:p-6 bg-[#17235c] rounded-md relative">
              <div className="flex flex-col gap-y-6 sm:gap-y-6 text-white">
                <div className="grid grid-cols-[2,_1fr] sm:grid-cols-[70px,_1fr] gap-4 items-center">
                  <label htmlFor="name1" className="inline-block max-w-fit">
                    Joueur 1:
                  </label>
                  <input
                    type="text"
                    id="name1"
                    placeholder="Entrez votre pseudo"
                    className="p-2 text-black rounded-sm"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setPlayerName({ ...playerName, player1: e.target.value })
                    }
                    value={playerName.player1}
                  />
                </div>
                <div className="grid grid-cols-[2,_1fr] sm:grid-cols-[70px,_1fr] gap-4 items-center">
                  <label htmlFor="name1" className="inline-block max-w-fit">
                    Niveau:
                  </label>
                  <div className="flex gap-x-4">
                    <div className="flex gap-2 border-[1px] border-white/20 rounded-sm py-1 px-2">
                      <input
                        type="radio"
                        name="easy"
                        id="easy"
                        onChange={() => setIaLevel(0)}
                      />
                      <label htmlFor="easy">Facile</label>
                    </div>
                    <div className="flex gap-2 border-[1px] border-white/20 rounded-sm py-1 px-2">
                      <input
                        type="radio"
                        name="easy"
                        id="easy"
                        onChange={() => setIaLevel(1)}
                      />
                      <label htmlFor="easy">Moyen</label>
                    </div>
                    <div className="flex gap-2 border-[1px] border-white/20 rounded-sm py-1 px-2">
                      <input
                        type="radio"
                        name="easy"
                        id="easy"
                        onChange={() => setIaLevel(2)}
                      />
                      <label htmlFor="easy">Difficile</label>
                    </div>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <button
                    className="flex items-center rounded-md text-white"
                    onClick={() => setPlayIa(false)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="currentColor"
                      viewBox="0 0 16 16"
                    >
                      <path
                        fillRule="evenodd"
                        d="M12 8a.5.5 0 0 1-.5.5H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5a.5.5 0 0 1 .5.5z"
                      />
                    </svg>
                    Retour
                  </button>
                  <button
                    className="p-2 place-self-end bg-secondary rounded-md text-black"
                    onClick={() => setStarted(true)}
                  >
                    Valider
                  </button>
                </div>
              </div>
            </motion.form>
          </motion.div>
        )}
        {started && (
          <div className="relative">
            <motion.div
              initial={{ x: "400px", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ ease: "easeInOut" }}
              className="p-6 bg-[#17235c] rounded-md relative z-[2]"
            >
              <div className="flex gap-x-4 justify-between items-center text-white ">
                <div className="relative">
                  <div
                    className={`flex flex-col items-center gap-2 bg-primary place-content-center p-3 rounded-md w-[80px] h-[80px] sm:w-[100px] sm:h-[100px] text-center ${
                      turn && "border-secondary border-2"
                    }`}
                  >
                    <img
                      src="https://png.pngtree.com/png-clipart/20200224/original/pngtree-businessman-avatar-icon-flat-style-png-image_5230185.jpg"
                      alt=""
                      className="rounded-full w-[25px] sm:w-[40px]"
                      width={25}
                    />
                    <p className="text-ellipsis text-">{playerName.player1}</p>
                  </div>
                  <AnimatePresence>
                    {result.winner === playerName.player1 && (
                      <motion.div
                        className={`absolute -z-[1] top-0 left-1/2 -translate-x-1/2 text-black rounded-t-md`}
                        animate={{ top: "-21px" }}
                        initial={{ top: 0 }}
                        exit={{ top: 0 }}
                        key={Math.random()}
                      >
                        <img
                          src="/images/king.svg"
                          alt="king"
                          width={24}
                          height={24}
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
                <p>
                  {history.player1} VS {history.player2}
                </p>
                <div className="relative">
                  <div
                    className={`flex flex-col items-center gap-2 bg-primary place-content-center p-3 rounded-md w-[80px] h-[80px] sm:w-[100px] sm:h-[100px] text-center ${
                      !turn && "border-secondary border-2"
                    }`}
                  >
                    <img
                      src="https://png.pngtree.com/png-clipart/20200224/original/pngtree-businessman-avatar-icon-flat-style-png-image_5230185.jpg"
                      alt=""
                      className="rounded-full w-[25px] sm:w-[40px]"
                      width={25}
                    />
                    <p>{playerName.player2}</p>
                  </div>
                  <AnimatePresence>
                    {result.winner === playerName.player2 && (
                      <motion.div
                        className={`absolute -z-[1] top-0 left-1/2 -translate-x-1/2 text-black rounded-t-md`}
                        animate={{ top: "-21px" }}
                        initial={{ top: 0 }}
                        exit={{ top: 0 }}
                        key={Math.random()}
                      >
                        <img
                          src="/images/king.svg"
                          alt="king"
                          width={24}
                          height={24}
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
              <motion.div
                className={`grid justify-center mt-8 rounded-md overflow-hidden gap-2 grid-cols-[repeat(3,80px)] sm:grid-cols-[repeat(3,100px)] relative`}
              >
                {[...Array(9)].map((el, i) => {
                  return (
                    <motion.div
                      className={`grid place-items-center bg-[#41c5b856] h-[80px] sm:h-[100px] rounded-md text-4xl text-secondary`}
                      key={i}
                      onClick={(e: React.MouseEvent) => handleClickCase(i)}
                    >
                      {state[i]}
                    </motion.div>
                  );
                })}
                {result.state === "win" && <Line dir={result.dir} />}
              </motion.div>
              <button
                className="flex items-center mt-4 rounded-md text-white"
                onClick={() => setPlayIa(false)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                >
                  <path
                    fill-rule="evenodd"
                    d="M12 8a.5.5 0 0 1-.5.5H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5a.5.5 0 0 1 .5.5z"
                  />
                </svg>
                Retour
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}

export default GameIa;
