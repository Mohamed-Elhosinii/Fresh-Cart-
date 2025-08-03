import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useParams } from "react-router";
import Loading from "../../components/Loading/Loading";
import Card from "./../../components/Card/Card";

export default function CategoryDetails() {
  const { id } = useParams();
  async function getProductsSameCategory() {
    const options = {
      url: `https://ecommerce.routemisr.com/api/v1/products?category[in]=${id}`,
      method: "GET",
    };
    return await axios.request(options);
  }

  const { data, isError, isLoading } = useQuery({
    queryKey: ["category"],
    queryFn: getProductsSameCategory,
    refetchOnMount: true,
    refetchOnWindowFocus: true,
  });

  if (isLoading) {
    return <Loading />;
  }
  if (isError) {
    return <h2>There is error</h2>;
  }

  return (
    <>
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {data.data.data.length === 0 ? (
            <h2 className="text-xl text-white bg-red-400 p-4 rounded-lg col-span-full">
              There Is No Products For This Category
            </h2>
          ) : (
            <>
              {data.data.data.map((product) => (
                <Card productInfo={product} key={product.id} />
              ))}
            </>
          )}
        </div>
      </div>
    </>
  );
}
