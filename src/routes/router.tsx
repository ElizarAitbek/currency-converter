import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import CurrentExchangeRates from "../pages/CurrentExchangeRates";
import Converter from "../pages/Converter";

export const appRoutes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <Converter /> },
      { path: "/current-rates", element: <CurrentExchangeRates /> },
      { path: "*", element: <div>404</div> },
    ],
  },
]);
