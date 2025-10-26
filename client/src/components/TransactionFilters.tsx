"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface TransactionFiltersProps {
  onFilterChange: (filters: {
    type?: "income" | "expense";
    startDate?: string;
    endDate?: string;
    minAmount?: number;
    maxAmount?: number;
  }) => void;
}

export const TransactionFilters = ({
  onFilterChange,
}: TransactionFiltersProps) => {
  const [type, setType] = useState<"income" | "expense" | "">("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [minAmount, setMinAmount] = useState("");
  const [maxAmount, setMaxAmount] = useState("");

  const handleFilterChange = () => {
    const filters: any = {};
    if (type) filters.type = type;
    if (startDate) filters.startDate = startDate;
    if (endDate) filters.endDate = endDate;
    if (minAmount) filters.minAmount = Number.parseFloat(minAmount);
    if (maxAmount) filters.maxAmount = Number.parseFloat(maxAmount);
    onFilterChange(filters);
  };

  const handleReset = () => {
    setType("");
    setStartDate("");
    setEndDate("");
    setMinAmount("");
    setMaxAmount("");
    onFilterChange({});
  };

  useEffect(() => {
    handleFilterChange();
  }, [type, startDate, endDate, minAmount, maxAmount]);

  return (
    <motion.div
      className="bg-card border border-border rounded-lg p-6 mb-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <h3 className="text-lg font-semibold mb-4">Filters</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {/* Type Filter */}
        <div>
          <label className="block text-sm font-medium mb-2">Type</label>
          <select
            value={type}
            onChange={(e) => {
              setType(e.target.value as "income" | "expense" | "");
              // handleFilterChange();
            }}
            className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:outline-none focus:border-primary text-sm"
          >
            <option value="">All Types</option>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
        </div>

        {/* Start Date */}
        <div>
          <label className="block text-sm font-medium mb-2">Start Date</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => {
              setStartDate(e.target.value);
              // handleFilterChange();
            }}
            className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:outline-none focus:border-primary text-sm"
          />
        </div>

        {/* End Date */}
        <div>
          <label className="block text-sm font-medium mb-2">End Date</label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => {
              setEndDate(e.target.value);
              // handleFilterChange();
            }}
            className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:outline-none focus:border-primary text-sm"
          />
        </div>

        {/* Min Amount */}
        <div>
          <label className="block text-sm font-medium mb-2">Min Amount</label>
          <input
            type="number"
            step="0.01"
            value={minAmount}
            onChange={(e) => {
              setMinAmount(e.target.value);
              // handleFilterChange();
            }}
            placeholder="0.00"
            className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:outline-none focus:border-primary text-sm"
          />
        </div>

        {/* Max Amount */}
        <div>
          <label className="block text-sm font-medium mb-2">Max Amount</label>
          <input
            type="number"
            step="0.01"
            value={maxAmount}
            onChange={(e) => {
              setMaxAmount(e.target.value);
              // handleFilterChange();
            }}
            placeholder="0.00"
            className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:outline-none focus:border-primary text-sm"
          />
        </div>
      </div>

      <div className="mt-4 flex gap-2">
        <motion.button
          onClick={handleReset}
          className="px-4 py-2 bg-background border border-border rounded-lg text-sm hover:bg-card transition"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Reset Filters
        </motion.button>
      </div>
    </motion.div>
  );
};
