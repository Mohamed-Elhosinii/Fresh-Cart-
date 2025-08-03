import axios from "axios";
import Card from "./../../components/Card/Card";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../components/Loading/Loading";
import { useState } from "react";
export default function Products() {
  const [search, setSearch] = useState("");

  async function getProducts() {
    const options = {
      url: "https://ecommerce.routemisr.com/api/v1/products",
      method: "GET",
    };
    return await axios.request(options);
  }

  const { data, isLoading, isError } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
    staleTime: 1000 * 60 * 60,
    refetchOnMount: true,
    refetchOnWindowFocus: false,
    retry: 3,
  });

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return (
      <h2 className="text-center text-red-600 py-10 text-xl">
        There was an error fetching products.
      </h2>
    );
  }

  const filteredProducts = data.data.data.filter((product) =>
    product.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <div className="container">
        <div className="text-center py-8">
          <input
            type="text"
            className="form-control w-2/3 "
            placeholder="Search By Title ..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
            }}
          />
        </div>
        {filteredProducts.length === 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {data.data.data.map((product) => (
              <Card productInfo={product} key={product.id} />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredProducts.map((product) => (
              <Card productInfo={product} key={product.id} />
            ))}
          </div>
        )}
      </div>
    </>
  );
}
