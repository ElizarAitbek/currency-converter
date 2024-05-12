import { AppBar, Grid, Typography, styled } from "@mui/material";
import { NavLink } from "react-router-dom";

export default function Header() {
  return (
    <StyledHeaderMain position="static">
      <Grid container justifyContent="space-evenly" alignItems="center">
        <Grid item>
          <Typography variant="h6">Currency Converter</Typography>
        </Grid>
        <StyledNavBlock item>
          <StyledNavLink to="/">Converter</StyledNavLink>
          <StyledNavLink to="/current-rates">Rates</StyledNavLink>
        </StyledNavBlock>
      </Grid>
    </StyledHeaderMain>
  );
}

const StyledHeaderMain = styled(AppBar)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.common.white,
  padding: theme.spacing(1),
}));

const StyledNavBlock = styled(Grid)(({}) => ({
  display: "flex",
  gap: 10,
}));

const StyledNavLink = styled(NavLink)(({ theme }) => ({
  color: theme.palette.common.white,
  textDecoration: "none",
  padding: theme.spacing(1),
  "&.active": {
    borderBottom: `2px solid ${theme.palette.common.white}`,
  },
}));
