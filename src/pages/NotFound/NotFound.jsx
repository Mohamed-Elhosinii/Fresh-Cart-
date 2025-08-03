import PageNotFound from "../../assets/images/error.svg";
export default function NotFound() {
  return (
    <>
      <div className="w-screen h-screen flex justify-center items-center">
        <img
          src={PageNotFound}
          alt="Page Not Found"
          className="w-full md:w-2/3"
        />
      </div>
    </>
  );
}
