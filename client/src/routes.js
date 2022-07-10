import React from 'react'
import {Navigate, Route, Routes} from "react-router-dom";
import AuthPage from "./pages/AuthPage";
import LinksPage from "./pages/LinksPage";
import DetailPage from "./pages/DetailPage";
import CreatePage from "./pages/CreatePage";


export const useRoutes = isAuthenticated => {
    if(isAuthenticated){
        return(
            <Routes>
                <Route path="/create" element={<CreatePage />} />
                <Route path="/detail/:id" element={<DetailPage />} />
                <Route path="/links" element={<LinksPage />} />
                <Route path="/*" element={<Navigate to="/create" replace/>}/>
            </Routes>
        )
    }
    return(
        <Routes>
            <Route path="/auth" element={<AuthPage />} />
            <Route path="/*" element={<Navigate to="/auth" replace/>}/>
        </Routes>
    )
}
