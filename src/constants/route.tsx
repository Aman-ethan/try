import {
  DotChartOutlined,
  FileSearchOutlined,
  LineChartOutlined,
  NodeIndexOutlined,
  ProfileOutlined,
  UserOutlined,
} from "@ant-design/icons";

const ROUTE = [
  { key: "/overview", label: "Overview", icon: <FileSearchOutlined /> },
  {
    key: "analytics",
    label: "Analytics",
    icon: <LineChartOutlined />,
    children: [
      { key: "/analytics/crude", label: "Crude Analytics" },
      { key: "/analytics/generative", label: "Generative Analytics" },
    ],
  },
  {
    key: "/position-search",
    label: "Position Search",
    icon: <NodeIndexOutlined />,
  },
  {
    key: "/blotter-trades",
    label: "Blotter Trades",
    icon: <DotChartOutlined />,
  },
  {
    key: "statements",
    label: "Statements",
    icon: <ProfileOutlined />,
    children: [
      {
        key: "/statements/bank",
        label: "Bank Statement",
      },
      {
        key: "/statements/trade",
        label: "Trade Statement",
      },
      {
        key: "/statements/position",
        label: "Position Statement",
      },
    ],
  },
  {
    key: "/customer-information",
    label: "Customer Information",
    icon: <UserOutlined />,
  },
  {
    disabled: true,
    key: "/market-and-rates",
    label: "Market & Rates",
    icon: <DotChartOutlined />,
  },
];

export default ROUTE;
