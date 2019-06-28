import { createObsevable } from "./observable";

// An operator subscribes to an aobservable then emits data down to the intersted observer

const map = projection => obs => {
  return createObsevable((next, err, comp) => {
    const sub = obs.subscribe(
      data => next(projection(data)),
      error => err(error),
      _ => comp()
    );
    return {
      unsubscribe: () => sub.unsubscribe()
    };
  });
};

const take = n => obs => {
  return createObsevable((next, err, comp) => {
    let count = 0;
    const sub = obs.subscribe(
      data => {
        next(data);
        if (++count === n) {
          sub.unsubscribe();
          comp();
        }
      },
      error => err(error),
      _ => comp()
    );
    return {
      unsubscribe: () => sub.unsubscribe()
    };
  });
};

export { map, take };
