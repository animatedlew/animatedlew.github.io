export default class Utils {
    static rand(s, e) { return Math.random() * e + s; }
    static collisionComplexity(n) { return (n * n - n) / 2; }
    static assert(condition, message) {
        if (!condition) { throw message || "Assertion failed"; }
    }
    static normalize(value, min, max) { return (value - min) / (max - min); }
    static lerp(t, min, max) { return (max - min) * t + min; }
    static clamp(t, min, max) { return Math.max(Math.min(t, max), min); }
    static map(d1, d2, r1, r2) {
      let [domainSize, domainMin, rangeSize, rangeMin] =
          [Math.abs(d2 - d1), Math.min(d1, d2), Math.abs(r2 - r1), Math.min(r1, r2)];
      // find dist from domainMin to input, find rate of input dist to domainSize
      // then scale the domainRate to rangeSize, finally add offset of rangeMin
      return input => rangeSize * ((input - domainMin) / domainSize) + rangeMin;
    }
}
