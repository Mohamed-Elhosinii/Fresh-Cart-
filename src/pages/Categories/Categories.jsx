import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Loading from "../../components/Loading/Loading";
import { Link } from "react-router";

export default function Categories() {
  async function getCategories() {
    const options = {
      url: "https://ecommerce.routemisr.com/api/v1/categories",
      method: "GET",
    };

    return await axios.request(options);
  }

  const { data, isLoading, isError } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
    staleTime: 1000 * 60 * 60,
    refetchOnMount: true,
    refetchOnWindowFocus: false,
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
        <h2 className="text-5xl text-mainColor font-semibold text-center py-6">
          All Categories
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 ">
          {data.data.data.map((category) => (
            <Link
              to={`/categorydetails/${category._id}`}
              className="border border-gray-400 text-center rounded-lg hover:shadow-md hover:shadow-mainColor transition-all duration-200"
              key={category._id}
            >
              <img
                src={category.image}
                alt="image"
                className="w-full h-70 object-cover rounded-lg"
              />
              <h2 className="text-2xl text-mainColor font-semibold p-4">
                {category.name}
              </h2>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
