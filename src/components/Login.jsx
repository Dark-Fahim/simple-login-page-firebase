import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";
import { sendEmailVerification } from "firebase/auth";
import auth from "../firebase/firebase.config";


const Login = () => {
    const { signInUser, user } = useContext(AuthContext)
    const handleLogin = e => {
        e.preventDefault()

        const email = e.target.email.value;
        const password = e.target.password.value;
        console.log(email, password);
        if(user && !user?.emailVerified){
            alert("please Verify Your email")
            return
        }
        if (!user) {
            
            signInUser(email, password)
                .then(result => {
                    console.log(result.user);

                })
                .catch(error => {
                    console.log(error);
                })
            return
        }


    }
    return (
        <div className="hero bg-base-200 min-h-screen">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                    <div className="card-body">
                        <form onSubmit={handleLogin}>
                            <fieldset className="fieldset">
                                <label className="label">Email</label>
                                <input type="email" className="input" placeholder="Email" name="email" required />
                                <label className="label">Password</label>
                                <input type="password" className="input" placeholder="Password" name="password" required />
                                <div><a className="link link-hover">Forgot password?</a></div>
                                <button className="btn btn-neutral mt-4">Login</button>
                            </fieldset>
                            <p>New to this site? Please <span className="text-blue-500 font-bold"><Link to={'/register'}>Register</Link></span></p>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;