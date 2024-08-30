import { CSSProperties } from "react";
import { useTranslation } from "react-i18next";

import { Grid2 as Grid, Paper, Typography } from "@mui/material";
import { PieChart, PieValueType } from "@mui/x-charts";

import useAccountQuery from "../hooks/account/useAccountQuery";
import useAuthDetails from "@/hooks/useAuthDetails";
import useFormatter from "@/hooks/useFormatter";

const paperStyles: CSSProperties = {
  padding: "15px",
  boxSizing: "border-box",
  display: "flex",
  flexDirection: "column",
  rowGap: "10px",
};

const Overview = () => {
  const { t } = useTranslation();
  const formatter = useFormatter();

  const { data: authData } = useAuthDetails();
  const { data } = useAccountQuery({
    accessToken: authData?.accessToken,
    currentUser: authData?.currentUser,
  });

  const chartData: PieValueType[] | undefined = data?.map((accountData, index) => ({
    id: index,
    value: accountData.balance,
    label: accountData.accountName,
  }));

  return (
    <Grid container spacing={1} sx={{ width: "996px", margin: "auto" }}>
      <Grid container direction="column" rowSpacing={1} sx={{ width: "320px" }}>
        <Paper sx={paperStyles}>
          <Typography variant="button">{t("dashboard.overview.balance")}</Typography>
          <Typography variant="h3">{formatter("23674.35")}</Typography>
        </Paper>
        <Paper sx={paperStyles}>
          <Typography variant="button">{t("dashboard.overview.monthlyIncome")}</Typography>
          <Typography variant="h3" color="success">
            +{formatter("7021.01")}
          </Typography>
        </Paper>
        <Paper sx={paperStyles}>
          <Typography variant="button">{t("dashboard.overview.monthlyExpense")}</Typography>
          <Typography variant="h3" color="error">
            -{formatter("1423.26")}
          </Typography>
        </Paper>
      </Grid>
      <Paper
        sx={{
          ...paperStyles,
          width: "676px",
          display: "flex",
          flex: "1",
        }}>
        <Typography variant="button">{t("dashboard.overview.balancePerAccount")}</Typography>
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
      </Paper>
    </Grid>
  );
};

export default Overview;
