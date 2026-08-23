import ProductLoading from "./ProductLoading";
import '../styles/productlist.css';

export default function ProductListLoading() {
    return (
        <>
        <div className="product-list">
            {Array.from({ length: 8 }).map((_, index) => (
                <ProductLoading key={index}/>
            ))}
        </div>
        </>
    );
}
