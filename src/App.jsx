import { RouterProvider } from "react-router";
import router from "./Routs/Routes";
import "./index.css"

function App() {
  return(
    <RouterProvider router={router} />
  )
}

function Root(){
  return <App />
}

export default Root;
