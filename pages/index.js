import Head from 'next/head';
import { Box, Container } from '@chakra-ui/react';

// Components
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Problem from '../components/Problem';
import AboutUs from '../components/AboutUs';
import Solution from '../components/Solution';
import Features from '../components/Features';
import FeaturedMaterials from '../components/FeaturedMaterials';
import HowItWorks from '../components/HowItWorks';
import CallToAction from '../components/CallToAction';
import Footer from '../components/Footer';

export default function Home() {
  return (
    <>
      <Head>
        <title>Exchange Campus - University Materials Marketplace</title>
        <meta name="description" content="Exchange Campus is the leading marketplace for university students to buy, sell, and exchange textbooks, notes, and other study materials." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <Box as="main">
        <Navbar />
        <Hero />
        <Problem />
        <AboutUs />
        <Solution />
        <Features />
        <FeaturedMaterials />
        <HowItWorks />
        <CallToAction />
        <Footer />
      </Box>
    </>
  );
} 