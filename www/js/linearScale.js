

var svg = d3.select("#linearScale").attr({ width: 530, height: 250 });

function line(x1, y1, x2, y2) {
  svg.append("line").attr({
    x1: x1, y1: y1,
    x2: x2, y2: y2,
    strokeWidth: 1,
    stroke: "black"
  });
}

function linearScale(d1, d2, r1, r2) {
  let [domainSize, domainMin, rangeSize, rangeMin] =
      [Math.abs(d2 - d1), Math.min(d1, d1), Math.abs(r2 - r1), Math.min(r1, r2)];
  // find dist from domainMin to input, find rate of input dist to domainSize
  // then scale the domainRate to rangeSize, finally add offset of rangeMin
  return input => rangeSize * ((input - domainMin) / domainSize) + rangeMin;
}

var x = linearScale(-20, 20, 80, 450),
    y = 50;

var testData = [
  [-20, 20],
  [20, -20],
  [-20, 0],
  [0, -20],
  [20, 0],
  [0, 20],
  [10, -10],
  [-10, 10],
  [1, -1],
  [-1, 1]
];

testData.forEach((pair, i) => {
  y += 10;
  line(x(pair[0]), y, x(pair[1]), y);
});
