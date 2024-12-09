import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Header from "../components/Header";
import ProductsPage from "../pages/ProductsPage";
/* import PhoneDetail from "./components/PhoneDetail";
import Cart from "./components/Cart"; */
const AppRouter = () => {
  return (
    <Router>
      <div className="min-h-screen bg-white pt-[194px]">
        <Header />
        <Routes>
          <Route path="/" element={<ProductsPage />} />
          {/*               <Route path="/phone/:id" element={<PhoneDetail />} />
           */}{" "}
          {/*               <Route path="/cart" element={<Cart />} />
           */}{" "}
        </Routes>
      </div>
    </Router>
  );
};

export default AppRouter;
