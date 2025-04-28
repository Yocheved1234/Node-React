// Routing.js
import { Routes, Route } from "react-router-dom";
import { LogIn } from "./LogIn"; 
import { All } from "./All"; 
import Log from "./Log";
import Add from "./apart/Add";
import City from "./Adds/City";
import Category from "./Adds/Category";
import Edit from "./apart/Edit";
import Nihul from "./Nihul";

export const Routing = () => {
    return (
        <Routes>
            <Route path="LogIn" element={<LogIn />} />
            <Route path="Log" element={<Log />} />
            <Route path="All" element={<All />} />
            <Route path="Add" element={<Add />} />
            <Route path="Edit" element={<Edit />} />
            <Route path="City" element={<City />} />
            <Route path="Category" element={<Category />} />
            <Route path="" element={<All />} />
            <Route path="Nihul" element={<Nihul />} />
        </Routes>
    );
};
