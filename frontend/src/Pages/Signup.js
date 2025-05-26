import { useNavigate } from 'react-router-dom';
import SignupForm from '../Components/SignupForm/SignupForm';
import Navbar from '../Components/Navbar/Navbar'

function Signup() {
  const navigate = useNavigate();

  const handleSignupSuccess = (username) => {
    navigate('/welcome', { state: { username } });
  };

  return (
    <div>
      <Navbar />
      <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', height: '100vh' }}>
        <SignupForm onSignupSuccess={handleSignupSuccess} />
      </div>
    </div>
  );
}

export default Signup;
