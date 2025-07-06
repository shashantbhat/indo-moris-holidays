import CodeStroke from "~/components/icons/code-stroke";

const UnderMaintenance = () => {
    return (
        <section className="relative h-screen w-full">
            <div className="absolute top-[40%] flex flex-col items-center w-full">
                <CodeStroke size={42} color="red"/>
                <span className="subheading-2 mt-4">Under Development, please come back later.</span>
            </div>
        </section>
    )
}

export default UnderMaintenance;