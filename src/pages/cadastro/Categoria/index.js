import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PageDefault from '../../../components/PageDefault';
import FormField from '../../../components/FormField';
import { SuccessButton } from '../../../components/Button';
import useForm from '../../../hooks/useForm';

function CadastroCategoria() {
  const valoresIniciais = {
    nome: '',
    descricao: '',
    cor: '',
  };

  const { handleChange, values, clearForm } = useForm(valoresIniciais);
  const [categorias, setCategorias] = useState(['Aerobico']);

  useEffect(() => {
    const URL = window.location.hostname.includes('localhost')
      ? 'http://localhost:8080/categorias'
      : 'https://fitnessflix.herokuapp.com/categorias';
    fetch(URL)
      .then(async (respostaDoServer) => {
        if (respostaDoServer.ok) {
          const resposta = await respostaDoServer.json();
          setCategorias(resposta);
        }
      });
  }, []);

  return (
    <PageDefault>
      <h1>
        Cadastro de Categoria :
        {' '}
        {values.nome}
        {' '}
      </h1>

      <form onSubmit={function handleSubmit(infosDoEvento) {
        infosDoEvento.preventDefault();
        setCategorias([
          ...categorias,
          values,
        ]);
        clearForm();
      }}
      >

        <FormField
          label="Titulo da Categoria"
          type="text"
          name="nome"
          value={values.nome}
          onChange={handleChange}
        />

        <FormField
          label="Descrição:"
          type="textarea"
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

        <SuccessButton> Cadastrar </SuccessButton>

        {categorias.length === 0 && (
          <div>
            ...Loading
          </div>
        )}
      </form>

      <ul>
        {categorias.map((categoria) => (
          <li key={`${categoria.titulo}`}>
            {categoria.titulo}
          </li>
        ))}
      </ul>

      <Link to="/"> Ir para home </Link>
    </PageDefault>
  );
}

export default CadastroCategoria;
