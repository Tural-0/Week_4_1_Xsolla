import "../styles/order.css";

export default function Order({ order }) {

  const totalPrice = (order.total/100).toFixed(2)

  return (
    <>
    <div className="order-card">
        <div className="order-card__titleDiv">
            <p className="order-card__title">{"Order #"+order.id}</p>
            <p className="order-card__status">{order.status}</p>
        </div>
        {
            order.line_items.length > 0 && order.line_items.map((product) => (
                <div className="order-card__item" key={order.id + "-" + product.item_id}>
                    <p className="order-card__item__nameQuantity">{product.name + " × " + product.quantity}</p>
                    <p className="order-card__item__price">{"$"+(product.price/100).toFixed(2)}</p>
                </div>
            ))
        }
        <hr className="order-card__line"/>
        <div className="order-card__totalDiv">
            <p className="order-card__totalDiv__text">Total</p>
            <p className="order-card__totalDiv__price">{"$"+totalPrice}</p>
        </div>
    </div>
    </>
  );
}
