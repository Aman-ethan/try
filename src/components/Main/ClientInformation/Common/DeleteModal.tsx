"use client";

import { DeleteOutlined, DeleteTwoTone } from "@ant-design/icons";
import { Button, Drawer, Popconfirm, message } from "antd";
import { useState } from "react";
import revalidate from "@/lib/revalidate";
import { useTransactionServerDeleteMutation } from "@/hooks/useMutation";
import { TTabType } from "@/interfaces/Main";

const DeleteHeader = {
  goals: "Goal",
  bank_account: "Bank Account",
  estate: "Estate",
};
interface IDeleteModalProps {
  id: string;
  type: TTabType;
}

function useDeleteClient({ type, id }: IDeleteModalProps) {
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

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Button
        className="ml-4 border-red-300"
        type="default"
        onClick={showModal}
        size="large"
        icon={<DeleteOutlined className="text-red-600" />}
      />
      <Popconfirm
        className="mob:hidden tab:block"
        title={
          <div className="flex justify-center">
            <DeleteTwoTone twoToneColor="#F5222D" className="mr-2" />
            Delete this {DeleteHeader[type]}?
          </div>
        }
        description={`Deleting this ${DeleteHeader[type]} may impact related areas.`}
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

      <Drawer
        className="mob:block tab:hidden"
        title={
          <div className="flex justify-center">
            <DeleteTwoTone twoToneColor="#F5222D" className="mr-2" />
            Delete this {DeleteHeader[type]}?
          </div>
        }
        placement="bottom"
        closable={false}
        onClose={handleCancel}
        open={isModalOpen}
        key="bottom"
        height="auto"
        footer={
          <div className="flex flex-col gap-4">
            <Button type="primary" danger onClick={trigger}>
              Delete
            </Button>
            <Button onClick={handleCancel}>Cancel</Button>
          </div>
        }
      >
        <p className="text-center">
          Deleting this {DeleteHeader[type]} may impact related areas.
        </p>
      </Drawer>
    </>
  );
}
