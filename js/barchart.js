// COMMENTING DONE IN CLASS 02/24

/*

In-class activity 08 starter code
Prof. Mosca 
Modified: 12/08/21 

*/

// Set dimensions and margins for plots 
const width = 900;
const height = 450;
const margin = { left: 50, right: 50, bottom: 50, top: 50 };
const yTooltipOffset = 15;


// Make an element in d3 
const svg1 = d3
  // select the HTML element with the id hard-coded-bar
  .select("#hard-coded-bar")
  // add an svg to the selected element
  .append("svg")
  // set the SVG to width constant minus the left and the 
  //  right of the margin consannt
  .attr("width", width - margin.left - margin.right)
  // set the SVG to height constant minus the top and the
  //  bottom of the margin consannt
  .attr("height", height - margin.top - margin.bottom)
  // set the SVG viewBox to 0, 0, the width constant, and
  //  the height constant
  .attr("viewBox", [0, 0, width, height]);

// Hardcoded barchart data
const data1 = [
  { name: 'A', score: 92 },
  { name: 'B', score: 15 },
  { name: 'C', score: 67 },
  { name: 'D', score: 89 },
  { name: 'E', score: 53 },
  { name: 'F', score: 91 },
  { name: 'G', score: 18 }
];


// // Make an element in d3 
// const svg2 = d3
//   // select the HTML element with the id hard-coded-bar
//   .select("#csv-bar")
//   // add an svg to the selected element
//   .append("svg")
//   // set the SVG to width constant minus the left and the 
//   //  right of the margin consannt
//   .attr("width", width - margin.left - margin.right)
//   // set the SVG to height constant minus the top and the
//   //  bottom of the margin consannt
//   .attr("height", height - margin.top - margin.bottom)
//   // set the SVG viewBox to 0, 0, the width constant, and
//   //  the height constant
//   .attr("viewBox", [0, 0, width, height]);

/*

  Axes

*/

// use D3 to get the max "score" from the dictionaries in the
//  constant data1
let maxY1 = d3.max(data1, function (d) { return d.score; });

// TODO: What does each line of this code do?   
let yScale1 = d3.scaleLinear()
  .domain([0, maxY1])
  .range([height - margin.bottom, margin.top]);

// TODO: What does each line of this code do? 
let xScale1 = d3.scaleBand()
  .domain(d3.range(data1.length))
  .range([margin.left, width - margin.right])
  .padding(0.1);


// let yScale2 = 

// TODO: What does each line of this code do?  
svg1.append("g")
  .attr("transform", `translate(${margin.left}, 0)`)
  .call(d3.axisLeft(yScale1))
  .attr("font-size", '20px');

// TODO: What does each line of this code do? 
svg1.append("g")
  .attr("transform", `translate(0,${height - margin.bottom})`)
  .call(d3.axisBottom(xScale1)
    .tickFormat(i => data1[i].name))
  .attr("font-size", '20px');

// // TODO: What does each line of this code do?  
// svg2.append("g")
//   .attr("transform", `translate(${margin.left}, 0)`)
//   .call(d3.axisLeft(yScale1))
//   .attr("font-size", '20px');

// // TODO: What does each line of this code do? 
// svg2.append("g")
//   .attr("transform", `translate(0,${height - margin.bottom})`)
//   .call(d3.axisBottom(xScale1)
//     .tickFormat(i => data1[i].name))
//   .attr("font-size", '20px'); 

/* 

  Tooltip Set-up  

*/

// TODO: What does each line of this code do? 
const tooltip1 = d3.select("#hard-coded-bar")
  .append("div")
  .attr('id', "tooltip1")
  .style("opacity", 0)
  .attr("class", "tooltip");

// TODO: What does each line of this code do?  
const mouseover1 = function (event, d) {
  tooltip1.html("Name: " + d.name + "<br> Score: " + d.score + "<br>")
    .style("opacity", 1);
}

// TODO: What does each line of this code do? 
const mousemove1 = function (event, d) {
  tooltip1.style("left", (event.x) + "px")
    .style("top", (event.y + yTooltipOffset) + "px");
}

// TODO: What does this code do? 
const mouseleave1 = function (event, d) {
  tooltip1.style("opacity", 0);
}

/* 

  Bars 

*/

// TODO: What does each line of this code do? 
svg1.selectAll(".bar")
  .data(data1)
  .enter()
  .append("rect")
  .attr("class", "bar")
  .attr("x", (d, i) => xScale1(i))
  .attr("y", (d) => yScale1(d.score))
  .attr("height", (d) => (height - margin.bottom) - yScale1(d.score))
  .attr("width", xScale1.bandwidth())
  .on("mouseover", mouseover1)
  .on("mousemove", mousemove1)
  .on("mouseleave", mouseleave1);

