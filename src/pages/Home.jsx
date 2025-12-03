import { useEffect } from 'react';
import usePokemonStore from '../store/store';
import CardList from '../components/CardList';

const Home = () => {
  const { pokemonList, fetchPokemonList, loading } = usePokemonStore();

  useEffect(() => {
    if (pokemonList.length === 0) {
      fetchPokemonList(1);
    }
  }, [pokemonList.length, fetchPokemonList]);

  return (
    <div>

      <section>
        <h2 className="text-center mb-4">Featured Pokemon</h2>
        {loading ? (
          <div className="text-center">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : (
          <CardList pokemons={pokemonList.slice(0, 6)} />
        )}
      </section>
    </div>
  );
};

export default Home;
