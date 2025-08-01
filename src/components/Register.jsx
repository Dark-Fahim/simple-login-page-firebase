import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";
import { sendEmailVerification } from "firebase/auth";
import auth from "../firebase/firebase.config";

const Register = () => {
    const { createUser } = useContext(AuthContext)
    const handleRegister = e => {
        e.preventDefault()
        const email = e.target.email.value;
        const password = e.target.password.value;
        console.log(email, password);
        createUser(email, password)
            .then(result => {
                sendEmailVerification(auth.currentUser)
                    .then(() => {
                        alert("email verification sent")
                    })
                console.log(result.user);
            })
            .catch(error => {
                console.log(error.message);
            })
    }
    return (
        <div className="hero bg-base-200 min-h-screen">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                    <div className="card-body">
                        <form onSubmit={handleRegister}>
                            <fieldset className="fieldset">
                                <label className="label">Email</label>
                                <input type="email" className="input" placeholder="Email" name="email" required />
                                <label className="label">Password</label>
                                <input type="password" className="input" placeholder="Password" name="password" required />
                                <button className="btn btn-neutral mt-4">Register</button>
                            </fieldset>
                            <p>Already Have an Account? Please <span className="text-blue-500 font-bold"><Link to={'/login'}>Login</Link></span></p>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;