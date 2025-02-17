/* eslint-disable react/prop-types */
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/opacity.css";

export default function GameImage({ image }) {
  return (
    <LazyLoadImage
      alt="game image"
      effect="opacity"
      wrapperProps={{
        style: { transitionDelay: "0.5s"},
      }}
      src={image}
      style={{ width: "100%", minHeight: "300px", borderRadius:"10px 10px 10px 10px" }}
    />
  );
}
