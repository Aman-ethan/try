"use client";

import { ReactNode, useLayoutEffect, useState } from "react";
import {
  CaretDownFilled,
  CloseOutlined,
  LogoutOutlined,
  MenuFoldOutlined,
  MenuOutlined,
  MenuUnfoldOutlined,
  SearchOutlined,
  SyncOutlined,
} from "@ant-design/icons";
import { useMediaQuery } from "@mantine/hooks";
import {
  Avatar,
  Button,
  Divider,
  Drawer,
  Dropdown,
  Input,
  Layout,
  Menu,
  Row,
} from "antd";
import Link from "next/link";
import { usePathname, useSelectedLayoutSegments } from "next/navigation";

import clsx from "clsx";
import en from "dayjs/locale/en";
import dayjs from "dayjs";
import { useTransactionServerQuery } from "@/hooks/useQuery";
import useAuth from "@/hooks/useAuth";
import ROUTE from "@/constants/route";
import Logo from "@/components/Icon/Logo";
import { TCurrency } from "@/interfaces/Main";
import Sidebar from "@/components/Sidebar/Sidebar";
import CurrencyTag from "../General/CurrencyTag";
import CollapsedLogo from "../Icon/CollapsedLogo";
import SelectDurationWithParams from "../Input/SelectDurationWithParams";

dayjs.locale(en);

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
      trigger={["click"]}
      placement="bottomRight"
    >
      <div className="flex cursor-pointer items-center gap-x-2">
        <Avatar />
        <div className="hidden w-auto text-sm font-medium capitalize text-neutral-13 lap:block lap:min-w-[4rem]">
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
  const SIDEBAR_BREAK_POINT = useMediaQuery("(max-width: 1024px)");

  const { name, username, reporting_currency } = data || {};
  const openKey = layoutSegments.length > 1 ? [layoutSegments[0]] : undefined;
  const selectedKeys = pathname ? [pathname] : undefined;

  useLayoutEffect(() => {
    if (SIDEBAR_BREAK_POINT) {
      setCollapsed(true);
    } else {
      setCollapsed(false);
    }
  }, [SIDEBAR_BREAK_POINT]);

  const [open, setOpen] = useState(false);
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  return (
    <Layout suppressHydrationWarning hasSider>
      <div>
        <Drawer
          placement="left"
          closeIcon={
            <span
              style={{
                position: "absolute",
                top: "12px",
                right: "12px",
                cursor: "pointer",
              }}
            >
              <CloseOutlined />
            </span>
          }
          headerStyle={{ borderBottom: "none" }}
          onClose={onClose}
          open={open}
        >
          <Sidebar onClose={() => setOpen(false)} />
        </Drawer>
      </div>
      <Layout.Sider
        trigger={null}
        collapsed={collapsed}
        onCollapse={() => setCollapsed(true)}
        collapsible
        className="fixed hidden h-screen border-r border-red-400 bg-neutral-1 tab:block"
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
          className="border-none"
        />
      </Layout.Sider>

      <Layout className={collapsed ? "ml-0 tab:ml-20" : "ml-60"}>
        <Layout.Header
          className={clsx(
            "fixed inset-0 z-10 flex justify-between bg-neutral-1 px-3 tab:px-4 lap:px-5",
            collapsed ? "ml-0 tab:ml-20" : "ml-60"
          )}
        >
          <Row
            className="flex-1 flex-nowrap items-center justify-between gap-x-2 pr-0.5 tab:pr-3 lap:gap-x-6"
            align="middle"
          >
            <div className="flex flex-row items-center tab:gap-3 lap:gap-4">
              <Button
                onClick={() => setCollapsed((prev) => !prev)}
                type="text"
                icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                size="large"
                className="hidden text-base text-neutral-13/40 tab:block"
              />
              <Button
                size="large"
                type="text"
                onClick={showDrawer}
                icon={<MenuOutlined />}
                className="text-base text-neutral-13/40 tab:hidden"
              />
              <div className="flex pl-3 tab:hidden">
                <Logo />
              </div>
              <Input.Search
                className="hidden w-auto tab:block lap:w-[22rem]"
                size="middle"
                placeholder="Search for Position, Market Data..."
                disabled
              />
            </div>
            <div className="flex justify-center">
              <SearchOutlined className="text-xl tab:hidden" />
            </div>
          </Row>
          <Row
            className="flex flex-row items-center pl-0 tab:gap-x-1 lap:gap-x-4 lap:pl-3"
            align="middle"
          >
            <div className="hidden tab:block">
              <SelectDurationWithParams />
            </div>

            <Divider type="vertical" className="text-neutral-13/5" />
            <div className="hidden tab:block">
              <CurrencyTag currency={reporting_currency || "usd"} />
            </div>

            <Divider
              type="vertical"
              className="hidden text-neutral-13/5 tab:block"
            />
            <UserProfile name={name} username={username} />
          </Row>
        </Layout.Header>
        <Layout.Content className="mt-16">
          <div className="min-h-screen bg-neutral-3 p-4 tab:p-6 lap:px-12 lap:py-6">
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
