export const TEXT_CHAR_WIDTH = px(16);

export const TEXT_CHAR_HEIGHT = px(18);

const buildFileName = (name) => `text_chars/${name}.png`;

const images = {};

[
  'a',
  'b',
  'c',
  'd',
  'e',
  'f',
  'g',
  'h',
  'i',
  'j',
  'k',
  'l',
  'm',
  'n',
  'o',
  'p',
  'q',
  'r',
  's',
  't',
  'u',
  'v',
  'w',
  'x',
  'y',
  'z',
  '0',
  '1',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  '→',
  '%',
].forEach((name) => {
  images[name] = buildFileName(name);
});

images[' '] = buildFileName('space');
images[':'] = buildFileName('colon');

export const TEXT_CHARS = images;
