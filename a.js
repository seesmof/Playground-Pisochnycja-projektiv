oldValue = 86;
oldMin = 0;
oldMax = 100;
newMin = 1;
newMax = 5;

const convertRanges = (oldValue, oldMin, oldMax, newMin, newMax) => {
  return ((oldValue - oldMin) * (newMax - newMin)) / (oldMax - oldMin) + newMin;
};

const result = convertRanges(oldValue, oldMin, oldMax, newMin, newMax);
console.log(
  `From range of ${oldMin}-${oldMax} to ${newMin}-${newMax}\nValue was ${oldValue} and became ${result.toFixed(2)}`,
);
