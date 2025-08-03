import axios from "axios";
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import Loading from "../Loading/Loading";
import { Link } from "react-router";

export default function CategorySlider() {
  const [categories, setCategories] = useState(null);
  async function getCategories() {
    const options = {
      url: "https://ecommerce.routemisr.com/api/v1/categories",
      method: "GET",
    };
    const { data } = await axios.request(options);
    setCategories(data.data);
  }
  useEffect(() => {
    getCategories();
  }, []);
  return (
    <>
      <div className="py-4">
        <h2 className="text-xl font-semibold py-2">Shop All Categories</h2>
        <Swiper
          slidesPerView={5}
          spaceBetween={20}
          loop={categories?.length >= 5}
          className="rounded-lg overflow-hidden"
        >
          {categories ? (
            categories.map((item) => (
              <SwiperSlide key={item._id}>
                <Link to={"/categories"}>
                  <img src={item.image} className="h-64 object-cover" />
                  <h2 className="text-lg font-bold py-1">{item.name}</h2>
                </Link>
              </SwiperSlide>
            ))
          ) : (
            <Loading />
          )}
        </Swiper>
      </div>
    </>
  );
}
