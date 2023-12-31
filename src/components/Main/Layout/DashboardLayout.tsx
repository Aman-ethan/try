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
import clsx from "clsx";
import en from "dayjs/locale/en";
import dayjs from "dayjs";
import useAuth from "@/hooks/useAuth";
import ROUTE from "@/constants/route";
import Logo from "@/components/Icon/Logo";
import { IUser } from "@/interfaces/Main";
import Sidebar from "@/components/Sidebar/Sidebar";
import useSidebar from "@/hooks/useSidebar";
import CurrencyTag from "../General/CurrencyTag";
import CollapsedLogo from "../Icon/CollapsedLogo";
import SelectDurationWithParams from "../Input/SelectDurationWithParams";

dayjs.locale(en);

interface ILayoutProps {
  children: ReactNode;
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
        <CaretDownFilled className="hidden tab:block" />
      </div>
    </Dropdown>
  );
}

export default function DashboardLayout({ children }: ILayoutProps) {
  const [collapsed, setCollapsed] = useState(false);
  const { name, openKey, reporting_currency, selectedKeys, username } =
    useSidebar();

  const SIDEBAR_BREAK_POINT = useMediaQuery("(max-width: 1280px)");

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
  const collapsedLayoutClassName = collapsed
    ? "ml-0 tab:ml-[3.75rem]"
    : "ml-60";

  return (
    <Layout suppressHydrationWarning hasSider>
      <div>
        <Drawer
          placement="left"
          width={330}
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
        className="fixed hidden border-r border-t-0 border-solid border-neutral-5 bg-neutral-1 tab:block"
        width={240}
        collapsedWidth={60}
      >
        <div className={clsx("pb-6 pt-4", collapsed ? "px-3" : "px-6")}>
          {collapsed ? <CollapsedLogo /> : <Logo />}
        </div>
        <Menu
          selectedKeys={selectedKeys}
          defaultOpenKeys={openKey}
          items={ROUTE}
          mode="inline"
          className="scrollbar-hidden h-[calc(100vh-4.75rem)] overflow-y-auto"
        />
      </Layout.Sider>

      <Layout className={collapsedLayoutClassName}>
        <Layout.Header
          className={clsx(
            "fixed inset-0 z-20 flex justify-between bg-neutral-1 px-2 tab:px-3 desk:px-5",
            collapsedLayoutClassName
          )}
        >
          <Row
            className="flex-1 flex-nowrap items-center justify-between pr-1 tab:justify-start tab:pr-3"
            align="middle"
          >
            <div className="flex flex-row items-center gap-x-2 desk:gap-x-3">
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
                className="hidden w-auto lap:block lap:min-w-[15rem] desk:min-w-[20rem]"
                size="middle"
                placeholder="Search for Position, Market Data..."
                disabled
              />
            </div>
            <div className="ml-2 flex justify-center">
              <SearchOutlined className="text-xl lap:hidden" />
            </div>
          </Row>
          <Row
            className="mr-2 flex flex-row items-center gap-x-2 desk:gap-x-3"
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
