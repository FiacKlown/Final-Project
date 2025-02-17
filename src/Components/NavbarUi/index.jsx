import { useState } from "react";
import navbarStyle from "../../css/navbarStyle.module.css";
import { Link } from "react-router";
import SessionContext from "../../context/SessionContext";
import supabase from "../../supabase/client";
import { useContext } from "react";
import ModalSearch from "../modalSearch";
import Rehacktor from "../../assets/images/Rehacktor.png";

export default function NavbarUI() {
  const [focus, setFocus] = useState(false);
  const session = useContext(SessionContext);

  const handleFocus = () => {
    setFocus(true);
  };

  const handleClickOverlay = () => {
    setFocus(false);
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      alert(error);
    }
  };

  return (
    <div>
      <ModalSearch focus={focus} handleClickOverlay={handleClickOverlay} />
      <div className={navbarStyle.navbarMargin}>
        <div className={navbarStyle.logoPosition}>
          <Link to={`/`} className="btnHome">
            <img src={Rehacktor} alt="Site Logo" style={{ width: "150px" }} />
          </Link>
        </div>
        <div className={navbarStyle.roundNav}>
          <div className={navbarStyle.searchNav}>
            <input
              className={navbarStyle.searchBar}
              type="search"
              name="search"
              aria-label="Search"
              onFocus={handleFocus}
            />
          </div>
          <div
            className={navbarStyle.buttonPosition}
            style={{ marginLeft: "auto" }}
          >
            {session ? (
              <button
                onClick={signOut}
                className={navbarStyle.loginBtn}
              >
                Sign Out
              </button>
            ) : (
              <div>
                <Link to={`/signin`}>
                  <button className={navbarStyle.loginBtn}>
                    Login
                  </button>
                </Link>
                <Link to={`/signup`}>
                  <button className={navbarStyle.loginBtn}>
                    Register
                  </button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
