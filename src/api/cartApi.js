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