import style from '../NavbarUi/style.modules.css'

export default function NavbarUi(){
    <div className={`${style.navbarMargin}`} > 
            <div className={`${style.roundNav} ${style.color2}`}>
                    <div style={{
                        width: "40%"
                    }}>
                        <input className={`${style.searchBar} ${style.left}`}
                            type="search"
                            name="search"
                            placeholder="Search"
                            aria-label="Search"
                        />
                    </div>
                    <div className={`${style.buttonPosition}`} style={{ marginLeft: "auto" }}>
                        <button className={`${style.loginBtn} ${style.left}`}>Login</button>
                        <button className={`${style.loginBtn} ${style.left}`}>Register</button>
                    </div>
                            
            </div >
    </div>
}
