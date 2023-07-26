"use client";

import Select from "@/components/Input/Select";
import { useTransactionServerMutation } from "@/hooks/useMutation";
import useSearchParams from "@/hooks/useSearchParams";
import useSelectCustodian from "@/hooks/useSelectCustodian";
import { TCustodianParams } from "@/interfaces/Main";
import revalidate from "@/lib/revalidate";
import { PlusOutlined } from "@ant-design/icons";
import { Button, SelectProps, message } from "antd";
import React, { useState } from "react";

export default function CreateCustodian({
  params,
  ...props
}: SelectProps & Partial<{ params: TCustodianParams; reset: () => void }>) {
  const { isLoading, options } = useSelectCustodian(params);
  const [addCustodian, setAddCustodian] = useState(false);
  const [name, setName] = useState("");
  const [showFormActions, setShowFormActions] = useState(false);
  const { get: getSearchParams } = useSearchParams();
  const client_id = getSearchParams("client_id");

  const { trigger } = useTransactionServerMutation("/custodian/", {
    onSuccess: () => {
      revalidate("/custodian/", false);
      message.success("Custodian Added successfully");
      setAddCustodian(false);
    },
    onError: (error) => {
      message.error(error.message);
    },
  });

  // Logic before the return statement
  const handleSearch = (value: string) => {
    if (
      options?.findIndex((item) =>
        item.label.toLowerCase().includes(value.toLowerCase())
      ) === -1
    ) {
      setAddCustodian(true);
      setName(value);
    } else {
      setAddCustodian(false);
    }
  };

  const renderDropdown = (menu: React.ReactElement) => {
    if (addCustodian) {
      return (
        <>
          <Button
            type="text"
            className="min-w-full"
            icon={<PlusOutlined />}
            onClick={() => setShowFormActions(true)}
          >
            <span className="text-neutral-9">Add</span>
            <span className="ml-2">{name}</span>
          </Button>
          <div className="mt-2">
            {showFormActions && (
              <div className="flex justify-center gap-2 p-1">
                <Button
                  size="middle"
                  onClick={() => setShowFormActions(false)}
                  className="w-1/2"
                >
                  Cancel
                </Button>
                <Button
                  className="w-1/2"
                  type="primary"
                  size="middle"
                  onClick={() =>
                    trigger({
                      name,
                      client: [client_id],
                    })
                  }
                >
                  Confirm
                </Button>
              </div>
            )}
          </div>
        </>
      );
    }
    return menu;
  };

  const handleFocus = () => {
    setShowFormActions(false);
  };

  // JSX elements returned
  return (
    <Select
      loading={isLoading}
      options={options}
      {...props}
      onSearch={handleSearch}
      dropdownRender={renderDropdown}
      onFocus={handleFocus}
    />
  );
}
