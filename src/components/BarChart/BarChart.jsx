import React from "react";
import * as d3 from "d3";

export default function BarChart({ width, height, data }) {
  const svgHeight = height;
  const svgWidth = width;
  const paddingLeft = 10;
  const paddingRight = 10;
  const paddingBottom = 20;

  const svgRef = React.useRef();

  React.useEffect(() => {
    const maxValue = Math.max(...data.map((d) => d.value));
    const highestYValue = svgHeight - maxValue + paddingBottom;
    const svg = d3.select(svgRef.current);

    const xScale = d3
      .scaleBand()
      .domain(data.map((d) => d.xlabel))
      .range([paddingLeft, svgWidth - paddingRight])
      .padding(0.8);

    const yScale = d3
      .scaleLinear()
      .domain([0, highestYValue])
      .range([svgHeight - paddingBottom, 0]);

    const xAxis = d3.axisBottom(xScale).tickSize(0);

    svg
      .select(".x-axis")
      .style("transform", `translateY(${svgHeight - paddingBottom}px)`)
      .call(xAxis)
      .call((g) => g.select(".domain").remove())
      .selectAll("text")
      .attr("dy", "15") // Add this line
      .style("font-size", "14px")
      .style("fill", "#c4c7c9");

    svg
      .selectAll(".bar")
      .data(data)
      .join("rect")
      .attr("class", "bar")
      .attr("transform", "scale(1, -1)")
      .attr("x", (d) => xScale(d.xlabel))
      .attr("y", -svgHeight + paddingBottom)
      .attr("width", xScale.bandwidth())
      .attr("rx", 5)
      .attr("ry", 5)
      .transition()
      .attr("fill", "#4800f0")
      .attr("height", (d) => svgHeight - yScale(d.value) - paddingBottom);
  }, [data, svgHeight, svgWidth]);

  return (
    <React.Fragment>
      <svg width={svgWidth} height={svgHeight} ref={svgRef}>
        <g className="x-axis" />
        <g className="y-axis" />
      </svg>
      <br />
    </React.Fragment>
  );
}
