'use client';
import { FormEvent, useState } from "react";
import { handleLogin } from "../services/auth-service";

const Login = () => {
    const [isLogginIn, setIsLogginIn] = useState<boolean>(false);
    const [error, setError] = useState<string>("");
    const [login, setLogin] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [rememberMe, setRememberMe] = useState<boolean>(false);
    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setIsLogginIn(true);
        try {
            await handleLogin(login, password, rememberMe);
        } catch (error) {
            setError((error as Error).message);
        } finally {
            setIsLogginIn(false);
        }
    }
    return (
        <form className="w-50 shadow rounded-3 p-5" onSubmit={handleSubmit}>
            {error && <div className="alert alert-danger">{error}</div>}
            <div className="mb-3">
                <label htmlFor="login" className="form-label">Login</label>
                <input type="text" className="form-control" id="login" value={login} onChange={(e) => setLogin(e.target.value)} aria-describedby="loginHelp" />
            </div>
            <div className="mb-3">
                <label htmlFor="password" className="form-label">Password</label>
                <input type="password" className="form-control" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <div className="mb-3 form-check">
                <input type="checkbox" className="form-check-input" id="rememberMe" checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)} />
                <label className="form-check-label" htmlFor="rememberMe">Remember me</label>
            </div>
            {isLogginIn ?
                <button className="btn btn-primary m-auto pt-2 pb-2" style={{ "maxWidth": "10vw", "minWidth": "225px" }} type="button" disabled>
                    <span className="spinner-border spinner-border-sm" aria-hidden="true"></span>
                    <span className="visually-hidden" role="status">Loading...</span>
                </button>
                :
                <button type="submit" className="btn btn-primary m-auto pt-2 pb-2" style={{ "maxWidth": "10vw", "minWidth": "225px" }} >Log in</button>
            }
        </form>
    )
};

export default Login;