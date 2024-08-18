export function withWeakCache(fn) {
  let prevKey;
  let prevResult;

  return (...args) => {
    const key = args.join('_');

    if (prevKey !== key) {
      prevKey = key;
      prevResult = fn(...args);
    }

    return prevResult;
  };
}
