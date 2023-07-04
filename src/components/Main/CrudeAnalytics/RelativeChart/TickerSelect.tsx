"use client";

import { useState } from "react";
import { Tag, message, Select } from "antd";

const MAX_SELECTIONS = 5;

export default function TickerSelect() {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  const handleOptionChange = (value: string) => {
    if (selectedOptions.length >= MAX_SELECTIONS) {
      message.error("Limit reached, cannot add more than 5 tickers");
      return; // Limit reached, do not add more options
    }
    setSelectedOptions(Array.from(new Set([...selectedOptions, value])));
  };

  const handleTagClose = (removedTag: string) => {
    const updatedOptions = selectedOptions.filter((tag) => tag !== removedTag);
    setSelectedOptions(updatedOptions);
  };

  return (
    <div className="flex items-center space-x-4">
      <p className="text-lg font-medium">Ticker</p>
      <Select
        placeholder="Select Ticker"
        onSelect={handleOptionChange}
        // options will change dynamically with api data
        options={[
          { value: "BABA UN", label: "BABA UN" },
          { value: "BABA US", label: "BABA US" },
          { value: "DXJ UP", label: "DXJ UP" },
          { value: "DXJ US", label: "DXJ US" },
          { value: "GLIN UP", label: "GLIN UP" },
          { value: "GLIN US", label: "GLIN US" },
        ]}
        className="w-[300px]"
      />
      <div>
        {selectedOptions.map((tag) => (
          <Tag key={tag} closable onClose={() => handleTagClose(tag)}>
            {tag}
          </Tag>
        ))}
      </div>
    </div>
  );
}
