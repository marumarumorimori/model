import { createBrowserHistory } from "history";
import createStoreWithMiddleware from "./ConfigureStore";

export const history = createBrowserHistory();
export const { store, persistor } = createStoreWithMiddleware();
