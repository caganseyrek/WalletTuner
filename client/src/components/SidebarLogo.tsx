import { Typography } from "@mui/material";

import { logoStyles } from "@/routes/layouts/styles/privateLayout.style";

const SidebarLogo = () => {
  return (
    <Typography variant="h1" fontFamily={"Lobster Two"} fontWeight={"600"} sx={logoStyles}>
      WalletTuner
    </Typography>
  );
};

export default SidebarLogo;
