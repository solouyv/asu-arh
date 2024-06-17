import Layout from "@components/Layout/Layout";
import ArithmeticOperationsPage from "@pages/ArithmeticOperationsPage/ArithmeticOperationsPage";
import CachePage from "@pages/CachePage/CachePage";
import ComparingNumbersPage from "@pages/ComparingNumbersPage/ComparingNumbersPage";
import DynamicRAMPage from "@pages/DynamicRAMPage/DynamicRAMPage";
import LaboratoriesPage from "@pages/LaboratoriesPage/LaboratoriesPage";
import MainPage from "@pages/MainPage/MainPage";
import RAMPage from "@pages/RAMPage/RAMPage";
import TestPage from "@pages/TestPage/TestPage";
import TestsPage from "@pages/TestsPage/TestsPage";
import { Route, Routes } from "react-router";

import {
  RAM,
  arithmeticOperations,
  cache,
  compareNumbers,
  dynamicRAM,
  laboratories,
  tests,
} from "./Links";

function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<MainPage />} />
        <Route path={laboratories.path} element={<LaboratoriesPage />} />
        <Route
          path={laboratories.path + arithmeticOperations.path}
          element={<ArithmeticOperationsPage />}
        />
        <Route
          path={laboratories.path + compareNumbers.path}
          element={<ComparingNumbersPage />}
        />
        <Route
          path={laboratories.path + dynamicRAM.path}
          element={<DynamicRAMPage />}
        />
        <Route path={laboratories.path + RAM.path} element={<RAMPage />} />
        <Route path={laboratories.path + cache.path} element={<CachePage />} />
        <Route path={tests.path} element={<TestsPage />} />
        <Route path="test" element={<TestPage />}>
          <Route path=":theme/" element={<div>1234324</div>} />
        </Route>
      </Route>

      <Route path="*" element={<h1>Такой страницы нет</h1>} />
    </Routes>
  );
}

export default AppRouter;
