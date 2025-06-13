import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";

const ProductCard = ({ product, latest }) => {
  const navigate = useNavigate();
  return (
    <div>
      {product && (
        <div className="w-[300px] mx-auto shadow-md rounded-lg overflow-hidden border border-gray-200 ">
          <Link to={`/product/${product._id}`}>
            <div className="relative h-[300px] bg-gray-100 flex justify-center items-center">
              <img
                src={product.images[0].url}
                alt="Product"
                className="max-w-full max-h-full object-contain hover:scale-125"
              />
              {latest === "yes" && (
                <Badge
                  className={"absolute top-2 left-2 bg-green-500 text-white"}
                >
                  New
                </Badge>
              )}
            </div>
          </Link>

          <div className="p-4">
            <h3 className="text-lg font-semibold truncate">
              {product.title.slice(0, 30)}
            </h3>
            <p className="text-sm mt-1 truncate">
              {product.about.slice(0, 30)}
            </p>
            <p className="text-sm mt-1 truncate">₹ {product.price}</p>

            <div className="flex items-center justify-center mt-4">
              <Button onClick={() => navigate(`/product/${product._id}`)}>
                View Product
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductCard;
