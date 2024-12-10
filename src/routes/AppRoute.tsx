import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Header from "../components/Header";
import ProductsPage from "../pages/ProductsPage";
import ProductDetailPage from "../pages/ProductDetailPage";
import CartPage from "../pages/CartPage";

const AppRouter = () => {
  return (
    <Router>
      <div className="min-h-screen bg-white pt-[61px]">
        <Header />
        <Routes>
          <Route path="/" element={<ProductsPage />} />
          <Route path="/phone/:id" element={<ProductDetailPage />} />
          <Route path="/cart" element={<CartPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default AppRouter;
