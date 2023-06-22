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
    label: <Link href="/overview">Overview</Link>,
    icon: <FileSearchOutlined />,
  },
  {
    key: "analytics",
    label: "Analytics",
    icon: <LineChartOutlined />,
    children: [
      {
        key: "/analytics/crude",
        label: <Link href="/analytics/crude">Crude Analytics</Link>,
      },
      {
        key: "/analytics/generative",
        label: <Link href="/analytics/generative">Generative Analytics</Link>,
      },
    ],
  },
  {
    key: "/position-search",
    label: <Link href="/position-search">Position Search</Link>,
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
    label: <Link href="/market-and-rates">Market & Rates</Link>,
    icon: <DotChartOutlined />,
  },
];

export default ROUTE;
