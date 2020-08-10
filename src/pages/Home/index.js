import React, { useEffect, useState } from 'react';
import PageDefault from '../../components/PageDefault';
import BannerMain from '../../components/BannerMain';
import Carousel from '../../components/Carousel';
import categoriasRepository from '../../repositories/categorias';
import Loader from '../../components/Loader';

function Home() {
  const [dadosIniciais, setDadosIniciais] = useState([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    categoriasRepository.getAllWithVideos()
      .then((categoriasComVideos) => {
        setDadosIniciais(categoriasComVideos);
        setLoading(false);
      })
      .catch((err) => {
        // eslint-disable-next-line no-console
        console.log(err.message);
      });
  }, []);
  return (
    <PageDefault paddingAll={0}>
      {isLoading
        ? <Loader />
        : dadosIniciais.map((categoria, indice) => {
          if (indice === 0) {
            return (
              <div key={categoria.id}>
                <BannerMain
                  videoTitle={dadosIniciais[0].videos[0].titulo}
                  url={dadosIniciais[0].videos[0].url}
                  videoDescription="Cardio melhora a circulação e o aproveitamento do oxigênio pelos músculos ativados durante a prática desses exercícios. HIIT, Bike Indoor, Corrida e Natação oferecem Exercícios Cardio."
                />
                <Carousel
                  ignoreFirstVideo
                  category={dadosIniciais[0]}
                />
              </div>
            );
          }

          return (
            <Carousel
              key={categoria.id}
              category={categoria}
            />
          );
        })}
    </PageDefault>
  );
}

export default Home;
