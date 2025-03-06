import Inputmask from 'inputmask';
import React, { useEffect, useRef } from 'react';

const MaskedInput = ({ mask, ...props }) => {
  const inputRef = useRef(null);

  useEffect(() => {
    if (inputRef.current) {
      const im = new Inputmask(mask);
      im.mask(inputRef.current);
    }
  }, [mask]);

  return <input ref={inputRef} {...props} />;
};

export default MaskedInput;
