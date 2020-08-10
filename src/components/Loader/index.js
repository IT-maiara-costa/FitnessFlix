import React from 'react';
import { css } from '@emotion/core';
import PuffLoader from 'react-spinners/PuffLoader';

const override = css`
  display: block;
  margin: 0 auto;
`;

function Loader() {
  return (
    <PuffLoader
      size={150}
      color="var(--primary)"
      css={override}
    />
  );
}

export default Loader;
