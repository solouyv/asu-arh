import { Route, Routes } from "react-router";

import Layout from "../components/Layout/Layout";
import BinaryFloatSumLaboratory from "../pages/BinaryFloatSumLaboratory/BinaryFloatSumLaboratory";
import MainPage from "../pages/MainPage/MainPage";

function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<MainPage />} />
        <Route path="binary-sum" element={<BinaryFloatSumLaboratory />} />
      </Route>
      <Route path="*" element={<h1>Такой страницы нет</h1>} />
    </Routes>
  );
}

export default AppRouter;
