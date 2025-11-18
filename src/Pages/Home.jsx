import React,{useEffect} from "react";
import MainLayout from "../Layouts/MainLayout";
import Hero from "../Components/Hero";
import Artikel from "../Components/Artikellist";
import PortofiloList from "../Components/Portofoliolist";
import { useLocation } from "react-router-dom";
export default function HomePages(){
    const location = useLocation();
    useEffect(() => {
        if (location.hash) {
          const element = document.getElementById(location.hash.replace("#", ""));
          if (element) {
            element.scrollIntoView({ behavior: "smooth" });
          }
        }
      }, [location]);
    return(
    <MainLayout>
<Hero/>
    <section className="home d-flex flex-column">
    <div className="artikel d-flex flex-column" id="artikel">
        <div className="header-section d-flex align-items-center ms-auto mt-2 mb-3 justify-content-center align-content-center">
            <h5> New's Artikel</h5>
        </div>
       <Artikel/>
        </div>
    <div className="artikel d-flex flex-column" id="portofolio">
        <div className="header-section d-flex align-items-center ms-auto mt-2 mb-3 justify-content-center align-content-center">
            <h5>Portofolio</h5>
        </div>
       <PortofiloList/>
        </div>
</section>
</MainLayout>
    );
}