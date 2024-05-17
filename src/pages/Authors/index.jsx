import React, { useState, useEffect } from "react";
import { randomAuthors } from "../../component/Utils/fakeData";
const AuthorsPage = () => {
  const [authors, setAuthors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAuthors = async () => {
      try {
        const response = await fetch(
          "http://localhost:8080/api/tacgia/getalltacgia"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch authors");
        }
        const data = await response.json();
        setAuthors(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching authors:", error);
      }
    };

    fetchAuthors();
  }, []);

  return (
    <div className="max-w-7xl mx-auto p-4 mt-4">
      <h1 className="text-3xl font-bold mb-8 mt-4">Tác giả</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-8">
          {/* {randomAuthors.map((author) => ( */}
          {authors.map((author) => (
            <div key={author.id} className="flex flex-col items-center px-4">
              <div className="flex flex-col items-center">
                <a href={`/tac-gia/${author.id}`}>
                  <img
                    // inline-block
                    className="flex items-center h-48 w-48 rounded-full ring-2 ring-white object-cover"
                    // src="https://bizweb.dktcdn.net/100/363/455/articles/a001157172-23.jpeg?v=1705927222763"
                    src={author.image}
                    //   {author.image}
                    alt={author.tenTacGia}
                  />
                </a>
                <a href={`/tac-gia/${author.id}`}>
                  <h3 className="mt-2 text-base font-medium text-lg text-gray-900">
                    {author.tenTacGia}
                  </h3>
                </a>
              </div>
            </div>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AuthorsPage;
