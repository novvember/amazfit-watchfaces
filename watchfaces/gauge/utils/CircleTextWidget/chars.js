export const TEXT_CHAR_WIDTH = px(26);

export const TEXT_CHAR_HEIGHT = px(36);

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
  '-',
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
  'а',
  'б',
  'в',
  'г',
  'д',
  'е',
  'ж',
  'з',
  'и',
  'й',
  'к',
  'л',
  'м',
  'н',
  'о',
  'п',
  'р',
  'с',
  'т',
  'у',
  'ф',
  'х',
  'ц',
  'ч',
  'ш',
  'щ',
  'ъ',
  'ы',
  'ь',
  'э',
  'ю',
  'я',
].forEach((name) => {
  images[name] = buildFileName(name);
});

images[' '] = buildFileName('space');
images[':'] = buildFileName('colon');
images['°'] = buildFileName('degree');

export const TEXT_CHARS = images;
