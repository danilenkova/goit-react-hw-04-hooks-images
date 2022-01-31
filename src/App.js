import { useState, useReducer, useEffect, useRef } from "react";
import { apiService } from "./components/service/apiService";
import { ToastContainer } from "react-toastify";
import { NOT_ALERTS, myAlert } from "./components/service/alerts";
import ScrollToTop from "react-scroll-to-top";
import { ImCircleUp } from "react-icons/im";
import Section from "./components/section";
import SearchBar from "./components/searchBar/SearchBar";
import ImageGallery from "./components/imageGallery";
import Modal from "./components/modal";
import LoadMoreButton from "./components/button";
import Loader from "./components/loader";

const startPage = 1;

const imagesReducer = (state, action) => {
  switch (action.type) {
    case "get":
      return action.payload;
    case "add":
      return [...state, ...action.payload];
    default:
      return state;
  }
};

function App() {
  const [loader, setLoader] = useState(false);
  const [modal, setModal] = useState(false);

  const [images, dispatch] = useReducer(imagesReducer, []);
  const [page, setPage] = useState(startPage);

  const [query, setQuery] = useState("");
  const [modalImage, setModalImage] = useState(null);

  const [totalHits, setTotalHits] = useState(null);
  const [itemToScroll, setItemToScroll] = useState(null);

  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    if (!query) return;
    const fetchImages = async () => {
      setLoader(true);
      try {
        const results = await apiService(query, page);
        if (!results.hits.length) {
          myAlert(NOT_ALERTS.NOT_FOUND);
          setQuery("");
          dispatch({ type: "get", payload: [] });
          return;
        }
        setTotalHits(results.total);

        const type = page === startPage ? "get" : "add";
        dispatch({ type: type, payload: results.hits });

        setItemToScroll(results.hits[0].id);
      } catch (error) {
        myAlert(NOT_ALERTS.FETCH_ERROR);
      } finally {
        setLoader(false);
      }
    };
    fetchImages();
  }, [query, page]);

  useEffect(() => {
    if (!totalHits) return;
    if (totalHits <= images.length) {
      myAlert(NOT_ALERTS.END);
    }
  }, [totalHits, images]);

  useEffect(() => {
    if (itemToScroll) {
      const yOffset = -80;
      const element = document.getElementById(itemToScroll);
      const y =
        element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  }, [itemToScroll]);

  const handleFormSubmit = (query) => {
    setQuery(query);
    setPage(startPage);
  };
  const toggleModal = () => {
    setModal((prev) => !prev);
  };
  const getImage = (image) => {
    setModalImage(image);
    toggleModal();
  };
  const onLoadMoreClick = () => {
    setPage((prev) => prev + 1);
  };

  const loadMore = images.length > 0 && totalHits > images.length;
  return (
    <div className="App">
      <SearchBar onSubmit={handleFormSubmit} />
      <Section>
        <div>
          {images.length > 0 && (
            <ImageGallery collection={images} onClick={getImage} />
          )}
          {loader ? (
            <Loader />
          ) : (
            loadMore && (
              <LoadMoreButton
                text={"Load more images"}
                onClick={onLoadMoreClick}
              />
            )
          )}
          <ScrollToTop
            smooth
            top={300}
            component={<ImCircleUp size="3em" color="#cccccc" />}
            style={{
              backgroundColor: "transparent",
              boxShadow: "none",
              zIndex: 0,
            }}
          />
          <ToastContainer autoClose={3000} />
        </div>
        <div>
          {modal && (
            <Modal
              onClose={toggleModal}
              currentImage={modalImage}
              collection={images}
            />
          )}
        </div>
      </Section>
    </div>
  );
}

export default App;
