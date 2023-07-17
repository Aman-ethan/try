"use client";

import Logo from "@/components/Icon/Logo";
import ROUTE from "@/constants/route";
import {
  CaretDownFilled,
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  SyncOutlined,
} from "@ant-design/icons";
import {
  Avatar,
  Button,
  Divider,
  Dropdown,
  Input,
  Layout,
  Menu,
  MenuProps,
  Row,
} from "antd";
import { usePathname } from "next/navigation";
import { ReactNode, useState } from "react";
import { useTransactionServerQuery } from "@/hooks/useQuery";
import Link from "next/link";
import CollapsedLogo from "../Icon/CollapsedLogo";
import CurrencyTag from "../General/CurrencyTag";
import Logout from "../General/Logout";

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

const ProfileItems: MenuProps["items"] = [
  {
    label: <Link href="/change-password">Change Password</Link>,
    key: "change-password",
    icon: <SyncOutlined className={iconClassName} />,
  },
  {
    label: <Logout />,
    key: "logout",
    icon: <LogoutOutlined className={iconClassName} />,
  },
];

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
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Layout hasSider className="h-full">
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
          selectedKeys={[pathname]}
          openKeys={[pathname.split("/")[1]]}
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
          </Layout.Footer>
        </Layout.Content>
      </Layout>
    </Layout>
  );
}
