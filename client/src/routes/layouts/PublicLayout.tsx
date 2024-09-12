import { Outlet } from "react-router-dom";

import { Grid2 as Grid, Paper } from "@mui/material";

import { ContainerStyles, PageStyles } from "./styles/publicLayout.style";

const PublicLayout = () => {
  return (
    <Grid container sx={PageStyles}>
      <Paper sx={ContainerStyles}>
        <Outlet />
      </Paper>
    </Grid>
  );
};

export default PublicLayout;
