// Main.js
import { Nav } from "./Nav";
import { BrowserRouter } from "react-router-dom";
import { Routing } from "./Routing";
import { Provider } from "react-redux";
import myStore from "./redux/Store";

export const Main = () => {
    return (
        <Provider store={myStore}>
            <BrowserRouter>
                <Nav />
                <Routing />
            </BrowserRouter>
        </Provider>
    );
};
