import PortfolioIcon from "@/icons/Portfolio.svg";
import SummaryIcon from "@/icons/Summary.svg";
import PositionIcon from "@/icons/Position.svg";
import ClientMonthlyIcon from "@/icons/ClientMonthly.svg";
import {
  BankOutlined,
  CloudOutlined,
  RiseOutlined,
  StockOutlined,
  UploadOutlined,
} from "@ant-design/icons";

const ROUTE = {
  path: "/",
  routes: [
    { path: "/summary", name: "Overview (T+1)", icon: <SummaryIcon /> },
    { path: "/analysis", name: "Analysis (T+1)", icon: <PortfolioIcon /> },
    {
      path: "/position-search",
      name: "Position Search",
      icon: <PositionIcon />,
    },
    {
      path: "/trade-search",
      name: "Trade Search",
      icon: <StockOutlined />,
      routes: [
        {
          path: "/blotter-trades",
          name: "Blotter Trades",
          icon: <RiseOutlined />,
        },
        {
          path: "/trade-statements",
          name: "Trade Statements",
          icon: <StockOutlined />,
        },
      ],
    },
    {
      path: "/ethan-cloud",
      name: "Ethan Cloud",
      icon: <CloudOutlined />,
      routes: [
        { path: "/upload", name: "Upload", icon: <UploadOutlined /> },
        {
          path: "/client-monthly",
          name: "Client Monthly",
          icon: <ClientMonthlyIcon className="text-black" />,
        },
      ],
    },
    {
      path: "/client-information",
      name: "Client Information",
      icon: <BankOutlined />,
    },
    {
      path: "/blotter",
      name: "Blotter",
      icon: <RiseOutlined />,
    },
  ],
};

export default ROUTE;
