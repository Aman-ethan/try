import React from "react";
import { PieConfig, measureTextWidth } from "@ant-design/plots";

export interface IPieData {
  type: string;
  value: number;
}
export interface IPercentageData extends IPieData {
  percentage: number;
}
/**
 * Function to render text with appropriate scaling based on the container width.
 * @param {number} containerWidth - The width of the container where the text will be placed.
 * @param {string} text - The text to be displayed.
 * @param {React.CSSProperties} style - The style properties of the text.
 * @return {string} - A string representing a div containing the text with adjusted style.
 */
export function renderTextInsideContainer(
  containerWidth: number,
  text: string,
  textStyle: React.CSSProperties
) {
  // Measure the width and height of the text with the given style
  const { width: textWidth, height: textHeight } = measureTextWidth(
    text,
    textStyle
  );

  // The radius of the container assuming it's a circle
  const R = containerWidth / 2;

  // Initialize scale to 1
  let scale = 0.8;

  // If the container width is less than the text width
  // Adjust the scale such that the text fits in the container
  if (containerWidth < textWidth) {
    scale = Math.min(
      Math.sqrt(Math.abs(R ** 2 / ((textWidth / 2) ** 2 + textHeight ** 2))),
      1
    );
  }

  // Set the width of the text equal to the container width
  const textStyleStr = `width:${containerWidth}px;`;

  // Return a div containing the text with the adjusted style.
  // The font-size is scaled and the line-height is set to 1 if the scale is less than 1; otherwise, it's set to 'inherit'.
  return `<div style="${textStyleStr};font-size:${scale}em;line-height:${
    scale < 1 ? 1 : "inherit"
  };">${text}</div>`;
}

type TProcessedData = {
  grossValue: number;
  pieChartData: IPercentageData[];
};

export function processDataForPieChart(data: IPieData[]): TProcessedData {
  // Calculate the gross value
  const grossValue = data.reduce((acc, item) => acc + item.value, 0);

  // Calculate the absolute value of each item and sort them by percentage
  const pieChartData = data
    .map((item) => {
      const absoluteValue = Math.abs(item.value);
      const percentage = parseFloat(
        ((absoluteValue / grossValue) * 100).toFixed(2)
      );

      return {
        ...item,
        value: absoluteValue,
        percentage,
      };
    })
    .sort((a, b) => b.percentage - a.percentage);

  // Return the processed data
  return {
    grossValue,
    pieChartData,
  };
}

const defaultPieChartConfig: PieConfig = {
  legend: false,
  appendPadding: 10,
  data: [],
  angleField: "percentage",
  colorField: "type",
  radius: 1,
  innerRadius: 0.6,
  label: {
    type: "inner",
    offset: "-50%",
    content: "{percentage}",
    style: {
      textAlign: "center",
      fontSize: 14,
    },
  },
  interactions: [
    {
      type: "element-selected",
    },
    {
      type: "element-active",
    },
    {
      type: "pie-statistic-active",
    },
  ],
  statistic: {
    content: {
      style: {
        whiteSpace: "pre-wrap",
        overflow: "hidden",
        textOverflow: "ellipsis",
        marginTop: "10px",
      },
      content: "",
    },
  },
};

export default defaultPieChartConfig;
