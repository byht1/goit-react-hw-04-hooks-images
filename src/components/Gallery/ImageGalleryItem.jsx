import PropTypes from 'prop-types';
import { Elements, Img } from './gallery.styked';

function ImageGalleryItem({ images }) {
  return images.map(({ id, webformatURL, tags, largeImageURL }) => (
    <Elements key={id}>
      <Img src={webformatURL} alt={tags} data-src={largeImageURL} />
    </Elements>
  ));
}

export default ImageGalleryItem;

ImageGalleryItem.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.exact({
      id: PropTypes.number.isRequired,
      tags: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
      webformatURL: PropTypes.string.isRequired,
    })
  ),
};
