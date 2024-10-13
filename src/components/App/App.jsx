

import css from './App.module.css'
import SearchBar from '../SearchBar/SearchBar'
import GetImages from '../ApiRequest'
import { useState, useEffect } from 'react'
import ImageGallery from '../ImageGallery/ImageGallery'
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

  useEffect(() => {
    async function fetchImagesHandler() {
      try {
        setError(false);
        setLoading(true);
        const data = await GetImages(query, page);
        const results = data.results;
        if (page === 1) {
          if (results.length === 0) {
            toast("There is no results, try another search", {
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
          toast.success(`Totaly ${data.total} has been found`, {
            position: "top-rigth",
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
      toast.success("You have come to the bottom!", {
        position: "",
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

  function onSubmitReset() {
    setPage(1);
    setQuery("");
    setImages([]);
  }

  function pageIncrement() {
    setPage((prevData) => prevData + 1);
  }

  function openModal(imageUrl, alt) {
    setModalIsOpen(true);
    setModalImage(imageUrl);
    setModalAlt(alt);
  }

  function closeModal() {
    setModalIsOpen(false);
  }

  return (
    <div className={css.container}>
      <Toaster />
      <SearchBar reset={onSubmitReset} setQuery={setQuery} />
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
        isOpen={modalIsOpen}
        closeModal={closeModal}
        modalImage={modalImage}
        modalAlt={modalAlt}
      />
    </div>
  );
}

export default App
