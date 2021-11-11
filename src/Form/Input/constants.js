// TODO: clean all this up when event.keyCode is dead
const KEYCODES = {
  UP: { keyCode: 38, key: 'ArrowUp' },
  DOWN: { keyCode: 40, key: 'ArrowDown' },
  LEFT: { keyCode: 37, key: 'ArrowLeft' },
  RIGHT: { keyCode: 39, key: 'ArrowRight' },
  ENTER: { keyCode: 13, key: 'Enter' },
  SPACE: { keyCode: 32, key: ' ' },
  TAB: { keyCode: 9, key: 'Tab' },
  ESC: { keyCode: 27, key: 'Escape' }
};

const inputSizes = ['small', 'default', 'large'];
const inputIconTypes = ['marker', 'money'];
const inputStyleTypes = [ 'default', 'mono', 'gray'];

export {
  KEYCODES,
  inputSizes,
  inputIconTypes,
  inputStyleTypes,
};
