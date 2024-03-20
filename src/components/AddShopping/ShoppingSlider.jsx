import React, { Fragment, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Navigation } from "swiper";
import { Previewslides } from "../../Data/Data";

export default function ShoppingSlider() {
  const [isHovered, setIsHovered] = useState(false);
  const [key, setKey] = useState(null);
  const onDelete = (id) => {
    const newSlides = Previewslides.filter((slide, i) => i !== index);
  };

  const handleHover = (id) => {
    setKey(id);
    setIsHovered(true);
  };

  const handleLeave = (id) => {
    setKey();
    setIsHovered(false);
  };
  return (
    <Fragment>
      <div className="container-fluid wordkorder preview">
        <h6>Images</h6>
        <Swiper
          slidesPerView={5}
          spaceBetween={30}
          loop={true}
          navigation={true}
          modules={[Navigation]}
          className="mySwiper"
        >
          {Previewslides.map((data) => {
            return (
              <SwiperSlide
                key={data.key}
                onMouseEnter={() => handleHover(data.key)}
                onMouseLeave={() => handleLeave()}
              >
                <img src={data.image} alt="Preview" />
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </Fragment>
  );
}
