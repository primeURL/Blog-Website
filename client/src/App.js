
import { useState } from "react";
import { Routes, Route } from "react-router-dom";
// import { BrowserRouter as Router,Route } from "react-router-dom";
import NavBar from "./dump/NavBar";


import HTMLFormat from "./components/HTMLFormat";
import AddBook from "./components/AddBook";
const App = () => {

  return (
    <div>
      <NavBar/>
          <Routes>
            {/* <Route path="/" element={<Home/>}></Route> */}
            <Route path="/addBook" element={<AddBook/>}></Route>
            <Route path="/viewBook" element={<HTMLFormat/>}></Route>
            {/* <Route path="chapter/:bookName" element={<Chapter/>}></Route> */}
          </Routes>
  
      

      {/* <Temp/> */}

      {/* <label>Enter a Book Name</label> <br/> */}
      {/* <input type="text" name='bookName' onChange={(e)=> setBookName(e.target.value)} /> */}
      {/* <DocumentViewer/> */}
      
      {/* <InputBox/> */}

      {/* <Test/> */}
    
    </div>
  );
};

export default App;