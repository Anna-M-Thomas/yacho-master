//This is a reverse of the hotkeys keymap because hotkeys has its own names for some keys
//So I can get the names from keycode

//Omit tab and escape to not interfere with keyboard navigation
//Space stays, user can reset
// 9: "tab",
//27: "escape",

const keyMap = {
  8: "backspace",
  12: "clear",
  13: "return",
  20: "⇪",
  32: "space",
  33: "pageup",
  34: "pagedown",
  35: "end",
  36: "home",
  37: "left",
  38: "up",
  39: "right",
  40: "down",
  45: "insert",
  46: "delete",
  96: "num_0",
  97: "num_1",
  98: "num_2",
  99: "num_3",
  100: "num_4",
  101: "num_5",
  102: "num_6",
  103: "num_7",
  104: "num_8",
  105: "num_9",
  106: "num_multiply",
  107: "num_add",
  108: "num_enter",
  109: "num_subtract",
  110: "num_decimal",
  111: "num_divide",
  188: ",",
  190: ".",
  191: "/",
  192: "`",
  219: "[",
  220: "\\",
  221: "]",
  222: "'",
  //Firefox is different for these I guess
  173: "-",
  189: "-",
  61: "=",
  187: "=",
  59: ";",
  186: ";",
};

export default keyMap;
