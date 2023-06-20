import { ThemeConfig, theme as AntdTheme } from "antd";

export const primaryColorName = "blue";
export const primaryColor = "#1890FF";
export const neutralColor = "#000000";

const theme: ThemeConfig = {
  token: {
    [primaryColorName]: primaryColor,
    colorPrimary: primaryColor,
    colorLink: primaryColor,
    colorText: neutralColor,
  },
  algorithm: AntdTheme.defaultAlgorithm,
  components: {
    Typography: {
      titleMarginBottom: 0,
      titleMarginTop: 0,
      fontWeightStrong: 500,
    },
    Form: {
      controlHeight: 14,
      controlHeightLG: 14,
      controlHeightSM: 14,
      controlHeightXS: 14,
      margin: 0,
      marginMD: 0,
      marginSM: 0,
      marginLG: 0,
      marginXL: 0,
      marginXS: 0,
      marginXXL: 0,
      marginXXS: 0,
    },
  },
};

export default theme;
