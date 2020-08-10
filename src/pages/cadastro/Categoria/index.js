import React, { useState, useEffect, useMemo } from 'react';
import { Link, useHistory } from 'react-router-dom';
import PageDefault from '../../../components/PageDefault';
import FormField from '../../../components/FormField';
import { SuccessButton, DangerButton, Button } from '../../../components/Button';
import useForm from '../../../hooks/useForm';
import categoriasRepository from '../../../repositories/categorias';
import { TableContainer } from '../../../components/Table';
import Loader from '../../../components/Loader';

function CadastroCategoria() {
  const history = useHistory();
  const valoresIniciais = {
    titulo: '',
    cor: '',
    descricao: '',
  };

  const { handleChange, values, clearForm } = useForm(valoresIniciais);
  const [categorias, setCategorias] = useState([]);

  useEffect(() => {
    categoriasRepository
      .getAll()
      .then((categoriasFromServer) => {
        setCategorias(categoriasFromServer);
      });
  }, []);

  const columns = useMemo(
    () => [
      {
        Header: 'Título',
        accessor: 'titulo',
      },
      {
        Header: 'Descrição',
        accessor: 'descricao',
      },
    ], [],
  );

  return (
    <PageDefault>
      <h1>
        Cadastro de Categoria :
        {' '}
        {values.titulo}
        {' '}
      </h1>

      <form onSubmit={(event) => {
        event.preventDefault();
        categoriasRepository.create({
          titulo: values.titulo,
          descricao: values.descricao,
          cor: values.cor,
        })
          .then(() => {
            history.push('/');
          });
      }}
      >

        <FormField
          label="Titulo da Categoria"
          type="text"
          name="titulo"
          value={values.titulo}
          onChange={handleChange}
        />

        <FormField
          label="Descrição da categoria"
          type="text"
          name="descricao"
          value={values.descricao}
          onChange={handleChange}
        />

        <FormField
          label="Cor"
          type="color"
          name="cor"
          value={values.cor}
          onChange={handleChange}
        />

        <SuccessButton type="submit">
          Cadastrar
        </SuccessButton>

        <DangerButton onClick={clearForm}>
          Limpar
        </DangerButton>
      </form>

      {categorias.length === 0
        ? <Loader />
        : <TableContainer columns={columns} data={categorias} />}

      <Button as={Link} to="/">
        Ir para a HomePage
      </Button>

      <br />
      <br />
    </PageDefault>
  );
}

export default CadastroCategoria;
