import Loading from "@/components/Loading";
import ProductCard from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CartData } from "@/context/CartContext";
import { ProductData } from "@/context/ProductContext";
import { UserData } from "@/context/UserContext";
import { categories, server } from "@/main";
import axios from "axios";
import Cookies from "js-cookie";
import { Edit, Loader, X } from "lucide-react";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";

const ProductPage = () => {
  const { fetchProduct, product, relatedProduct, loading } = ProductData();
  const { addToCart } = CartData();

  const { id } = useParams();

  const { isAuth, user } = UserData();

  useEffect(() => {
    fetchProduct(id);
  }, [id]);

  const addToCartHandler = () => {
    addToCart(id);
  };

  const [show, setShow] = useState(false);

  const [title, setTitle] = useState("");
  const [about, setAbout] = useState("");
  const [stock, setStock] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");

  const [btnLoading, setBtnLoading] = useState(false);

  const updateHandler = () => {
    setShow(!show);
    setCategory(product.category);
    setTitle(product.title);
    setAbout(product.about);
    setStock(product.stock);
    setPrice(product.price);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setBtnLoading(true);

    try {
      const { data } = await axios.put(
        `${server}/api/product/${id}`,
        { title, about, price, stock, category },
        {
          headers: {
            token: Cookies.get("token"),
          },
        }
      );

      toast.success(data.message);
      fetchProduct(id);
      setShow(false);
      setBtnLoading(false);
    } catch (error) {
      toast.error(error.response.data.message);
      setBtnLoading(false);
    }
  };

  const [updatedImages, setUpdatedImages] = useState(null);

  const handleSubmitImage = async (e) => {
    e.preventDefault();
    setBtnLoading(true);

    if (!updatedImages || updatedImages.length === 0) {
      toast.error("Please select new images.");
      setBtnLoading(false);
      return;
    }

    const formData = new FormData();

    for (let i = 0; i < updatedImages.length; i++) {
      formData.append("files", updatedImages[i]);
    }

    try {
      const { data } = await axios.post(
        `${server}/api/product/${id}`,
        formData,
        {
          headers: {
            token: Cookies.get("token"),
          },
        }
      );

      toast.success(data.message);
      fetchProduct(id);
      setBtnLoading(false);
    } catch (error) {
      toast.error(error.response.data.message);
      setBtnLoading(false);
    }
  };
  return (
    <div>
      {loading ? (
        <Loading />
      ) : (
        <div className="container mx-auto px-4 py-8">
          {user && user.role === "admin" && (
            <div className="w-[300px] md:w-[450px] m-auto mb-5">
              <Button onClick={updateHandler}>{show ? <X /> : <Edit />}</Button>
              {show && (
                <div className="space-y-4">
                  <div>
                    <Label>Title</Label>
                    <Input
                      placeholder="Product Title"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      requierd
                    />
                  </div>

                  <div>
                    <Label>About</Label>
                    <Input
                      placeholder="About Product"
                      value={about}
                      onChange={(e) => setAbout(e.target.value)}
                      requierd
                    />
                  </div>

                  <div>
                    <Label>Category</Label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      requierd
                      className="w-full p-2 border rounded-md dark:bg-gray-900 dark:text-white"
                    >
                      {categories.map((e) => (
                        <option value={e} key={e}>
                          {e}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <Label>Price</Label>
                    <Input
                      placeholder="Product Price"
                      type="number"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      requierd
                    />
                  </div>

                  <div>
                    <Label>Stock</Label>
                    <Input
                      placeholder="Product Stock"
                      type="number"
                      value={stock}
                      onChange={(e) => setStock(e.target.value)}
                      requierd
                    />
                  </div>
                  <Button
                    type="submit"
                    className="w-full"
                    disabled={btnLoading}
                    onClick={submitHandler}
                  >
                    {btnLoading ? <Loader /> : "Update Product"}
                  </Button>
                </div>
              )}
            </div>
          )}
          {product && (
            <div className="flex flex-col lg:flex-row items-start gap-14">
              <div className="w-[290px] md:w-[650px]">
                <Carousel>
                  <CarouselContent>
                    {product.images &&
                      product.images.map((image, index) => (
                        <CarouselItem key={index}>
                          <img
                            src={image.url}
                            alt="image"
                            className="w-full rounded-md"
                          />
                        </CarouselItem>
                      ))}
                  </CarouselContent>
                  <CarouselPrevious />
                  <CarouselNext />
                </Carousel>

                {user && user.role === "admin" && (
                  <form
                    onSubmit={handleSubmitImage}
                    className="flex flex-col gap-4"
                  >
                    <div>
                      <Label>Upload New Images:</Label>
                      <input
                        type="file"
                        name="files"
                        id="files"
                        multiple
                        accept="image/*"
                        onChange={(e) => setUpdatedImages(e.target.files)}
                        className="block w-full mt-1 text-sm"
                      />
                    </div>
                    <Button type="submit" disabled={btnLoading}>
                      Update Image
                    </Button>
                  </form>
                )}
              </div>

              <div className="w-full lg:w-1/2 space-y-4">
                <h1 className="text-2xl font-bold">{product.title}</h1>
                <p className="text-lg">{product.about}</p>
                <p className="text-xl font-semibold">₹ {product.price}</p>
                {isAuth ? (
                  <>
                    {product.stock <= 0 ? (
                      <p className="text-red-600 text-2xl">Out of Stock</p>
                    ) : (
                      <Button onClick={addToCartHandler}>Add To Cart</Button>
                    )}
                  </>
                ) : (
                  <p className="text-blue-500">
                    Please Login to add someting in cart
                  </p>
                )}
              </div>
            </div>
          )}
        </div>
      )}

      {relatedProduct?.length > 0 && (
        <>
          {loading ? (
            <Loading />
          ) : (
            <div className="mt-12">
              <h2 className="text-xl font-bold">Related Products</h2>
              <div className=" mt-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                {relatedProduct.map((e) => (
                  <ProductCard key={e._id} product={e} />
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ProductPage;
