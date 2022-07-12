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
