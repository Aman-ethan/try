import { useState, useEffect } from "react";
import { Modal, Skeleton, TableColumnsType } from "antd";
import Title from "antd/lib/typography/Title";
import Select from "@/components/Input/Select";
import ScrollableTable from "@/components/Main/Table/ScrollableTable";
import { IPieData, IPositionsResponse } from "@/interfaces/Main";
import { useTransactionServerQuery } from "@/hooks/useQuery";
import buildURLSearchParams from "@/lib/buildURLSearchParams";
import useSearchParams from "@/hooks/useSearchParams";

interface IAnalyticsModalProps {
  isModalOpen: boolean;
  handleModalClose: () => void;
  data: IPieData[];
  selectedType: string;
  category: string;
}

const columns: TableColumnsType = [
  {
    title: "ISIN",
    dataIndex: "isin",
    key: "isin",
  },
  {
    title: "Description",
    dataIndex: "description",
    key: "description",
  },
  {
    title: "Quantity",
    dataIndex: "quantity",
    key: "quantity",
  },
  {
    title: "Currency",
    dataIndex: "currency",
    key: "currency",
  },
  {
    title: "Average Price",
    dataIndex: "averagePrice",
    key: "averagePrice",
  },
  {
    title: "MTM Price",
    dataIndex: "mtmPrice",
    key: "mtmPrice",
  },
  {
    title: "Market Value",
    dataIndex: "marketValue",
    key: "marketValue",
  },
  {
    title: "Unrealized P&L",
    dataIndex: "unrealizedPL",
    key: "unrealizedPL",
  },
];

function useAnalytics(category: string, value: string) {
  const { get: getSearchParams } = useSearchParams();
  const client_id = getSearchParams("client") || undefined;
  const custodian_id = getSearchParams("custodian") || undefined;

  const params: Record<string, string | undefined> = {
    asset_class: category === "asset class" ? value : undefined,
    security__country_name: category === "region" ? value : undefined,
    security__sub_industry: category === "industry" ? value : undefined,
    client: client_id,
    custodian: custodian_id,
  };

  const { data: analyticsData, isLoading } =
    useTransactionServerQuery<IPositionsResponse>(
      `/position/history/${buildURLSearchParams(params)}`
    );
  return { analyticsData, isLoading };
}

interface ISelectOption {
  label: string;
  value: number;
}

export default function AnalyticsModal({
  isModalOpen,
  handleModalClose,
  data = [],
  selectedType,
  category,
}: IAnalyticsModalProps) {
  const [selectOptions, setSelectOptions] = useState<ISelectOption[]>([]);
  const [selectedOption, setSelectedOption] = useState<
    ISelectOption | undefined
  >();

  useEffect(() => {
    const newSelectOptions: ISelectOption[] = data.map((d) => ({
      label: d.type,
      value: d.value,
    }));

    setSelectOptions(newSelectOptions);

    const newSelectedOption = newSelectOptions.find(
      (option) => option.label === selectedType
    );

    setSelectedOption(newSelectedOption);
  }, [data, selectedType]);

  const handleSelectChange = (value: number, option: any) => {
    setSelectedOption(option);
  };

  const { analyticsData, isLoading } = useAnalytics(
    category,
    selectedOption ? selectedOption.label : ""
  );

  const tableData = analyticsData?.results?.map((item) => {
    return {
      isin: item.isin,
      description: item.security_name,
      quantity: item.quantity,
      currency: item.currency,
      averagePrice: item.average_price,
      mtmPrice: item.mtm_price,
      marketValue: item.market_value,
      unrealizedPL: item.unrealised_pl,
    };
  });

  return (
    <Modal
      open={isModalOpen}
      centered
      footer={null}
      width={1000}
      className="space-y-8"
      onCancel={handleModalClose}
    >
      <div className="flex flex-col space-y-4">
        <div className="flex flex-row items-center space-x-8">
          <Title className="capitalize" level={4}>
            {category}
          </Title>
          <Select
            className="w-1/3"
            options={selectOptions}
            value={selectedOption} // Use the value property of the selectedOption state
            onChange={handleSelectChange} // Assign the handler to the Select's onChange event
          />
        </div>
        {isLoading ? (
          <Skeleton />
        ) : (
          <ScrollableTable
            columns={columns}
            dataSource={tableData}
            scroll={{ y: "21rem" }}
          />
        )}
      </div>
    </Modal>
  );
}
