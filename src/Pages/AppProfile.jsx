import useProfile from "../hooks/useProfile";
import { getAvatarUrl } from "../utils/getAvatarUrl";
import { Link } from "react-router";
import DataBase from "../DataBase/client";
import SessionContext from "../context/SessionContext";
import { useEffect, useState, useContext } from "react";
import supabase from "../DataBase/client";
import { Toaster, toast } from "sonner";
import Rehacktor from "../assets/images/Rehacktor.png";
import DefaultAvatar from "../../public/DefaultAvatar.svg";

export default function AppProfile() {
  const { loading, username, first_name, last_name, avatar_url } = useProfile();
  const [fav, setFav] = useState([]);
  const session = useContext(SessionContext);

  useEffect(() => {
    if (session && session.user) {
      async function readFav() {
        let { data: favourites, error } = await supabase
          .from("favourites")
          .select("*")
          .eq("profile_id", session.user.id);
        if (error) {
          toast.error("Error reading from Database");
        } else {
          setFav(favourites);
        }
      }
      readFav();
    }
  }, [session]);

  const signOut = async () => {
    const { error } = await DataBase.auth.signOut();
    if (error) {
      alert(error);
    }
  };

  if (loading) {
    return <progress></progress>;
  }

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
      <div className="containerProfile">
        <header>
          <h1 style={{ paddingTop: "5%" }}>
            Welcome {username} to your profile page
          </h1>
        </header>
        <div className="d-flex">
          <div className="userCard">
            <section>
              <img
                src={avatar_url ? getAvatarUrl(avatar_url) : DefaultAvatar}
                alt={"image profile"}
              />
            </section>
            <section id="infoUser" className="">
              <details>
                <summary className="summaryProfile" role="button">
                  Favourite Games
                </summary>
                <Toaster richColors />
                {fav.length ? (
                  fav.map((game) => (
                    <li key={game.game_id}>{game.game_name}</li>
                  ))
                ) : (
                  <p>You dont have any favourite games</p>
                )}
              </details>
            </section>
          </div>
          <div className="datiUser">
            <p>
              <strong>Nickname:</strong> {username}
            </p>
            <p>
              <strong>Name:</strong> {first_name}
            </p>
            <p>
              <strong>Surname:</strong> {last_name}
            </p>
            <p>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Deserunt
              iusto placeat veniam, vel quos eveniet doloremque sit natus
              repellendus adipisci error ea? Alias vero eligendi ea a iusto quas
              fugit.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
