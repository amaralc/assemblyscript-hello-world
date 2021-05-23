// The entry file of your WebAssembly module.

export function add(a: i32, b: i32): i32 {
  return a + b;
}

export function factorial(i: i32): i32 {
  return i == 0 ? 1 : i * factorial(i - 1);
}
