import { IBalanceSheetChart, IBalanceSheetOverview } from "@/interfaces/Main";

interface IBalanceSheetDataProps {
  data?: IBalanceSheetOverview;
}

export default function useBalanceSheet({ data }: IBalanceSheetDataProps) {
  const { asset, liability } = data || {};

  const totalAsset =
    asset?.reduce(
      (acc: number, item: IBalanceSheetChart) => acc + (item?.total_value || 0),
      0
    ) || 0;
  const totalLiability =
    liability?.reduce(
      (acc: number, item: IBalanceSheetChart) => acc + (item?.total_value || 0),
      0
    ) || 0;

  const assetPercentage =
    asset?.reduce(
      (acc: number, item: IBalanceSheetChart) => acc + (item?.percentage || 0),
      0
    ) || 0;
  const liabilityPercentage =
    liability?.reduce(
      (acc: number, item: IBalanceSheetChart) => acc + (item?.percentage || 0),
      0
    ) || 0;

  const leverage = Math.abs(totalLiability / totalAsset) || 0;

  const netWorth = totalAsset - Math.abs(totalLiability);

  return {
    totalAsset,
    totalLiability,
    leverage,
    netWorth,
    assetPercentage,
    liabilityPercentage,
  };
}
