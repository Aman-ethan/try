"use client";

import {
  CaretDownFilled,
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  SyncOutlined,
} from "@ant-design/icons";
import { useMediaQuery } from "@mantine/hooks";
import {
  Avatar,
  Button,
  Divider,
  Dropdown,
  Input,
  Layout,
  Menu,
  Row,
} from "antd";
import Link from "next/link";
import { usePathname, useSelectedLayoutSegments } from "next/navigation";
import { ReactNode, useLayoutEffect, useState } from "react";
import clsx from "clsx";
import { useTransactionServerQuery } from "@/hooks/useQuery";
import useAuth from "@/hooks/useAuth";
import ROUTE from "@/constants/route";
import Logo from "@/components/Icon/Logo";
import { TCurrency } from "@/interfaces/Main";
import CurrencyTag from "../General/CurrencyTag";
import CollapsedLogo from "../Icon/CollapsedLogo";
import SelectDurationWithParams from "../Input/SelectDurationWithParams";

interface ILayoutProps {
  children: ReactNode;
}

interface IUser {
  name: string;
  username: string;
  reporting_currency: TCurrency | null;
}

const iconClassName = "text-neutral-11";

const currentDate = new Date();

function UserProfile({
  name,
  username,
}: Omit<Partial<IUser>, "reporting_currency">) {
  const { logout } = useAuth();

  const ProfileItems = [
    {
      label: <Link href="/change-password">Change Password</Link>,
      key: "change-password",
      icon: <SyncOutlined className={iconClassName} />,
    },
    {
      label: (
        <Link
          href="/login"
          onClick={() => {
            document.body.classList.add("opacity-0");
            logout();
          }}
        >
          Logout
        </Link>
      ),
      key: "logout",
      icon: <LogoutOutlined className={iconClassName} />,
    },
  ];
  return (
    <Dropdown
      menu={{ items: ProfileItems }}
      placement="bottomRight"
      trigger={["click"]}
    >
      <div className="flex items-center cursor-pointer gap-x-2">
        <Avatar />
        <div className="text-sm font-medium capitalize text-neutral-13 min-w-[4rem]">
          {name || username}
        </div>
        <CaretDownFilled />
      </div>
    </Dropdown>
  );
}

export default function DashboardLayout({ children }: ILayoutProps) {
  const [collapsed, setCollapsed] = useState(false);
  const { data } = useTransactionServerQuery<IUser>("/users/me/");
  const pathname = usePathname();
  const layoutSegments = useSelectedLayoutSegments();
  const SIDEBAR_BREAK_POINT = useMediaQuery("(max-width: 992px)");

  const { name, username, reporting_currency } = data || {};

  useLayoutEffect(() => {
    if (SIDEBAR_BREAK_POINT) {
      setCollapsed(true);
    } else {
      setCollapsed(false);
    }
  }, [SIDEBAR_BREAK_POINT]);

  const openKey = layoutSegments.length > 1 ? [layoutSegments[0]] : undefined;
  const selectedKeys = pathname ? [pathname] : undefined;
  return (
    <Layout suppressHydrationWarning hasSider>
      <Layout.Sider
        trigger={null}
        collapsed={collapsed}
        onCollapse={() => setCollapsed(true)}
        collapsible
        className="fixed h-screen bg-neutral-1 border-r-2"
        width={240}
      >
        <div className="px-6 pb-6 pt-4">
          {collapsed ? <CollapsedLogo /> : <Logo />}
        </div>
        <Menu
          selectedKeys={selectedKeys}
          defaultOpenKeys={openKey}
          items={ROUTE}
          mode="inline"
        />
      </Layout.Sider>
      <Layout className={collapsed ? "ml-20" : "ml-60"}>
        <Layout.Header
          className={clsx(
            "fixed inset-0 z-10 flex bg-neutral-1 pl-6 pr-12",
            collapsed ? "ml-20" : "ml-60"
          )}
        >
          <Row className="flex-1 gap-x-6" align="middle">
            <Button
              onClick={() => setCollapsed((prev) => !prev)}
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              className="text-base text-neutral-13/40"
            />
            <Input.Search
              className="max-w-[22rem]"
              size="middle"
              placeholder="Search for Position, Market Data..."
              disabled
            />
          </Row>
          <Row className="gap-x-6" align="middle">
            <SelectDurationWithParams />
            <Divider type="vertical" className="text-neutral-13/5" />
            <CurrencyTag currency={reporting_currency || "usd"} />
            <Divider type="vertical" className="text-neutral-13/5" />
            <UserProfile name={name} username={username} />
          </Row>
        </Layout.Header>
        <Layout.Content className="mt-16">
          <div className="min-h-full p-4 tab:p-6 lap:py-6 lap:px-12 bg-neutral-3">
            {children}
          </div>
          <Layout.Footer className="flex justify-center bg-neutral-3">
            ETHAN-AI &copy; ALL RIGHTS RESERVED {currentDate.getFullYear()}
            {". "}
            Version: 2.0.0
          </Layout.Footer>
        </Layout.Content>
      </Layout>
    </Layout>
  );
}
