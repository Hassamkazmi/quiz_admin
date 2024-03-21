import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import "../src/maincss/Style.css";
import "../src/maincss/faiz.css";
import "../src/maincss/ahsan.css";
import "react-datepicker/dist/react-datepicker.css";
import "../src/maincss/responsive.css";
import routes from "../src/routes";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../src/assets/css/animate.min.css";
import "../src/assets/scss/light-bootstrap-dashboard-react.scss?v=2.0.0";
import "../src/assets/css/demo.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import Question from "./views/Customers";
import Options from "./views/Options";
import Dashboard from "./views/Dashboard";
import Addcustomer from "./views/Addcustomer";
import Profilepage from "./views/Profilepage";
import Loginpage from "./views/Loginpage";
import ProtectedRoute from "./components/Login/ProtectedRoute";
import { Provider } from "react-redux";
import store from "./redux/store";
import Account from "./views/Account";
import ShoppingList from "./views/ShoppingList";
import AddShopping from "./views/AddShopping";
import Chemicals from "./views/Chemicals";
import { ToastContainer } from "react-toastify";
import { loadStripe } from "@stripe/stripe-js";
import AddProductForm from "./views/AddProduct";


const root = ReactDOM.createRoot(document.getElementById("root"));


const storeTheme = localStorage.getItem("primary");
document.documentElement.style.setProperty(
  "--primary-color",
  storeTheme || "#750004"
);

document.documentElement.style.setProperty("--font-color", "#fff");  

root.render(
  <Provider store={store}>
    <ToastContainer
      position="bottom-right"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="light"
    />
    
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Loginpage />} />
                   <Route element={<ProtectedRoute />}>
            <Route exact path="/dashboard" element={<Dashboard />} />
            <Route exact path="/question" element={<Question />} />
            <Route exact path="/option" element={<Options />} />
            <Route exact path="/addoption" element={<AddProductForm />} />


            <Route exact path="/addcustomer" element={<Addcustomer />} />

            <Route exact path="/edit-customer/:id" element={<Profilepage />} />
           
           
        
            {/* faiz branch */}

            <Route exact path="/user" element={<ShoppingList />} />
            <Route exact path="/add-question" element={<AddShopping />} />
            
            
            <Route exact path="/stats" element={<Chemicals />} />
            
            <Route exact path="/account" element={<Account />} />

            
             
          </Route>
        </Routes>
        {/* </div>
            </div> */}
      </BrowserRouter>
  </Provider>
  
);