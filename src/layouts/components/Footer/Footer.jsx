import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Footer = () => {
  return (
    <footer className="bg-stone-100 py-8 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center">
        <div className="flex items-center mb-4 sm:mb-0">
          <img
            src="https://bizweb.dktcdn.net/100/363/455/themes/918830/assets/logo.png?1704690471681"
            alt="Nha Nam"
            className="h-10 mr-4"
          />
          <div>
            <p className="text-gray font-bold">
              Số 59, Đồ Quang, Trung Hòa, Cầu Giấy, Hà Nội.
            </p>
            <p className="text-gray">info@nhanam.vn</p>
            <p className="text-gray">02435146876</p>
            <p className="text-gray">0903244248</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
