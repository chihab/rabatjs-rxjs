import { pipe } from "./pipe";

const createObsevable = observer => ({
  pipe(...args) {
    return pipe(...args)(this); // can't have arrow function here
  },
  subscribe: observer
});

const of = (...args) =>
  createObsevable((nextCB, errorCB, completeCB) => {
    args.forEach(val => nextCB(val));
    completeCB();
    return {
      unsubscribe: () => {
        console.log("Unsubscribe !");
      }
    };
  });

const from = args =>
  createObsevable((nextCB, errorCB, completeCB) => {
    args.forEach(val => nextCB(val));
    completeCB();
    return {
      unsubscribe: () => {
        console.log("Unsubscribe !");
      }
    };
  });

const interval = delay =>
  createObsevable((nextCB, errorCB, completeCB) => {
    let i = 0;
    const timer = setInterval(() => {
      nextCB(i++);
    }, delay);
    return {
      unsubscribe: () => {
        clearInterval(timer);
      }
    };
  });

export { of, interval, from, createObsevable };
