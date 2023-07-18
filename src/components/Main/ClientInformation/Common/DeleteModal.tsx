"use client";

import { DeleteOutlined, DeleteTwoTone } from "@ant-design/icons";
import { Button, message, Popconfirm } from "antd";
import { useState } from "react";
import revalidate from "@/lib/revalidate";
import { useTransactionServerDeleteMutation } from "@/hooks/useMutation";

const DeleteHeader = {
  goals: "Goal",
  bank_account: "Bank Account",
  estate: "Estate",
};

type TDeleteType = keyof typeof DeleteHeader;
interface IDeleteModalProps {
  id: string;
  type: TDeleteType;
}

function useDeleteClient({ type, id }: IDeleteModalProps) {
  const { trigger } = useTransactionServerDeleteMutation(`/${type}/${id}/`, {
    onSuccess: () => {
      message.success(` ${DeleteHeader[type]} deleted successfully`);
      revalidate(`/${type}/`);
    },
    onError: () => {
      message.error(`Error deleting ${DeleteHeader[type]}`);
    },
  });
  return {
    trigger,
  };
}

export default function DeleteModal({ id, type }: IDeleteModalProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { trigger } = useDeleteClient({ id, type });

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Button
        className="ml-4"
        size="large"
        type="default"
        onClick={showModal}
        icon={<DeleteOutlined />}
      />
      <Popconfirm
        title={
          <div className="flex justify-center">
            <DeleteTwoTone twoToneColor="#F5222D" className="mr-2" />
            Delete this {DeleteHeader[type]}?
          </div>
        }
        description={`Are you sure you want to delete this ${DeleteHeader[type]} ?`}
        trigger="click"
        open={isModalOpen}
        okText="Delete"
        cancelText="Cancel"
        okButtonProps={{
          danger: true,
          ghost: true,
          type: "primary",
          size: "middle",
          style: { marginRight: 50 },
        }}
        cancelButtonProps={{ type: "default", size: "middle" }}
        onConfirm={trigger}
        onCancel={handleCancel}
        placement="bottomRight"
        icon={null}
        onOpenChange={setIsModalOpen}
      />
    </>
  );
}
