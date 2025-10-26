"use client";

import { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import { summaryService } from "@/services/summary";
import { SkeletonLoader } from "./SkeletonLoader";

export const ExpenseChart = () => {
  const svgRef = useRef<SVGSVGElement>(null);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<
    Array<{ category: string; amount: number; percentage: number }>
  >([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const categoryData = await summaryService.getCategorySummary();
        setData(categoryData);
      } catch (err) {
        console.error("Failed to load category summary:", err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  useEffect(() => {
    if (!svgRef.current || data.length === 0 || loading) return;

    const width = 400;
    const height = 300;
    const radius = Math.min(width, height) / 2 - 40;

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    const g = svg
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", `translate(${width / 2},${height / 2})`);

    const color = d3
      .scaleOrdinal()
      .domain(data.map((d) => d.category))
      .range(d3.schemeSet2);

    const pie = d3
      .pie<{ category: string; amount: number; percentage: number }>()
      .value((d) => d.amount);

    const arc = d3
      .arc<
        d3.PieArcDatum<{ category: string; amount: number; percentage: number }>
      >()
      .innerRadius(0)
      .outerRadius(radius);

    const arcs = g.selectAll("arc").data(pie(data)).enter().append("g");

    arcs
      .append("path")
      .attr("d", arc)
      .attr("fill", (d) => color(d.data.category) as string)
      .attr("stroke", "white")
      .style("stroke-width", 2);

    arcs
      .append("text")
      .attr("transform", (d) => `translate(${arc.centroid(d)})`)
      .attr("text-anchor", "middle")
      .attr("dy", "0.35em")
      .attr("fill", "white")
      .attr("font-size", "12px")
      .attr("font-weight", "bold")
      .text((d) => `${d.data.percentage.toFixed(0)}%`);
  }, [data, loading]);

  if (loading) {
    return <SkeletonLoader height="h-80" />;
  }

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <h3 className="text-lg font-semibold mb-4">Expense Breakdown</h3>
      {data.length === 0 ? (
        <div className="text-center py-12 text-muted-foreground">
          No expense data available
        </div>
      ) : (
        <div className="flex flex-col items-center">
          <svg ref={svgRef} />
          <div className="mt-6 grid grid-cols-2 gap-4 w-full">
            {data.map((item) => (
              <div key={item.category} className="text-sm">
                <div className="flex items-center gap-2 mb-1">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{
                      backgroundColor: d3
                        .scaleOrdinal()
                        .domain(data.map((d) => d.category))
                        .range(d3.schemeSet2)(item.category) as string,
                    }}
                  />
                  <span className="text-muted-foreground">{item.category}</span>
                </div>
                <p className="font-semibold">${item.amount.toFixed(2)}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
