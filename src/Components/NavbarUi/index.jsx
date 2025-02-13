import { useState } from "react";
import style from "./style.module.css";
import { Link } from "react-router";
import SessionContext from "../../context/SessionContext";
import DataBase from "../../DataBase/client";
import { useContext } from "react";
import ModalSearch from "../ModalSearch";
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
    const { error } = await DataBase.auth.signOut();
    if (error) {
      alert(error);
    }
  };

  return (
    <div>
      <ModalSearch focus={focus} handleClickOverlay={handleClickOverlay} />
      <div className={`${style.navbarMargin}`}>
        <div className={style.logoPosition}>
          <Link to={`/`} className="btnHome">
            <img src={Rehacktor} alt="Site Logo" style={{ width: "150px" }} />
          </Link>
        </div>
        <div className={`${style.roundNav} ${style.color2}`}>
          <div className={`${style.searchNav}`}>
            <input
              className={`${style.searchBar} ${style.left}`}
              type="search"
              name="search"
              aria-label="Search"
              onFocus={handleFocus}
            />
          </div>
          <div
            className={`${style.buttonPosition}`}
            style={{ marginLeft: "auto" }}
          >
            {session ? (
              <button
                onClick={signOut}
                className={`${style.loginBtn} ${style.left}`}
              >
                Sign Out
              </button>
            ) : (
              <div>
                <Link to={`/signin`}>
                  <button className={`${style.loginBtn} ${style.left}`}>
                    Login
                  </button>
                </Link>
                <Link to={`/signup`}>
                  <button className={`${style.loginBtn} ${style.left}`}>
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
