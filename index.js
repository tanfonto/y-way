// STEP 1: hard-coded recursion ->
const factorial1 = arg => {
  return arg === 0 ? 1 : arg * factorial1(arg - 1);
};

console.log(factorial1(10));

// STEP 2: abstract away the recursive step ->
const factorial2 = (step, arg) => {
  return arg === 0 ? 1 : arg * step(factorial2, arg - 1);
};

console.log(factorial2(factorial2, 10));

// STEP 3: curry the definition so that we can pass partially weaved function ->
const factorial3 = step => arg => {
  return arg === 0 ? 1 : arg * step(factorial3)(arg - 1);
};

console.log(factorial3(factorial3)(10));

// STEP 4: abstract away the annoying initial self-reference ->
const factorial4 = arg => {
  const boot = step => {
    return arg === 0 ? 1 : arg * step(arg - 1);
  };
  return boot(factorial4);
};

console.log(factorial4(10));

// STEP 5: abstract away the first order function itself ->
const Y = fn => {
  const it = step => {
    return (...args) => fn(step(step))(...args);
  };
  return it(it);
};

const factorial5 = Y(it => {
  return x => (x === 0 ? 1 : x * it(x - 1));
});

console.log(factorial5(10));

// Alternative approach, not necessarily valid formally
const Y = (fn, inc, abort) => {
  const step = (acc, x) => abort(x) ? acc : step(fn(acc, x), inc(x))
  return x => step(x, x);
};

const factorial6 = Y((acc, x) => acc * x, x => x - 1, x => x === 0);

console.log(factorial6(10));

// With convenient defaults
const Y = (fn, abort => x => x === 0, inc = x => --x) => {
  const step = (acc, x) => abort(x) ? acc : step(fn(acc, x), inc(x))
  return x => step(x, x);
};

const factorial7 = Y((acc, x) => acc * x);

console.log(factorial7(10));
