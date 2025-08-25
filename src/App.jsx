
import { Routes, Route} from "react-router-dom";
import HomePage from "./pages/home";
import LoginPage from "./pages/login";
import RegisterPage from "./pages/Register";
import Error from "./pages/Error";

export default function App(){
    return (
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/Login" element={<LoginPage />} />
          <Route path="/registration" element={<RegisterPage/>} />
          <Route path="*" element={<Error/>} />
        </Routes>
    );
}