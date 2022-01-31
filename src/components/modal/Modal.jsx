import { useEffect } from "react";
import PropTypes from "prop-types";
import { createPortal } from "react-dom";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { Overlay, ModalImage } from "./Modal.styled";

const modalRoot = document.querySelector("#modal-root");

export default function Modal({ collection, currentImage, onClose }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.code === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return createPortal(
    <Overlay onClick={handleBackdropClick}>
      <Carousel
        className="presentation-mode"
        autoFocus={true}
        centerSlidePercentage={100}
        dynamicHeight={false}
        infiniteLoop={true}
        renderIndicator={false}
        useKeyboardArrows
        selectedItem={collection.indexOf(currentImage)}
        showStatus={false}
        showThumbs={false}
      >
        {collection.map((item) => {
          return (
            <ModalImage
              key={item.id}
              src={item.largeImageURL}
              alt={item.tags}
            />
          );
        })}
      </Carousel>
    </Overlay>,
    modalRoot
  );
}

Modal.propTypes = {
  collection: PropTypes.array.isRequired,
  currentImage: PropTypes.object.isRequired,
};
