import {
  DotChartOutlined,
  FileSearchOutlined,
  LineChartOutlined,
  NodeIndexOutlined,
  ProfileOutlined,
  UserOutlined,
} from "@ant-design/icons";
import Link from "next/link";

const ROUTE = [
  {
    key: "/overview",
    label: "Overview",
    icon: <FileSearchOutlined />,
    disabled: true,
  },
  {
    key: "analytics",
    label: "Analytics",
    icon: <LineChartOutlined />,
    children: [
      {
        key: "/analytics/crude/gross-allocations",
        label: (
          <Link href="/analytics/crude/gross-allocations">Crude Analytics</Link>
        ),
      },
      {
        disabled: true,
        key: "/analytics/generative",
        label: "Generative Analytics",
      },
    ],
  },
  {
    disabled: true,
    key: "/position-search",
    label: "Position Search",
    icon: <NodeIndexOutlined />,
  },
  {
    key: "/trades/blotter-trades",
    label: <Link href="/trades/blotter-trades">Blotter Trades</Link>,
    icon: <DotChartOutlined />,
  },
  {
    key: "statements",
    label: "Statements",
    icon: <ProfileOutlined />,
    children: [
      {
        key: "/statements/bank",
        label: <Link href="/statements/bank">Bank Statement</Link>,
      },
      {
        key: "/statements/trade",
        label: <Link href="/statements/trade">Trade Statement</Link>,
      },
      {
        key: "/statements/position",
        label: <Link href="/statements/position">Position Statement</Link>,
      },
    ],
  },
  {
    key: "/customer-information",
    label: <Link href="/customer-information">Customer Information</Link>,
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
