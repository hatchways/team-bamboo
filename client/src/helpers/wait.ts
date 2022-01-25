const wait = (fn: () => void, delay = 300) => new Promise((resolve) => setTimeout(() => resolve(fn()), delay));
export default wait;
