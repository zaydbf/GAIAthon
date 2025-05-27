import './style.css'
import { useNavigate } from 'react-router-dom';

function Vision() {
    const navigate = useNavigate();
    const handleClick = () => {
        navigate('/SignUp');
    }
  return (
    <div class="col-lg-6 col-md-12 col-12">
          <div className="header-content">
            <h1>CarbonSense &amp; GAIAthon</h1>
            <p>
              We are a group of student working on a solution for carbon reduction using AI and IOT
            </p>
            <div className="button">
              <button className="btn primary-btn" onClick={handleClick}>Get Started</button>
              gregergeg
            </div>
          </div>
        </div>
  );
}

export default Vision;
