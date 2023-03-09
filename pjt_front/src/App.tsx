import { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import "./App.css";

import GraphQLPage from "./pages/GraphQLPage";
import NaverCallBackPage from "./pages/NaverCallBackPage";
import NavBar from "./components/NavBar";
import Welcome from "./pages/WelcomePage";
import LoginPage from "./pages/LoginPage";
import RealLogin from "./pages/RealLoginPage";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <Router>
      <NavBar />
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/NaverCallBackPage" element={<NaverCallBackPage />} />
          <Route path="/GraphQLPage" element={<GraphQLPage />} />
          <Route path="/Login" element={<LoginPage />} />
          <Route path="/RealLogin" element={<RealLogin />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
