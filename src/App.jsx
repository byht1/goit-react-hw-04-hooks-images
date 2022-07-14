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
import * as Scroll from 'react-scroll';

const API = new Server();

export default function App() {
  const [images, setImages] = useState([]);
  const [request, setRequest] = useState('');
  const [loading, setLoading] = useState(false);
  const [button, setButton] = useState(false);
  const [page, setPage] = useState(0);
  const [modal, setModal] = useState('');
  const [alt, setAlt] = useState('');

  useEffect(() => {
    if (page === 0) {
      return;
    }

    sererAIP();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, request]);

  async function sererAIP() {
    try {
      setButton(false);
      setLoading(true);
      API.name = request;
      API.page = page;
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

  function toastify() {
    const total = API.total;
    const page = API.page;
    if (total > 0 && page === 1) {
      return notifySuccess(total);
    }
    if (total === 0) {
      setButton(false);
      return notifyError();
    }

    if (Math.ceil(total / 12) === page) {
      setButton(false);
      return notifyInfo();
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

  function showBigImg(event) {
    if (event.target.nodeName !== 'IMG') {
      return;
    }
    setModal(event.target.dataset.src);
    setAlt(event.target.getAttribute('alt'));
  }

  function moreShow() {
    setPage(prev => prev + 1);
    scrolAuro();
  }

  function resetModal() {
    setModal('');
    setAlt('');
  }

  function makeRequest(string) {
    setImages([]);
    setRequest(string);
    setPage(1);
  }

  function scrolAuro() {
    const { height: cardHeight } = document
      .querySelector('#galleryList')
      .firstElementChild.getBoundingClientRect();
    Scroll.animateScroll.scrollMore(cardHeight * 2);
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
