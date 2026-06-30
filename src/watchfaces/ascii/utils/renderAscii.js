export function renderAscii(text, glyphs, options) {
  options = options || {};
  const extraSpacing = options.extraSpacing || 0;
  const disableKerning = options.disableKerning || false;

  if (!text || text.length === 0) return '';

  let result = null;

  for (let i = 0; i < text.length; i++) {
    const g = glyphs[text[i]];
    if (!g) continue;
    if (result === null) {
      result = g.slice();
      continue;
    }
    result = mergeGlyphs(result, g, extraSpacing, disableKerning);
  }

  if (!result) return '';

  const maxLen = Math.max(...result.map((r) => r.length));

  return result
    .map((r) => r.padEnd(maxLen, ' ').replace(/ /g, '\xA0'))
    .join('\n');
}

function mergeGlyphs(left, right, extraSpacing, disableKerning) {
  const lw = Math.max(...left.map((r) => r.length));
  const rw = Math.max(...right.map((r) => r.length));

  const paddedLeft = left.map((r) => r.padEnd(lw, ' '));
  const paddedRight = right.map((r) => r.padEnd(rw, ' '));

  const height = paddedLeft.length;
  let shift = 0;

  if (!disableKerning) {
    shift = Math.min(lw, rw);
    for (let r = 0; r < height; r++) {
      const trailing = countTrailingSpaces(paddedLeft[r]);
      const leading = countLeadingSpaces(paddedRight[r]);
      const rowMax = trailing + leading;
      if (rowMax < shift) shift = rowMax;
    }
  }

  shift = shift - extraSpacing;

  const out = new Array(height);
  for (let r = 0; r < height; r++) {
    const lRow = paddedLeft[r];
    const rRow = paddedRight[r];

    if (shift < 0) {
      const gap = ' '.repeat(-shift);
      out[r] = lRow + gap + rRow;
    } else {
      let row = lRow.substring(0, lw - shift);
      for (let c = 0; c < shift; c++) {
        const lc = lRow.charAt(lw - shift + c);
        const rc = rRow.charAt(c);
        if (lc === ' ') row += rc;
        else if (rc === ' ') row += lc;
        else row += rc;
      }
      row += rRow.substring(shift);
      out[r] = row;
    }
  }
  return out;
}

function countTrailingSpaces(s) {
  let n = 0;
  for (let i = s.length - 1; i >= 0 && s.charAt(i) === ' '; i--) n++;
  return n;
}

function countLeadingSpaces(s) {
  let n = 0;
  for (let i = 0; i < s.length && s.charAt(i) === ' '; i++) n++;
  return n;
}
