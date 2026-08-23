export async function placeUserOrder(items, total) {
    const myHeaders = new Headers();

    const id = localStorage.getItem("userId");
    const idemKey = (total/100)*items.length+parseInt(id, 10);

    myHeaders.append('X-User-ID', id);
    myHeaders.append('Idempotency-Key', idemKey);

    const orderBody = {
        "line_items":items,
        "total":total,
    }

    const response = await fetch("/api/orders" ,{
        method: "POST",
        headers: myHeaders,
        body: JSON.stringify(orderBody)
    });

    if (!response.ok){
        throw new Error("Failed to post order (/api/orders)");
    }

    return response.json();
}