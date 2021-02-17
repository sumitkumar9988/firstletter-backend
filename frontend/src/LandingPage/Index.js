import React from "react";
import tw from "twin.macro";
import { css } from "styled-components/macro"; //eslint-disable-line

import Practice from './Components/Practice'
import Hero from "./Components/Hero";
import Features from "./Components/Features";
import MainFeature from "./Components/MainFeature";
import AllFeatures from "./Components/AllFeatures"
import Testimonial from "./Components/Testimonial";
import GetStarted from "./Components/GetStarted";
import Footer from "./Components/Footer";


// eslint-disable-next-line import/no-anonymous-default-export
export default () => {
  return (
      <div className="font-display min-h-screen text-secondary-500 p-8 overflow-hidden">
        <Hero />
        <Practice/>
        <AllFeatures/>
        <Features 
            heading={<>Amazing <span className="text-primary-500">Features</span></>}
        />
        <MainFeature
            heading={<>Cloud built by and for <span className="text-primary-500">Professionals</span></>}
        />
        <Testimonial />
    
        <GetStarted/>
        <Footer /> 
      </div>
  
  );
}
