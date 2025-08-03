import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
import { useRef } from "react";
import "swiper/css";
import "swiper/css/pagination";
import image1 from "../../assets/images/homeSlider1.jpg";
import image2 from "../../assets/images/homeSlider2.jpg";
import image3 from "../../assets/images/homeSlider3.jpg";
import image4 from "../../assets/images/homeSlider4.jpg";
import image5 from "../../assets/images/homeSlider5.jpg";

export default function CustomSlider() {
  const swiperRef = useRef(null);

  return (
    <div className="w-1/2 mx-auto py-8 grid grid-cols-2">
      <div className="h-full">
        {/* Slider */}
        <Swiper
          ref={swiperRef}
          modules={[Pagination, Navigation]}
          slidesPerView={1}
          loop
          pagination={{ clickable: true }}
          className="rounded-lg overflow-hidden"
        >
          <SwiperSlide>
            <img src={image1} className="object-cover h-full w-full" />
          </SwiperSlide>
          <SwiperSlide>
            <img src={image2} className="object-cover h-full w-full" />
          </SwiperSlide>
          <SwiperSlide>
            <img src={image3} className="object-contain h-full w-full" />
          </SwiperSlide>
        </Swiper>

        {/* Dots (default pagination) */}
        <div className="mt-4 swiper-pagination "></div>
      </div>
      <div className="flex flex-col h-full">
        <img src={image4} alt="" />
        <img src={image5} alt="" />
      </div>
    </div>
  );
}
