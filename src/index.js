/**
 * Simple implementation of Observer pattern inspired by RxJS API
 * Live coded during Rabat.js June Meetup
 *
 * rabatjxjs-lite is a more organized version
 *
 * author: Chihab Otmani
 */

const compose = (f, g) => x => f(g(x));
const pipe = (...args) => args.reduce(compose);

const createObservable = observer => ({
  subscribe: observer,
  // pipeError: _ => this,
  pipe(...args) {
    return pipe(...args)(this);
  }
});

const of = (...data) =>
  createObservable((next, error, complete) => {
    data.forEach(e => next(e));
    complete();
  });

const from = data =>
  createObservable((next, error, complete) => {
    data.forEach(e => next(e));
    complete();
  });

const interval = delay =>
  createObservable((next, error, complete) => {
    let i = 0;
    const _interval = setInterval(() => next(i++), delay);
    return {
      unsubscribe: () => {
        clearInterval(_interval);
      }
    };
  });

const mapTo = num => observable =>
  createObservable((next, error, complete) => {
    observable.subscribe(data => {
      next(num);
    });
  });

const map = projection => observable =>
  createObservable((next, error, complete) => {
    const sub = observable.subscribe(data => {
      next(projection(data));
    });
    return {
      unsubscribe: () => {
        sub.unsubscribe();
      }
    };
  });

const obs = interval(1000);
const sub = obs
  .pipe(map(e => e * 2))
  .subscribe(
    e => console.log(e),
    erro => console.log(erro),
    () => console.log("End of stream")
  );

setTimeout(() => {
  sub.unsubscribe();
}, 6000);
