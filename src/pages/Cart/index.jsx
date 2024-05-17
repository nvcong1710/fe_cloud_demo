import { useState, useEffect, useContext } from "react";
import axios from "axios";
import ProductPrice from "../../component/ProductPrice";
import { UserContext } from "../../context/UserContext";

function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const { user } = useContext(UserContext);

  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/cart/getgiohang/${user.id}`)
      .then((res) => {
        setCartItems(res.data);
      })
      .catch((error) => {
        console.log("Error fetching data", error);
      });
  }, []);

  const handleQuantityChange = (id, e) => {
    const newQuantity = Number(e.target.value);

    const index = cartItems.findIndex((item) => item.id === id);
    if (index === -1) {
      console.error("Item not found in cart");
      return;
    }

    const updatedCartItems = [...cartItems];
    updatedCartItems[index].soLuong = newQuantity;

    axios
      .put(`http://localhost:8080/api/cart/update/${id}`, {
        taiKhoanId: updatedCartItems[index].taiKhoanId,
        sachId: updatedCartItems[index].sach.id,
        soLuong: newQuantity,
      })
      .then((res) => {
        console.log("Quantity updated successfully");
        setCartItems(updatedCartItems);
      })
      .catch((error) => {
        console.error("Error updating quantity:", error);
      });
  };

  const handleDelete = (id) => {
    console.log(id);
    axios
      .delete(`http://localhost:8080/api/cart/delete/${id}`)
      .then((res) => {
        axios.get("http://localhost:8080/api/cart/getgiohang/1").then((res) => {
          setCartItems(res.data);
        });
      })
      .catch((error) => {
        console.log("Error deleting item", error);
      });
  };
  return (
    <div className="">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:px-0">
        <h1 className="text-center text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
          Giỏ hàng của bạn
        </h1>
        <div className="mt-12">
          <section aria-labelledby="cart-heading">
            <ul
              role="list"
              className="divide-y divide-slate-200 border-b border-t border-slate-200"
            >
              {cartItems.map((item) => (
                <li key={item.id} className="flex py-6">
                  <div className="flex-shrink-0 rounded-md">
                    <img
                      alt="Apple iPhone 11"
                      className="h-24 w-24 rounded-md object-contain object-center sm:h-32 sm:w-32"
                      src="https://www.nxbtre.com.vn/Images/Book/nxbtre_thumb_04302024_033042.jpg"
                    />
                  </div>
                  <div className="ml-4 flex flex-1 flex-col sm:ml-6">
                    <div>
                      <div className="flex justify-between">
                        <h4 className="text-sm">
                          <a
                            href={`/sach/${item.sach.id}`}
                            className="font-medium text-slate-700 hover:text-slate-800"
                          >
                            {item.sach.tieuDe}
                          </a>
                        </h4>
                        <p className="ml-4 text-sm font-medium text-slate-900">
                          <ProductPrice price={item.sach.gia} />
                        </p>
                      </div>
                      <p className="mt-1 space-x-2 divide-x divide-slate-200 text-sm text-slate-500">
                        {item.sach.moTa}
                      </p>
                    </div>
                    <div className="mt-4 flex flex-1 items-end justify-between">
                      <div>
                        <input
                          className="appearance-none border border-slate-300 rounded-md shadow-sm checked:bg-sky-500 checked:text-sky-500 disabled:bg-slate-100 disabled:opacity-50 disabled:cursor-not-allowed focus:border-sky-500 focus:ring-sky-500 dark:border-white/10 dark:bg-white/5 dark:focus:border-sky-500 dark:focus:ring-sky-500 dark:text-slate-300 dark:focus:ring-offset-slate-900 dark:checked:bg-sky-500 w-16 no-spinners text-center sm:text-sm"
                          type="number"
                          name="quantity"
                          value={item.soLuong}
                          onChange={(e) => handleQuantityChange(item.id, e)}
                          id="quantity"
                          min="1"
                        />
                      </div>

                      <div className="ml-4">
                        <button
                          type="button"
                          className="btn btn-link"
                          onClick={() => handleDelete(item.id)}
                        >
                          <span className="text-sm text-red-500">Xoá</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </section>
          <section
            aria-labelledby="summary-heading"
            className="mt-10 flex flex-col items-end"
          >
            <div>
              <dl className="space-y-4">
                <div className="flex items-center justify-between">
                  <dt className="text-base font-medium text-slate-900">
                    Tổng cộng
                  </dt>
                  <dd className="ml-4 text-base font-medium text-slate-900">
                    {" "}
                    <ProductPrice
                      price={cartItems.reduce(
                        (total, item) => total + item.sach.gia * item.soLuong,
                        0
                      )}
                    />
                  </dd>
                </div>
              </dl>
            </div>
            <div className="mt-10">
              <a href="/thanh-toan" className="btn btn-primary btn-xl w-full">
                Thanh toán
              </a>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

export default Cart;
