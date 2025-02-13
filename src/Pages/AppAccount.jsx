import supabase from "../DataBase/client";
import SessionContext from "../context/SessionContext";
import { Toaster, toast } from "sonner";
import { useState, useEffect, useContext } from "react";
import Avatar from "../Components/AvatarUI/Avatar";
import { Link } from "react-router";
import DataBase from "../DataBase/client";
import Rehacktor from "../assets/images/Rehacktor.png";

export default function AppAccount() {
  const session = useContext(SessionContext);
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState(null);
  const [first_name, setFirstName] = useState(null);
  const [last_name, setLastName] = useState(null);
  const [avatar_url, setAvatarUrl] = useState(null);

  useEffect(() => {
    let ignore = false;
    async function getProfile() {
      setLoading(true);
      const { user } = session;

      const { data, error } = await supabase
        .from("profiles")
        .select(`username, first_name, last_name, avatar_url`)
        .eq("id", user.id)
        .single();

      if (!ignore) {
        if (error) {
          console.warn(error);
        } else if (data) {
          setUsername(data.username);
          setFirstName(data.first_name);
          setLastName(data.last_name);
          setAvatarUrl(data.avatar_url);
        }
      }

      setLoading(false);
    }

    getProfile();

    return () => {
      ignore = true;
    };
  }, [session]);

  async function updateProfile(event, avatarUrl) {
    event.preventDefault();
    console.log("Avatar URL before update: ", avatarUrl);
    setLoading(true);
    const { user } = session;

    const updates = {
      id: user.id,
      username,
      first_name,
      last_name,
      avatar_url: avatarUrl,
      updated_at: new Date(),
    };

    console.log("Updates data: ", updates);

    const { error, data } = await supabase.from("profiles").upsert(updates);

    if (error) {
      toast.error(error.message);
      console.log("Error details: ", error);
    } else {
      console.log("Updated profile data:", data);
      toast.success("User Updated");
      setAvatarUrl(avatarUrl);
    }
    setLoading(false);
  }

  const signOut = async () => {
    const { error } = await DataBase.auth.signOut();
    if (error) {
      alert(error);
    }
  };

  return (
    <div className="container">
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
          <Link to={`/`}>
            <button onClick={signOut} className="loginBtn">
              Sign Out
            </button>
          </Link>
        </div>
      </div>
      <h3 style={{ marginTop: "5%", textAlign: "center" }}>
        Welcome to your account page here you can change the parameters of your
        account
      </h3>
      <form onSubmit={updateProfile} className="form-widget">
        <div className="formContainer">
          <div className="avatarSection">
            <Avatar
              url={avatar_url}
              size={300}
              onUpload={(event, url) => {
                updateProfile(event, url);
              }}
            />
          </div>

          <div className="formFields">
            <div>
              <label htmlFor="email">Email</label>
              <input
                className="inputAccount"
                id="email"
                type="text"
                value={session.user.email}
                disabled
              />
            </div>

            <div>
              <label htmlFor="username">Username</label>
              <input
                className="inputAccount"
                id="username"
                type="text"
                required
                value={username || ""}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>

            <div>
              <label htmlFor="first_name">First name</label>
              <input
                className="inputAccount"
                id="first_name"
                type="text"
                value={first_name || ""}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>

            <div>
              <label htmlFor="last_name">Last name</label>
              <input
                className="inputAccount"
                id="last_name"
                type="text"
                value={last_name || ""}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>

            <div>
              <button
                className="button block buttonAccount"
                type="submit"
                disabled={loading}
              >
                {loading ? "Loading ..." : "Update"}
              </button>
              <Toaster richColors />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
