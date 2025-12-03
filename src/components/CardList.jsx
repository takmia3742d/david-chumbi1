import PropTypes from 'prop-types';
import Card from './Card';

const CardList = ({ pokemons }) => {
  return (
    <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
      {pokemons.map((pokemon) => (
        <div key={pokemon.id} className="col">
          <Card pokemon={pokemon} />
        </div>
      ))}
    </div>
  );
};

CardList.propTypes = {
  pokemons: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
      types: PropTypes.arrayOf(PropTypes.string).isRequired,
    })
  ).isRequired,
};

export default CardList;
