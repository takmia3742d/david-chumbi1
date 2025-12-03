import { create } from 'zustand';
import axios from 'axios';

const usePokemonStore = create((set, get) => ({
  pokemonList: [],
  selectedPokemon: null,
  loading: false,
  error: null,
  page: 1,
  totalPages: 0,

  // Función para obtener la lista de Pokémon
  fetchPokemonList: async (page = 1) => {
    set({ loading: true, error: null });
    try {
      const limit = 20; // 20 Pokémon por página
      const offset = (page - 1) * limit;
      const response = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`);
      const { results, count } = response.data;
      const totalPages = Math.ceil(count / limit);

      // Obtener detalles de cada Pokémon
      const pokemonDetails = await Promise.all(
        results.map(async (pokemon) => {
          const detailResponse = await axios.get(pokemon.url);
          return {
            id: detailResponse.data.id,
            name: detailResponse.data.name,
            image: detailResponse.data.sprites.front_default,
            types: detailResponse.data.types.map(type => type.type.name),
          };
        })
      );

      set({
        pokemonList: pokemonDetails,
        page,
        totalPages,
        loading: false,
      });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  // Función para obtener un Pokémon específico (ej. Ditto)
  fetchPokemon: async (name) => {
    set({ loading: true, error: null });
    try {
      const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
      set({
        selectedPokemon: {
          id: response.data.id,
          name: response.data.name,
          image: response.data.sprites.front_default,
          types: response.data.types.map(type => type.type.name),
        },
        loading: false,
      });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  setPage: (page) => set({ page }),
}));

export default usePokemonStore;
