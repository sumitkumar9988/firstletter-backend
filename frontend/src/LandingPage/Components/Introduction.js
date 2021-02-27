import React from 'react';

const Introduction = () => {
  return (
    <div>
      <section className="w-full px-6 mb-12 antialiased bg-white select-none">
        <div className="mx-auto max-w-7xl">
          <div className="container max-w-lg px-4 py-32 mx-auto text-left md:max-w-none md:text-center">
            <h1 className="text-5xl font-extrabold tracking-tight text-left text-gray-900 leading-tightest md:leading-10 md:text-center sm:leading-none md:text-6xl lg:text-7xl">
              <span className="inline md:block">Start Crafting Your</span>
              <span className="relative mt-2 text-transparent md:inline-block bg-clip-text bg-gradient-to-br from-purple-600 to-blue-500">
                Next Great Idea
              </span>
            </h1>
            <div className="flex flex-col items-center mt-12 text-center">
              <span className="relative inline-flex w-full rounded-full shadow-sm md:w-auto">
                <button
                  type="button"
                  className="inline-flex items-center justify-center w-full px-8 py-4 text-base font-bold leading-6 text-white transition duration-150 ease-in-out bg-indigo-600 border border-transparent rounded-full md:w-auto hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700"
                >
                  Purchase Now
                </button>
                <span className="" id=""></span>
              </span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Introduction;
