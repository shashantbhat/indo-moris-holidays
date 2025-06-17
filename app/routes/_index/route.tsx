import NavBar from "./components/nav-bar";
import Hero from "./components/hero-section";
import {json} from "@remix-run/node"

export const loader = async () => {
  return json({});
};

export default function LandingPage () {
    return(
      <>
          <div className="">
            <Hero/>
          </div>
      </>
    )
} 
