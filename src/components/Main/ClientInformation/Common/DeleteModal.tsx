"use client";

import {
  DeleteOutlined,
  DeleteTwoTone,
  CloseOutlined,
} from "@ant-design/icons";
import { Button, Popconfirm, message } from "antd";
import { useState } from "react";
import { useMediaQuery } from "@mantine/hooks";
import revalidate from "@/lib/revalidate";
import { useTransactionServerDeleteMutation } from "@/hooks/useMutation";
import { TTabType } from "@/interfaces/Main";
import Title from "@/components/Typography/Title";
import Drawer from "../../General/Drawer";

const DeleteHeader = {
  goal: "Goal",
  bank_account: "Bank Account",
  estate: "Estate",
};
interface IDeleteModalProps {
  id: string;
  type: TTabType;
}

function useDeleteClient({ id, type }: IDeleteModalProps) {
  const { trigger } = useTransactionServerDeleteMutation(`/${type}/${id}/`, {
    onSuccess: () => {
      message.success(` ${DeleteHeader[type]} deleted successfully`);
      revalidate(`/${type}/`);
    },
  });

  return {
    trigger,
  };
}
export default function DeleteModal({ id, type }: IDeleteModalProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { trigger } = useDeleteClient({ id, type });

  const title = `Delete this ${DeleteHeader[type]}?`;
  const description = `Deleting this ${DeleteHeader[type]} may impact related areas.`;

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const MOBILE_BREAK_POINT = useMediaQuery("(max-width: 768px)");
  const content = (
    <Button
      className="ml-4 border-red-300 flex justify-center items-center"
      type="default"
      style={{ width: "34px", height: "34px" }}
      onClick={showModal}
      size="large"
      icon={<DeleteOutlined className="text-red-600" />}
    />
  );

  if (MOBILE_BREAK_POINT) {
    return (
      <Drawer
        button={content}
        title={
          <div className="flex gap-x-2">
            <DeleteTwoTone twoToneColor="#F5222D" />
            <p>{title}</p>
          </div>
        }
        onClose={handleCancel}
        placement="bottom"
        open={isModalOpen}
        key="bottom"
        height="auto"
        footer={
          <div className="flex flex-col gap-4">
            <Button type="primary" size="large" danger onClick={trigger}>
              Delete
            </Button>
            <Button onClick={handleCancel} size="large">
              Cancel
            </Button>
          </div>
        }
      >
        <p>{description}</p>
      </Drawer>
    );
  }

  return (
    <>
      {content}
      <Popconfirm
        title={
          <div className="flex items-center">
            <div className="flex flex-1 justify-center gap-x-2">
              <DeleteTwoTone
                twoToneColor="#F5222D"
                style={{ fontSize: "20px" }}
              />
              <Title level={5} className="font-medium">
                {title}
              </Title>
            </div>
            <CloseOutlined onClick={handleCancel} />
          </div>
        }
        description={<span>{description}</span>}
        placement="bottomRight"
        open={isModalOpen}
        onConfirm={trigger}
        onCancel={handleCancel}
        trigger="click"
        okText="Delete"
        cancelText="Cancel"
        icon={null}
        overlayClassName="delete-confirm-overlay"
        okButtonProps={{
          danger: true,
          size: "large",
          type: "primary",
          style: { flex: "1" },
        }}
        cancelButtonProps={{
          size: "large",
          style: { flex: "1" },
        }}
      />
    </>
  );
}
