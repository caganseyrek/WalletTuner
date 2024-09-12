import { Outlet } from "react-router-dom";

import { Paper } from "@mui/material";

const PublicLayout = () => {
  return (
    <Paper
      sx={{
        bgcolor: "white",
      }}>
      <Outlet />
    </Paper>
  );
};

export default PublicLayout;
