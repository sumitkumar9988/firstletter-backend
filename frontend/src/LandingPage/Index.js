import React from 'react';
import Headers from './Components/Headers';
import Introduction from './Components/Introduction';
import Hero from './Components/Hero';
import Feature from './Components/Feature';
import AllFeature from './Components/AllFeature';
import Action from './Components/Action';
import Footer from './Components/Footer';
// eslint-disable-next-line import/no-anonymous-default-export
export default () => {
  return (
    <div>
      <Headers />
      {/* <Introduction/> */}
      <Hero />
      <Feature />
      <AllFeature />
      <Action />
      <Footer />
    </div>
  );
};
