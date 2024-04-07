export const KeyDownHandler = (funcs, e) => {
  const isArrowKey = (e) => e.key.slice(0, 5) === "Arrow";
  if (isArrowKey(e)) e.preventDefault();
  switch (e.key) {
    case "ArrowRight":
      if (funcs.right) funcs.right();
      break;
    case "ArrowLeft":
      if (funcs.left) funcs.left();
      break;
    case "ArrowUp":
      if (funcs.up) funcs.up();
      break;
    case "ArrowDown":
      if (funcs.down) funcs.down();
      break;
    case " ":
      if (funcs.space) funcs.space(e);
  }
};

export const KeyUpHandler = (funcs, e) => {
  const isArrowKey = (e) => e.key.slice(0, 5) === "Arrow";
  if (isArrowKey(e)) e.preventDefault();
  switch (e.key) {
    case "ArrowRight":
      if (funcs.right) funcs.right();
      break;
    case "ArrowLeft":
      if (funcs.left) funcs.left();
      break;
    case "ArrowUp":
      if (funcs.up) funcs.up();
      break;
    case "ArrowDown":
      if (funcs.down) funcs.down();
      break;
  }
};
