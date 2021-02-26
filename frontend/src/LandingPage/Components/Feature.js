import React from 'react';
import skillsvg from './../../Asset/Image/skills1.svg'
const Feature = () => {
  return (
    <div id="feature">
      <div className="flex items-center justify-center py-10 text-white bg-white sm:py-16 md:py-24 lg:py-32">
        <div className="relative max-w-3xl px-10 text-center text-white auto lg:px-0">
          <div className="flex flex-col w-full md:flex-row">
            <div className="flex justify-between">
              <h1 className="relative flex flex-col font-extrabold text-left text-black text-6xl">
                Show
                <span className="" id="">
                  Your
                </span>
                <span className="">Skills</span>
              </h1>
            </div>
            <div className="relative top-0 right-0 h-64 mt-12 md:-mt-16 md:absolute md:h-96">
              <img
                src={skillsvg}
                className="object-cover mt-3 mr-5 h-80 lg:h-96"
              />
            </div>
          </div>

          <div className="my-16 border-b border-gray-300 lg:my-24"></div>
          <h2 className="text-left text-gray-500 xl:text-xl">
            Building beautiful portfolio to boost your career. Show your Github
            projects and your skills Share your profile with both peers and
            potential employers
          </h2>
        </div>
      </div>
    </div>
  );
};

export default Feature;
