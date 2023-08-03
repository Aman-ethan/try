import { useState, useEffect } from "react";
import { Modal } from "antd";
import Title from "antd/lib/typography/Title";
import { ColumnType } from "antd/es/table";
import Select from "@/components/Input/Select";
import { IPieData, IPositionsResponse } from "@/interfaces/Main";
import useTable, { useTableFilter } from "@/hooks/useTable";
import { useTransactionServerQuery } from "@/hooks/useQuery";
import buildURLSearchParams from "@/lib/buildURLSearchParams";
import CurrencyTag from "@/components/Main/General/CurrencyTag";
import { formatQuantity } from "@/lib/format";
import ScrollableTable from "@/components/Main/Table/ScrollableTable";

interface IAnalyticsModalProps {
  isModalOpen: boolean;
  handleModalClose: () => void;
  data: IPieData[];
  selectedType: string;
  category: string;
}

interface ISelectOption {
  label: string;
  value: number;
}

type TPositionColumn = {
  isin: string;
  description: string;
  quantity: number;
  currency: string;
  average_price: number;
  mtm_price: number;
  market_value: number;
  unrealizedPL: number;
};

function useAnalytics(category: string, value: string) {
  const {
    onChange,
    pagination,
    page,
    ordering,
    client,
    custodian,
    currency__in,
  } = useTable();
  const params: Record<string, string | undefined> = {
    asset_class: category === "asset class" ? value : undefined,
    security__country_name: category === "region" ? value : undefined,
    security__sub_industry: category === "industry" ? value : undefined,
    client,
    custodian,
    page,
    ordering,
    currency__in,
  };
  const { data: analyticsData, isLoading } =
    useTransactionServerQuery<IPositionsResponse>(
      `/position/history/${buildURLSearchParams(params)}`
    );
  return {
    analyticsData,
    isLoading,
    pagination,
    onChange,
  };
}

const columns: ColumnType<TPositionColumn>[] = [
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
    align: "right",
    sorter: true,
    render: formatQuantity,
  },
  {
    title: "Currency",
    dataIndex: "currency",
    key: "currency__in",
    align: "center",
    render: (currency) => <CurrencyTag currency={currency} />,
  },
  {
    title: "Average Price",
    dataIndex: "average_price",
    key: "average_price",
    align: "right",
    sorter: true,
  },
  {
    title: "MTM Price",
    dataIndex: "mtm_price",
    key: "mtm_price",
    align: "right",
    sorter: true,
  },
  {
    title: "Market Value",
    dataIndex: "market_value",
    key: "market_value",
    align: "right",
    sorter: true,
  },
  {
    title: "Unrealized P&L",
    dataIndex: "unrealizedPL",
    key: "unrealizedPL",
    align: "right",
  },
];

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
  const { addFilters } = useTableFilter();

  const { analyticsData, isLoading, pagination, onChange } = useAnalytics(
    category,
    selectedOption ? selectedOption.label : ""
  );

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

  const tableData = analyticsData?.results?.map((item) => {
    return {
      isin: item.isin,
      description: item.security_name,
      quantity: item.quantity,
      currency: item.currency,
      average_price: item.average_price,
      mtm_price: item.mtm_price,
      market_value: item.market_value,
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
        <ScrollableTable
          columns={columns.map(addFilters)}
          dataSource={tableData}
          pagination={{
            ...pagination,
            total: analyticsData?.count,
          }}
          scroll={{ y: "16rem" }}
          loading={isLoading}
          onChange={onChange}
        />
      </div>
    </Modal>
  );
}
