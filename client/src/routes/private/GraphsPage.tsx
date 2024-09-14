import { useTranslation } from "react-i18next";

import { Grid2 as Grid, Paper, Typography } from "@mui/material";
import { PieChart, PieValueType } from "@mui/x-charts";

import GridOverlay from "@/components/GridOverlay";

import useAccountQuery from "@/hooks/account/useAccountQuery";
import useAuthDetails from "@/hooks/useAuthDetails";

import { PaperStyles } from "@/shared/globals.style";

const GraphsPage = () => {
  const { t } = useTranslation();

  const { data: authData } = useAuthDetails();
  const { data: accountQueryData, isLoading: isAccountLoading } = useAccountQuery({
    accessToken: authData?.accessToken,
    currentUser: authData?.currentUser,
  });

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

  const chartData: PieValueType[] | undefined = accounts.map((accountData, index) => ({
    id: index,
    value: accountData.balance,
    label: accountData.accountName,
  }));

  return (
    <Grid container spacing={1} sx={{ width: "996px", margin: "auto" }}>
      <Paper
        sx={{
          ...PaperStyles,
          width: "996px",
          height: "400px",
        }}>
        <Grid sx={{ width: "495px", height: "400px" }}>
          <Typography variant="button">{t("overview.balancePerAccount")}</Typography>
          <PieChart
            series={[
              {
                data: chartData || [],
                innerRadius: 50,
                outerRadius: 100,
                paddingAngle: 1,
                cornerRadius: 3,
              },
            ]}
          />
        </Grid>
      </Paper>
    </Grid>
  );
};

export default GraphsPage;
