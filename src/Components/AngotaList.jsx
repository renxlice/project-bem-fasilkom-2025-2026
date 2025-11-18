import React, { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectCoverflow, Pagination } from 'swiper/modules';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import Anggota1 from "../assets/anggota1.png"
import Anggota2 from "../assets/anggota2.png"
import Anggota3 from "../assets/anggota3.png"
import Anggota4 from "../assets/anggota4.png"
import Anggota5 from "../assets/anggota5.png"
import Anggota6 from "../assets/anggota6.png"
import Anggota7 from "../assets/anggota7.png"
import Anggota8 from "../assets/anggota8.png"
import Anggota9 from "../assets/anggota9.png"
import Anggota10 from "../assets/anggota10.png"
import Anggota11 from "../assets/anggota11.png"
import Anggota12 from "../assets/anggota12.png"
import Anggota13 from "../assets/anggota13.png"
import Anggota14 from "../assets/anggota14.png"
import Anggota15 from "../assets/anggota15.png"
import Anggota16 from "../assets/anggota16.png"
import Anggota17 from "../assets/anggota17.png"
import Anggota18 from "../assets/anggota18.png"
import Anggota19 from "../assets/anggota19.png"
import Anggota20 from "../assets/anggota20.png"
import Anggota21 from "../assets/anggota21.png"
import Anggota22 from "../assets/anggota22.png"
import Anggota23 from "../assets/anggota23.png"
import Anggota24 from "../assets/anggota24.png"
import Anggota25 from "../assets/anggota25.png"
import Anggota26 from "../assets/anggota26.png"
import Anggota27 from "../assets/anggota27.png"
import Anggota28 from "../assets/anggota28.png"
import Anggota29 from "../assets/anggota29.png"
import Anggota30 from "../assets/anggota30.png";
import Anggota31 from "../assets/anggota31.png";
import Anggota32 from "../assets/anggota32.png";
import Anggota33 from "../assets/anggota33.png";
import Anggota34 from "../assets/anggota34.png";
import Anggota35 from "../assets/anggota35.png";
import Anggota36 from "../assets/anggota36.png";
import Anggota37 from "../assets/anggota37.png";
import Anggota38 from "../assets/anggota38.png";
import Anggota39 from "../assets/anggota39.png";
import Anggota40 from "../assets/anggota40.png";
import Anggota41 from "../assets/anggota41.png";
import Anggota42 from "../assets/anggota42.png";
import Anggota43 from "../assets/anggota43.png";
export default function Anggota() {
  const anggotaImages = [
  Anggota1, Anggota2, Anggota3, Anggota4, Anggota5, Anggota6, Anggota7, Anggota8, Anggota9,
  Anggota10, Anggota11, Anggota12, Anggota13, Anggota14, Anggota15, Anggota16, Anggota17,
  Anggota18, Anggota19, Anggota20, Anggota21, Anggota22, Anggota23, Anggota24, Anggota25,
  Anggota26, Anggota27, Anggota28, Anggota29, Anggota30, Anggota31, Anggota32, Anggota33,
  Anggota34, Anggota35, Anggota36, Anggota37, Anggota38, Anggota39, Anggota40, Anggota41,
  Anggota42, Anggota43
];
    const [Perviews, Setperview] = useState(4)
    const [rotate, Setrotate] = useState(10);
    const [Scrt, setScrt] = useState(20);
    useEffect(() => {
      const mediaQuery = window.matchMedia("(max-width: 768px)");
  
      const handleResize = () => {
        if (mediaQuery.matches) {
          Setperview(1); 
          Setrotate(10)
          setScrt(20)
        } else {
          Setperview(4); 
        }
      };
  
      handleResize(); 
      mediaQuery.addEventListener("change", handleResize); 
  
      return () => {
        mediaQuery.removeEventListener("change", handleResize); 
      };
    }, []);
  return(
<Swiper
              effect={'coverflow'}
              grabCursor={true}
              centeredSlides={true}
              slidesPerView={Perviews}
              coverflowEffect={{
                rotate: rotate,
                stretch: Scrt,
                depth: 100,
                modifier: 1,
                slideShadows: true,
              }}
              autoplay={{
                delay: 2500,
                disableOnInteraction: false,
              }}
              pagination={false}
              modules={[Autoplay, EffectCoverflow, Pagination]}
              className="mySwiper"
            >
               {anggotaImages.map((image, index) => (
        <SwiperSlide key={index}>
          <div className="card">
            <img src={image} className="card-img-top" alt={`Anggota ${index + 1}`} />
          </div>
        </SwiperSlide>
      ))}
            </Swiper>
  )
}