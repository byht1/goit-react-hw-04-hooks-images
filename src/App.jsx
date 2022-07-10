import React, { useState, useEffect } from 'react';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

import ImageGallery from './components/Gallery/ImageGallery';
import ImageGalleryItem from './components/Gallery/ImageGalleryItem';
import Loader from './components/Loader/Loader';
import Searchbar from './components/Searchbar/Searchbar';
import Button from './components/Button/Button';
import Server from './components/server/server';
import Modal from './components/Modal/Modal';

const API = new Server();

export default function App() {
  const [images, setImages] = useState([]);
  const [request, setRequest] = useState('');
  const [loading, setLoading] = useState(false);
  const [button, setButton] = useState(false);
  const [page, setPage] = useState(1);
  const [modal, setModal] = useState('');
  const [alt, setAlt] = useState('');

  useEffect(() => {
    if (!request) {
      return;
    }

    setPage(1);
    setImages([]);
    API.page = 1;
    sererAIP();
  }, [request]);

  useEffect(() => {
    if (page === 1) {
      return;
    }

    API.page += 1;
    sererAIP();
  }, [page]);

  async function sererAIP() {
    try {
      setButton(false);
      setLoading(true);
      API.name = request;
      const data = await API.serverData();
      const hits = await data.hits.map(x => {
        return Object.fromEntries(
          Object.entries(x).filter(([key]) =>
            ['id', 'tags', 'largeImageURL', 'webformatURL'].includes(key)
          )
        );
      });
      setImages(prev => [...prev, ...hits]);
      setButton(true);
      setLoading(false);

      return toastify();
    } catch (error) {
      notifyError();
      setButton(false);
      setLoading(false);
    }
  }

  const notifySuccess = total =>
    toast.success(`Hooray! We found ${total} images.`);

  const notifyError = () =>
    toast.error(
      'Sorry, there are no images matching your search query. Please try again.'
    );

  const notifyInfo = () =>
    toast.info("We're sorry, but you've reached the end of search results.");

  function toastify() {
    const total = API.total;
    const page = API.page;
    if (total > 0 && page === 1) {
      return notifySuccess(total);
    }
    if (total === 0) {
      return notifyError();
    }

    if (Math.ceil(total / 12) === page) {
      setButton(false);
      return notifyInfo();
    }
  }

  function showBigImg(event) {
    if (event.target.nodeName !== 'IMG') {
      return;
    }
    setModal(event.target.dataset.src);
    setAlt(event.target.getAttribute('alt'));
  }

  function moreShow() {
    setPage(prev => prev + 1);
  }

  function resetModal() {
    setModal('');
    setAlt('');
  }

  function makeRequest(string) {
    setRequest(string);
  }

  return (
    <>
      <Searchbar onClick={makeRequest} />
      {images.length !== 0 && (
        <ImageGallery showBigImg={showBigImg}>
          <ImageGalleryItem images={images} />
        </ImageGallery>
      )}
      {button && <Button moreShow={moreShow} />}
      {loading && <Loader />}
      {modal !== '' && <Modal src={modal} alt={alt} hide={resetModal} />}
      <ToastContainer
        theme="colored"
        position="top-right"
        autoClose={5000}
        closeOnClick
        pauseOnFocusLoss
        draggable
      />
    </>
  );
}
