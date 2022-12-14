import React from 'react'
import Style from "../styles/index.module.css";
import { HeroSection, Service, BigNFTSilder, Subscribe } from '../components/componentsindex';

function index() {
  return (
    <div className={Style.homePage}>
      <HeroSection />
      <Service />
      <BigNFTSilder />
      <Subscribe />
    </div>
  )
}

export default index