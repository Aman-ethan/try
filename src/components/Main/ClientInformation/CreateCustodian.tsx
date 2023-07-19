"use client";

import { message, SelectProps, Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import React, { useState } from "react";
import useSelectCustodian from "@/hooks/useSelectCustodian";
import { TSelectCustodianParams } from "@/interfaces/Main";
import useDependentSelect from "@/hooks/useDependentSelect";
import { useTransactionServerMutation } from "@/hooks/useMutation";
import Select from "@/components/Input/Select";
import revalidate from "@/lib/revalidate";
import useSearchParams from "@/hooks/useSearchParams";

export default function CreateCustodian({
  params,
  reset,
  ...props
}: SelectProps &
  Partial<{ params: TSelectCustodianParams; reset: () => void }>) {
  const { isLoading, options } = useSelectCustodian(params);
  const [addCustodian, setAddCustodian] = useState(false);
  const [name, setName] = useState("");
  const [showFormActions, setShowFormActions] = useState(false);
  const { get: getSearchParams } = useSearchParams();
  const client_id = getSearchParams("client_id");

  useDependentSelect({
    dependsOn: params?.clientId,
    dependentProps: {
      isLoading,
      options,
      reset,
      value: props.value,
    },
  });

  const { trigger } = useTransactionServerMutation("/custodian/", {
    onSuccess: () => {
      message.success("Custodian Added successfully");
      setAddCustodian(false);
      revalidate("/custodian/");
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
      filterOption={(input, option) =>
        (option?.label ?? "")
          .toLocaleString()
          .toLowerCase()
          .includes(input.toLocaleString().toLowerCase())
      }
      dropdownRender={renderDropdown}
      onFocus={handleFocus}
    />
  );
}
