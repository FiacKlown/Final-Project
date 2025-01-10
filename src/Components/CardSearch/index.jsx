import style from './style.module.css'

export default function CardSearch(/* {game} */){
    /* const {background_image, name} = game; */

    return(
        <article className={style.cardResult}>
            <img className={style.imgAvatarResult} src="" alt="image suggestion" />
            <small>{name}</small>
        </article>
    )
}