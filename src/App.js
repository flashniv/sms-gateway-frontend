import {Route, Routes} from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import ResponsiveAppBar from "./pages/ResponsiveAppBar";
import Login from "./pages/Login";

export default function App() {
    return (
        <>
            <ResponsiveAppBar />
            <Routes>
                <Route path="/" element={<Dashboard/>}/>
                <Route path="/login" element={<Login/>}/>
            </Routes>
        </>
    );
}
