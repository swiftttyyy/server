var isHappy = function (n) {
  n = Array.from(String(n), Number);
  while (n != 1) {
    n = n.reduce((a, b) => a * a + b * b, 0);
  }
  return true;
};

console.log(isHappy(19));
