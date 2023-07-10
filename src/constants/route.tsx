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
        key: "/analytics/crude/gross-allocations",
        label: (
          <Link href="/analytics/crude/gross-allocations">
            Present Analytics
          </Link>
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
    key: "/position-search",
    label: <Link href="/position-search">Balance Sheet</Link>,
    icon: <NodeIndexOutlined />,
  },
  {
    key: "t+1",
    label: "T+1",
    icon: <LineChartOutlined />,
    children: [
      {
        key: "/trades/blotter-trades",
        label: <Link href="/trades/blotter-trades">Transaction</Link>,
      },
      {
        key: "/trades/active-positions",
        label: <Link href="/trades/active-positions">Active Positions</Link>,
      },
    ],
  },
  {
    key: "statements",
    label: "Document VaultZ",
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
    key: "/client-information",
    label: <Link href="/client-information">Investor Profile</Link>,
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
