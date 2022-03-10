import {Route, Routes} from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import ResponsiveAppBar from "./pages/ResponsiveAppBar";

function App() {
    return (
        <>
            <ResponsiveAppBar />
            <Routes>
                <Route path="/" element={<Dashboard/>}/>
            </Routes>
        </>
    );
}

export default App;
