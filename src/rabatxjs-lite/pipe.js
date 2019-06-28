const compose = (f, g) => x => g(f(x));
const pipe = (...args) => args.reduce(compose);

export { pipe };
