"use client";

import Logo from "@/components/Auth/Common/Logo";
import ROUTE from "@/constants/route";
import { flags } from "@/constants/symbols";
import {
  CaretDownFilled,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
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
  Tag,
} from "antd";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { ReactNode, useState } from "react";
import CollapsedLogo from "./CollapsedLogo";

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

const ProfileItems: MenuProps["items"] = [{ label: "Ravi", key: "" }];
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
        className="bg-white"
        width={240}
      >
        <div className="pt-4 pb-6 px-6">
          {collapsed ? <CollapsedLogo /> : <Logo />}
        </div>
        <Menu
          onClick={({ key }) => router.push(key)}
          defaultSelectedKeys={[pathname]}
          defaultOpenKeys={[pathname.split("/")[1]]}
          items={ROUTE}
          mode="inline"
        />
      </Layout.Sider>
      <Layout>
        <Layout.Header className="bg-white pl-6 pr-12 flex">
          <div className="gap-x-6 flex flex-1 items-center">
            <Button
              onClick={() => setCollapsed((prev) => !prev)}
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              className="text-black/40 text-base"
            />
            <Input.Search
              className="w-1/2"
              size="middle"
              placeholder="Search for Position, Market Data..."
            />
          </div>
          <div className="gap-x-6 flex items-center">
            <Tag className="py-1 px-2 space-x-2 flex items-center bg-neutral-3">
              <Image alt="flag" src={flags["sgd"]} width={24} height={18} />
              <span className="text-neutral-10 text-xs">SGD</span>
            </Tag>
            <Divider type="vertical" className="text-black/5" />

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
          </div>
        </Layout.Header>
        <Layout.Content className="bg-neutral-3">
          {children}
          <Layout.Footer className="bg-neutral-3 flex justify-center">
            ETHAN-AI &copy; ALL RIGHTS RESERVED {currentDate.getFullYear()}
          </Layout.Footer>
        </Layout.Content>
      </Layout>
    </Layout>
  );
}
