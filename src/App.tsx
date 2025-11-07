import './App.css'
import {Route, Routes} from "react-router-dom";
import ProtectedRoutesWrapper from "@/pages/authorizedRoutes/ProtectedRoutesWrapper.tsx";
import Authorization from "@/pages/unauthorizedRoutes/Authorization.tsx";
import Home from "@/pages/authorizedRoutes/Home.tsx";


function App() {


    return (
        <>
            <Routes>
                {/*დაცული როუტები*/}
                <Route element={<ProtectedRoutesWrapper/>}>
                    <Route element={<Home/>} path="/"/>
                </Route>

                {/*public როუტი ავტორიზაციის გვერდი*/}
                <Route element={<Authorization/>} path={"/authorization"}/>
            </Routes>
        </>
    )
}

export default App
