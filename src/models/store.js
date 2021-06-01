import { createStore } from "easy-peasy";
import reducer from "./index";

const store = createStore(reducer);
export default store;
