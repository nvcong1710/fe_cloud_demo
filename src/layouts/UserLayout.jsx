import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";

function UserLayout({ children }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      {children}
      <Footer />
    </div>
  );
}

export default UserLayout;
