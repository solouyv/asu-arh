import AppRouter from "@router/AppRouter";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root")!);
root.render(
  <BrowserRouter>
    <AppRouter />
  </BrowserRouter>,
);
