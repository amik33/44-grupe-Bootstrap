import style from './Auth.module.css';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';

export function Register () {
    const [username, setUsername] = useState('');
    const [usernameErr, setUsernameErr] = useState('');
    const [usernameValid, setUsernameValid] = useState(false);
    const [email, setEmail] = useState('');
    const [emailErr, setEmailErr] = useState('');
    const [emailValid, setEmailValid] = useState(false);
    const [password, setPassword] = useState('');
    const [passwordErr, setPasswordErr] = useState('');
    const [passwordValid, setPasswordValid] = useState(false);
    const [repassword, setRepassword] = useState('');
    const [repasswordErr, setRepasswordErr] = useState('');
    const [repasswordValid, setRepasswordValid] = useState(false);
    const navigate = useNavigate();

    function updateUsername(e) {
        setUsername(e.target.value);
    }

    function updateEmail(e) {
        setEmail(e.target.value);
    }

    function updatePassword(e) {
        setPassword(e.target.value);
    }

    function updateRepassword(e) {
        setRepassword(e.target.value);
    }

    function isValidUsername() {
        const minUsernameSize = 3;

        if (username.length < minUsernameSize) {
            setUsernameErr(`Username too short. Minimum ${minUsernameSize} symbols required.`);
            setUsernameValid(false);
        } else {
            setUsernameErr(false);
            setUsernameValid(true);
        }
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

    function isValidRepeatPassword() {
        if (password !== repassword) {
            setRepasswordErr('Passwords do not match.');
            setRepasswordValid(false);
        } else {
            setRepasswordErr(false);
            setRepasswordValid(true);
        }
    }

    function handleSubmit(e) {
        e.preventDefault();

        if (usernameValid && emailValid && passwordValid && repasswordValid) {
            fetch('http://localhost:3001/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify({
                    username,
                    email,
                    password,
                }),
            }).then(res => res.json())
                .then(data => {
                    if (data.status === 'err-list') {
                        for (const item of data.errors) {
                            if (item.input === 'username') {
                                setUsernameErr(item.msg);
                            }
                            if (item.input === 'email') {
                                setEmailErr(item.msg);
                            }
                            if (item.input === 'password') {
                                setPasswordErr(item.msg);
                            }
                        }
                    }
                    if (data.status === 'ok') {
                        return navigate('/login');
                    }
            })

                .catch(err => console.error(err));
        }
    }

    return (
        <div className={`form-signin w-100 m-auto ${style.formSignin}`}> 
          <form onSubmit={handleSubmit}>
            <h1 className="h1 mb-3 fw-normal">Please sign up</h1>
            <div className="form-floating mb-3">
                <input onChange={updateUsername} onBlur={isValidUsername} type="text" id="username" value={username}
                    className={`form-control ${usernameErr ? 'is-invalid' : ''} ${usernameValid ? 'is-valid' : ''}`} />
                <label htmlFor="username">Username</label>
                <div className="invalid-feedback">{usernameErr}</div>
            </div>
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
            <div className="form-floating">
                <input onChange={updateRepassword} onBlur={isValidRepeatPassword} type="password" id="repassword" value={repassword}
                    className={`form-control ${repasswordErr ? 'is-invalid' : ''} ${repasswordValid ? 'is-valid' : ''}`} />
                <label htmlFor="repassword">Repeat password</label>
                <div className="invalid-feedback">{repasswordErr}</div>
            </div>
            <div className="form-check text-start my-3">
                <input className="form-check-input" type="checkbox" value="Agree-to" id="flexCheckDefault" />
                <label className="form-check-label" htmlFor="flexCheckDefault">
                    Agree to <Link to='/future'>Terms of Service</Link>
                </label>
            </div>
            <button className="btn btn-warning w-100 py-2" type="submit" disabled={!usernameValid || !emailValid || !passwordValid || !repasswordValid}>Sign up</button>
            <p className="my-3 text-center text-body-secondary">or</p>
            <Link to='/login' className="btn btn-outline-primary w-100 py-2">Sign in</Link>
          </form>
        </div>  
    )
};