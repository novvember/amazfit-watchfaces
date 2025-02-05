export const TEXT_CHAR_WIDTH = px(14);

export const TEXT_CHAR_HEIGHT = px(24);

const buildFileName = (name) => `text_chars/${name}.png`;

const images = {};

[
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
  '%',
  '❤',
  '▲',
  '✱',
  '☀',
  '☼',
].forEach((name) => {
  images[name] = buildFileName(name);
});

images[' '] = buildFileName('space');
images[':'] = buildFileName('colon');

export const TEXT_CHARS = images;
