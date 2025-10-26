"use client";

import { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import { summaryService } from "@/services/summary";
import { SkeletonLoader } from "./SkeletonLoader";

interface SummaryData {
  totalIncome: number;
  totalExpenses: number;
  balance: number;
}

export const IncomeExpenseChart = () => {
  const svgRef = useRef<SVGSVGElement>(null);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<SummaryData | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const summary = await summaryService.getMonthlysSummary();
        setData(summary);
      } catch (err) {
        console.error("Failed to load summary:", err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  useEffect(() => {
    if (!svgRef.current || !data || loading) return;

    const width = 400;
    const height = 300;
    const margin = { top: 20, right: 20, bottom: 20, left: 60 };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    const g = svg
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    const chartData = [
      { label: "Income", value: data.totalIncome },
      { label: "Expenses", value: data.totalExpenses },
    ];

    const xScale = d3
      .scaleBand()
      .domain(["Income", "Expenses"])
      .range([0, innerWidth])
      .padding(0.4);

    const yScale = d3
      .scaleLinear()
      .domain([0, Math.max(data.totalIncome, data.totalExpenses) * 1.2])
      .range([innerHeight, 0]);

    const bars = g
      .selectAll(".bar")
      .data(chartData)
      .enter()
      .append("rect")
      .attr("class", "bar")
      .attr("x", (d) => xScale(d.label) || 0)
      .attr("y", (d) => yScale(d.value))
      .attr("width", xScale.bandwidth())
      .attr("height", (d) => innerHeight - yScale(d.value))
      .attr("fill", (d) => (d.label === "Income" ? "#10b981" : "#ef4444"));

    g.append("g")
      .attr("transform", `translate(0,${innerHeight})`)
      .call(d3.axisBottom(xScale))
      .style("color", "#64748b");

    g.append("g").call(d3.axisLeft(yScale)).style("color", "#64748b");

    bars.append("title").text((d) => `${d.label}: $${d.value.toFixed(2)}`);
  }, [data, loading]);

  if (loading) {
    return <SkeletonLoader height="h-80" />;
  }

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <h3 className="text-lg font-semibold mb-4">Income vs Expenses</h3>
      {data ? (
        <div>
          <svg ref={svgRef} />
          <div className="mt-6 grid grid-cols-2 gap-4">
            <div className="p-4 bg-background rounded-lg">
              <p className="text-muted-foreground text-sm mb-1">Total Income</p>
              <p className="text-2xl font-bold text-success">
                ${data.totalIncome.toFixed(2)}
              </p>
            </div>
            <div className="p-4 bg-background rounded-lg">
              <p className="text-muted-foreground text-sm mb-1">
                Total Expenses
              </p>
              <p className="text-2xl font-bold text-danger">
                ${data.totalExpenses.toFixed(2)}
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center py-12 text-muted-foreground">
          No data available
        </div>
      )}
    </div>
  );
};
