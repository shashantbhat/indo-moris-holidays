import {useState, useEffect, useRef} from "react";
import { Form, useNavigation, useActionData } from "@remix-run/react";
import { Loader2, CheckCircle } from "lucide-react";
import {CarStroke} from "~/components/icons/car-stoke";
import {BusStroke} from "~/components/icons/bus-stroke";
import {TrainStroke} from "~/components/icons/train-stroke";
import {AirplaneStroke} from "~/components/icons/airplane-stroke";

const TravelBookingForm = ({ actionData }: { actionData?: { success?: boolean; error?: string } }) => {
    const navigation = useNavigation();
    const [showSuccess, setShowSuccess] = useState(false);
    const wasSubmitting = useRef(false);

    const isSubmitting = navigation.state === "submitting";

    useEffect(() => {
        if (wasSubmitting.current && navigation.state === "idle" && actionData?.success) {
            setShowSuccess(true);
            const timer = setTimeout(() => setShowSuccess(false), 3000);
            return () => clearTimeout(timer);
        }
        wasSubmitting.current = isSubmitting;
    }, [navigation.state, actionData?.success, isSubmitting]);


    return (
        <div className="min-h-screen bg-white p-6 mt-8 sm:mt-16 text-black">
             <div id="target-section" className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="text-2xl sm:text-4xl font-bold text-black mb-4 sm:mb-6">Travel Booking</h1>
                    <p className="text-gray-600 text-base sm:text-lg">Plan your perfect journey with us</p>
                </div>

                {/* Success Message */}
                {showSuccess && (
                    <div className="mb-8 p-4 bg-green-50 border-l-4 border-green-400 text-green-800 rounded-r-lg shadow-sm flex items-center gap-3 text-base">
                        <div className="bg-green-100 p-1 rounded-full">
                            <CheckCircle size={20} className="text-green-600" />
                        </div>
                        <div>
                            <p className="font-semibold">Success!</p>
                            <p className="text-sm">Your booking has been created successfully.</p>
                        </div>
                    </div>
                )}

                {/* Error Message */}
                {actionData?.error && (
                    <div className="mb-8 p-4 bg-red-50 border-l-4 border-red-400 text-red-800 rounded-r-lg shadow-sm">
                        <p className="font-semibold">Error occurred</p>
                        <p className="text-sm">{actionData.error}</p>
                    </div>
                )}

                {/* Main Form Card */}
                <div className="bg-white border border-gray-200 rounded-xl shadow-lg p-8">
                    <Form
                        method="post"
                        className="space-y-6"
                    >
                        {/* Trip Type */}

                        <label className="block text-base sm:text-lg font-semibold text-black">Trip Type</label>
                        <div className="flex gap-6 text-sm sm:text-base">
                            <label className="flex items-center gap-3 cursor-pointer">
                                <input type="radio" name="tripType" value="one_way" defaultChecked className="w-4 h-4 text-blue-600" />
                                <span className="font-medium text-black">One Way</span>
                            </label>
                            <label className="flex items-center gap-3 cursor-pointer">
                                <input type="radio" name="tripType" value="round_trip" className="w-4 h-4 text-blue-600" />
                                <span className="font-medium text-black">Round Trip</span>
                            </label>
                        </div>

                        {/* Travel Modes */}

                        <label className="block text-base sm:text-lg font-semibold text-black">Travel Modes</label>
                        <div className="flex gap-4 flex-wrap text-sm sm:text-base">
                            <label className="flex items-center gap-3 cursor-pointer">
                                <input type="checkbox" name="travelModes" value="flight" className="w-4 h-4 text-blue-600" />
                                <AirplaneStroke/>
                            </label>
                            <label className="flex items-center gap-3 cursor-pointer">
                                <input type="checkbox" name="travelModes" value="train" className="w-4 h-4 text-blue-600" />
                                <TrainStroke/>
                            </label>
                            <label className="flex items-center gap-3 cursor-pointer">
                                <input type="checkbox" name="travelModes" value="bus" className="w-4 h-4 text-blue-600" />
                                <BusStroke/>
                            </label>
                        </div>


                        {/* Cab Option */}
                        <div className="bg-gray-50 p-6 rounded-lg">
                            <label className="flex items-center gap-3 cursor-pointer">
                                <input type="checkbox" name="needsCab" value="true" className="w-5 h-5 text-blue-600" />
                                <span className="text-base sm:text-lg font-semibold text-black"><CarStroke/> Need Cab Service?</span>
                            </label>
                            <p className="text-sm text-gray-600 mt-2 ml-8">Add local transportation to your booking</p>
                        </div>

                        {/* Thin Separator */}
                        <hr className="border-t border-gray-200 my-6" />

                        {/* Cities */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-base sm:text-lg font-semibold mb-3 text-black">From City</label>
                                <input
                                    type="text"
                                    name="originCity"
                                    placeholder="Enter departure city"
                                    className="w-full border-2 border-gray-200 p-4 rounded-lg text-black text-sm placeholder-gray-500 focus:border-black focus:outline-none transition-colors"
                                />
                            </div>
                            <div>
                                <label className="block text-base sm:text-lg font-semibold mb-3 text-black">To City</label>
                                <input
                                    type="text"
                                    name="destinationCity"
                                    placeholder="Enter destination city"
                                    className="w-full border-2 border-gray-200 p-4 rounded-lg text-black text-sm placeholder-gray-500 focus:border-black focus:outline-none transition-colors"
                                />
                            </div>
                        </div>

                        {/* Dates */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-base sm:text-lg font-semibold mb-3 text-black">Departure Date</label>
                                <input
                                    type="date"
                                    name="departureDate"
                                    defaultValue={new Date().toISOString().split("T")[0]}
                                    className="w-full border-2 border-gray-200 p-4 rounded-lg text-black text-sm focus:border-black focus:outline-none transition-colors"
                                />
                            </div>
                            <div>
                                <label className="block text-base sm:text-lg font-semibold mb-3 text-black">Return Date</label>
                                <input
                                    type="date"
                                    name="returnDate"
                                    className="w-full border-2 border-gray-200 p-4 rounded-lg text-black text-sm focus:border-black focus:outline-none transition-colors"
                                />
                            </div>
                        </div>

                        {/* Thin Separator */}
                        <hr className="border-t border-gray-200 my-6" />

                        {/* Passengers */}

                        <h3 className="text-base sm:text-lg font-semibold mb-4 text-black">Passengers & Class</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div>
                                <label className="block font-semibold mb-3 text-black">Adults</label>
                                <select name="adultsCount" className="w-full border-2 border-gray-200 p-4 rounded-lg text-black focus:border-black focus:outline-none transition-colors">
                                    {[...Array(9)].map((_, i) => (
                                        <option key={i + 1} value={i + 1}>
                                            {i + 1} Adult{i > 0 ? 's' : ''}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="block font-semibold mb-3 text-black">Children</label>
                                <select name="kidsCount" className="w-full border-2 border-gray-200 p-4 rounded-lg text-black focus:border-black focus:outline-none transition-colors">
                                    {[...Array(6)].map((_, i) => (
                                        <option key={i} value={i}>
                                            {i} Child{i !== 1 ? 'ren' : ''}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="block font-semibold mb-3 text-black">Travel Class</label>
                                <select name="classType" className="w-full border-2 border-gray-200 p-4 rounded-lg text-black focus:border-black focus:outline-none transition-colors">
                                    <option value="economy">Economy</option>
                                    <option value="premium_economy">Premium Economy</option>
                                    <option value="business">Business</option>
                                    <option value="first">First Class</option>
                                </select>
                            </div>
                        </div>


                        {/* Fare Type */}

                        <label className="block text-base sm:text-lg font-semibold mb-4 text-black">Fare Category</label>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm sm:text-base">
                            <label className="flex items-center gap-3 cursor-pointer bg-white p-4 rounded-lg border border-gray-200 hover:border-black transition-colors">
                                <input type="radio" name="fareType" value="regular" defaultChecked className="w-4 h-4 text-black" />
                                <span className="font-medium text-black">Regular</span>
                            </label>
                            <label className="flex items-center gap-3 cursor-pointer bg-white p-4 rounded-lg border border-gray-200 hover:border-black transition-colors">
                                <input type="radio" name="fareType" value="armed_forces" className="w-4 h-4 text-black" />
                                <span className="font-medium text-black">Armed Forces</span>
                            </label>
                            <label className="flex items-center gap-3 cursor-pointer bg-white p-4 rounded-lg border border-gray-200 hover:border-black transition-colors">
                                <input type="radio" name="fareType" value="student" className="w-4 h-4 text-black" />
                                <span className="font-medium text-black">Student</span>
                            </label>
                            <label className="flex items-center gap-3 cursor-pointer bg-white p-4 rounded-lg border border-gray-200 hover:border-black transition-colors">
                                <input type="radio" name="fareType" value="senior_citizen" className="w-4 h-4 text-black" />
                                <span className="font-medium text-black">Senior Citizen</span>
                            </label>
                            <label className="flex items-center gap-3 cursor-pointer bg-white p-4 rounded-lg border border-gray-200 hover:border-black transition-colors">
                                <input type="radio" name="fareType" value="doctors_nurses" className="w-4 h-4 text-black" />
                                <span className="font-medium text-black">Healthcare Workers</span>
                            </label>
                        </div>


                        {/* Submit */}
                        <div className="text-center pt-6">
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className={`px-2 sm:px-4 py-1 sm:py-2 rounded-xl sm:rounded-2xl font-medium text-white text-base sm:text-lg shadow-lg transition-all transform hover:scale-105 ${
                                    showSuccess
                                        ? "bg-green-600 hover:bg-green-700 shadow-green-200"
                                        : isSubmitting
                                            ? "bg-gray-400 cursor-not-allowed"
                                            : "bg-black"
                                }`}
                            >
                                {showSuccess ? (
                                    <span className="flex items-center justify-center gap-3">
                                        <CheckCircle size={20} />
                                        Booking Created Successfully!
                                    </span>
                                ) : isSubmitting ? (
                                    <span className="flex items-center justify-center gap-3">
                                        <Loader2 className="animate-spin" size={20} />
                                        Creating Your Booking...
                                    </span>
                                ) : (
                                    "Create Booking"
                                )}
                            </button>
                        </div>
                    </Form>
                </div>
            </div>
        </div>
    );
};

export default TravelBookingForm;