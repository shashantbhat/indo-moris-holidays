import NavBar from "./components/nav-bar";
import Hero from "./components/hero-section";
import {json} from "@remix-run/node"
import ChooseUs from "~/routes/_index/components/why-to-choose-us-section";
import {MetaFunction} from "@remix-run/react";
import Navbar from "./components/nav-bar";
import TestimonialCards from "~/routes/_index/components/testimonials";
import WhatWeSpecializeIn from "~/routes/_index/components/what-we-specialize-in";
import OurExclusive from "~/routes/_index/components/our-exclusive";
import Footer from "~/components/footer";

// export const loader = async () => {
//   return json({});
// };

export const meta: MetaFunction = () => {
    return [
        { title: "indo moris holidays - home" },
        { name: "description", content: "Welcome to Your Website, the best place to..." },
    ];
}

export default function LandingPage () {
    return(
      <>
          <div className="">
              <Navbar/>
              <Hero/>
              <ChooseUs/>
              <OurExclusive/>
              <TestimonialCards/>
              <Footer/>
          </div>
      </>
    )
} 
