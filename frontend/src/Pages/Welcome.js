import { useLocation } from "react-router-dom";


function Welcome() {
    const location = useLocation();
    const username = location.state.username; 
    return <h1>Welcome { username }!</h1>;
}

export default Welcome;