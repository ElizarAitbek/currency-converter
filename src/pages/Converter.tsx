import {
  Button,
  LinearProgress,
  TextField,
  Typography,
  styled,
} from "@mui/material";

import { useDispatch } from "react-redux";
import { AppDispatch, useAppSelector } from "../store";
import { useState } from "react";
import { getCurrency } from "../store/thunks/currencyThunks";

export default function Converter() {
  const [amount, setAmount] = useState<string>("0");
  const dispatch: AppDispatch = useDispatch();
  const { convertedAmount, loading } = useAppSelector(
    (state) => state.currencies
  );

  const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (amount === "" || amount === "0") return;

    dispatch(getCurrency(parseInt(amount)));
  };

  return (
    <StyledConverterMain>
      <h1>Converter</h1>
      <p>Convert your currency here</p>

      <StyledConverterForm onSubmit={handleSubmit}>
        <StyledConverterText variant="h6">
          Enter the amount of USD you want to convert to EUR
        </StyledConverterText>

        <TextField
          id="amount"
          type="number"
          label="Amount"
          value={amount.toString()}
          onChange={handleAmountChange}
          inputProps={{ min: 0 }}
          helperText={
            amount === "" || amount === "0"
              ? "Amount must be greater than 0"
              : ""
          }
        />

        <Button type="submit" variant="contained" disabled={loading}>
          Convert
        </Button>

        {loading ? <LinearProgress /> : ""}

        {convertedAmount ? (
          <>
            <StyledConvertedAmount variant="h4">
              <i>converted amount:</i> {convertedAmount} EUR
            </StyledConvertedAmount>
          </>
        ) : (
          ""
        )}
      </StyledConverterForm>
    </StyledConverterMain>
  );
}

const StyledConverterMain = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  height: "100vh",
  backgroundColor: theme.palette.grey[700],
  color: theme.palette.common.white,
}));

const StyledConverterForm = styled("form")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(2),
  padding: theme.spacing(2),
  margin: theme.spacing(2),
  backgroundColor: theme.palette.background.paper,
  width: "50%",
  height: "40%",
  borderRadius: theme.spacing(1),
}));

const StyledConverterText = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.primary,
  textAlign: "center",
  margin: theme.spacing(1.5),
}));

const StyledConvertedAmount = styled(Typography)(({ theme }) => ({
  color: theme.palette.success.main,
  textAlign: "center",
  margin: theme.spacing(1.5),
}));
