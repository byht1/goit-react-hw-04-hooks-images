import { MutatingDots } from 'react-loader-spinner';
import { Div } from './Loader.styled';

function Loader() {
  return (
    <Div>
      <MutatingDots height="100" width="100" color="red" ariaLabel="loading" />
    </Div>
  );
}

export default Loader;
