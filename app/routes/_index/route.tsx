import NavBar from "./components/nav-bar"
import {json} from "@remix-run/node"

export const loader = async () => {
  return json({});
};

export default function LandingPage () {
    return(
        <NavBar />
    )
} 
