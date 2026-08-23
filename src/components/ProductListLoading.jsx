import ProductLoading from "./ProductLoading";
import '../styles/productlist.css';

export default function ProductListLoading() {
    return (
        <>
        
            {Array.from({ length: 8 }).map((_, index) => (
                <ProductLoading key={index}/>
            ))}
        
        </>
    );
}
