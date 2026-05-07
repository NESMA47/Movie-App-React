import React, { useState } from 'react';
import { Button, Form, InputGroup } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [errors, setErrors] = useState("");
    const history = useHistory();
    const handleLogin = (e) => {
        e.preventDefault();
        if (email === "" || password.length < 6) {
            setErrors("Email is required and password must be at least 6 characters long");
        } 
        else {
            setErrors("");
            console.log("Logged in successfully!", { email });
        }
       history.push('/movies');
    }

    return (
        <div className="d-flex justify-content-center align-items-center vh-100 bg-dark">
            <Form onSubmit={handleLogin} className="p-5 rounded-4 shadow-lg text-white" 
                  style={{ backgroundColor: '#141414', width: '400px', border: '1px solid #e50914' }}>
                
                <h2 className="text-center mb-4 fw-bold" style={{ color: '#e50914', letterSpacing: '2px' }}>OURA LOGIN</h2>
                
                <Form.Group className="mb-3">
                    <Form.Label className="small text-secondary">EMAIL ADDRESS</Form.Label>
                    <Form.Control 
                        type="email" 
                        placeholder="Enter email" 
                        className="bg-dark text-white border-secondary shadow-none py-2"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label className="small text-secondary">PASSWORD</Form.Label>
                    <InputGroup>
                        <Form.Control 
                            type={showPassword ? "text" : "password"} 
                            placeholder="Password" 
                            className="bg-dark text-white border-secondary border-end-0 shadow-none py-2"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <InputGroup.Text 
                            className="bg-dark border-secondary border-start-0 text-secondary"
                            style={{ cursor: 'pointer' }}
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            <i className={showPassword ? "bi bi-eye-slash-fill" : "bi bi-eye-fill"}></i>
                        </InputGroup.Text>
                    </InputGroup>
                </Form.Group>

                {errors && <p className="text-danger small mb-3">{errors}</p>}
               
                <Button 
                    variant="danger" 
                    type="submit" 
                    className="w-100 fw-bold py-2 mt-2 shadow"
                    style={{ backgroundColor: '#e50914', border: 'none' }}
                >
                    ENTER ARENA
                </Button>
            </Form>
        </div>
    );
}

export default Login;