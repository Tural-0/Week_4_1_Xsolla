import { useLocalStorage } from "../custom_hooks/useLocalStorage";

export async function getItems() {
    const response = await fetch("/api/items");

    if (!response.ok) {
        throw new Error("Failed to fetch items (/api/items)");
    }

    return response.json();
}

export async function getItemById(itemId) {
    const response = await fetch("/api/items/" + itemId);

    if (!response.ok) {
        throw new Error("Failed to fetch items (/api/items/id)");
    }

    return response.json();
}

export async function getItemQuantity(itemId){

    const myHeaders = new Headers();

    const id = localStorage.getItem("userId");

    myHeaders.append('X-User-ID', id);

    const response = await fetch("/api/itemQuantity/" + itemId, {
        headers: myHeaders,  
    });

    return response.json();

}