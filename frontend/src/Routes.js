import { Routes, Route } from 'react-router-dom'; //Routes is the container that holds all the route definitions  Route defines a single route (path + component)
import Welcome from './Pages/Welcome'; //Import the Welcome Function (Page) from scr/Pages/Welcome
import Signup from './Pages/Signup';   //Import the SignUp Function (Page) from scr/Pages/Signup
import Home from './Pages/Home';

function AppRoutes() {
  return (
    //multiple Routes definition
    <Routes> 
        <Route path='/' element={<Home />} />  
        <Route path="/Signup" element={<Signup />} /> {/* When the Path is / the function Signup is executed which renders the page for signup defined in ./Pages/Signup*/}
        <Route path="/welcome" element={<Welcome />} /> {/* When the Path is /welcome the function Welcome is executed which renders the page for Welcome defined in ./Pages/Welcome*/}
    </Routes>
  );
}

export default AppRoutes;