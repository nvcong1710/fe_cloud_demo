import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProductPrice from "../../component/ProductPrice";
import { BookSlider } from "../../component/Slider";
import Breadcrumb from "../../component/Breadcrumb/Breadcrumb";
import { randomBooks } from "../../component/Utils/fakeData";
import { UserContext } from "../../context/UserContext";
import axios from "axios";

const ProductPage = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [activeTab, setActiveTab] = useState("description");
  const { user } = useContext(UserContext);
  const [quantity, setQuantity] = useState(1);


  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };


  const addToCart = async () => {
    const res = await axios.post('http://localhost:8080/api/cart/addtocart', {
      taiKhoanId: user.id,
      sachId: productId,
      soLuong: quantity
    })
    if (res.status == 200) {
      alert("Thêm thành công sản phẩm vào giỏ hàng")
    }
    else {
      alert("có lỗi xảy ra")
    }
  };

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/sach/getsachbyid/${productId}`);
        if (response.ok) {
          const data = await response.json();
          console.log(data);
          setProduct(data);
        } else {
          throw new Error("Failed to fetch product");
        }
      } catch (error) {
        console.error(error);
      }
      // setProduct({
      //   id: 1,
      //   title: "Những anh hùng trẻ tuổi - Phan Đình Giót",
      //   price: 35000,
      //   discountPrice: 50000,
      //   imageSrc:
      //     "https://www.nxbtre.com.vn/Images/Book/nxbtre_thumb_04302024_033042.jpg",
      //   discount: 30,
      //   category: "Triết học",
      // });
    };

    fetchProduct();
  }, [productId]);

  useEffect(() => {
    // Update document title and SEO metadata with product name
    if (product) {
      document.title = `${product.title} - Sachmoi.vn`;
      // Update other SEO metadata as needed
    }
  }, [product]);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Breadcrumb title={product.danhMuc.tenDanhMuc + "/" + product.tieuDe} />
      <div className="max-w-7xl mx-auto p-4 mt-4">
        <div className="relative lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8">
          <div className="h-[600px] flex justify-center">
            <img src={product.photoURL} alt="" className="h-full" />
          </div>
          <div className="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
            <h1 className="text-3xl font-bold tracking-tight text-slate-900">
              {product.tieuDe}
            </h1>
            <div className="mt-3">
              <div className="text-3xl font-semibold tracking-tight text-slate-900">
                <ProductPrice price={product.gia}></ProductPrice>
              </div>
            </div>
            <div className="mt-3">
              {" "}
              <span className="text-yellow-400">&#9733;</span>
              <span className="text-yellow-400">&#9733;</span>
              <span className="text-yellow-400">&#9733;</span>
              <span className="text-yellow-400">&#9733;</span>
              <span className="text-gray-400">&#9733;</span>
            </div>
            <div className="flex items-center space-x-3 mt-8">
              <div>
                <input
                  className="appearance-none border border-slate-300 rounded-md shadow-sm checked:bg-sky-500 checked:text-sky-500 disabled:bg-slate-100 disabled:opacity-50 disabled:cursor-not-allowed focus:border-sky-500 focus:ring-sky-500 dark:border-white/10 dark:bg-white/5 dark:focus:border-sky-500 dark:focus:ring-sky-500 dark:text-slate-300 dark:focus:ring-offset-slate-900 dark:checked:bg-sky-500 py-3 text-sm text-center sm:text-base show-spinners"
                  type="number"
                  id="productQuantity"
                  min="1"
                  max="100"
                  value={quantity}
                  onChange={(event) => { setQuantity(event.target.value) }}
                />
              </div>
              <div className="flex w-full">
                <button className="btn btn-primary btn-xl" onClick={addToCart}>Add to cart</button>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg p-6 overflow-hidden">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-6">
              <button
                className={`${activeTab === "description"
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
                onClick={() => handleTabClick("description")}
              >
                Mô tả sản phẩm
              </button>
              <button
                className={`${activeTab === "reviews"
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
                onClick={() => handleTabClick("reviews")}
              >
                Thông tin chi tiết
              </button>
              <button
                className={`${activeTab === "additional"
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
                onClick={() => handleTabClick("additional")}
              >
                Đánh khách hàng
              </button>
            </nav>
          </div>
          {activeTab === "description" && (
            <div className="mt-6">
              <div className="bg-white overflow-hidden">
                <p className="text-gray-700 mb-4">
                  {product.moTa}
                  {/* Đắc nhân tâm, nghĩa là sống sao cho đẹp lòng người, nhằm tạo
                  dựng một cuộc sống an vui trong đời tư, thiện chí và đầy tinh
                  thần hợp tác trong công việc. Lẽ thường sẽ chẳng bao giờ có
                  một chiếc chìa khóa vạn năng mở ra mọi thành công. Bạn phải
                  thông minh, đắc lực, nhiệt huyết và dấn thân. Nhưng Dale
                  Carnegie sẽ nói rằng còn một điều cốt yếu nữa mà ta phải học:
                  kỹ năng thu phục lòng người. Được xuất bản lần đầu tiên cách
                  nay ngót gần một trăm năm, được dịch ra nhiều ngôn ngữ trên
                  thế giới, với vài chục triệu bản được bán ra, Đắc nhân tâm của
                  Dale Carnegie luôn được đón nhận nồng nhiệt ở nhiều quốc gia,
                  đã giúp hàng triệu người gặt hái được thành công trong cuộc
                  sống. Bản thân Warren Buffett, nhà đầu tư huyền thoại người
                  Mỹ, đã đọc Đắc nhân tâm ngay từ thuở thiếu niên và tấm bằng
                  duy nhất được treo trong phòng làm việc của Buffett chính là
                  chứng chỉ từ khóa đào tạo của Dale Carnegie. Tất cả như đều
                  minh chứng cho sức hấp dẫn phổ biến và giá trị cốt lõi của Đắc
                  nhân tâm, một hiện tượng xuất bản có sức sống bền lâu hơn
                  những trào lưu thời thượng chóng tàn. Đọc Đắc nhân tâm, nghiền
                  ngẫm những mẩu chuyện thường nhật do chính Dale Carnegie hay
                  các học viên của ông kể lại, hoặc những bài học rút ra từ
                  trong sử sách mà ông dày công sưu tầm, ta chợt nhận ra một
                  điều giản dị rằng nghệ thuật đối nhân xử thế chính là mảnh
                  ghép cuối cùng để làm nên một công thức thành công mỹ mãn,
                  bằng sự bình tâm suy xét, chỉnh đốn bản thân, bằng sức mạnh
                  của lòng chân thành và sự cảm thông. */}
                </p>
              </div>
            </div>
          )}
          {activeTab === "reviews" && (
            <div className="mt-6">
              <div className="mt-4">
                <div className="bg-white rounded-lg p-4">
                  <div className="mb-4">
                    <div className="flex items-center mb-2">
                      <span className="text-yellow-400">&#9733;</span>
                      <span className="text-yellow-400">&#9733;</span>
                      <span className="text-yellow-400">&#9733;</span>
                      <span className="text-yellow-400">&#9733;</span>
                      <span className="text-gray-400">&#9733;</span>
                    </div>
                    <p className="text-gray-600">
                      Sách mới đẹp, đóng gói cẩn thận. Shop giao hàng nhanh. Đã
                      mua của shop nhiều lần vẫn ưng ý. Ủng hộ shop.
                    </p>
                    <p className="text-gray-500 mt-2">
                      Lukaku - Ngày thương tháng nhớ năm mong
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
          {activeTab === "additional" && <div className="mt-6"></div>}
        </div>
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl mb-10">
            Có thể bạn thích
          </h2>
          <BookSlider books={randomBooks} />
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
