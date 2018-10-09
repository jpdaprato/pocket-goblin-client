import ReactDOM from "react-dom";
import { makeMainRoutes } from "./routes.jsx";

const routes = makeMainRoutes();

ReactDOM.render(routes, document.getElementById("root"));
