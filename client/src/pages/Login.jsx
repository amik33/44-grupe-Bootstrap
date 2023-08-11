import { Link, useNavigate } from 'react-router-dom';
import style from './Auth.module.css';
import { useContext, useState } from 'react';
import { UserContext } from '../context/UserContext';

export function Login() {
    const [email, setEmail] = useState('');
    const [emailErr, setEmailErr] = useState('');
    const [emailValid, setEmailValid] = useState(false);
    const [password, setPassword] = useState('');
    const [passwordErr, setPasswordErr] = useState('');
    const [passwordValid, setPasswordValid] = useState(false);
    const [formErr, setFormErr] = useState('');
    const navigate = useNavigate();
    const ctx = useContext(UserContext);

    function updateEmail(e) {
        setEmail(e.target.value);
    }

    function updatePassword(e) {
        setPassword(e.target.value);
    }

    function isValidEmail() {
        const minEmailSize = 6;

        if (email.length < minEmailSize) {
            setEmailErr(`Email too short. Minimum ${minEmailSize} symbols required.`);
            setEmailValid(false);
        } else {
            setEmailErr(false);
            setEmailValid(true);
        }
    }

    function isValidPassword() {
        const minPasswordSize = 6;

        if (password.length < minPasswordSize) {
            setPasswordErr(`Password too short. Minimum ${minPasswordSize} symbols required.`);
            setPasswordValid(false);
        } else {
            setPasswordErr(false);
            setPasswordValid(true);
        }
    }

    function handleSubmit(e) {
        e.preventDefault();

        if ( emailValid && passwordValid) {
            fetch('http://localhost:3001/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({
                    email,
                    password,
                }),
            }).then(res => res.json())
                .then(data => {
                    console.log(data);
                    if (data.status === 'err') {
                        setFormErr(data.msg);
                    }
                   
                    if (data.status === 'ok') {
                        ctx.loginUser();
                        navigate('/content');
                    }
                })
                .catch(err => console.error(err));
                
        }
    }

    return (
        <div className={`form-signin w-100 m-auto ${style.formSignin}`}> 
          <form onSubmit={handleSubmit}>
            <h1 className="h1 mb-3 fw-normal">Please sign in</h1>
            {
                formErr && (
                    <div className="alert alert-danger alert-dismissible fade show" role="alert">
                        {formErr}
                        <button onClick={() => setFormErr('')} type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                    </div>
                )
            }
            <div className="form-floating mb-3">
                <input onChange={updateEmail} onBlur={isValidEmail} type="email" id="email" value={email}
                    className={`form-control ${emailErr ? 'is-invalid' : ''} ${emailValid ? 'is-valid' : ''}`} />
                <label htmlFor="email">Email address</label>
                <div className="invalid-feedback">{emailErr}</div>
            </div>
            <div className="form-floating mb-3">
                <input onChange={updatePassword} onBlur={isValidPassword} type="password" id="password" value={password}
                    className={`form-control ${passwordErr ? 'is-invalid' : ''} ${passwordValid ? 'is-valid' : ''}`} />
                <label htmlFor="password">Password</label>
                <div className="invalid-feedback">{passwordErr}</div>
            </div>
            <div className="form-check text-start my-3">
                <input className="form-check-input" type="checkbox" value="remember-me" id="flexCheckDefault" />
                <label className="form-check-label" htmlFor="flexCheckDefault">
                    Remember me
                </label>
            </div>
            <button className="btn btn-warning w-100 py-2" type="submit" disabled={!emailValid || !passwordValid}>Sign in</button>
            <p className="my-3 text-center text-body-secondary">or</p>
            <Link to='/future' className="btn btn-outline-primary w-100 py-2">Sign up</Link>
          </form>
        </div>
    );
}