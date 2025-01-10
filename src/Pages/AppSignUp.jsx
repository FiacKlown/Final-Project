import { Link } from "react-router"
import supabase from "../DataBase/client";

export default function AppSignUp(){
    const handleSubmission = async (event) => {
        event.preventDefault();
        const formRegister = event.currentTarget
        const { email, password } = Object.fromEntries(new FormData(formRegister))
        try {
            const { data, error} = await supabase.auth.signUp({
                email,
                password,
            })
            if (error) {
                alert(error)
            } else {
                console.log(data)
                formRegister.reset()
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
                    <form onSubmit={handleSubmission}>
                        {/* <label htmlFor="username">Username</label>
                        <input 
                            type="username"
                            id="username" 
                            name="username" 
                            placeholder="username"
                        /> */}
                        <label htmlFor="email">Email address</label>
                        <input 
                            type="email"
                            id="email" 
                            name="email" 
                            placeholder="test@email.com"
                            required
                        />
                        <label htmlFor="password">Password</label>
                        <input 
                            type="password"
                            id="password" 
                            name="password" 
                            placeholder="supersecret"
                            required
                        />
                        {/* <label htmlFor="confirm_password">Password</label>
                        <input 
                            type="confirm_password"
                            id="confirm_password" 
                            name="confirm_password" 
                            placeholder="supersecret"
                        /> */}

                        <button type="submit">Sign Up</button>
                        
                    </form>
                    
                </div>
                <div className="loginWrapper">
                </div>
            </div>
        </div>
    )
    
}