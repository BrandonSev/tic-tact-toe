export const calculateWinner = (state: string[]) => {
  const lines: any = [
    [0, 1, 2, "top-x", "width"], // [0: index, 1: index, 3: index, place line win, property for animate line]
    [3, 4, 5, "center-x", "width"],
    [6, 7, 8, "bottom-x", "width"],
    [0, 3, 6, "left-y", "height"],
    [1, 4, 7, "center-y", "height"],
    [2, 5, 8, "right-y", "height"],
    [0, 4, 8, "diag-left", "width"],
    [2, 4, 6, "diag-right", "width"],
  ];

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

export const playIaIntermediateLevel = (
  state: string[]
): { index?: number; newSquares?: string[] } => {
  const lines: number[][] = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  let newState: {
    index?: number;
    newSquares?: string[];
  } = {};

  for (let line of lines) {
    if (
      (state[line[0]] === "o" && state[line[1]] === "o") ||
      (state[line[1]] === "o" && state[line[2]] === "o") ||
      (state[line[0]] === "o" && state[line[2]] === "o")
    ) {
      if (state[line[0]] === "") {
        newState = {
          ...newState,
          index: line[0],
        };
        break;
      }
      if (state[line[1]] === "") {
        newState = {
          ...newState,
          index: line[1],
        };
        break;
      }
      if (state[line[2]] === "") {
        newState = {
          ...newState,
          index: line[2],
        };
        break;
      }
    } else if (
      (state[line[0]] === "x" && state[line[1]] === "x") ||
      (state[line[1]] === "x" && state[line[2]] === "x") ||
      (state[line[0]] === "x" && state[line[2]] === "x")
    ) {
      if (state[line[0]] === "") {
        newState = {
          ...newState,
          index: line[0],
        };
      }
      if (state[line[1]] === "") {
        newState = {
          ...newState,
          index: line[1],
        };
      }
      if (state[line[2]] === "") {
        newState = {
          ...newState,
          index: line[2],
        };
      }
    }
    continue;
  }

  if (!newState.index) {
    const squares = [...state];
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
    newState = { newSquares: squares, ...squares };
  }

  return newState;
};
