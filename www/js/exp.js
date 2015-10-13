var margin = { top: 40, right: 40, bottom: 50, left: 60 },
    width = 530 - margin.left - margin.right,
    height = 250 - margin.top - margin.bottom;

var x = d3.scale.linear()
    .domain([-3, 3])
    .range([0, width]);

var y = d3.scale.linear()
    .domain([-10, 10])
    .range([height, 0]);

var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");

var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left");

var line = d3.svg.line()
    .x(d => x(d[0]))
    .y(d => y(d[1]));

var svg = d3.select("#expcurves")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  	.append("g")
    .attr("transform", "translate(" + [margin.left, margin.top] + ")");

svg.append("g")
    .attr("class", "y axis")
    .attr("transform", "translate(-4,0)")
    .call(yAxis);

svg.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + (height + 4) + ")")
    .call(xAxis);

svg.append("path")
    .datum(d3.range(-3, 4).map(d => [d, 0]))
    .attr("class", "gray line")
    .attr("d", line);

svg.append("path")
    .datum(d3.range(-10, 11).map(d => [0, d]))
    .attr("class", "gray line")
    .attr("d", line);

svg.append("path")
    .datum(d3.range(-3, 2.4, 0.1).map(d => [d, Math.exp(d)]))
    .attr("class", "blue line")
    .attr("d", line);

svg.append("path")
    .datum(d3.range(-2, 3, 0.1).map(d => [d, Math.exp(-d)]))
    .attr("class", "red line")
    .attr("d", line);

svg.append("path")
    .datum(d3.range(-3, 2.4, 0.1).map(d => [d, -Math.exp(d)]))
    .attr("class", "green line")
    .attr("d", line);
