import { Future } from "../components/Future";
import { Hero } from "../components/Hero";
import { Products } from "../components/Products";
import { Register } from "./Register";


export function Home () {
    return (
        <div>
           <Hero />
           <Future />
           <Register />
           <Products />
        </div>
    )
};