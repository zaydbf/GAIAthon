import { Box, Typography } from "@mui/material";

type HeaderProps = {
  title: string;
  subTitle: string;
  isDashboard?: boolean;
};

const Header = ({ title, subTitle, isDashboard = false }: HeaderProps) => {
  return (
    <Box mb={isDashboard ? 2 : 4}>
      <Typography
        sx={{
          color: "#16a34a",
          fontWeight: "bold",
        }}
        variant="h5"
      >
        {title}
      </Typography>
      <Typography variant="body1">{subTitle}</Typography>
    </Box>
  );
};

export default Header;
