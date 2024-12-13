/* eslint-disable react/prop-types */
import Button from "../Element/Button"

const CardDish = (props) => {
  const { children } = props
  return (
    <div className="card bg-base-50 w-64 h-80 shadow-xl mx-3 my-3 flex flex-col justify-between hover:scale-105 transition duration-300 transform group">
      {children}
    </div>
  );
};

const Header = (props) => {
  const { image } = props;
  return (
    <figure className="h-48 w-full overflow-hidden">
      <img
        src={image}
        alt="Dish"
        className="w-full h-full object-cover"
      />
    </figure>
  );
};

const Body = (props) => {
  const { name, description, price } = props;
  return (
    <div className="card-body flex p-4">
      <h2 className="card-title text-lg font-semibold">
        {name}
      </h2>
      <p className="text-sm flex justify-between overflow-hidden text-ellipsis transition-all duration-300 max-h-10 group group-hover:max-h-40">
        {description}
      </p>
      <p>
      {price}
      </p>
    </div>
  );
};

const Footer = (props) => {
  const { addToCart, id } = props;
  return (
    <div className="card-actions justify-end m-4">
      <Button size="sm"
        onClick={() => addToCart(id)}
      >
        Add To Cart
      </Button>
    </div>
  );
};


CardDish.Header = Header;
CardDish.Body = Body;
CardDish.Footer = Footer;

export default CardDish