import React from "react";

function WelcomeBanner() {
    return (
        <div className="p-5  bg-gradient-to-r from-[#92ccdd] via-[#fdc4ec] to-[#c7eff0] rounded-lg shadow-lg ">
            <h2 className="text-2xl font-bold text-[#02386E]" >A Launchpad for your career and personal growth</h2>
            <p className="text-[#02386E]">Turn Confusion into Clarity. Build Your Tech Career with Purpose.
                Personalized Roadmaps. Real Projects. Teams That Grow Together.
                Not Just Learning. Becoming.</p>
            <button className="mt-4 bg-[#02386E] text-white py-2 px-4 rounded">Get Started</button>
        </div>
    )
}

export default WelcomeBanner;