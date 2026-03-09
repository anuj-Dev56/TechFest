import React from "react";
import PixelBlast from "../../../components/ui/PixelBlast";
import { Panel } from "../../../components/ui/panel";

const Home = () => {
  return (
    <div>
      <div className="w-full h-screen">
        <div style={{ width: "100%", height: "100%", position: "relative" }}>
          <PixelBlast
            variant="square"
            pixelSize={4}
            color="#fefefe"
            patternScale={2}
            patternDensity={1}
            pixelSizeJitter={0}
            enableRipples
            rippleSpeed={0.4}
            rippleThickness={0.12}
            rippleIntensityScale={1.5}
            liquid={false}
            liquidStrength={0.12}
            liquidRadius={1.2}
            liquidWobbleSpeed={5}
            speed={0.5}
            edgeFade={0}
            transparent
          />
        </div>
        <div className="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center px-4 sm:px-6 md:px-8">
          <h1 className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-2 sm:p-3 md:p-4 font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl shadow-2xl text-white text-center">
            Techfest 2026
          </h1>
          <Panel />
          <h1 className="bg-white/5 flex flex-wrap items-center justify-center gap-2 sm:gap-3 backdrop-blur-sm border border-white/10 rounded-lg p-2 sm:p-3 md:p-4 font-semibold text-base sm:text-lg md:text-2xl lg:text-3xl mt-6 sm:mt-8 md:mt-10 shadow-2xl text-white text-center leading-tight max-w-[95vw] sm:max-w-none">
            Having trouble?
            <a
              href="https://mail.google.com/mail/?view=cm&fs=1&to=anujlakhekar4@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:underline whitespace-nowrap"
            >
              Contact Us
            </a>
          </h1>
        </div>
      </div>
    </div>
  );
};

export default Home;
