import React from "react";
import * as d3 from "d3";

export default function CurveLineChart({ width, height, data }) {
  const svgHeight = height;
  const svgWidth = width;
  const paddingLeft = 10;
  const paddingRight = 10;
  const paddingBottom = 20;

  const svgRef = React.useRef();

  React.useEffect(() => {
    const svg = d3.select(svgRef.current);

    const xScale = d3
      .scaleLinear()
      .domain([0, data.length - 1])
      .range([paddingLeft, svgWidth - paddingRight]);

    const maxValue = Math.max(...data);
    const highestYValue = svgHeight - maxValue + paddingBottom;
    const yScale = d3
      .scaleLinear()
      .domain([0, highestYValue])
      .range([svgHeight - paddingBottom, 0]);
    const xAxis = d3
      .axisBottom(xScale)
      .ticks(data.length)
      .tickFormat((index) => index + 1);

    svg
      .select(".x-axis")
      .style("transform", ` translateY(${svgHeight - paddingBottom}px)`)
      .call(xAxis)
      .call((g) => g.select(".domain").remove())
      .call((g) => g.selectAll(".tick line").remove())
      .selectAll("text")
      .style("font-size", "14px")
      .style("fill", "#c4c7c9");

    const yAxis = d3.axisRight(yScale).tickSize(0);
    svg
      .select(".y-axis")
      .style("transform", ` translateX(${svgWidth - paddingRight}px)`)
      .call(yAxis)
      .call((g) => g.select(".domain").remove())
      .call((g) => g.selectAll(".tick text").remove());

    const myLine = d3
      .line()
      .x((value, index) => xScale(index))
      .y(yScale)
      .curve(d3.curveCardinal);
    svg
      .selectAll(".line")
      .data([data])
      .join("path")
      .attr("class", "line")
      .attr("d", myLine)
      .attr("fill", "none")
      .attr("stroke", "#4800f0");
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
