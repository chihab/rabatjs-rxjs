import { from, interval, of } from "./rabatxjs-lite";
import { map, take } from "./rabatxjs-lite/operators";

const obs1$ = of(1, 2, 3, 4);
const obs2$ = from([1, 2, 3, 4]);
const obs3$ = interval(2000);

const sub = obs3$
  .pipe(
    map(v => (v + " !").toUpperCase()),
    take(2)
  )
  .subscribe(
    data => {
      console.log("Data: " + data);
    },
    error => console.log("Error: ", error),
    _ => console.log("End of steam")
  );

// sub.unsubscribe();
