// import categories from "../Utils/categories"; // Assuming you have stored the categories data in a separate file
import Axios from "axios";
import { useEffect, useState } from "react";
import { useLocation, Link, useParams } from "react-router-dom";

const CategoryBreadcrumb = () => {
  const categoryId = useParams();
  // const location = useLocation();
  // const pathname = location.pathname;

  // const findCategory = (pathname, categories) => {
  //   const pathSegments = pathname
  //     .split("/")
  //     .filter((segment) => segment !== "");
  //   let category = null;
  //   category = categories.find(
  //     (cat) => cat.link === `/${pathSegments[0]}`
  //   );
  //   return category;
  // };

  // const category = findCategory(pathname, categories);


  // const breadcrumbs = [category];
  const [breadcrumbs, setBreadCrumbs] = useState([]);
  useEffect(() => {
    Axios.get("http://localhost:8080/api/danhmuc/getalldanhmuc")
      .then((res) => {
        setBreadCrumbs(res.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <nav aria-label="Breadcrumb" className=" border-b">
      <ol className="breadcrumb max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-10 flex items-center">
        <li className="breadcrumb-item">
          <Link to="/" className="text-gray-700">
            Trang chủ
          </Link>
        </li>
        {breadcrumbs.map((breadcrumb, index) =>
        (
          index + 1 == categoryId.category ? (<li key={index} className="breadcrumb-item">
            <span className="text-gray-500 mx-1">/</span>
            <Link to={breadcrumb.id} className="text-gray-700">
              {breadcrumb.tenDanhMuc}
            </Link>
          </li>) : null
        ))}
      </ol>
    </nav>
  );
};

export default CategoryBreadcrumb;
