import { Link, useNavigate } from "react-router";
import supabase from "../supabase/client";
import { Toaster, toast } from "sonner";
import loginImage from "../assets/images/loginImage.jpg";
import Rehacktor from "../assets/images/Rehacktor.png";

export default function AppSignIn() {
  const navigate = useNavigate();

  const handleSignIn = async (event) => {
    event.preventDefault();
    const formLogin = event.currentTarget;
    const { email, password } = Object.fromEntries(new FormData(formLogin));
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) {
        toast.error("Log In failed");
      } else {
        toast.success("Log In Succes");
        await new Promise((resolve) => setTimeout(resolve, 2000));
        formLogin.reset();
        navigate("/");
      }
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div className="container ">
      <div className="d-flex">
        <div className="logoPosition">
          <Link to={`/`}>
            <img src={Rehacktor} alt="Site Logo" style={{ width: "150px" }} />
          </Link>
        </div>
        <div
          className="buttonPosition BtnPosition"
          style={{ marginLeft: "auto" }}
        >
          <Link to={`/signin`}>
            <button className="loginBtn left">Login</button>
          </Link>
          <Link to={`/signup`}>
            <button className="loginBtn left">Register</button>
          </Link>
        </div>
      </div>

      <div className="d-flex loginPage">
        <div className="loginWrapper1">
          <h1>Log In</h1>
          <form onSubmit={handleSignIn}>
            <label htmlFor="email">Email address</label>
            <input
              className="inputLogin"
              type="email"
              name="email"
              placeholder="test@email.com"
              id="email"
            ></input>

            <label htmlFor="password">Password</label>
            <input
              className="inputLogin"
              type="password"
              name="password"
              placeholder="Password"
              id="password"
            ></input>
            <button className="buttonSignUp" type="submit">
              Log in
            </button>
            <Toaster richColors />
          </form>
        </div>
        <div className="loginWrapper2">
          <img
            src={loginImage}
            alt="Login Illustration"
            style={{ width: "100%", borderRadius: "10px" }}
          />
        </div>
      </div>
    </div>
  );
}
