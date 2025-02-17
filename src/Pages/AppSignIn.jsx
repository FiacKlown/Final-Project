import { Link, useNavigate } from "react-router";
import supabase from "../supabase/client";
import { Toaster, toast } from "sonner";
import loginImage from "../assets/images/loginImage.jpg";
import Rehacktor from "../assets/images/Rehacktor.png";
import signInStyle from "../css/signInStyle.module.css"

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
      <div className={signInStyle.dFlex}>
        <div className={signInStyle.logoPosition}>
          <Link to={`/`}>
            <img src={Rehacktor} alt="Site Logo" style={{ width: "150px" }} />
          </Link>
        </div>
        <div
          className={signInStyle.BtnPosition}
          style={{ marginLeft: "auto" }}
        >
          <Link to={`/signin`}>
            <button className={signInStyle.loginBtn}>Login</button>
          </Link>
          <Link to={`/signup`}>
            <button className={signInStyle.loginBtn}>Register</button>
          </Link>
        </div>
      </div>

      <div className={signInStyle.loginPage}>
        <div className={signInStyle.loginWrapper1}>
          <h1>Log In</h1>
          <form onSubmit={handleSignIn}>
            <label htmlFor="email">Email address</label>
            <input
              className={signInStyle.inputLogin}
              type="email"
              name="email"
              placeholder="test@email.com"
              id="email"
            ></input>

            <label htmlFor="password">Password</label>
            <input
              className={signInStyle.inputLogin}
              type="password"
              name="password"
              placeholder="Password"
              id="password"
            ></input>
            <button className={signInStyle.buttonSignUp} type="submit">
              Log in
            </button>
            <Toaster richColors />
          </form>
        </div>
        <div className={signInStyle.loginWrapper2}>
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
