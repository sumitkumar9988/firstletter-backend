import React from 'react';

const Project = () => {
  return (
    <div>
      <section class="py-12 px-4">
        <h2 class="text-4xl text-center mb-10 font-semibold font-heading">
          All Project
        </h2>
        <div class="flex flex-wrap -mx-4">
          <div class="lg:w-1/3 px-4 mb-8 lg:mb-0">
            <div class="h-full">
              <img
                class="mb-4"
                src="placeholders-2-0/pictures/work.jpg"
                alt=""
              />
              <small>22 Oct 2020</small>
              <h3 class="text-2xl mt-2 mb-3 font-heading">
                Being world’s best boss
              </h3>
              <a class="text-indigo-600 hover:underline" href="#">
                Read more »
              </a>
            </div>
          </div>
          <div class="lg:w-1/3 px-4 mb-8 lg:mb-0">
            <div class="h-full">
              <img
                class="mb-4"
                src="placeholders-2-0/pictures/office.jpg"
                alt=""
              />
              <small>22 Oct 2020</small>
              <h3 class="text-2xl mt-2 mb-3 font-heading">
                Understanding the paper
              </h3>
              <a class="text-indigo-600 hover:underline" href="#">
                Read more »
              </a>
            </div>
          </div>
          <div class="lg:w-1/3 px-4 mb-8 lg:mb-0">
            <div class="h-full">
              <img
                class="mb-4"
                src="placeholders-2-0/pictures/work.jpg"
                alt=""
              />
              <small>22 Oct 2020</small>
              <h3 class="text-2xl mt-2 mb-3 font-heading">
                Dwight doesn’t understand the paper
              </h3>
              <a class="text-indigo-600 hover:underline" href="#">
                Read more »
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Project;
