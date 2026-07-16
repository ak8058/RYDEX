"use client";
import React, { useState } from "react";
import HeroSection from "./HeroSection";
import AuthModal from "./AuthModal";
const PublicHome = () => {
  const [authOpen, setAuthOpen] = useState(false);
  return (
    <>
      <HeroSection onAuthRequired={() => setAuthOpen(true)} />
      <AuthModal open={authOpen} onClose={() => setAuthOpen(false)} />
    </>
  );
};

export default PublicHome;
