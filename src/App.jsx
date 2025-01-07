import { RouterProvider } from "react-router";
import router from "./Routs/Routes.jsx";
import "./index.css"

function App() {
  return(
    <RouterProvider router={router} />
  )
}

export default App;
