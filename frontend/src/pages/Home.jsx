import Hero from "@/components/Hero";
import ProductCard from "@/components/ProductCard";
import { ProductData } from "@/context/ProductContext";
import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const { loading, products, newProd } = ProductData();
  return (
    <div>
      <Hero navigate={navigate} />
      <div className="top products mt-4 p-4">
        <h1 className="text-3xl mb-4">Latest Products</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
          {newProd && newProd.length > 0 ? (
            newProd.map((e) => {
              return <ProductCard key={e._id} product={e} latest={"yes"} />;
            })
          ) : (
            <p>No Products Yet</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
