import { server } from "@/main";
import axios from "axios";
import Cookies from "js-cookie";
import { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const token = Cookies.get("token");
  const [loading, setLoading] = useState(false);
  const [totalItem, setTotalItem] = useState(0);
  const [subTotal, setSubTotal] = useState(0);

  const [cart, setCart] = useState([]);
  async function fetchCart() {
    try {
      const { data } = await axios.get(`${server}/api/cart/all`, {
        headers: {
          token: Cookies.get("token"),
        },
      });

      setCart(data.cart);
      setTotalItem(data.sumofQuantities);
      setSubTotal(data.subTotal);
    } catch (error) {
      console.log(error);
    }
  }

  async function addToCart(product) {
    try {
      const { data } = await axios.post(
        `${server}/api/cart/add`,
        { product },
        {
          headers: {
            token,
          },
        }
      );

      toast.success(data.message);
      fetchCart();
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }

  async function updateCart(action, id) {
    try {
      const { data } = await axios.post(
        `${server}/api/cart/update?action=${action}`,
        { id },
        {
          headers: {
            token,
          },
        }
      );

      fetchCart();
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }

  async function removeFromCart(id) {
    try {
      const { data } = await axios.get(`${server}/api/cart/remove/${id}`, {
        headers: {
          token,
        },
      });

      toast.success(data.message);
      fetchCart();
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }

  useEffect(() => {
    fetchCart();
  }, []);
  return (
    <CartContext.Provider
      value={{
        cart,
        totalItem,
        subTotal,
        fetchCart,
        addToCart,
        setTotalItem,
        updateCart,
        removeFromCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const CartData = () => useContext(CartContext);
