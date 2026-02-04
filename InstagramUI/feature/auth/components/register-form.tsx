"use client";
import { FormEvent, useState } from "react";
import { handleRegister } from "../services/auth-service";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { RegisterUser } from "../types";

const Register = () => {
    const route = useRouter();
    const [error, setError] = useState<string>("");
    const [isRegistering, setIsRegistering] = useState<boolean>(false);
    const [registerInfo, setRegisterInfo] = useState<RegisterUser>({
        email: "",
        username: "",
        name: "",
        password: "",
        confirmPassword: ""
    });
    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setIsRegistering(true);
        try {
            await handleRegister();
            route.push("/login");
        } catch (error) {
            setError((error as Error).message);
        } finally {
            setIsRegistering(false);
        }
    }
    return (
        <form className="w-50 shadow rounded-3 p-5 row g-3" onSubmit={handleSubmit}>
            <h1 className="col-12 text-center">Register</h1>
            {error && <div className="alert alert-danger">{error}</div>}
            <div className="mb-3 col-12">
                <label htmlFor="email" className="form-label">Email</label>
                <input type="text" className="form-control" id="email" aria-describedby="emailHelp" value={registerInfo.email} onChange={(e) => setRegisterInfo(prev => ({ ...prev, email: e.target.value }))} />
            </div>
            <div className="mb-3 col-lg-6 col-12">
                <label className="form-label" htmlFor="autoSizingInputGroup">Username</label>
                <div className="input-group">
                    <div className="input-group-text">@</div>
                    <input type="text" className="form-control" id="autoSizingInputGroup" placeholder="Username"
                        value={registerInfo.username} onChange={(e) => setRegisterInfo(prev => ({ ...prev, username: e.target.value }))}
                    />
                </div>
            </div>
            <div className="mb-3 col-lg-6 col-12">
                <label htmlFor="name" className="form-label">Name</label>
                <input type="text" className="form-control" id="name" aria-describedby="nameHelp"
                    value={registerInfo.name} onChange={(e) => setRegisterInfo(prev => ({ ...prev, name: e.target.value }))}
                />
            </div>
            <div className="mb-3 col-lg-6 col-12">
                <label htmlFor="password" className="form-label">Password</label>
                <input type="password" className="form-control" id="password"
                    value={registerInfo.password} onChange={(e) => setRegisterInfo(prev => ({ ...prev, password: e.target.value }))}
                />
            </div>
            <div className="mb-3 col-lg-6 col-12">
                <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
                <input type="confirmPassword" className="form-control" id="confirmPassword"
                    value={registerInfo.confirmPassword} onChange={(e) => setRegisterInfo(prev => ({ ...prev, confirmPassword: e.target.value }))}
                />
            </div>
            <div className="col-12 d-flex">
                {isRegistering ?
                    <button className="btn btn-primary m-auto pt-2 pb-2" type="button" style={{ "maxWidth": "10vw", "minWidth": "225px" }} disabled>
                        <span className="spinner-border spinner-border-sm" aria-hidden="true"></span>
                        <span className="visually-hidden" role="status">Loading...</span>
                    </button>
                    :
                    <button type="submit" className="btn btn-primary m-auto pt-2 pb-2" style={{ "maxWidth": "10vw", "minWidth": "225px" }}>Register</button>
                }
            </div>
            <div className="col-12 d-flex flex-column align-items-center">
                <hr className="m-auto my-3 w-100" />
                <p className="text-secondary">Already have an account?</p>
                <Link href="/login" className="btn btn-secondary m-auto pt-2 pb-2 w-25" style={{ "maxWidth": "10vw", "minWidth": "225px" }}>Login</Link>
            </div>
        </form>
    )
};

export default Register;