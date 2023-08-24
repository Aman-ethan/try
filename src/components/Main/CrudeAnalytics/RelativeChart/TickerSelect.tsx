"use client";

import { useState } from "react";
import { Spin } from "antd";
import { debounce } from "lodash";
import { useAnalyticsServerGetQuery } from "@/hooks/useQuery";

import buildURLSearchParams from "@/lib/buildURLSearchParams";
import Select from "@/components/Input/Select";

const URLS = {
  get: `/security/search/`,
};

type TSecurities = string[];

const useTickerSelect = (searchTerm: string) => {
  const { data, isLoading } = useAnalyticsServerGetQuery<TSecurities>(
    `${URLS.get}${buildURLSearchParams({ query: searchTerm })}`
  );

  const selectOptions = data?.map?.((item: string) => ({
    label: item,
    value: item,
  }));

  return { selectOptions, isLoading };
};

interface ITickerSelect {
  handleOptionChange: (_value: string) => void;
}

export default function TickerSelect({ handleOptionChange }: ITickerSelect) {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const { selectOptions, isLoading } = useTickerSelect(searchTerm);

  const handleSearchChange = debounce((value: string) => {
    setSearchTerm(value);
  }, 1000);

  return (
    <div className="flex items-center gap-4">
      <p className="w-11 text-base font-medium tab:text-lg">Ticker</p>
      <Select
        labelInValue
        placeholder="Search Ticker"
        filterOption={false}
        loading={isLoading}
        onSelect={(value) => handleOptionChange(value.value)}
        onSearch={handleSearchChange}
        notFoundContent={isLoading ? <Spin size="small" /> : null}
        options={selectOptions}
        className="w-60"
        showSearch
        allowClear
      />
    </div>
  );
}
