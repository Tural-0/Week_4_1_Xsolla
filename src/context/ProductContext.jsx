import { act, createContext, useReducer } from "react";
import { getItemQuantity, getItems } from "../api/itemsApi";
import { useEffect } from "react";
import { changeItemQuantity } from "../api/cartApi";

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

    async function updateItemQuantity(itemId, quantity){
        try{
            await changeItemQuantity(itemId, quantity);
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
                const itemInc = products.find(p => p.id === action.id);
                updateItemQuantity(itemInc.id, itemInc.quantity + 1);
                //loadProducts();
                return products;
            case 'DECREASE':
                const itemDec = products.find(p => p.id === action.id);
                updateItemQuantity(itemDec.id, itemDec.quantity - 1);
                //loadProducts();
                return products;
            case "SET_PRODUCTS":
                return action.products;
            case "LOAD":
                loadProducts();
                return products;
        }
    }


    return (
        <PrdctCtx.Provider value={{ products, dispatch }}>
            {children}
        </PrdctCtx.Provider>
    );
}