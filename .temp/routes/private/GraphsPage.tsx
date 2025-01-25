import { BarChart, PieChart, PieValueType } from "@mui/x-charts";

import GridOverlay from "@/components/GridOverlay";

import useAccountQuery from "@/hooks/account/useAccountQuery";
import useAuthDetails from "@/hooks/useAuthDetails";
import useFormatter from "@/hooks/useFormatter";

const GraphsPage = () => {
  const { data: authData } = useAuthDetails();
  const { data: accountQueryData, isLoading: isAccountLoading } =
    useAccountQuery({
      accessToken: authData?.accessToken,
      currentUser: authData?.currentUser,
    });

  const format = useFormatter();

  if (isAccountLoading) {
    return <GridOverlay type="loading" />;
  }

  if (!accountQueryData?.isSuccess) {
    return <GridOverlay type="error" message={accountQueryData?.message} />;
  }

  const accounts = accountQueryData.data;

  if (!accounts) {
    return <GridOverlay type="error" message={accountQueryData?.message} />;
  }

  const pieChartData: PieValueType[] | undefined = accounts.map(
    (accountData, index) => ({
      id: index,
      value: accountData.balance,
      label: accountData.accountName,
    }),
  );

  const barChartData = accounts.map((account, index) => ({
    id: index,
    accountId: account._id,
    accountName: account.accountName,
    balance: account.balance,
    totalIncome: account.totalIncome,
    totalExpense: account.totalExpense,
  }));

  return (
    <>
      {/* TODO split the view into two sections for two charts */}
      Balance Overview per Account
      <PieChart
        series={[
          {
            data: pieChartData || [],
            valueFormatter: (item) =>
              `${format({ value: item.value as number })}`,
            innerRadius: 75,
            outerRadius: 150,
            paddingAngle: 1,
            cornerRadius: 3,
          },
        ]}
      />
      Monthly Income and Expenses Per Account
      <BarChart
        dataset={barChartData}
        xAxis={[{ scaleType: "band", dataKey: "accountName" }]}
        series={[
          {
            dataKey: "balance",
            label: "Balance",
            valueFormatter: (item) => format({ value: item as number }),
          },
          {
            dataKey: "totalIncome",
            label: "Total Income",
            valueFormatter: (item) => format({ value: item as number }),
          },
          {
            dataKey: "totalExpense",
            label: "Total Expense",
            valueFormatter: (item) => format({ value: item as number }),
          },
        ]}
      />
    </>
  );
};

export default GraphsPage;
