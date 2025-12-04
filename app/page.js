import { mainModule } from 'process'
import React from 'react'
import Header from "././components/Header.jsx"
import HeroSection from "././components/HeroSection.jsx"
import MainGoal from "././components/MainGoal.jsx"

export default function Home  ()  {
  return (
   <>
   <Header/>
   <HeroSection/>
   <MainGoal/>
   </>
  )
}


