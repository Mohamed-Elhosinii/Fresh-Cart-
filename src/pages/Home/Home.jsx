import axios from "axios";
import { useEffect, useState } from "react";
import Card from "./../../components/Card/Card";
import Loading from "../../components/Loading/Loading";
import HomeSlider from "../../components/HomeSlider/HomeSlider";
import CategorySlider from "../../components/CategorySlider/CategorySlider";

export default function Home() {
  const [products, setProducts] = useState(null);
  async function displayProducts() {
    const options = {
      url: "https://ecommerce.routemisr.com/api/v1/products",
      method: "GET",
    };
    const { data } = await axios.request(options);
    setProducts(data.data);
  }
  useEffect(() => {
    displayProducts();
  }, []);
  return (
    <>
      <div>
        <HomeSlider />
        <CategorySlider />
        <div
          className={
            products
              ? "container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
              : ""
          }
        >
          {products ? (
            products.map((product) => (
              <Card productInfo={product} key={product.id} />
            ))
          ) : (
            <Loading />
          )}
        </div>
      </div>
    </>
  );
}
