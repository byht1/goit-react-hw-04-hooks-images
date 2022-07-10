import PropTypes from 'prop-types';
import { ButtonMore } from './Button.styled';

function Button({ moreShow }) {
  return (
    <ButtonMore type="button" onClick={moreShow}>
      Load more
    </ButtonMore>
  );
}

export default Button;

Button.propTypes = {
  moreShow: PropTypes.func.isRequired,
};
