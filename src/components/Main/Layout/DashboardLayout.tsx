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
import { usePathname, useRouter } from "next/navigation";
import { ReactNode, useState } from "react";
import CollapsedLogo from "../Icon/CollapsedLogo";
import CurrencyTag from "../General/CurrencyTag";

interface ILayoutProps {
  children: ReactNode;
}

const FooterLink = [
  { key: "faq", title: "FAQ", href: "https://www.ethan-ai.com/faq2" },
  {
    key: "privacy_policy",
    title: "Privacy Policy",
    href: "https://www.ethan-ai.com/privacy",
  },
];

const labelClassName = "text-neutral-13/80";
const iconClassName = "text-neutral-11";

const ProfileItems: MenuProps["items"] = [
  {
    label: <span className={labelClassName}>Change Password</span>,
    key: "change-password",
    icon: <SyncOutlined className={iconClassName} />,
  },
  {
    label: <span className={labelClassName}>Logout</span>,
    key: "logout",
    icon: <LogoutOutlined className={iconClassName} />,
  },
];
const currentDate = new Date();

export default function DashboardLayout({ children }: ILayoutProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Layout hasSider className="h-full">
      <Layout.Sider
        trigger={null}
        collapsed={collapsed}
        onCollapse={() => setCollapsed(true)}
        collapsible
        className="bg-neutral-1 fixed h-screen"
        width={240}
      >
        <div className="pt-4 pb-6 px-6">
          {collapsed ? <CollapsedLogo /> : <Logo />}
        </div>
        <Menu
          defaultSelectedKeys={[pathname]}
          defaultOpenKeys={[pathname.split("/")[1]]}
          items={ROUTE}
          mode="inline"
        />
      </Layout.Sider>
      <Layout className={collapsed ? "ml-20" : "ml-60"}>
        <Layout.Header className="flex bg-neutral-1 pl-6 pr-12 sticky top-0 z-10">
          <Row className="gap-x-6 flex-1" align="middle">
            <Button
              onClick={() => setCollapsed((prev) => !prev)}
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              className="text-neutral-13/40 text-base"
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
            <Dropdown
              menu={{ items: ProfileItems }}
              trigger={["click"]}
              className="cursor-pointer"
            >
              <div className="space-x-2">
                <Avatar />
                <span className="text-sm text-neutral-13 font-medium">
                  Ravi
                </span>
                <CaretDownFilled />
              </div>
            </Dropdown>
          </Row>
        </Layout.Header>
        <Layout.Content className="bg-neutral-3">
          <div className="min-h-full flex">{children}</div>
          <Layout.Footer className="bg-neutral-3 flex justify-center">
            ETHAN-AI &copy; ALL RIGHTS RESERVED {currentDate.getFullYear()}
          </Layout.Footer>
        </Layout.Content>
      </Layout>
    </Layout>
  );
}
