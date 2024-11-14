import { useContext, useEffect, useState } from "react";
import { ProductContext } from "../../contexts/ProductContext";
import Header from "../../component/Header";
import Footer from "../../component/Footer";
import { Link } from "react-router-dom";
import { ShoppingContext } from "../../contexts/ShoppingCartContext";
import SlideShow from "../../component/SlideShow";

const Home = () => {
  const { state } = useContext(ProductContext);
  const { addCartItem } = useContext(ShoppingContext);
  const [currentPages, setCurrentPage] = useState(1);
  const [showBanner, setShowBanner] = useState<boolean>(true);
  const [isSorted, setIsSorted] = useState<boolean>(true);

  useEffect(() => {
    if (state.searchProduct.length > 0) {
      setShowBanner(false);
    }
  }, [state.searchProduct]);

  // slider
  const images = [
    "https://s3-alpha-sig.figma.com/img/b922/9e94/cdac8e63c426e34dd8147b7e223eaccb?Expires=1723420800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=IfL1c-xvZR~SuZ~sQeZ2Qf0iGWArotig0f8EULi0ayFDwrX7gjXABJkdhpTaxMLmAi243875n~JIVVeO818Ot4LPgXcKy60bkL3u86yBQDYowSiDGSmcWHILCBtY3KKuJsIUQfjFVWO0MiJ90c8pwImuuz1SJCrJkgIwtjZM2LWRgfHdl2N0DdPXLLLqNkFHJKpN2eAczorAC1ktCgmJC5iYDTm1eGArJasfCGYgfBIbfVYDAA~1Jil~NA2Ec91xRyUNNSrK2P-nyrSY0ai-Shke-kUK0U0eNJy9a8a51s~1dKrjwMSgfbYfAkfZD1IKz5Hk43ukyaOmy0ZuMxVULQ__",
    "https://s3-alpha-sig.figma.com/img/ad13/55ba/199164e328978d819a3de3fdc15c1bae?Expires=1723420800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=AX7LDQOWpH8MwG-3uag4Sjti1EC5Yus2ZuL2RkI0zrsvZQoyam7Nc5NHG7-2MrwOcbx~GTno~5ridf3C6DjDXaCKaCXB4jYvkBHXizO4gwaaEArC4hfOyT0Pkloll2GcaNz4lN3Hgprh8-y~5fqAMcU9-~oPk64dsIrykWAJNP8OksAkBbKsgztwPw0b8vYQU6M~YCpTONcJE2~M5e5p5I8CZHoXqtaHW62JJII0yjQ6klyqeN8ppfr5bB9Lyzgtk0Kftg0nJYLeHBg7hrVOBD0n6MotgXd-~4Ow409jFwXRnFZve4Dj5gjrISNQW7EFxrwpZZ5vYqLHkM7CPxqMxA__",
    "https://s3-alpha-sig.figma.com/img/9c2f/5c30/d4db4723a6061e62a81d915b0c00bed9?Expires=1723420800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=AsEx28YvE8NVFuUP9Gqb7dU1b2kmptdyKKitUBYhxWfm-O~qHn2PCgJgLhlsaEBXfNG-tJkuezwpIjd5mfeQn1ywR6ktoXz0st1R~2WZsIKcmIR40Zvr54aFOI9LccbHzw91EjaW5ZO1cjqb98WNePm0uk85gDDtDeRVC8G8mBmdtUiioD3YcSROzUMvzR50C1H~RYLW7Zv2QwCr3bfmW13nH-ahBzQLlMvs05wY~igwPBZL88BX14Hi~L7nqD6TYDQM3O4d5SYtQHnOvA27cjq7G9f-UOzql6bkzX7FpmjyuGWOWNt4zMABJoFPZkByCdc6f8wJHKn4xrJ1d73U5g__",
    "https://s3-alpha-sig.figma.com/img/5bb3/fdf0/0085f47543e899c5caa8f36bd70b330d?Expires=1723420800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=cHeecjx3YS9WlpuSzQTovyRbLvMXDTWKj9ObkCrb6oQB56D9Z7td8DT2K9amUigq4DN8tKpjIKoskX4QvqIpRIg8tCvXgQzqehEKrN-ls8uTo9dnfHRlLo9OGoFzaDXgvzLjcQsxcrqezeYsvNJrx-5TLNGtohIy~Z-9FdLu3SS1Q6hw~dbUNihx4q38hz576kLpvUCAaucNz1LRahBM87KQ-I7mCgbMBFTGpZShPv4eMm~QKl8JyObuhuNaxpjmOyXgKQbPx0mPV4Z-5YSW9pmh3SgZ2eoMUhx2EoRN-Ar4qaGnjuHtqfLqsR1rRmOogSEGwVdHId~BRcCMa5BGgQ__",
  ];

  // sắp xếp theo giá

  const sortedProducts = [...state.products].sort((a, b) => {
    if (isSorted) {
      return a.price - b.price;
    } else {
      return b.price - a.price;
    }
  });

  // giới hạn số lượng sản phẩm hiển thị
  const productPage = 12;
  const indexLastPage = currentPages * productPage;
  const indexFirstPage = indexLastPage - productPage;

  const productList = sortedProducts.slice(indexFirstPage, indexLastPage);
  const searchProduct = state.searchProduct.slice(
    indexFirstPage,
    indexLastPage
  );

  const currentProducts =
    state.searchProduct.length > 0 ? searchProduct : productList;
  // Tính tổng số trang
  const totalPages = Math.ceil(
    (state.searchProduct.length > 0
      ? state.searchProduct.length
      : state.products.length) / productPage
  );

  const pageNumbers = [];

  for (let i = 0; i < totalPages; i++) {
    pageNumbers.push(i);
  }

  const handlePreviousPage = () => {
    if (currentPages > 1) {
      setCurrentPage(currentPages - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPages < totalPages) {
      setCurrentPage(currentPages + 1);
    }
  };

  const handleSortedProducts = () => {
    setIsSorted(!isSorted);
  };

  return (
    <>
      <header>
        <Header />
      </header>
      <main>
        {showBanner && (
          <div className="banner h-4/5 relative">
            <SlideShow images={images} />
          </div>
        )}
        <div className="mt-10 mx-44">
          <button
            onClick={handleSortedProducts}
            className="text-white text-sm bg-blue-500 font-semibold py-2 px-3 mb-3 rounded border border-blue-500 hover:bg-white hover:text-blue-500"
          >
            Sort by price {isSorted ? "accending" : "descending"}
          </button>
          <div className="flex flex-wrap gap-4 justify-between">
            {currentProducts.map((product) => (
              <div
                key={product.id}
                className="product w-56 bg-gray-50 flex-grow-0 flex-shrink-0 w-[calc(25%-1rem)]"
              >
                <Link to={`/details/${product.id}`}>
                  <img className="h-64 w-full" src={product.thumbnail} alt="" />
                </Link>
                <p className="title ml-2 font-semibold">{product.title}</p>
                <p className="description ml-2 text-sm py-1 text-gray-400 ">
                  {product.description?.slice(0, 19)}
                </p>
                <p className="price text-lg text-red-500 font-semibold py-2 ml-2">
                  {`${product.price} $`}
                </p>

                <div>
                  <button
                    className="border border-black rounded py-2 px-4 ml-3 bg-white hover:text-black hover:bg-black transition-all duration-1000
                   hover:bg-black mr-3"
                  >
                    <i className="fa-regular fa-heart text-black hover:text-white"></i>
                  </button>
                  <button
                    onClick={() => addCartItem(product)}
                    className="mb-2 border border-black font-semibold bg-white rounded text-black py-2 px-10 ml-2 whitespace-nowrap hover:bg-black transition-all duration-1000 hover:text-white "
                  >
                    Add to cart
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="flex my-4">
            <button onClick={handlePreviousPage}>
              <i className="fa-solid fa-angles-left"></i>
            </button>
            {pageNumbers.map((page) => (
              <div key={page} className="p-2">
                <button
                  type="button"
                  className={`px-2 py-1 rounded border font-semibold text-sm ${
                    page === currentPages - 1 ? "active-bg-button" : ""
                  }`}
                >
                  {page + 1}
                </button>
              </div>
            ))}
            <button onClick={handleNextPage}>
              <i className="fa-solid fa-angles-right"></i>
            </button>
          </div>
        </div>
      </main>
      <footer>
        <Footer />
      </footer>
    </>
  );
};

export default Home;
