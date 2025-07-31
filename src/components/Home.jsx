import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";


const Home = () => {
    const {name} = useContext(AuthContext)
    return (
        <div>
            <h2 className="text-5xl">This is home {name}</h2>
        </div>
    );
};

export default Home;