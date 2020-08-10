import React, { useEffect, useState, useMemo } from 'react';
import { Link, useHistory } from 'react-router-dom';
import PageDefault from '../../../components/PageDefault';
import FormField from '../../../components/FormField';
import useForm from '../../../hooks/useForm';
import { SuccessButton, DangerButton, Button } from '../../../components/Button';
import videosRepository from '../../../repositories/videos';
import categoriasRepository from '../../../repositories/categorias';
import { TableContainer } from '../../../components/Table';
import Loader from '../../../components/Loader';

function CadastroVideo() {
  const history = useHistory();
  const [categorias, setCategorias] = useState([]);
  const [videos, setVideos] = useState([]);
  const categoryTitles = categorias.map(({ titulo }) => titulo);

  const { handleChange, values, clearForm } = useForm({
    titulo: '',
    url: '',
    categoria: '',
  });

  useEffect(() => {
    categoriasRepository
      .getAll()
      .then((categoriasFromServer) => {
        setCategorias(categoriasFromServer);
      });

    videosRepository
      .getAll()
      .then((videosFromServer) => {
        setVideos(videosFromServer);
      });
  }, []);

  const columns = useMemo(
    () => [
      {
        Header: 'Titulo',
        accessor: 'titulo',
      },
      {
        Header: 'Remover',
        id: 'delete',
        Cell: (row) => (
          <DangerButton
            style={{ padding: '10px 24px', display: 'block', margin: '0 auto' }}
            onClick={() => {
              const { id } = row.row.original;
              if (id === 1) {
                throw new Error('Não é permitido apagar o video principal');
              } else {
                const dataCopy = [...videos];
                dataCopy.splice(row.index, 1);
                setVideos(dataCopy);
                videosRepository.remove(id);
              }
            }}
          >
            Remover
          </DangerButton>
        ),
      },
    ],
    [videos],
  );

  return (
    <PageDefault>
      <h1>Cadastro de Vídeo :</h1>

      <form onSubmit={(event) => {
        event.preventDefault();

        // eslint-disable-next-line max-len
        const categoriaEscolhida = categorias.find((categoria) => categoria.titulo === values.categoria);

        videosRepository.create({
          titulo: values.titulo,
          url: values.url,
          categoriaId: categoriaEscolhida.id,
        })
          .then(() => {
            history.push('/');
          });
      }}
      >
        <FormField
          label="Titulo do Video"
          name="titulo"
          value={values.titulo}
          onChange={handleChange}
        />

        <FormField
          label="URL"
          name="url"
          value={values.url}
          onChange={handleChange}
        />

        <FormField
          label="Categoria"
          name="categoria"
          value={values.categoria}
          onChange={handleChange}
          suggestions={categoryTitles}
        />

        <SuccessButton type="submit">
          Cadastrar
        </SuccessButton>

        <DangerButton onClick={clearForm}>
          Limpar
        </DangerButton>

      </form>

      {videos.length === 0
        ? <Loader />
        : <TableContainer columns={columns} data={videos} />}

      <Button as={Link} to="/cadastro/categoria">
        Cadastrar Categoria
      </Button>

      <br />
      <br />
    </PageDefault>
  );
}

export default CadastroVideo;
