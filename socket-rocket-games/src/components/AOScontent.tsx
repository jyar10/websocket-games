import { useLayoutEffect, useEffect, useRef, useState } from "react";
import { ContactForm } from "./sections/contact-form";
// import { gsap } from "gsap";
// import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
// import { DrawSVGPlugin } from "gsap-trial/dist/DrawSVGPlugin";
// import MotionPathPlugin from "gsap-trial/dist/MotionPathPlugin";
import AOS from "aos";
import "aos/dist/aos.css";
import Lottie from "lottie-react";
import confetti from "../../public/lottie/confetti.json";
import robotWelcomeAnimation from "../../public/lottie/robotWelcomeAnimation.json";
import { Card } from "./card";
import Image from "next/image";
import cnuCampus from "../../public/images/cnuCampus.jpeg";
import pittsburgh from "../../public/images/pittsburgh.jpeg";
import yosemite from "../../public/images/yosemite.jpeg";
import { MdSchool } from "react-icons/md";
import { GiSoccerKick, GiRocket, GiSpartanHelmet } from "react-icons/gi";
import { FaRaspberryPi } from "react-icons/fa";
import { SiAdp, SiFreelancer } from "react-icons/si";
import IsotopeTable from "./items/isotope-table";
import Link from "next/link";

export const Content = () => {
  useLayoutEffect(() => {
    AOS.init({
      easing: "ease-out-cubic",
      offset: 50,
    });
  }, []);

  return (
    <>
      {/* -------------- */}
      <div className="max-w-screen-xl m-auto">
        {/* -------------- */}
        <div className="flex flex-col gap-y-10 ">
          {/* --------------------------- */}

          {/* ------------------- */}
          <div className="flex  flex-col p-8 bg-slate-100">
            <div
              className="section  flex items-center"
              data-aos="fade-down-right"
              data-aos-anchor-placement="bottom-bottom"
            >
              <h1 className="area-title">Welcome</h1>
            </div>

            <b className="text-lg">
              {" "}
              Hello thanks for stopping by! Just click, invite your friends, and
              start playing!{" "}
            </b>
          </div>
          {/* ------------------- */}
          {/* ------------------- */}
          <div className="flex flex-col p-8">
            <div
              className="section  flex items-center"
              data-aos="fade-down-right"
              data-aos-anchor-placement="bottom-bottom"
            >
              <h3 className="area-title">Card Games</h3>
            </div>

            <div className="container mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div
                  data-aos="fade-left"
                  data-aos-anchor-placement="middle-middle"
                  className="flex flex-col"
                >
                  <Card
                    path="/games/Tic-Tac-Toe-Page"
                    title="Tic Tac Toe"
                    content="Play the classic Tic Tac Toe game with a friend from afar!"
                  />
                </div>
                <div
                  data-aos="fade-left"
                  data-aos-anchor-placement="middle-middle"
                >
                  <Card
                    title="Netflix Clone"
                    content="Created with React. Looks like netlfix. I am even pulling in information with a movie api"
                  />
                </div>
                <div
                  data-aos="fade-left"
                  data-aos-anchor-placement="middle-middle"
                >
                  <Card
                    title="AWS Load Balancing with Kubernetes "
                    content="Check out this application here"
                  />
                </div>
              </div>
            </div>
          </div>
          {/* ------------------- */}
          {/* ------------------- */}
          <div className="flex  flex-col p-8 bg-slate-100">
            <div
              className="section  flex items-center"
              data-aos="fade-down-right"
              data-aos-anchor-placement="bottom-bottom"
            >
              <h3 className="area-title">Card Games</h3>
            </div>
            <div className="section-body p-5 w-full align-middle content-center justify-center flex flex-wrap min-h-[50%]">
              <div
                className=" rounded-md p-5 flex md:flex-nowrap flex-wrap justify-evenly"
                data-aos="fade-down-right"
                data-aos-anchor-placement="bottom-bottom"
              >
                <div className=" md:w-1/3 w-full flex flex-col items-center gap-y-5 p-5">
                  <MdSchool className="text-8xl" />
                  Christopher Newport University. Presidential Leadership
                  program - GPA 3.4 - Major In Computer Science and Minor in
                  leadership.
                </div>
                <Image
                  className="drop-shadow-lg rounded-lg"
                  src={cnuCampus}
                  alt="Picture of CNU"
                  width={300}
                  height={400}
                />
              </div>
            </div>
          </div>
          <div className="flex  flex-col p-8 bg-slate-100">
            <div
              className="section  flex items-center"
              data-aos="fade-down-right"
              data-aos-anchor-placement="bottom-bottom"
            >
              <h3 className="area-title">Card Games</h3>
            </div>
            <div className="section-body p-5 w-full align-middle content-center justify-center flex flex-wrap min-h-[50%] ">
              <div className="flex md:flex-nowrap flex-wrap gap-2">
                <div
                  className="sm:w-1/2 md:w-full flex flex-col w-full bg-green-300 rounded-md "
                  data-aos="zoom-in-down"
                  data-aos-anchor-placement="bottom-bottom"
                >
                  <GiSoccerKick className="text-8xl mr-auto ml-auto pt-5" />
                  <div className="p-5">
                    I love soccer. I was a collegiate d3 soccer player! My
                    favorite soccer team is liverpool. YNWA!
                  </div>
                </div>
                <div
                  className="flex flex-col w-full bg-green-300 rounded-md "
                  data-aos="flip-up"
                  data-aos-anchor-placement="bottom-bottom"
                >
                  <GiSpartanHelmet className="text-8xl mr-auto ml-auto pt-5" />
                  <div className="p-5">
                    Working out and doing spartan races! Ive done the trifecta:
                    beast, spartan, ultra. However, not in the same year.
                  </div>
                </div>
                <div
                  className="flex flex-col w-full bg-green-300 rounded-md"
                  data-aos="fade-left"
                  data-aos-anchor-placement="bottom-bottom"
                >
                  <FaRaspberryPi className="text-8xl  mr-auto ml-auto pt-5" />
                  <div className="p-5">
                    I like to expiriment with technology. I have made my own
                    retro gaming pi and I have also built my own computer.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ------------------- */}
      </div>
    </>
  );
};
