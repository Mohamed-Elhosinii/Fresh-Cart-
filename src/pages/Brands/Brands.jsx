import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import Loading from "../../components/Loading/Loading";
import Modal from "../../components/Modal/Modal";

export default function Brands() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBrand, setSelectedBrand] = useState(null);

  async function getBrands() {
    const options = {
      url: "https://ecommerce.routemisr.com/api/v1/brands",
      method: "GET",
    };
    return await axios.request(options);
  }

  const { data, isLoading, isError } = useQuery({
    queryKey: ["brands"],
    queryFn: getBrands,
    staleTime: 1000 * 60 * 60,
    refetchOnMount: true,
    refetchOnWindowFocus: false,
    retry: 3,
  });

  if (isLoading) return <Loading />;
  if (isError) return <h2>There is an error</h2>;

  const handleBrandClick = (brand) => {
    setSelectedBrand(brand);
    setIsModalOpen(true);
  };

  return (
    <>
      <div className="container my-8">
        <h2 className="text-5xl text-mainColor font-semibold text-center py-6">
          All Brands
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {data.data.data.map((brand) => (
            <div
              key={brand._id}
              onClick={() => handleBrandClick(brand)}
              className="cursor-pointer border border-gray-400 text-center rounded-lg hover:shadow-md hover:shadow-mainColor transition-all duration-200"
            >
              <img
                src={brand.image}
                alt="image"
                className="w-full h-60 object-cover rounded-lg"
              />
              <h2 className="text-2xl text-mainColor font-semibold p-4">
                {brand.name}
              </h2>
            </div>
          ))}
        </div>
      </div>

      {selectedBrand && (
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title={selectedBrand.name.toUpperCase()}
        >
          <img
            src={selectedBrand.image}
            alt="image"
            className="w-full h-60 object-contain"
          />
        </Modal>
      )}
    </>
  );
}
