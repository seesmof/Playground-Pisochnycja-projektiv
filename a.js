const data = [165, 177, 154];
const sum = data.reduce((partial, n) => partial + n, 0);
const average = sum / data.length;
console.log(average);
