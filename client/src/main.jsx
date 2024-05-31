import React from "react";
import ReactDOM from "react-dom";

import App from "./App";
import { TransctionProvider } from "./Context/crowdfunding";
import "./index.css";


ReactDOM.render(
   <TransctionProvider> 
    <App />
   </TransctionProvider>,
 
  document.getElementById("root"),
);
