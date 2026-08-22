import ProductList from "../components/ProductList";
import Navbar from "../components/Navbar"
import { useLocalStorage } from "../custom_hooks/useLocalStorage";

export default function ProductsPage() {

  const [id, setId] = useLocalStorage("userId",1)

  return <>
    <Navbar/>
    <ProductList/>
  </>
}