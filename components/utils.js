export function debounce(callback, ms) {
  let lastCallDate;
  let timerId;
  return function (...args) {
    if (lastCallDate) {
      const nowDate = new Date();
      if (Math.abs(lastCallDate - nowDate) < ms) {
        clearTimeout(timerId);
      }
    }
    timerId = setTimeout(callback, ms, ...args);
    lastCallDate = new Date();
  };
}
