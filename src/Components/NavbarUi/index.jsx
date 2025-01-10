import { useState } from 'react'
import style from './style.module.css'
import ModalSearch from '../ModalSearch'
import { Link } from "react-router"
import supabase from '../../DataBase/client'

export default function NavbarUI(){
    const [focus, setFocus]=useState(false)

    const handleFocus = () => {
        setFocus(true)
    } 

    const handleClickOverlay = () => {
        setFocus(false)
    };

    const signOut = async () => {
        const{error} = await supabase.auth.signOut()
        if (error){
            alert(error)
        } 
    }

    return(
        <div>
            <ModalSearch focus={focus} handleClickOverlay={handleClickOverlay}/>
            <div className={`${style.navbarMargin}`} > 
                <div className={`${style.roundNav} ${style.color2}`}>
                        <div className={`${style.searchNav}`}>
                            <input className={`${style.searchBar} ${style.left}`}
                                type="search"
                                name="search"
                                aria-label="Search"
                                onFocus={handleFocus}
                            />
                        </div>
                        <div className={`${style.buttonPosition}`} style={{ marginLeft: "auto" }}>
                            <Link to={`/signin`}>
                                <button className={`${style.loginBtn} ${style.left}`}>Login</button>
                            </Link>
                            <Link to={`/signup`}>
                                <button className={`${style.loginBtn} ${style.left}`}>Register</button>
                            </Link>
                            <button onClick={signOut} className={`${style.loginBtn} ${style.left}`}>Sign Out</button>
                        </div>       
                </div >
                
            </div>        
        </div>
        
               
    )

    
}
