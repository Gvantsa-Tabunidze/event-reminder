import './App.css'
import {Route, Routes} from "react-router-dom";
import MainPage from "@/view/authorizedRoutes/MainPage.tsx";
import Authorization from "@/view/unauthorizedRoutes/Authorization.tsx";
import Home from "@/view/authorizedRoutes/Home.tsx";


function App() {


    return (
        <>
            <Routes>
                {/*დაცული როუტები*/}
                <Route element={<MainPage/>}>
                    <Route element={<Home/>} path="/"/>
                </Route>

                {/*public როუტი ავტორიზაციის გვერდი*/}
                <Route element={<Authorization/>} path={"/authorization"}/>
            </Routes>
        </>
    )
}

export default App
