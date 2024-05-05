export function withWeakCache(fn) {
  let prevKey;
  let prevResult;

  return (...args) => {
    const key = args.join('-');

    if (prevKey !== key) {
      prevResult = fn(...args);
    }

    return prevResult;
  }
}