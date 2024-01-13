import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './templates/home'
import Navbar from "./templates/navbar";
import Add from "./templates/actions/add";
import Edit from "./templates/actions/edit";
import View from "./templates/actions/view";


function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar/>
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/add" element={<Add />}/>
          <Route path="/edit/:id" element={<Edit />}/>
          <Route path="/view/:id" element={<View />}/>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
