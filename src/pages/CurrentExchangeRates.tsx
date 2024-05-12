import { useEffect } from "react";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  styled,
} from "@mui/material";
import { AppDispatch, useAppSelector } from "../store";
import { useDispatch } from "react-redux";
import { getExchangeRates } from "../store/thunks/currencyThunks";

export default function CurrentExchangeRates() {
  const dispatch: AppDispatch = useDispatch();

  const { exchangeRates }: { exchangeRates: [string, number][] } =
    useAppSelector((state) => state.currencies);

  useEffect(() => {
    dispatch(getExchangeRates());
  }, []);

  console.log(exchangeRates);
  return (
    <StyledExchangesMain>
      <h1>USD Current Exchange Rates</h1>
      <Button variant="contained" onClick={() => dispatch(getExchangeRates())}>
        Refresh
      </Button>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Currency Code</TableCell>
            <TableCell>Exchange Rate</TableCell>
            <TableCell>Last Updated</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>USD</TableCell>
            <TableCell>1</TableCell>
            <TableCell>{new Date().toLocaleString()}</TableCell>
          </TableRow>
          {exchangeRates.map(([currency, rate]) => (
            <TableRow key={currency}>
              <TableCell>{currency}</TableCell>
              <TableCell>{rate}</TableCell>
              <TableCell>{new Date().toLocaleString()}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </StyledExchangesMain>
  );
}

const StyledExchangesMain = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: theme.spacing(2),

  "& h1": {
    marginBottom: theme.spacing(2),
  },
  "& button": {
    marginBottom: theme.spacing(2),
  },
  "& table": {
    width: "100%",
    "& th": {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.primary.contrastText,
    },
    "& td": {
      backgroundColor: theme.palette.grey[200],
      fontSize: "1.2rem",
    },
  },
}));
