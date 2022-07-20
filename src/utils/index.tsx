/* An array of arrays. Each array contains the indexes of the squares that make up a line. The last two
elements of each array are the CSS class and the CSS property that will be used to animate the line. */
const lines: any = [
  [0, 1, 2, "top-x", "width"],
  [3, 4, 5, "center-x", "width"],
  [6, 7, 8, "bottom-x", "width"],
  [0, 3, 6, "left-y", "height"],
  [1, 4, 7, "center-y", "height"],
  [2, 5, 8, "right-y", "height"],
  [0, 4, 8, "diag-left", "width"],
  [2, 4, 6, "diag-right", "width"],
];

/**
 * It checks if there's a winner, if there's a draw, or if the game is still going on
 * @param {string[]} state - string[] - The current state of the board.
 * @returns An object with the state, winner, and direction of the win.
 */
export const calculateWinner = (state: string[]) => {
  for (let line of lines) {
    if (
      state[line[0]] === "" ||
      state[line[1]] === "" ||
      state[line[2]] == ""
    ) {
      continue;
    }
    if (
      state[line[0]] === state[line[1]] &&
      state[line[1]] === state[line[2]]
    ) {
      return {
        state: "win",
        winner: state[line[0]],
        dir: line[3],
      };
    }
  }

  if (!state.includes("")) {
    return { state: "draw", winner: "", dir: "" };
  }

  return undefined;
};

/**
 * It's a function that takes an array of strings as a parameter and returns a promise that resolves to
 * a modified array of strings
 * @param {string[]} squares - string[]
 */
export const playIaRandom = async (squares: string[]) => {
  const countLast: number[] = squares
    .map((el, i) => (el === "" ? i : -1))
    .filter((el) => el !== -1);

  for await (let i of squares) {
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
};

/**
 * If the player has two squares in a row, the computer will play the third square to block the player.
 * If the computer has two squares in a row, it will play the third square to win.
 * @param {string[]} squares - string[]
 */
export const playIaIntermediateLevel = async (squares: string[]) => {
  let find = false;
  for await (let line of lines) {
    if (
      (squares[line[0]] === "o" && squares[line[1]] === "o") ||
      (squares[line[1]] === "o" && squares[line[2]] === "o") ||
      (squares[line[0]] === "o" && squares[line[2]] === "o")
    ) {
      if (squares[line[0]] === "") {
        squares[line[0]] = "o";
        find = true;
        break;
      }
      if (squares[line[1]] === "") {
        squares[line[1]] = "o";
        find = true;
        break;
      }
      if (squares[line[2]] === "") {
        squares[line[2]] = "o";
        find = true;
        break;
      }
    } else if (
      (squares[line[0]] === "x" && squares[line[1]] === "x") ||
      (squares[line[1]] === "x" && squares[line[2]] === "x") ||
      (squares[line[0]] === "x" && squares[line[2]] === "x")
    ) {
      if (squares[line[0]] === "") {
        squares[line[0]] = "o";
        find = true;
        break;
      }
      if (squares[line[1]] === "") {
        squares[line[1]] = "o";
        find = true;
        break;
      }
      if (squares[line[2]] === "") {
        squares[line[2]] = "o";
        find = true;
        break;
      }
    }
  }
  if (!find) {
    await playIaRandom(squares);
  }
};
