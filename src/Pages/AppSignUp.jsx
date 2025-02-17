import { Link, useNavigate } from "react-router";
import supabase from "../supabase/client";
import { Toaster, toast } from "sonner";
import RegisterImage from "../assets/images/RegisterImage.jpg";
import Rehacktor from "../assets/images/Rehacktor.png";
import signUpStyle from "../css/signUpStyle.module.css";

export default function AppSignUp() {
  const navigate = useNavigate();
  const handleSubmission = async (event) => {
    event.preventDefault();
    const formRegister = event.currentTarget;
    const { email, password, username, first_name, last_name } =
      Object.fromEntries(new FormData(formRegister));
    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            username,
            first_name,
            last_name,
          },
        },
      });
      if (error) {
        toast.error("Sign Up failed");
      } else {
        toast.success("Sign Up Succes");
        await new Promise((resolve) => setTimeout(resolve, 2000));
        formRegister.reset();
        navigate("/");
      }
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div className="container ">
      <div className={signUpStyle.dFlex}>
        <div className={signUpStyle.logoPosition}>
          <Link to={`/`}>
            <img src={Rehacktor} alt="Site Logo" style={{ width: "150px" }} />
          </Link>
        </div>
        <div style={{ marginLeft: "auto", paddingTop:"10px" }}>
          <Link to={`/signin`}>
            <button className={signUpStyle.registerBtn}>Login</button>
          </Link>
          <Link to={`/signup`}>
            <button className={signUpStyle.registerBtn}>Register</button>
          </Link>
        </div>
      </div>

      <div className={signUpStyle.registerPage}>
        <div className={signUpStyle.registerWrapper1}>
          <h1>Register</h1>
          <form onSubmit={handleSubmission}>
            <label htmlFor="username">Username</label>
            <input
              className={signUpStyle.inputRegister}
              type="text"
              id="username"
              name="username"
              placeholder="username"
              required
            />
            <label htmlFor="first_name">First name</label>
            <input
              className={signUpStyle.inputRegister}
              type="text"
              id="first_name"
              name="first_name"
              placeholder="first name"
              required
            />
            <label htmlFor="last_name">Last name</label>
            <input
              className={signUpStyle.inputRegister}
              type="text"
              id="last_name"
              name="last_name"
              placeholder="last name"
              required
            />
            <label htmlFor="email">Email address</label>
            <input
              className={signUpStyle.inputRegister}
              type="email"
              id="email"
              name="email"
              placeholder="test@email.com"
              required
            />

            <label htmlFor="password">Password</label>
            <input
              className={signUpStyle.inputRegister}
              type="password"
              id="password"
              name="password"
              placeholder="supersecret"
              required
            />
            <button className={signUpStyle.buttonRegister} type="submit">
              Sign Up
            </button>
            <Toaster richColors />
          </form>
        </div>
        <div className={signUpStyle.registerWrapper2}>
          <img
            src={RegisterImage}
            alt="Login Illustration"
            style={{ width: "100%", borderRadius: "10px" }}
          />
        </div>
      </div>
    </div>
  );
}
