import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signin from './pages/Signin';
import Signup from './pages/Signup';
import Homepage from './pages/Homepage'

function App() {
  return(
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Signin/>}/>
      <Route path="/signup" element={<Signup/>}/>
      <Route path="/homepage" element={<Homepage/>}/>

    </Routes>
    </BrowserRouter>

  )

  
}

export default App;
