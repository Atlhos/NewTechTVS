import { Route, Routes } from "react-router-dom";
import Home from "./Pages/home";

function RoutesApp(){
    return(
        <>
            <Routes>
                <Route path="/" element={<Home />} />
            </Routes>
        </>
    )
}

export default RoutesApp;