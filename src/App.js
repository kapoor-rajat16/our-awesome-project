import './App.css';
import Navbar from './components/Navbar';
import Login from './components/Login';
import Signup from './components/Signup';
import Home from './components/Home';
import Profile from './components/Profile';
import User from './components/User';
import Ask from './components/Ask';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import Footer from './components/Footer';

function App() {
  return (
    <>
      <BrowserRouter>
          <Navbar />
          <div className="container">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route exact path="/profile" element={<Profile/>} />
              <Route exact path="/user" element={<User/>} />
              <Route exact path="/ask" element={<Ask/>} />
              <Route exact path="/login" element={<Login/>} />
              <Route exact path="/signup" element={<Signup/>} />
            </Routes>
          </div>
          <Footer/>
        </BrowserRouter>
    </>
  );
}

export default App;
