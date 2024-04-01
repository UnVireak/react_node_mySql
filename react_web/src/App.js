import logo from './logo.svg';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import HomePage from './Pages/HomePage/HomePage';
import AboutPage from './Pages/AboutPage/AboutPage';
import CategoryPage from './Pages/CategoryPage/CategoryPage';
import MainLayout from './component/Layout/Layout';
import CardWatchPage from './Pages/HomePage/CardWatchPage';
import LoginPage from './Pages/LoginPage/LoginPage';
import LayoutLogin from './Pages/LoginPage/LayoutLogin';
import RegisterPage from './Pages/LoginPage/RegisterPage';
import CustomerPage from './Pages/Customer/CustomerPage';
import EmployeePage from './Pages/EmployeePage/EmployeePage';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route path="" element={<HomePage />} />
          <Route path="category" element={<CategoryPage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="watch" element={<CardWatchPage />} />
          <Route path="customer" element={<CustomerPage/>}/>
          <Route path ="employee" element ={<EmployeePage/>}/>

          <Route path="*" element={<h3>Page Not Found.</h3>} />
          </Route>

        <Route path="/" element={<LayoutLogin/>}>
          <Route path="login" element={<LoginPage/>} />
          <Route path="register" element={<RegisterPage />} />
        </Route>

      </Routes>


    </BrowserRouter>
  );
}
export default App;
