import React, { useState } from 'react';
import { Form, Button, InputGroup } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
   const history=useHistory();
  const handleRegister = (e) => {
    e.preventDefault();
    if (name === "" || email === "" || username === "" || password === "" || confirmPassword === "") {
      setError("All fields are required");
    } else if (password.length < 6) {
      setError("Password must be at least 6 characters long");
    } else if (password !== confirmPassword) {
      setError("Passwords do not match");
    } else {
      history.push('/movies')
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "name") setName(value);
    else if (name === "email") setEmail(value);
    else if (name === "username") setUsername(value);
    else if (name === "password") setPassword(value);
    else if (name === "confirmPassword") setConfirmPassword(value);
  };

  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100 bg-dark py-5">
      <Form onSubmit={handleRegister} className="p-5 rounded-4 shadow-lg text-white"
        style={{ backgroundColor: '#141414', width: '400px', border: '1px solid #e50914' }}>
        
        <h2 className="text-center mb-4 fw-bold" style={{ color: '#e50914', letterSpacing: '2px' }}>OURA JOIN</h2>

        <Form.Group className="mb-3">
          <Form.Label className="small text-secondary">NAME</Form.Label>
          <Form.Control name="name" placeholder="Full Name" value={name} onChange={handleChange} className="bg-dark text-white border-secondary shadow-none" />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label className="small text-secondary">EMAIL</Form.Label>
          <Form.Control name="email" type="email" placeholder="Email" value={email} onChange={handleChange} className="bg-dark text-white border-secondary shadow-none" />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label className="small text-secondary">USER NAME</Form.Label>
          <Form.Control name="username" placeholder="Username" value={username} onChange={handleChange} className="bg-dark text-white border-secondary shadow-none" />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label className="small text-secondary">PASSWORD</Form.Label>
          <InputGroup>
            <Form.Control
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={handleChange}
              className="bg-dark text-white border-secondary border-end-0 shadow-none"
            />
            <InputGroup.Text
              className="bg-dark border-secondary border-start-0 text-secondary"
              onClick={() => setShowPassword(!showPassword)}
              style={{ cursor: 'pointer' }}
            >
              <i className={showPassword ? "bi bi-eye-slash-fill" : "bi bi-eye-fill"}></i>
            </InputGroup.Text>
          </InputGroup>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label className="small text-secondary">CONFIRM PASSWORD</Form.Label>
          <Form.Control name="confirmPassword" type="password" placeholder="Confirm Password" value={confirmPassword} onChange={handleChange} className="bg-dark text-white border-secondary shadow-none" />
        </Form.Group>

        {error && <p className="text-danger small mb-3">{error}</p>}

        <Button type="submit" className="w-100 fw-bold py-2 mt-2 shadow"
          style={{ backgroundColor: '#e50914', border: 'none' }}>
          REGISTER
        </Button>
      </Form>
    </div>
  );
}

export default Register;