

import React from 'react';

import MinimalProfile from './components/bio';

import { Metadata } from "next";
export const metadata: Metadata = {
  title: 'Faizan Asad - About',
  description: '',
}

// Main About page component
const AboutPage = () => {

  return (
 

      
        <MinimalProfile />

  );
};


export default AboutPage;