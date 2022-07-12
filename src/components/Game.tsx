import React, { FormEvent, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { calculateWinner } from "../utils";
import { toast } from "react-toastify";
import Line from "./Line";

type GameProps = {
  setPlay: (value: boolean) => void;
};

function Game({ setPlay }: GameProps) {
  const [started, setStarted] = useState<boolean>(false);
  const [state, setState] = useState(Array(9).fill(""));
  const [turn, setTurn] = useState<boolean>(true);
  const [playerName, setPlayerName] = useState<{
    player1: string;
    player2: string;
  }>({ player1: "", player2: "" });
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

  // Lance une vérification à chaque fois qu'une case a été sélectionner par un joueur et change l'état en fonction du résultat
  useEffect(() => {
    const results = calculateWinner(state);
    if (results) {
      if (results.state === "win") {
        setResult({
          ...result,
          winner:
            results.winner === "x" ? playerName.player1 : playerName.player2,
          state: results.state,
          dir: results.dir,
        });
        setHistory({
          player1:
            results.winner === "x" ? history.player1 + 1 : history.player1,
          player2:
            results.winner === "o" ? history.player2 + 1 : history.player2,
        });
        setTimeout(() => reinitialize(), 3000);
      } else if (result.state === "draw") {
        setResult({ ...result, winner: "", state: results.state });
        setTimeout(() => reinitialize(), 3000);
      }
    }
  }, [state]);

  // Gere le comportement lors du click sur un carré de jeu
  const handleClickCase = (index: number) => {
    // Copie l'état de la grille de jeu
    const squares = [...state];
    // Si click sur un élément déjà remplis, ne rien faire
    if (squares[index] !== "" || result.state !== "") return;
    squares[index] = turn ? "x" : "o";
    const results = calculateWinner(squares);
    // Si gagnant , attendre la fin du tour / animation avant de changer de tour
    if (results) {
      setTimeout(() => setTurn(!turn), 3000);
    } else {
      setTurn(!turn);
    }
    setState(squares);
  };

  // Reinitialise la partie + ajout historique des points
  const reinitialize = () => {
    setState(Array(9).fill(""));
    setResult({ state: "", winner: "", dir: "" });
  };

  // Permet de vérifier que les deux pseudo de joueurs ne sont pas vides pour commencer la partie
  const handleSubmitFormPlayer = (e: FormEvent) => {
    e.preventDefault();
    if (playerName.player1 === "" || playerName.player2 === "") {
      return toast.error("Le nom des deux joueurs sont requis");
    }
    setStarted(true);
  };

  return (
    <AnimatePresence>
      {!started && (
        <motion.div
          initial={{ x: "400px", opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ ease: "easeInOut" }}
        >
          <h1 className="text-center text-white py-8 text-5xl">Qui va joué?</h1>
          <motion.form className="p-4 sm:p-6 bg-[#17235c] rounded-md relative">
            <div className="flex flex-col  gap-y-4 sm:gap-y-2 text-white">
              <div className="flex flex-col sm:flex-row items-center gap-4">
                <label htmlFor="name1" className="self-start sm:self-center">
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
              <div className="flex flex-col sm:flex-row items-center gap-4 h-[80px]">
                <label htmlFor="name2" className="self-start sm:self-center">
                  Joueur 2:
                </label>
                <input
                  type="text"
                  id="name2"
                  placeholder="Entrez votre pseudo"
                  className="p-2 text-black rounded-sm"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setPlayerName({ ...playerName, player2: e.target.value })
                  }
                  value={playerName.player2}
                />
              </div>
              <div className="flex justify-between items-center">
                <button
                  className="flex items-center rounded-md text-white"
                  onClick={() => setPlay(false)}
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
                <button
                  className="p-2 place-self-end bg-secondary rounded-md text-black"
                  onClick={handleSubmitFormPlayer}
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
              onClick={() => setPlay(false)}
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
  );
}

export default Game;
