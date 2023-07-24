import React from "react";
import { PieConfig, measureTextWidth } from "@ant-design/plots";

/**
 * Function to render text with appropriate scaling based on the container width.
 * @param {number} containerWidth - The width of the container where the text will be placed.
 * @param {string} text - The text to be displayed.
 * @param {React.CSSProperties} style - The style properties of the text.
 * @return {string} - A string representing a div containing the text with adjusted style.
 */
function renderTextInsideContainer(
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
  let scale = 1;

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

const defaultPieChartConfig: PieConfig = {
  legend: false,
  appendPadding: 10,
  data: [],
  angleField: "value",
  colorField: "type",
  radius: 1,
  innerRadius: 0.6,
  label: {
    type: "inner",
    offset: "-50%",
    content: "{value}%",
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
      customHtml: (container, _view, datum, pieDataPoints) => {
        const { width } = container.getBoundingClientRect();
        const text = datum
          ? `${datum.value}M`
          : `${pieDataPoints?.reduce((r, d) => r + d.value, 0)}M`;
        return renderTextInsideContainer(width, text, { fontSize: 14 });
      },
    },
  },
};

export default defaultPieChartConfig;
