import React, { useState, useEffect, useRef } from "react";
import Dumyfoto from '/logo_fasilkom.png';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectCoverflow, Pagination } from 'swiper/modules';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import { createObserver } from "../Hooks/Script";

export default function PortofiloList() {
  const [perview, setPerview] = useState(4);
  const [swiperActive, setSwiperActive] = useState(false);
  const swiperElementRef = useRef(null);
  const swiperInstanceRef = useRef(null);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 768px)");

    const handleResize = () => {
      if (mediaQuery.matches) {
        setPerview(1);
      } else {
        setPerview(4);
      }
    };

    handleResize();
    mediaQuery.addEventListener("change", handleResize);

    return () => {
      mediaQuery.removeEventListener("change", handleResize);
    };
  }, []);

  useEffect(() => {
    const observerCallback = (isVisible) => {
      if (isVisible) {
        setSwiperActive(true);
        if (swiperInstanceRef.current) {
          swiperInstanceRef.current.slideTo(0, 0);
        }
      } else {
        setSwiperActive(false);
      }
    };

    const observer = createObserver(swiperElementRef.current, observerCallback);

    return () => {
      if (swiperElementRef.current) {
        observer.unobserve(swiperElementRef.current);
      }
    };
  }, []);

  return (
    <div className="artikel-list">
      <div ref={swiperElementRef}>
        <div className={swiperActive ? 'opacity-100' : 'opacity-0'}>
          
          <Swiper
            onSwiper={(swiper) => {
              swiperInstanceRef.current = swiper;
            }}
            effect={'coverflow'}
            grabCursor={true}
            centeredSlides={true}
            slidesPerView={perview}
            coverflowEffect={{
              rotate: 10,
              stretch: 20,
              depth: 100,
              modifier: 1,
              slideShadows: true,
            }}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            pagination={true}
            modules={[Autoplay, EffectCoverflow, Pagination]}
            className={`mySwiper ${swiperActive ? '' : 'hidden'}`}
          >
            <SwiperSlide>
              <div className="card">
                <img src={Dumyfoto} className="card-img-top" alt="..." />
                <div className="card-body">
                  <h5 className="card-title">Lorem Ipsum</h5>
                  <p className="card-text">Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                  <a href="#" className="btn">Terus membaca...</a>
                </div>
              </div>
            </SwiperSlide>

            <SwiperSlide>
              <div className="card">
                <img src={Dumyfoto} className="card-img-top" alt="..." />
                <div className="card-body">
                  <h5 className="card-title">Lorem Ipsum</h5>
                  <p className="card-text">Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                  <a href="#" className="btn">Terus membaca...</a>
                </div>
              </div>
            </SwiperSlide>

            <SwiperSlide>
              <div className="card">
                <img src={Dumyfoto} className="card-img-top" alt="..." />
                <div className="card-body">
                  <h5 className="card-title">Lorem Ipsum</h5>
                  <p className="card-text">Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                  <a href="#" className="btn">Terus membaca...</a>
                </div>
              </div>
            </SwiperSlide>

            <SwiperSlide>
              <div className="card">
                <img src={Dumyfoto} className="card-img-top" alt="..." />
                <div className="card-body">
                  <h5 className="card-title">Lorem Ipsum</h5>
                  <p className="card-text">Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                  <a href="#" className="btn">Terus membaca...</a>
                </div>
              </div>
            </SwiperSlide>

            <div className="swiper-pagination mt-12"></div>
          </Swiper>
        </div>
      </div>
    </div>
  );
}
