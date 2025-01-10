import { Link } from "react-router"
import supabase from "../DataBase/client";


export default function AppSignIn(){
    const handleSignIn = async (event) => {
        event.preventDefault();
        const formLogin = event.currentTarget
        const { email, password } = Object.fromEntries(new FormData(formLogin))
        try {
            const { data, error} = await supabase.auth.signInWithPassword({
                email,
                password,
            })
            if (error) {
                alert(error)
            } else {
                console.log(data)
                formLogin.reset()
            }   
        } catch (error) {
            alert(error)
        }
    }

    return(
        <div className="container ">
            <div className="d-flex">
                <div className="btnHomePosition">
                    <Link to={`/`} className="btnHome">
                        <h1 className="">HOME</h1>
                    </Link>
                </div>
                <div className="buttonPosition BtnPosition" style={{ marginLeft: "auto" }}>
                    <Link to={`/signin`}>
                        <button className="loginBtn left">Login</button>
                    </Link>
                    <Link to={`/signup`}>
                        <button className="loginBtn left">Register</button>
                    </Link>
                </div>
            </div>
            
            <div className="d-flex">
                <div className="loginWrapper">
                    <h1>Log In</h1>
                    <form onSubmit={handleSignIn}>
                        <label htmlFor="email">Email address</label>
                        <input type="email" name="email" placeholder="test@email.com"></input>
                                               
                        <label htmlFor="password">Password</label>
                        <input type="password" name="password" placeholder="Password"></input>
                        <button type="submit">Sign Up</button>
                    </form>
                </div>
                <div className="loginWrapper">
                </div>
            </div>
        </div>
    )
}