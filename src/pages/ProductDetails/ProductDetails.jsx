import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faStar } from "@fortawesome/free-solid-svg-icons";
import { useParams } from "react-router";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import Loading from "../../components/Loading/Loading";
import { CartContext } from "./../../context/Cart.context";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import Card from "./../../components/Card/Card";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";

export default function ProductDetails() {
  const { id } = useParams();
  const { AddToCart } = useContext(CartContext);
  const [productData, setProductData] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState(null);

  async function getProductDetails() {
    const options = {
      url: `https://ecommerce.routemisr.com/api/v1/products/${id}`,
      method: "GET",
    };
    const { data } = await axios.request(options);
    console.log(data);

    setProductData(data.data);
  }
  async function getRelatedProducts() {
    const options = {
      url: `https://ecommerce.routemisr.com/api/v1/products?category[in]=${productData.category._id}`,
      method: "GET",
    };
    const { data } = await axios.request(options);
    setRelatedProducts(data.data);
  }
  useEffect(() => {
    getProductDetails();
  }, [id]);
  useEffect(() => {
    if (productData) {
      getRelatedProducts();
    }
  }, [productData]);

  return (
    <>
      {productData ? (
        <>
          <div className="py-20">
            <div className="container grid grid-cols-12 items-center gap-6">
              <div className="col-span-4">
                <ImageGallery
                  items={productData.images.map((image) => ({
                    original: image,
                    thumbnail: image,
                  }))}
                  showFullscreenButton={false}
                  showPlayButton={false}
                />
              </div>
              <div className="col-span-8 space-y-4">
                <div>
                  <h2 className="text-2xl font-semibold line-clamp-1">
                    {productData.title}
                  </h2>
                  <h3 className="text-lg font-normal line-clamp-1">
                    {productData.description}
                  </h3>
                </div>
                <div className="flex justify-between items-center text-lg font-medium">
                  <span>{productData.price} EG</span>
                  <span>
                    {productData.ratingsAverage}
                    <FontAwesomeIcon
                      icon={faStar}
                      className="text-amber-300 mx-1"
                    />
                  </span>
                </div>
                <div className="flex justify-between items-center gap-4">
                  <button
                    onClick={() => AddToCart?.(productData.id)}
                    className="btn grow bg-mainColor/80 text-white border-0 hover:bg-mainColor text-center"
                  >
                    <FontAwesomeIcon icon={faPlus} className="mx-2" />
                    Add
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="container my-12">
            <h2 className="text-3xl font-medium mb-4">
              Related Products (Slide ME Right & Left)
            </h2>
            <Swiper
              breakpoints={{
                0: {
                  slidesPerView: 1,
                },
                640: {
                  slidesPerView: 2,
                },
                1024: {
                  slidesPerView: 4,
                },
                1280: {
                  slidesPerView: 6,
                },
              }}
              spaceBetween={20}
            >
              {relatedProducts?.map((product) => (
                <SwiperSlide key={product.id}>
                  <Card productInfo={product} />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </>
      ) : (
        <Loading />
      )}
    </>
  );
}
