export function withCache(fn) {
  const cache = {};

  return (...args) => {
    const key = args.join('-');

    if (!(key in cache)) {
      cache[key] = fn(...args);
    }

    return cache[key];
  }
}