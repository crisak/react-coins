import ReactDOM from "react-dom";
import "./styles/index.scss";
import App from "./App";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";

ReactDOM.render(<App />, document.getElementById("root"));

serviceWorkerRegistration.unregister();
// serviceWorkerRegistration.register();
