import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import PageDefault from '../../components/PageDefault';
import ErrorImg from '../../assets/img/ErrorImg.png';

const PageNot = styled.div`
   width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 10px 0;
`;

function PageNotFound() {
  return (
    <PageDefault>
      <PageNot>
        <h1>Página não encontrada</h1>
        <img className="ErrorImg" src={ErrorImg} alt="Pagina não encontrada" />
        <Link to="/"> Ir para home </Link>
      </PageNot>
    </PageDefault>
  );
}

export default PageNotFound;
