import { useContext } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Router,
  Link
} from "react-router-dom";
import Create from "./Components/Create";
import { Campaign } from "./Components/Campaign";
import { Dashboard } from "./Components/Dashboard";
import { Health } from "./Components/Heath";
import { Animal } from "./Components/Animal";
import { Education } from "./Components/Education";
import { Home } from "./Components/Home";

 
const App = () => (
 <>
 {/* <Home/>
 <Create/>
 <Campaign/>
 <Dashboard/>
 <Animal/>
 <Education/>
 <Health/> */}
 <BrowserRouter>
          <Routes>
              <Route path="/" element={<Home/>}/>
               <Route path="/Create" element={<Create/>}/>
              <Route path="/Dashboard" element={<Dashboard />}/>
              <Route path="/Campaign" element={<Campaign/>}/>
              <Route path="/" element={<Campaign/>}/>
               <Route path="/Health" element={<Health/>}/>
              <Route path="/Animal" element={<Animal/>}/>
              <Route path="/Education" element={<Education/>}/>
             
              
              

            
          </Routes>
          </BrowserRouter>
 </>

    
);

export default App;
