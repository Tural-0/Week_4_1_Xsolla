export async function getUserCart() {
    const myHeaders = new Headers();

    const id = localStorage.getItem("userId");

    myHeaders.append('X-User-ID', id);

    const response = await fetch("/api/user/cart" ,{
        headers: myHeaders,  
    });

    return response.json();
}

export async function changeItemQuantity(itemId, quantity) {
    const myHeaders = new Headers();
    const id = localStorage.getItem("userId");

    myHeaders.append('X-User-ID', id);
    
    const quantityData = {
        quantity: quantity
    };

    const response = await fetch("/api/user/cart/items/" + itemId ,{
        method: "PATCH",
        headers: myHeaders,
        body: JSON.stringify(quantityData)
    });

    if (response.ok){
        return response;
    }

    return response.json();
}

export async function deleteItemFromCart(itemId){
    const myHeaders = new Headers();
    const id = localStorage.getItem("userId");

    myHeaders.append('X-User-ID', id);

    const response = await fetch("/api/user/cart/items/" + itemId ,{
        method: "DELETE",
        headers: myHeaders,
    });

    if (!response.ok){
        throw new Error("Failed to delete items from the cart (/api/user/cart/items/id)");
    }

    return response;
}

export async function deleteUserCart(){
    const myHeaders = new Headers();
    const id = localStorage.getItem("userId");

    myHeaders.append('X-User-ID', id);

    const response = await fetch("/api/user/cart",{
        method: "DELETE",
        headers: myHeaders,
    });

    if (!response.ok){
        throw new Error("Failed to delete cart (/api/user/cart)");
    }

    return response;
}