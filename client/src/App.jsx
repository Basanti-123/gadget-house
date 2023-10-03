import { BrowserRouter, RouterProvider, createBrowserRouter } from "react-router-dom";
import Cart from "./pages/Cart"
import Home from "./pages/Home";
import Error from "./pages/Error";

const router = createBrowserRouter([
  {
  path: "/",
  element: <Home />
},

{
  path: "/cart",
  element: <Cart />
},

{
  path: "*",
  element: <Error />,

},

]);


function App() {
return (
<>
  <RouterProvider router={router} />
     </>
)
  
}

export default App
