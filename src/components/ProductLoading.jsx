import "../styles/productLoading.css";

export default function ProductLoading() {
  return (
    <>
    <div className="product-card-load">
      <div className="product-card-load__gradient">
      </div>
      <div className="product-card-load__information">
        <p className="product-card-load__name"></p>
        <div className="product-card-load__descriptionBase">
            <p className="product-card-load__description1"></p>
            <p className="product-card-load__description2"></p>
        </div>
        <div className="product-card-load__price-add">
          <p className="product-card-load__price-add__text"></p>
            <button className="product-card-load__price-add__addToCartButton">
              <p className="product-card-load__price-add__addToCartButton__text"></p>
            </button>
        </div>
      </div>
    </div>
    </>
  );
}
