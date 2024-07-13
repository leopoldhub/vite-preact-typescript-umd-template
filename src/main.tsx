import {render} from "preact";
import {App} from "./app.tsx";
import "./index.css";

export function start(htmlElement: HTMLElement) {
  render(<App/>, htmlElement);
}

export default start;