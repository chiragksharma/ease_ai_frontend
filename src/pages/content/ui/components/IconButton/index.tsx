import { JSX, MouseEventHandler } from 'react';

import './index.scss';

interface IconButtonProps {
  buttonhandler?: MouseEventHandler<HTMLButtonElement>;
  id: string;
  path: string;
}

function IconButton({ buttonhandler, id, path }: IconButtonProps): JSX.Element {
  return (
    <button type="button" id={id} onClick={buttonhandler}>
      <img id={id} src={path} alt="Icon" draggable="false" />
    </button>
  );
}
IconButton.defaultProps = {
  buttonhandler: () => { },
};

export default IconButton;
