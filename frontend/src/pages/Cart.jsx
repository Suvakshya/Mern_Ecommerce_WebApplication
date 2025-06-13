import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { CartData } from "@/context/CartContext";
import { ShoppingCart, Trash } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const { cart, totalItem, subTotal, updateCart, removeFromCart } = CartData();

  const navigate = useNavigate();

  const updateCartHander = async (action, id) => {
    await updateCart(action, id);
  };
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Your Cart</h1>
      {cart.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-xl">Your cart is empty 🛒</p>
          <Button className="mt-6" onClick={() => navigate("/products")}>
            Shop Now
          </Button>
        </div>
      ) : (
        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-6">
            {cart.map((e) => (
              <div
                key={e._id}
                className="flex flex-col sm:flex-row items-center sm:items-stretch space-y-4 sm:space-y-0 sm:space-x-4 shadow-md rounded-lg p-4 border border-gray-400"
              >
                <img
                  src={e.product.images[0].url}
                  alt={e.product.title}
                  className="w-full sm:w-20 sm:h-20 object-cover rounded-md cursor-pointer"
                  onClick={() => navigate(`/product/${e.product._id}`)}
                />
                <div className="flex-1 text-center sm:text-left">
                  <h2 className="text-lg font-medium">{e.product.title}</h2>
                  <p>Price: ₹ {e.product.price}</p>
                </div>

                <div className="flex items-center justify-center sm:justify-start gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => updateCartHander("dec", e._id)}
                  >
                    -
                  </Button>
                  <span className="text-center">{e.quauntity}</span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => updateCartHander("inc", e._id)}
                  >
                    +
                  </Button>
                </div>
                <Button
                  variant="ghost"
                  className="text-red-600"
                  onClick={() => removeFromCart(e._id)}
                >
                  <Trash className="w-5 h-5" />
                </Button>
              </div>
            ))}
          </div>

          <div className="p-6 shadow-lg rounded-lg border border-gray-400">
            <h2 className="text-xl font-semibold mb-4 text-center lg:text-left">
              Order Summary
            </h2>
            <Separator className="my-2" />
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Total Items - {totalItem}</span>
                <span>Total Price - ₹{subTotal}</span>
              </div>
            </div>
            <Separator className="my-4" />
            <div className="flex justify-between font-medium text-lg">
              <span>Total:</span>
              <span>₹{subTotal}</span>
            </div>
            <Button
              className="w-full mt-6"
              onClick={() => navigate("/checkout")}
              disabled={cart.length === 0}
            >
              Checkout
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
