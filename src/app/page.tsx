"use client";

import Image from "next/image";
import { useState } from "react";
import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import WhatWeAre from "@/components/WhatWeAre";
import Activities from "@/components/Activities";
import Camps from "@/components/Camps";
import SpaceVideo from "@/components/SpaceVideo";
import Community from "@/components/Community";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navigation />
      <Hero />
      <WhatWeAre />
      <Activities />
      <Camps />
      <SpaceVideo />
      <Community />
      <CTA />
      <Footer />
    </>
  );
}
