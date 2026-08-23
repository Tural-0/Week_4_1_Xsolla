export async function getUserCart() {
    const myHeaders = new Headers();

    const id = localStorage.getItem("userId");

    myHeaders.append('X-User-ID', id);

    const response = await fetch("/api/user/cart" ,{
        headers: myHeaders,  
    });

    return response.json();
}
