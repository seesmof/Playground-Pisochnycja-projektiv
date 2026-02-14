/**
 * Calculate a factorial of a given number
 * @param num A number to get the factorial of
 * @returns A factorial of a given number
 */

export const factorial = (num: number): number => {
  if (num < 0) return 0;
  let result: number = 1;
  for (let index = 1; index <= num; index++) {
    result = result * index;
  }
  return result;
};
