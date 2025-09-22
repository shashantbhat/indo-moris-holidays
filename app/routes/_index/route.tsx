import Hero from "./components/hero-section";
import ChooseUs from "~/routes/_index/components/why-to-choose-us-section";
import {MetaFunction} from "@remix-run/react";
import Navbar from "./components/nav-bar";
import TestimonialCards from "~/routes/_index/components/testimonials";
import OurExclusive from "~/routes/_index/components/our-exclusive";
import Footer from "~/components/footer";
import NewNavBar from "./components/new-nav-bar"
import TravelBookingForm from "~/routes/booking-form/route";
import {ActionFunctionArgs, json} from "@remix-run/node";
import type {TravelBookingFormData} from "~/models/db/schema";
import {travelBookingService} from "~/.server/travel_booking";


// export const loader = async () => {
//   return json({});
// };

export const meta: MetaFunction = () => {
    return [
        { title: "indo moris holidays - home" },
        { name: "description", content: "Welcome to Your Website, the best place to..." },
    ];
}

export async function action({ request }: ActionFunctionArgs) {
    try {
        const formData = await request.formData();
        const data: TravelBookingFormData = {
            tripType: formData.get("tripType") as "one_way" | "round_trip",
            travelModes: formData.getAll("travelModes") as string[],
            needsCab: formData.get("needsCab") === "true",
            originCity: String(formData.get("originCity") || ""),
            destinationCity: String(formData.get("destinationCity") || ""),
            departureDate: String(formData.get("departureDate") || ""),
            returnDate: String(formData.get("returnDate") || ""),
            adultsCount: Number(formData.get("adultsCount") || 0),
            kidsCount: Number(formData.get("kidsCount") || 0),
            classType: formData.get("classType") as TravelBookingFormData["classType"],
            fareType: formData.get("fareType") as TravelBookingFormData["fareType"],
        };

        const savedBooking = await travelBookingService.createBooking(data);
        return json({ success: true, booking: savedBooking }, { status: 201 });
    } catch (error: any) {
        console.error("Error creating booking:", error);
        return json({ success: false, error: error.message }, { status: 500 });
    }
}

export default function LandingPage () {
    return(
      <>
          <div className="">
              {/*<Navbar/>*/}
              <NewNavBar/>
              <Hero/>
              {/*<ChooseUs/>*/}
              <TravelBookingForm/>
              <TestimonialCards/>
              {/*<OurExclusive/>*/}

              <Footer/>
          </div>
      </>
    )
} 
