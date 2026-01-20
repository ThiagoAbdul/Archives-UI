import { Navigate, Route, Routes } from "react-router-dom";
import { Home } from "./pages/home/home";

export function AppRoutes(){
    return <Routes>
      <Route path="/" element={<Navigate to={"/home"} />} />
      <Route path="/home" element={<Home />} />
      <Route path="/home/:folder" element={<Home />} />
      <Route path="/logout" element={<Home />} />

    </Routes>
}