import { pipe } from "rxjs";

const scream = a => a.toUpperCase();
const exclam = b => b + " !!!! ";
const lower = b => b.toLowerCase();

/**
 * Pipe is an utility function thet composes functions
 */
const composition = pipe(
  scream,
  exclam,
  lower
);

console.log(
  composition("hello composed World") ===
    lower(exclam(scream("hello composed World")))
);
