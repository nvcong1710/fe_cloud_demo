import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Axios from "axios";
const settings = {
  infinite: false,
  slidesToShow: 4,
  slidesToScroll: 1,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
      },
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 2,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
      },
    },
  ],
};
const settings2 = {
  infinite: false,
  slidesToShow: 5,
  slidesToScroll: 1,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
      },
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 2,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
      },
    },
  ],
};
const AuthorSlider = () => {
  const [randomAuthors, setRandomAuthors] = useState([[]]);
  useEffect(() => {
    Axios.get("http://localhost:8080/api/tacgia/getalltacgia")
      .then((response) => {
        setRandomAuthors(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [])

  return (
    <Slider {...settings2}>
      {
        randomAuthors.map((author) => (
          <div key={author.id} className="flex flex-col items-center px-4">
            <div className="flex flex-col items-center">
              <img
                // inline-block
                className="flex items-center h-48 w-48 rounded-full ring-2 ring-white"
                src={author.image}
                alt={author.tenTacGia}
              />
              <h3 className="mt-2 text-base font-medium text-gray-900">
                {author.tenTacGia}
              </h3>
            </div>

          </div>
        ))
      }
    </Slider>
  );
};

const BookSlider = () => {
  const [randomBooks, setRandomBooks] = useState([[]]);
  useEffect(() => {
    Axios.get("http://localhost:8080/api/sach/getallsach")
      .then((response) => {
        setRandomBooks(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <Slider {...settings}>
      {randomBooks.map((book) => (
        <div
          key={book.id}
          className="bg-white rounded-lg shadow-md overflow-hidden"
        >
          {" "}
          <div className="p-6">
            <a href={"/sach/" + book.id} className="">
              <img
                className="h-auto w-full object-cover"
                src={book.photoURL}
                alt={book.tieuDe}
              />
            </a>
            <a
              href={"/sach/" + book.id}
              className="mt-4 text-lg font-medium text-gray-900"
            >
              {book.tieuDe}
            </a>
            <p className="mt-2 text-md text-blue-500 font-bold">{book.gia}</p>
          </div>
        </div>
      ))}
    </Slider>
  );
};

export { AuthorSlider, BookSlider };
