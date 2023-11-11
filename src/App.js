import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import "../src/index.css"
import MovieInfo from "./pages/MovieInfo";
import Landing from "./pages/Landing";

function App() {
  return (
    <Router>
    <div className="App">
     <Routes>
      <Route path="/home" element={<Home/>}/>
      <Route path=":id" element={<MovieInfo/>}/>
      <Route path="/" element={<Landing/>}/>
     </Routes>
    </div>
    </Router>
  );
}

export default App;
