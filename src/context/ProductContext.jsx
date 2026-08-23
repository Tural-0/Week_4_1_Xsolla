import { createContext, useReducer } from "react";
import { getItemQuantity, getItems } from "../api/itemsApi";
import { useEffect } from "react";
import { getUserCart } from "../api/cartApi";

export const PrdctCtx = createContext(null);

async function addQuantity(products){
    return await Promise.all(
        products.map(async product => ({
            ...product,
            quantity: await getItemQuantity(product.id)
        }))
    );
}

export function ProductProvider({ children }) {

    const [products, dispatch] = useReducer(itemsReducer, []);

    async function loadProducts() {
        try {
            const data = await getItems();

            const arr = JSON.parse(JSON.stringify(data))
            const prdcs = await addQuantity(arr);

            dispatch({
                type: "SET_PRODUCTS",
                products: prdcs
            });

        } catch (error) {
            console.error(error);
        }
    }

    async function loadCart(){
        try {
            const data = await getUserCart();

            dispatch({
                type: "SET_CART",
                cart: data
            });

        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        loadProducts();
    }, []);
  
    function itemsReducer(products, action) {
        switch (action.type) {
          case 'ADD':
            const id = (products[products.length - 1].id ?? 0) + 1;

            const product = {
              id,
              name: action.name,
              price: parseInt(action.price),
              quantity: 0,
              imageUrl: action.img
            };

            return [...products, product];
          case 'INCREASE':
            return products.map(product =>
              product.id === action.id
                ? { ...product, quantity: product.quantity + 1 }
                : product
            )
          case 'DECREASE':
            return products.map(product =>
              product.id === action.id
                ? { ...product, quantity: product.quantity - 1 }
                : product
            )
            case "SET_PRODUCTS":
                return action.products;
        }
    }


    return (
        <PrdctCtx.Provider value={{ products, dispatch }}>
            {children}
        </PrdctCtx.Provider>
    );
}