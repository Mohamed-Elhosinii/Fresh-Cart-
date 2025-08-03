import Nav from "../Nav/Nav";
import { Outlet } from "react-router";

export default function Layout() {
  return (
    <>
      <Nav />
      <div className="container my-20">
        <Outlet></Outlet>
      </div>
    </>
  );
}
