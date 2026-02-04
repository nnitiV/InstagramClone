'use client';
import { FormEvent, useState } from "react";
import { handleLogin } from "../services/auth-service";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Login() {
    const route = useRouter();
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
            route.push("/");
            setError("");
        } catch (error) {
            setError((error as Error).message);
        } finally {
            setIsLogginIn(false);
        }
    }
    return (
        <form className="row col-11 col-md-8 col-lg-5 shadow rounded-3 p-5" onSubmit={handleSubmit}>
            <h1 className="col-12 text-center">Login</h1>
            {error && <div className="alert alert-danger">{error}</div>}
            <div className="mb-3 col-12">
                <label htmlFor="login" className="form-label">Login</label>
                <input type="text" className="form-control" id="login" value={login} onChange={(e) => setLogin(e.target.value)} aria-describedby="loginHelp" />
            </div>
            <div className="mb-3 col-12">
                <label htmlFor="password" className="form-label">Password</label>
                <input type="password" className="form-control" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <div className="mb-3 col-12 form-check">
                <input type="checkbox" className="form-check-input" id="rememberMe" checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)} />
                <label className="form-check-label" htmlFor="rememberMe">Remember me</label>
            </div>
            <div className="col-12">
                {isLogginIn ?
                    <button className="btn btn-primary m-auto pt-2 pb-2" style={{ "maxWidth": "10vw", "minWidth": "225px" }} type="button" disabled>
                        <span className="spinner-border spinner-border-sm" aria-hidden="true"></span>
                        <span className="visually-hidden" role="status">Loading...</span>
                    </button>
                    :
                    <button type="submit" className="btn btn-primary m-auto pt-2 pb-2" style={{ "maxWidth": "10vw", "minWidth": "225px" }} >Log in</button>
                }
            </div>
            <div className="col-12">
                <hr className="m-auto my-3" />
                <p className="text-secondary">Don't have an account yet?</p>
                <Link href="/register" className="btn btn-secondary m-auto pt-2 pb-2 w-25" style={{ "maxWidth": "10vw", "minWidth": "225px" }}>Register</Link>
            </div>
        </form>
    )
};
