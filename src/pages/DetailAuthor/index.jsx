import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const DetailAuthorPage = () => {
  const { authorId } = useParams();
  const [author, setAuthor] = useState();
  const [loading, setLoading] = useState(true);
  const [books, setBooks] = useState();

  const randomAuthor = {
    id: 1,
    tenTacGia: "Vũ Trọng Phụng",
    image:
      "https://bizweb.dktcdn.net/100/363/455/articles/vtp-dwve.jpg?v=1693195709850",
  };
  useEffect(() => {
    const fetchAuthors = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/api/tacgia/getTacGia/${authorId}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch authors");
        }
        const data = await response.json();
        setAuthor(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching authors:", error);
      }
    };

    fetchAuthors();
  }, []);

  return (
    <div className="max-w-7xl mx-auto p-4 mt-16">
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div key={author.id} className="flex flex-col items-center px-4">
          <div className="flex gap-8 lg:flex-row flex-col items-center">
            <div className="">
              <img
                // inline-block
                className="flex items-center h-64 w-64 lg:h-80 lg:w-80 rounded-full ring-2 ring-white object-cover"
                src={author.image}
                //   {author.image}
                alt={author.tenTacGia}
              />
            </div>
            <div className="flex-1">
              <h3 className="pb-4 mt-2 text-2xl font-medium text-lg text-gray-900">
                {author.tenTacGia}
              </h3>
              <p className="text-xl">
                Trú trì am Nagomi Jiyoin phái Tịnh độ chân tông. Sinh ra ở
                Tokyo, năm 1973, trong một gia đình bình thường. Sau khi tốt
                nghiệp đại học, ông làm nhân viên văn phòng, sau đó bén duyên
                trở thành nhà sư. Nhờ những đóng góp to lớn của ông cho Phật
                giáo Nhật Bản, tháng 5 năm 2019, ngôi chùa của ông được tỉnh
                Kanagawa công nhận là pháp nhân tôn giáo đầu tiên thời Reiwa
                trên toàn nước Nhật. Ngoài việc tổ chức pháp thoại và chép kinh,
                ông còn cùng vợ tổ chức các buổi diễn kịch Phật giáo tại nhiều
                ngôi chùa trên khắp cả nước, tổ chức workshop “Chuyến du hành
                trải nghiệm cái chết”, ban đầu là dành cho nhân viên y tế, sau
                này mở rộng cho tất cả mọi người. Hoạt động này được giới thiệu
                trên nhiều phương tiện truyền thông, trong vòng 9 năm đã có hơn
                4000 người tham gia.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DetailAuthorPage;
