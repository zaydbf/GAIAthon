import { useState } from 'react';
import './SignupForm.css';

function SignupForm({ onSignupSuccess }) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const signup = async (e) => {
    e.preventDefault();
    const res = await fetch('http://localhost:8000/api/signup/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, email, password }),
    });

    if (res.ok) {
      onSignupSuccess(username);
    } else {
      setMessage('Error with creating user, please verify your credentials');
    }
  };

  return (
<section className="gradient-custom">
  <div className="container py-5">
    <div className="d-flex justify-content-center align-items-center h-100">
      <div className="card card-registration">
        <div className="card-body">
          <h3 className="text-center mb-5">Registration Form</h3>
          <form onSubmit={signup}>
            <div className="row">
              <div className="col-md-6 mb-5">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div className="col-md-6 mb-5">
                <input
                  type="email"
                  className="form-control"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div className="mb-5">
              <input
                type="password"
                className="form-control"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {message && <div className="text-danger mb-4">{message}</div>}

            <div>
              <button type="submit" className="btn btn-primary btn-lg">Sign Up</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</section>
  );
}

export default SignupForm;
