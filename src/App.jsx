import { Header ,Footer} from "./components/index"

import { Outlet } from "react-router-dom";
import "./app.css";
function App() {
  return <> 
  <Header/>
  <Outlet/>
  <Footer/>
  </>;
}

export default App;
