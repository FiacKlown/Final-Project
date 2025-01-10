/* eslint-disable react/prop-types */
import {LazyLoadImage} from "react-lazy-load-image-component"
import "react-lazy-load-image-component/src/effects/opacity.css"

function GameImage({ image }){
    return(
        <LazyLoadImage
            alt="game image"
            effect="opacity"
            wrapperProps={{
                style: { transitionDelay: "0.5s"},
            }}
            src={image}
        />
    )
}

export default GameImage;