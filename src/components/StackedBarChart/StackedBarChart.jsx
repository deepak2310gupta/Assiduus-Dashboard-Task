import React from "react";
import * as d3 from "d3";

export default function StackedBarChart({ width, height, data }) {
  const svgHeight = height;
  const svgWidth = width;
  const paddingLeft = 10;
  const paddingRight = 10;
  const paddingBottom = 20;

  const svgRef = React.useRef();

  React.useEffect(() => {
    const subgroups = ["A", "B"];
    const groups = data.map((d) => d.category);

    const svg = d3.select(svgRef.current);

    const xScale = d3
      .scaleBand()
      .domain(groups)
      .range([paddingLeft, svgWidth - paddingRight])
      .padding([0.8]);

    const yScale = d3
      .scaleLinear()
      .domain([0, d3.max(data, (d) => d.A + d.B)])
      .range([svgHeight - paddingBottom, 0]);

    const color = d3
      .scaleOrdinal()
      .domain(subgroups)
      .range(["#4800f0", "#00c881"]);

    const stackedData = d3.stack().keys(subgroups)(data);

    svg
      .selectAll(".stacked-bar")
      .data(stackedData)
      .join("g")
      .attr("class", "stacked-bar")
      .attr("fill", (d) => color(d.key))
      .selectAll("rect")
      .data((d) => d)
      .join("rect")
      .attr("x", (d) => xScale(d.data.category))
      .attr("y", (d) => yScale(d[1]))
      .attr("height", (d) => yScale(d[0]) - yScale(d[1]))
      .attr("width", xScale.bandwidth());

    const xAxis = d3.axisBottom(xScale).tickSize(0);

    svg
      .select(".x-axis")
      .style("transform", `translateY(${svgHeight - paddingBottom}px)`)
      .call(xAxis)
      .call((g) => g.select(".domain").remove())
      .selectAll("text")
      .attr("dy", "15")
      .style("font-size", "14px")
      .style("fill", "#c4c7c9");
  }, [data, svgHeight, svgWidth]);

  return (
    <React.Fragment>
      <svg width={svgWidth} height={svgHeight} ref={svgRef}>
        <g className="x-axis" />
      </svg>
      <br />
    </React.Fragment>
  );
}
