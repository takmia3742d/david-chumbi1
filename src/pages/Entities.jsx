import { useEffect, useState } from 'react';
import usePokemonStore from '../store/store';
import CardList from '../components/CardList';

const Entities = () => {
  const { pokemonList, fetchPokemonList, loading, page, totalPages, setPage } = usePokemonStore();
  const [localPage, setLocalPage] = useState(page);

  useEffect(() => {
    fetchPokemonList(localPage);
  }, [localPage, fetchPokemonList]);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setLocalPage(newPage);
      setPage(newPage);
    }
  };

  const renderPagination = () => {
    const pages = [];
    const maxPagesToShow = 5;
    let startPage = Math.max(1, localPage - Math.floor(maxPagesToShow / 2));
    let endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

    if (endPage - startPage + 1 < maxPagesToShow) {
      startPage = Math.max(1, endPage - maxPagesToShow + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <li key={i} className={`page-item ${i === localPage ? 'active' : ''}`}>
          <button className="page-link" onClick={() => handlePageChange(i)}>
            {i}
          </button>
        </li>
      );
    }

    return pages;
  };

  return (
    <div className="container py-5">
      <h1 className="text-center mb-4">pokemon entidad</h1>

      {loading ? (
        <div className="text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">carga</span>
          </div>
        </div>
      ) : (
        <>
          <CardList pokemons={pokemonList} />

          <nav aria-label="Pokemon pagination" className="mt-4">
            <ul className="pagination justify-content-center">
              <li className={`page-item ${localPage === 1 ? 'disabled' : ''}`}>
                <button
                  className="page-link"
                  onClick={() => handlePageChange(localPage - 1)}
                  disabled={localPage === 1}
                >
                  Previa
                </button>
              </li>

              {renderPagination()}

              <li className={`page-item ${localPage === totalPages ? 'disabled' : ''}`}>
                <button
                  className="page-link"
                  onClick={() => handlePageChange(localPage + 1)}
                  disabled={localPage === totalPages}
                >
                  siguienete 
                </button>
              </li>
            </ul>
          </nav>
        </>
      )}
    </div>
  );
};

export default Entities;
