import { useCart } from "../hooks/useCart";
import { Product } from "./Product";

export const ProductList = () => {
  const { productos } = useCart();

  return (
    <div className="container">
      <div className="product-list">
        {productos.length > 0 ? (
          productos.map((item) => {
            return (
              <div key={item.id}>
                <Product product={item} />
              </div>
            );
          })
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};
