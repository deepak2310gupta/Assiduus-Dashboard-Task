import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

export default function CurveLineChart({ width, height, filteredGraphData }) {
  const svgRef = useRef();

  useEffect(() => {
    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    const margin = { top: 10, right: 45, bottom: 20, left: 25 };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    const xScale = d3
      .scaleTime()
      .domain(d3.extent(filteredGraphData, (d) => d.date))
      .range([0, innerWidth]);

    const yScaleConfirmedRecovered = d3
      .scaleLinear()
      .domain([
        0,
        d3.max(filteredGraphData, (d) => Math.max(d.confirmed, d.recovered)),
      ])
      .range([innerHeight, 0]);

    const yScaleDeceased = d3
      .scaleLinear()
      .domain([0, d3.max(filteredGraphData, (d) => d.deceased)])
      .range([innerHeight, 0]);

    const xAxis = d3.axisBottom(xScale).tickFormat(d3.timeFormat("%m-%Y"));
    const yAxisConfirmedRecovered = d3
      .axisLeft(yScaleConfirmedRecovered)
      .tickSize(0)
      .tickPadding(10);
    const yAxisDeceased = d3
      .axisRight(yScaleDeceased)
      .tickSize(0)
      .tickPadding(10);

    const g = svg
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    g.append("g").attr("transform", `translate(0,${innerHeight})`).call(xAxis);

    g.append("g").call(yAxisConfirmedRecovered);

    g.append("g")
      .attr("transform", `translate(${innerWidth},0)`)
      .call(yAxisDeceased);

    const lineConfirmed = d3
      .line()
      .x((d) => xScale(d.date))
      .y((d) => yScaleConfirmedRecovered(d.confirmed))
      .curve(d3.curveBasis);

    const lineRecovered = d3
      .line()
      .x((d) => xScale(d.date))
      .y((d) => yScaleConfirmedRecovered(d.recovered))
      .curve(d3.curveBasis);

    const lineDeceased = d3
      .line()
      .x((d) => xScale(d.date))
      .y((d) => yScaleDeceased(d.deceased))
      .curve(d3.curveBasis);

    g.append("path")
      .datum(filteredGraphData)
      .attr("fill", "none")
      .attr("stroke", "steelblue")
      .attr("stroke-width", 1.5)
      .attr("d", lineConfirmed);

    g.append("path")
      .datum(filteredGraphData)
      .attr("fill", "none")
      .attr("stroke", "orange")
      .attr("stroke-width", 1.5)
      .attr("d", lineRecovered);

    g.append("path")
      .datum(filteredGraphData)
      .attr("fill", "none")
      .attr("stroke", "grey")
      .attr("stroke-width", 1.5)
      .attr("d", lineDeceased);
  }, [height, width, filteredGraphData]);

  return (
    <React.Fragment>
      <svg width={width} height={height} ref={svgRef} />
    </React.Fragment>
  );
}
