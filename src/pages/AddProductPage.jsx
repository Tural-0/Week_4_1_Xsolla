import '../styles/checkout.css'
import { useState, useReducer, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from '../components/Navbar';
import { CartCtx } from "../context/CartContext";

export default function AddProductPage() {
  const [name, setName] = useState("")
  const [price, setPrice] = useState(0)
  const [img, setImg] = useState("")
  const navigate = useNavigate()

  const {products, dispatch} = useContext(CartCtx)

  const handleSubmit = (event) => {
    event.preventDefault(); // Prevents page reload

    if (price <= 0){
        alert("Price cannot be equal or lower than 0")
        return
    }

    dispatch({type: "ADD", name: name, price: price, img: img})
    navigate("/") // back to items
  };

  return (
    <>
    <Navbar products={products} dispatch={dispatch}/>
    <div className="container">
      <div className="create">
        <h3>Product details</h3>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Name:</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              />
          </div>

          <div>
            <label>Price:</label>
            <input
              type="number"
              required
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              />
          </div>

          <div>
            <label>Image URL:</label>
            <input
              type="text"
              value={img}
              onChange={(e) => setImg(e.target.value)}
              />
          </div>

          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
    </>
  );
}