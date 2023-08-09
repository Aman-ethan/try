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
        key: "/analytics/crude/gross-allocations",
        label: (
          <Link href="/analytics/crude/gross-allocations">
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
        key: "/position-search",
        label: <Link href="/position-search">Balance Sheet</Link>,
      },
      {
        key: "/transaction",
        label: (
          <Link href={`/transaction?page_size=${DEFAULT_PAGE_SIZE}`}>
            Transaction
          </Link>
        ),
      },
      {
        disabled: true,
        key: "/profit-and-loss",
        label: "Profit & Loss",
      },
      {
        disabled: true,
        key: "/cash-flow",
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
        key: "/t+1/transaction",
        label: (
          <Link href={`/t+1/transaction?page_size=${DEFAULT_PAGE_SIZE}`}>
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
    key: "statements",
    label: "Document VaultZ",
    icon: <ProfileOutlined />,
    children: [
      {
        key: "/statements/bank",
        label: (
          <Link
            href={`/statements/bank?ordering=-statement_date&page_size=${DEFAULT_PAGE_SIZE}`}
          >
            Bank Statement
          </Link>
        ),
      },
      {
        key: "/statements/trade",
        label: (
          <Link
            href={`/statements/trade?ordering=-statement_date&page_size=${DEFAULT_PAGE_SIZE}`}
          >
            Trade Statement
          </Link>
        ),
      },
      {
        key: "/statements/position",
        label: (
          <Link
            href={`/statements/position?ordering=-statement_date&page_size=${DEFAULT_PAGE_SIZE}`}
          >
            Position Statement
          </Link>
        ),
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
