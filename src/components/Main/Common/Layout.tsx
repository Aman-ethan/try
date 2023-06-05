"use client";

import Logo from "@/components/Auth/Common/Logo";
import ROUTE from "@/constants/route";
import logout from "@/lib/logout";
import {
  LockOutlined,
  LogoutOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import {
  DefaultFooter,
  MenuDataItem,
  ProLayout,
  enUSIntl,
} from "@ant-design/pro-components";
import { Button, ConfigProvider, Dropdown, MenuProps, Space } from "antd";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

interface ILayoutProps {
  children: ReactNode;
}

const MenuFooterItems: MenuProps["items"] = [
  {
    key: "logout",
    label: <span onClick={logout}>Logout</span>,
    icon: <LogoutOutlined />,
  },
  {
    key: "change_password",
    label: <Link href="/change-password">Change Password</Link>,
    icon: <LockOutlined />,
  },
];

const FooterLink = [
  { key: "faq", title: "FAQ", href: "https://www.ethan-ai.com/faq2" },
  {
    key: "privacy_policy",
    title: "Privacy Policy",
    href: "https://www.ethan-ai.com/privacy",
  },
];

function renderMenuItem(
  item: MenuDataItem,
  defaultDom: ReactNode,
  props: { collapsed?: boolean }
) {
  if (item.path)
    return (
      <Link className="space-x-2" href={item.path}>
        {props.collapsed ? (
          defaultDom
        ) : (
          <Space>
            {item.icon}
            {item.name}
          </Space>
        )}
      </Link>
    );
}

function renderMenuFooter() {
  return (
    <Dropdown menu={{ items: MenuFooterItems }}>
      <Button type="ghost" className="ml-auto block">
        <SettingOutlined />
      </Button>
    </Dropdown>
  );
}

function renderFooter() {
  const currentDate = new Date();
  return (
    <DefaultFooter
      links={FooterLink}
      copyright={`ETHAN-AI ALL RIGHTS RESERVED ${currentDate.getFullYear()}`}
    />
  );
}

export default function Layout({ children }: ILayoutProps) {
  const pathname = usePathname();
  return (
    <ConfigProvider locale={enUSIntl}>
      <ProLayout
        defaultCollapsed={false}
        logo={<Logo className="w-12 h-12 text-black" />}
        title="ethan.ai"
        className="h-full"
        menuItemRender={renderMenuItem}
        menu={{ autoClose: false }}
        selectedKeys={[pathname]}
        route={ROUTE}
        menuFooterRender={renderMenuFooter}
        footerRender={renderFooter}
      >
        {children}
      </ProLayout>
    </ConfigProvider>
  );
}
