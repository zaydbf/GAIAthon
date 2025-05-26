// Handles importing
import './App.css'; //Imports Css file
import { BrowserRouter } from 'react-router-dom'; //Handles routing (/Dashboard /SignUp)
import AppRoutes from './Routes'; //Import the routes from Routes.js

function App() { //The root component of the react application (it exists in App.js) which renders the web page
  return (
    //the router engine for the app
    <BrowserRouter> 
       <AppRoutes />   {/* we call AppRoutes from ./Routes that contains all of our routes in the app*/}
    </BrowserRouter>
  );
}

export default App; //export the function so it can be used elsewhere
