import { FC } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "./components/Layout";
import About from "./pages/About";
import Buy from "./pages/Buy";
import Trade from "./pages/Trade";
import MyPage from "./pages/MyPage";
import NotFound from "./pages/NotFound";
import Sell from "./pages/Sell";

const App: FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<About />} />
          <Route path="/buy" element={<Buy />} />
          <Route path="/trade" element={<Trade />} />
          <Route path="/mypage" element={<MyPage />} />
          <Route path="/sell/:id" element={<Sell />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
