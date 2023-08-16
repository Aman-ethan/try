import { useState, useEffect } from "react";
import { Drawer as AntDrawer, Modal } from "antd";
import { ColumnType } from "antd/es/table";
import { DefaultOptionType } from "rc-select/lib/Select";
import { useMediaQuery } from "@mantine/hooks";
import { usePathname } from "next/navigation";
import Select from "@/components/Input/Select";
import CurrencyTag from "@/components/Main/General/CurrencyTag";
import ScrollableTable from "@/components/Main/Table/ScrollableTable";
import useTable, { useTableFilter } from "@/hooks/useTable";
import { useTransactionServerQuery } from "@/hooks/useQuery";
import { IPieData, IPositionsResponse, SearchParams } from "@/interfaces/Main";
import buildURLSearchParams from "@/lib/buildURLSearchParams";
import { formatPrice, formatQuantity } from "@/lib/format";
import Title from "@/components/Typography/Title";
import ClampedText from "@/components/Typography/ClampedText";

export type TCategory = "asset_class" | "region" | "industry";

interface IAnalyticsModalProps {
  onClose: () => void;
  data: IPieData[];
  selectedType: string;
  category: TCategory;
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

const PageSearchParamKey: SearchParams = "page_modal";

function useAnalytics(category: TCategory, value?: string) {
  const isOverview = usePathname().includes("overview");

  const {
    onChange,
    pagination,
    page,
    ordering,
    client,
    custodian,
    currency__in,
    updateSearchParams,
  } = useTable({
    searchParamKeys: {
      page: PageSearchParamKey,
      client: isOverview ? "gross_allocation_client" : undefined,
    },
  });
  const params: Record<string, string | undefined> = {
    asset_class: category === "asset_class" ? value : undefined,
    security__country_name: category === "region" ? value : undefined,
    security__sub_industry: category === "industry" ? value : undefined,
    client,
    custodian,
    page,
    ordering,
    currency__in,
    page_size: pagination.pageSize?.toString(),
  };
  const { data: analyticsData, isLoading } =
    useTransactionServerQuery<IPositionsResponse>(
      value ? `/position/history/${buildURLSearchParams(params)}` : null
    );
  return {
    analyticsData,
    isLoading,
    pagination,
    onChange,
    updateSearchParams,
  };
}

const columns: ColumnType<TPositionColumn>[] = [
  {
    title: "ISIN",
    dataIndex: "isin",
    key: "isin",
    width: 140,
  },
  {
    title: "Description",
    dataIndex: "description",
    key: "description",
    width: 220,
    render: (description) => <ClampedText text={description} />,
  },
  {
    title: "Quantity",
    dataIndex: "quantity",
    key: "quantity",
    align: "right",
    sorter: true,
    render: formatQuantity,
    width: 125,
  },
  {
    title: "Currency",
    dataIndex: "currency",
    key: "currency__in",
    align: "center",
    render: (currency) => <CurrencyTag currency={currency} />,
    width: 130,
  },
  {
    title: "Average Price",
    dataIndex: "average_price",
    key: "average_price",
    align: "right",
    render: formatPrice,
    sorter: true,
    width: 135,
  },
  {
    title: "MTM Price",
    dataIndex: "mtm_price",
    key: "mtm_price",
    align: "right",
    render: formatPrice,
    sorter: true,
    width: 135,
  },
  {
    title: "Market Value",
    dataIndex: "market_value",
    key: "market_value",
    align: "right",
    render: formatPrice,
    sorter: true,
    width: 135,
  },
  {
    title: "Unrealized P&L",
    dataIndex: "unrealizedPL",
    key: "unrealizedPL",
    align: "right",
    render: formatPrice,
    width: 135,
  },
];

export default function AnalyticsModal({
  data = [],
  onClose,
  selectedType,
  category,
}: IAnalyticsModalProps) {
  const [selectOptions, setSelectOptions] = useState<DefaultOptionType[]>([]);
  const [selectedOption, setSelectedOption] = useState<
    DefaultOptionType | undefined
  >();
  const { addFilters } = useTableFilter();
  const isOverlayVisible = !!selectedType;

  const { analyticsData, isLoading, pagination, onChange, updateSearchParams } =
    useAnalytics(category, selectedOption?.label as string);

  useEffect(() => {
    if (!selectedType) return;

    const newSelectOptions: DefaultOptionType[] = [
      ...new Set(data.map((d) => d.type)),
    ].map((d) => ({
      label: d,
      value: d,
    }));

    setSelectOptions(newSelectOptions);

    const newSelectedOption = newSelectOptions.find(
      (option) => option.value === selectedType
    );

    setSelectedOption(newSelectedOption);
  }, [data, selectedType]);

  const resetPage = () => {
    updateSearchParams({ [PageSearchParamKey]: undefined });
  };

  const handleSelectChange = (
    _: unknown,
    option: DefaultOptionType | DefaultOptionType[]
  ) => {
    setSelectedOption(option as DefaultOptionType);
    resetPage();
  };

  const handleClose = () => {
    setSelectedOption(undefined);
    onClose();
    resetPage();
  };

  const tableData = analyticsData?.results?.map((item) => {
    return {
      id: item.id,
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
  const MOBILE_BREAK_POINT = useMediaQuery("(max-width: 768px)");
  const content = (
    <div className="flex flex-col space-y-6">
      <div className="flex flex-col space-y-4 tab:flex-row tab:items-center tab:space-x-8 tab:space-y-0">
        <Title level={4}>{category.split("_").join(" ")}</Title>
        <Select
          className="tab:w-1/3"
          options={selectOptions}
          value={selectedOption} // Use the value property of the selectedOption state
          onChange={handleSelectChange} // Assign the handler to the Select's onChange event
        />
      </div>
      <ScrollableTable
        rowKey="id"
        rowClassName="h-20"
        columns={columns.map(addFilters)}
        dataSource={tableData}
        pagination={{
          ...pagination,
          total: analyticsData?.count,
          position: MOBILE_BREAK_POINT ? ["bottomCenter"] : ["bottomRight"],
        }}
        scroll={{ y: "16rem" }}
        loading={isLoading}
        onChange={onChange}
      />
    </div>
  );
  if (MOBILE_BREAK_POINT) {
    return (
      <AntDrawer
        placement="bottom"
        open={isOverlayVisible}
        height="80%"
        onClose={handleClose}
      >
        {content}
      </AntDrawer>
    );
  }
  return (
    <Modal
      open={isOverlayVisible}
      centered
      footer={null}
      width={1000}
      className="space-y-8"
      onCancel={handleClose}
    >
      {content}
    </Modal>
  );
}
