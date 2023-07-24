"use client";

import Logo from "@/components/Icon/Logo";
import ROUTE from "@/constants/route";
import { MenuItemClassName } from "@/constants/strings";
import useAuth from "@/hooks/useAuth";
import { useTransactionServerQuery } from "@/hooks/useQuery";
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
import {
  usePathname,
  useRouter,
  useSelectedLayoutSegments,
} from "next/navigation";
import { ReactNode, useEffect, useLayoutEffect, useState } from "react";
import CurrencyTag from "../General/CurrencyTag";
import CollapsedLogo from "../Icon/CollapsedLogo";

interface ILayoutProps {
  children: ReactNode;
}

interface IUser {
  name: string;
  username: string;
}

// const FooterLink = [
//   { key: "faq", title: "FAQ", href: "https://www.ethan-ai.com/faq2" },
//   {
//     key: "privacy_policy",
//     title: "Privacy Policy",
//     href: "https://www.ethan-ai.com/privacy",
//   },
// ];
const iconClassName = "text-neutral-11";

const currentDate = new Date();

function User() {
  const { data } = useTransactionServerQuery<IUser>("/users/me/");
  const { name, username } = data || {};
  return (
    <>
      <Avatar />
      <span className="text-sm font-medium capitalize text-neutral-13">
        {name || username}
      </span>
    </>
  );
}

function UserProfile() {
  const { logout } = useAuth();
  const { prefetch } = useRouter();

  useEffect(() => {
    prefetch("/login");
  }, [prefetch]);

  const ProfileItems = [
    {
      label: <Link href="/change-password">Change Password</Link>,
      key: "change-password",
      icon: <SyncOutlined className={iconClassName} />,
    },
    {
      label: (
        <button
          type="button"
          className={MenuItemClassName}
          onClick={() => logout()}
        >
          Logout
        </button>
      ),
      key: "logout",
      icon: <LogoutOutlined className={iconClassName} />,
    },
  ];
  return (
    <Dropdown menu={{ items: ProfileItems }} trigger={["click"]}>
      <div className="cursor-pointer space-x-2">
        <User />
        <CaretDownFilled />
      </div>
    </Dropdown>
  );
}

export default function DashboardLayout({ children }: ILayoutProps) {
  const pathname = usePathname();
  const layoutSegments = useSelectedLayoutSegments();
  const SIDEBAR_BREAK_POINT = useMediaQuery("(max-width: 992px)");
  const [collapsed, setCollapsed] = useState(false);

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
    <Layout suppressHydrationWarning hasSider className="h-full">
      <Layout.Sider
        trigger={null}
        collapsed={collapsed}
        onCollapse={() => setCollapsed(true)}
        collapsible
        className="fixed h-screen bg-neutral-1"
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
        <Layout.Header className="sticky top-0 z-10 flex bg-neutral-1 pl-6 pr-12">
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
            />
          </Row>
          <Row className="gap-x-6" align="middle">
            <CurrencyTag currency="sgd" />
            <Divider type="vertical" className="text-neutral-13/5" />
            <UserProfile />
          </Row>
        </Layout.Header>
        <Layout.Content>
          <div className="min-h-full bg-neutral-3">{children}</div>
          <Layout.Footer className="flex justify-center bg-neutral-3">
            ETHAN-AI &copy; ALL RIGHTS RESERVED {currentDate.getFullYear()}
            {". "}
            Version: 1.2.0
          </Layout.Footer>
        </Layout.Content>
      </Layout>
    </Layout>
  );
}
