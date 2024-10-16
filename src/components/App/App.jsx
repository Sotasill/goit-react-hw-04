import css from "./App.module.css";
import SearchBar from "../SearchBar/SearchBar";
import GetImages from "../apiRequest";
import { useState, useEffect, useRef } from "react";
import ImageGallery from "../ImageGallery/ImageGallery";
import toast, { Toaster } from "react-hot-toast";
import Loader from "../Loader/Loader";
import ImageModal from "../ImageModal/ImageModal";
import LoadMoreBtn from "../LoadMoreBtn/LoadMoreBtn";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import { BiSolidNoEntry } from "react-icons/bi";

function App() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [isLastPage, setIsLastPage] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalImage, setModalImage] = useState("");
  const [modalAlt, setModalAlt] = useState("");
  const [modalAuthor, setModalAuthor] = useState(""); 
  const [modalDescription, setModalDescription] = useState(""); 
  const [modalRating, setModalRating] = useState(""); 

  const inputRef = useRef(null); 

  useEffect(() => {
    async function fetchImagesHandler() {
      try {
        setError(false);
        setLoading(true);
        const data = await GetImages(query, page);
        const results = data.results;

        if (page === 1) {
          if (results.length === 0) {
            toast("There are no results, try another search", {
              icon: <BiSolidNoEntry />,
              position: "top-right",
              duration: 5000,
              style: {
                background: "red",
                color: "#fff",
                fontSize: "20px",
                borderRadius: "8px",
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
              },
            });
            return;
          }
          toast.success(`A total of ${data.total} results found`, {
            position: "top-right",
            duration: 5000,
            style: {
              background: "green",
              color: "#fff",
              fontSize: "20px",
              borderRadius: "8px",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            },
          });
        }

        setIsLastPage(page >= data.total_pages);
        setImages((prevData) => [...prevData, ...results]);
      } catch (error) {
        setError(true);
        setErrorMessage(error.message);
        toast.error(error.message, {
          position: "top-right",
          duration: 5000,
          style: {
            background: "red",
            color: "#fff",
            fontSize: "20px",
            borderRadius: "8px",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          },
        });
      } finally {
        setLoading(false);
      }
    }
    if (query) {
      fetchImagesHandler();
    }
  }, [query, page]);

  useEffect(() => {
    if (isLastPage) {
      toast.success("You have reached the end of the results", {
        position: "top-right",
        duration: 5000,
        style: {
          background: "green",
          color: "#fff",
          fontSize: "20px",
          borderRadius: "8px",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        },
      });
    }
  }, [isLastPage]);

  useEffect(() => {
    
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  function onSubmitReset() {
    setPage(1);
    setQuery("");
    setImages([]);
  }

  function pageIncrement() {
    setPage((prevData) => prevData + 1);
  }

  
  function openModal(imageUrl, alt, author, description, rating) {
    setModalIsOpen(true);
    setModalImage(imageUrl);
    setModalAlt(alt);
    setModalAuthor(author); 
    setModalDescription(description); 
    setModalRating(rating); 
  }

  function closeModal() {
    setModalIsOpen(false);
  }

  return (
    <div className={css.container}>
      <Toaster />
      <SearchBar
        reset={onSubmitReset}
        setQuery={setQuery}
        inputRef={inputRef}
      />
      {error ? (
        <ErrorMessage errorMessage={errorMessage} />
      ) : (
        images.length > 0 && (
          <>
            <ImageGallery images={images} onModalOpen={openModal} />
            {!isLastPage && <LoadMoreBtn loadMoreImages={pageIncrement} />}
          </>
        )
      )}
      {loading && <Loader />}
      <ImageModal
        modalIsOpen={modalIsOpen}
        closeModal={closeModal}
        modalImage={modalImage}
        modalAlt={modalAlt}
        modalAuthor={modalAuthor}
        modalDescription={modalDescription}
        modalRating={modalRating}
      />
    </div>
  );
}

export default App;
