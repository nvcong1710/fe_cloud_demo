import React, { useState, useEffect, useContext } from "react";
import BookCategory from "../BookCategory";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import Axios from "axios";
// import categories from "../../../component/Utils/categories";
// import Breadcrumb from "../../../component/Breadcrumb";
import { UserContext } from "../../../context/UserContext";
function Header() {
  const { logout, user } = useContext(UserContext);

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showBookCategory, setShowBookCategory] = useState(false);
  const [showMobileCategory, setShowMobileCategory] = useState(false);

  const [categories, setCategories] = useState([]);
  useEffect(() => {
    Axios.get("http://localhost:8080/api/danhmuc/getalldanhmuc")
      .then((res) => {
        setCategories(res.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };
  return (
    <div>
      <div
        className={`relative z-40 lg:hidden ${isMobileMenuOpen ? "" : "hidden"
          }`}
        role="dialog"
        aria-modal="true"
      >
        <div className={`fixed inset-0 bg-black bg-opacity-25`}></div>

        <div className="fixed inset-0 z-40 flex">
          <div
            className={`relative flex w-full max-w-xs flex-col overflow-y-auto bg-white pb-12 shadow-xl ${isMobileMenuOpen
              ? "transition ease-in-out duration-300 transform translate-x-0"
              : "-translate-x-full"
              }`}
            onClick={(e) => e.target === e.currentTarget && toggleMobileMenu()}
          >
            <div className="flex px-4 pt-5 pb-2">
              <button
                type="button"
                className="-m-2 inline-flex items-center justify-center rounded-md p-2 text-slate-400"
                onClick={toggleMobileMenu}
              >
                <svg
                  aria-hidden="true"
                  className="h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <div className="space-y-6 px-4 pt-10 pb-6">
              <div className="grid grid-cols-1 items-start gap-y-6 gap-x-6">
                <div className="flow-root">
                  <a
                    href="/"
                    className="-m-2 block p-2 font-medium text-slate-900 hover:bg-slate-100 rounded-md"
                  >
                    Trang chủ
                  </a>
                </div>
                <div>
                  <button
                    className="-m-2 w-full text-left block p-2 font-medium text-slate-900 hover:bg-slate-100 rounded-md"
                    onClick={() => setShowMobileCategory(!showMobileCategory)}
                  >
                    Danh mục
                  </button>
                  {showMobileCategory && (
                    <ul
                      role="list"
                      aria-labelledby="mobile-collection-heading"
                      className="ml-3 mt-3"
                    >
                      {categories.map((category, index) => (
                        <li key={index}>
                          <a
                            href={category.id}
                            className="block p-3 hover:bg-slate-100 rounded-md"
                          >
                            {category.tenDanhMuc}
                          </a>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
                <div className="flow-root">
                  <a
                    href="/tac-gia"
                    className="-m-2 block p-2 font-medium text-slate-900 hover:bg-slate-100 rounded-md"
                  >
                    Tác giả
                  </a>
                </div>
                <div className="flow-root">
                  <a
                    href="/lien-he"
                    className="-m-2 block p-2 font-medium text-slate-900 hover:bg-slate-100 rounded-md"
                  >
                    Liên hệ
                  </a>
                </div>
              </div>
            </div>

            <div className="space-y-6 border-t border-slate-200 py-6 px-4">
              <div className="flow-root">
                <a
                  href="/login"
                  className="-m-2 block p-2 font-medium text-slate-900 hover:bg-slate-100 rounded-md"
                >
                  Đăng nhập
                </a>
              </div>
              <div className="flow-root">
                <a
                  href="/register"
                  className="-m-2 block p-2 font-medium text-slate-900 hover:bg-slate-100 rounded-md"
                >
                  Tạo tài khoản
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <header>
        <div className="border-b border-slate-200">
          <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 items-center justify-between">
              <div className="flex flex-1 lg:hidden">
                <button
                  type="button"
                  className="bg-white -ml-2 p-2 text-slate-400"
                  onClick={() => {
                    // Handle mobile menu open
                    toggleMobileMenu();
                  }}
                >
                  <svg
                    className="h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10zm0 5.25a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75a.75.75 0 01-.75-.75z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>
              <a href="/">
                <img
                  src="https://bizweb.dktcdn.net/100/363/455/themes/918830/assets/logo.png?1704690471681"
                  alt="Sách mới"
                  className="h-8 w-auto"
                  height="32"
                  width="32"
                />
              </a>
              <div className="hidden lg:ml-8 lg:block lg:self-stretch">
                {/* <div> */}
                <div>{/* Dropdown menu component */}</div>
                <ul className="flex h-full justify-center space-x-8">
                  <li className="flex items-center">
                    <a
                      href="/"
                      className="flex items-center text-sm font-medium text-slate-700 hover:text-slate-800"
                    >
                      Trang chủ
                    </a>
                  </li>
                  <li
                    className="flex items-center"
                    onMouseLeave={() => setShowBookCategory(false)} // Handle mouse leaving to hide the category
                  >
                    <a
                      // href="/"
                      onClick={() => { }}
                      className="flex items-center text-sm font-medium text-slate-700 hover:text-slate-800"
                      onMouseEnter={() => setShowBookCategory(true)} // Use a function to set the state
                    >
                      Danh mục
                      {showBookCategory ? (
                        <FontAwesomeIcon
                          icon={faChevronUp}
                          className="h-3 w-3 ml-1"
                        />
                      ) : (
                        <FontAwesomeIcon
                          icon={faChevronDown}
                          className="h-3 w-3 ml-1"
                        />
                      )}
                    </a>
                    {showBookCategory && <BookCategory />}
                  </li>
                  <li className="flex items-center">
                    <a
                      href="/tac-gia"
                      className="flex items-center text-sm font-medium text-slate-700 hover:text-slate-800"
                    >
                      Tác giả
                    </a>
                  </li>
                  <li className="flex items-center">
                    <a
                      href="/lien-he"
                      className="flex items-center text-sm font-medium text-slate-700 hover:text-slate-800"
                    >
                      Liên hệ
                    </a>
                  </li>
                </ul>
                {/* </div> */}
              </div>
              <div className="flex flex-1 items-center justify-end lg:ml-auto">
                <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
                  {!user.auth ? <><a
                    href="/login"
                    className="text-sm font-medium text-slate-700 hover:text-slate-800"
                  >
                    Đăng nhập
                  </a>
                  <span
                    className="h-6 w-px bg-slate-200"
                    aria-hidden="true"
                  ></span>
                  <a
                    href="/register"
                    className="text-sm font-medium text-slate-700 hover:text-slate-800"
                  >
                    Tạo tài khoản
                  </a></>:<>
                  <a
                    href="/"
                    className="text-sm font-medium text-slate-700 hover:text-slate-800"
                  >
                    {user.userName}
                  </a>
                  <a
                        href="/"
                        onClick={() => logout()}
                    className="text-sm font-medium text-slate-700 hover:text-slate-800"
                  >
                    Đăng xuất
                  </a></>}
                </div>
                <div className="flex lg:ml-6">
                  <button
                    type="button"
                    className="p-2 text-slate-400 hover:text-slate-500"
                    onClick={() => {
                      // Handle search open
                    }}
                  >
                    <svg
                      className="h-6 w-6"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                      />
                    </svg>
                  </button>
                </div>
                <div className="ml-4 flow-root lg:ml-6">
                  <a href="/gio-hang" className="group -m-2 flex items-center p-2">
                    <svg
                      className="h-6 w-6 flex-shrink-0 text-slate-400 group-hover:text-slate-500"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                      />
                    </svg>
                    <span className="ml-2 text-sm font-medium text-slate-700 group-hover:text-slate-800">
                      0
                    </span>
                  </a>
                </div>
              </div>
            </div>
          </nav>
        </div>
      </header>
    </div>
  );
}

export default Header;
