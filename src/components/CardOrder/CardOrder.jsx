export default function CardOrder({ productInfo }) {
  const { product, count, price } = productInfo;
  const { title, imageCover } = product;

  return (
    <div className="border border-gray-300">
      <div>
        <img src={imageCover} alt="image" className="w-full" />
      </div>
      <div className="card-content p-2">
        <h3 className="text-xl font-medium">{title}</h3>
        <h3 className="text-lg font-medium">Product price : {price}</h3>
        <h3 className="text-lg font-medium">Product Count : {count}</h3>
      </div>
    </div>
  );
}
