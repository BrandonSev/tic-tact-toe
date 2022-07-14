import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import GameIa from "./components/GameIa";
import GameLocal from "./components/GameLocal";

const variants = {
  hidden: {
    opacity: 0,
  },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
      delayChildren: 0.1,
    },
  },
};

const variantsChild = {
  hidden: {
    x: 50,
    opacity: 0,
  },
  show: {
    x: 0,
    opacity: 1,
  },
};

function App() {
  const [play, setPlay] = useState<boolean>(false);
  const [playIa, setPlayIa] = useState<boolean>(false);

  return (
    <>
      <ToastContainer />
      <div className="bg-[#020b36] h-screen grid place-items-center overflow-hidden">
        <AnimatePresence>
          {!play && !playIa && (
            <div className="flex flex-col justify-center gap-10 overflow-hidden w-[280px] sm:w-[initial]">
              <h1 className="text-5xl sm:text-6xl uppercase text-justify">
                <motion.span
                  variants={variants}
                  initial={"hidden"}
                  animate={"show"}
                  className="flex justify-between gap-x-4"
                >
                  <motion.span
                    className="text-primary"
                    variants={variantsChild}
                  >
                    Tic
                  </motion.span>{" "}
                  <motion.span
                    className="text-secondary"
                    variants={variantsChild}
                  >
                    Tac
                  </motion.span>{" "}
                  <motion.span
                    className="text-alternatif"
                    variants={variantsChild}
                  >
                    Toe
                  </motion.span>
                </motion.span>
                <motion.span
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ delay: 0.9, duration: 0.3 }}
                  className="block h-[2px] bg-red-500 bg-gradient-to-r from-primary via-secondary to-alternatif mt-4"
                  id="marker"
                ></motion.span>
              </h1>
              <motion.button
                className="p-4 bg-primary rounded-lg uppercase"
                initial={{ scaleX: 0, opacity: 0 }}
                animate={{ scaleX: 1, opacity: 1 }}
                transition={{ ease: "circOut", delay: 1.2 }}
                onClick={() => setPlay(true)}
              >
                Local
              </motion.button>
              <motion.button
                className="p-4 bg-secondary rounded-lg uppercase"
                initial={{ scaleX: 0, opacity: 0 }}
                animate={{ scaleX: 1, opacity: 1 }}
                transition={{ ease: "circOut", delay: 1.3 }}
                onClick={() => setPlayIa(true)}
              >
                Player VS Bot
              </motion.button>
              <motion.button
                className="p-4 bg-alternatif rounded-lg uppercase"
                initial={{ scaleX: 0, opacity: 0 }}
                animate={{ scaleX: 1, opacity: 1 }}
                transition={{ ease: "circOut", delay: 1.4 }}
                onClick={() => setPlay(true)}
              >
                Multiplayer
              </motion.button>
            </div>
          )}
          {play && <GameLocal setPlay={setPlay} />}
          {playIa && <GameIa setPlayIa={setPlayIa} />}
        </AnimatePresence>
      </div>
    </>
  );
}

export default App;
