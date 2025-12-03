import PropTypes from 'prop-types';

const Card = ({ pokemon }) => {
  return (
    <div className="card shadow-sm h-100">
      <img
        src={pokemon.image}
        alt={pokemon.name}
        className="card-img-top"
        style={{ height: '200px', objectFit: 'contain' }}
      />
      <div className="card-body">
        <h5 className="card-title">{pokemon.name}</h5>
        <p className="card-text">
          Types: {pokemon.types.join(', ')}
        </p>
      </div>
    </div>
  );
};

Card.propTypes = {
  pokemon: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    types: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
};

export default Card;
