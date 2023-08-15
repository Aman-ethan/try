import {
  ContainerOutlined,
  DotChartOutlined,
  FileSearchOutlined,
  LineChartOutlined,
  ProfileOutlined,
  UserOutlined,
} from "@ant-design/icons";
import Link from "next/link";
import { DEFAULT_PAGE_SIZE } from "./table";

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
        key: "/analytics/preset",
        label: (
          <Link href="/analytics/preset/gross-allocations">
            Preset Analytics
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
    key: "consolidation",
    label: "Consolidation",
    icon: <ContainerOutlined />,
    children: [
      {
        key: "/consolidation/position-search",
        label: <Link href="/consolidation/position-search">Balance Sheet</Link>,
      },
      {
        key: "/consolidation/transaction",
        label: (
          <Link
            href={`/consolidation/transaction?page_size=${DEFAULT_PAGE_SIZE}`}
          >
            Transaction
          </Link>
        ),
      },
      {
        disabled: true,
        key: "/consolidation/profit-and-loss",
        label: "Profit & Loss",
      },
      {
        disabled: true,
        key: "/consolidation/cash-flow",
        label: "Cash Flow",
      },
    ],
  },
  {
    key: "t+1",
    label: "T+1",
    icon: <LineChartOutlined />,
    children: [
      {
        key: "/t+1/trades",
        label: (
          <Link href={`/t+1/trades?page_size=${DEFAULT_PAGE_SIZE}`}>
            Trades
          </Link>
        ),
      },
      {
        key: "/t+1/active-positions",
        label: (
          <Link href={`/t+1/active-positions?page_size=${DEFAULT_PAGE_SIZE}`}>
            Active Positions
          </Link>
        ),
      },
    ],
  },
  {
    key: "vaultZ",
    label: "Document VaultZ",
    icon: <ProfileOutlined />,
    children: [
      {
        key: "/vaultZ/bank",
        label: (
          <Link
            href={`/vaultZ/bank?ordering=-statement_date&page_size=${DEFAULT_PAGE_SIZE}`}
          >
            Bank Statement
          </Link>
        ),
      },
      {
        key: "/vaultZ/trade",
        label: (
          <Link
            href={`/vaultZ/trade?ordering=-statement_date&page_size=${DEFAULT_PAGE_SIZE}`}
          >
            Trade Statement
          </Link>
        ),
      },
      {
        key: "/vaultZ/position",
        label: (
          <Link
            href={`/vaultZ/position?ordering=-statement_date&page_size=${DEFAULT_PAGE_SIZE}`}
          >
            Position Statement
          </Link>
        ),
      },
    ],
  },
  {
    key: "/investor-profile",
    label: <Link href="/investor-profile">Investor Profile</Link>,
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
