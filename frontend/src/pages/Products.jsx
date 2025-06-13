import Loading from "@/components/Loading";
import ProductCard from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { ProductData } from "@/context/ProductContext";
import { Filter, X } from "lucide-react";
import React, { useState } from "react";

const Products = () => {
  const [show, setShow] = useState(false);
  const {
    search,
    setSearch,
    categories,
    category,
    setCategory,
    totalPages,
    price,
    setPrice,
    page,
    setPage,
    products,
    loading,
  } = ProductData();

  const clearFilter = () => {
    setPrice("");
    setCategory("");
    setSearch("");
    setPage(1);
  };

  const nextPage = () => {
    setPage(page + 1);
  };
  const prevPage = () => {
    setPage(page - 1);
  };
  return (
    <div className="flex flex-col md:flex-row h-full">
      <div
        className={`fixed inset-y-0 left-0 z-50 md:z-40 w-64 bg-white dark:bg-gray-800 shadow-lg transform transition-transform duration-300 ease-in-out md:relative md:translate-x-0 ${
          show ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-4 relative">
          <button
            onClick={() => setShow(false)}
            className="absolute top-4 right-4 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white rounded-full p-2 md:hidden"
          >
            <X />
          </button>
          <h2 className="text-lg font-bold mb-2">Filters</h2>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">
              Search Title
            </label>
            <Input
              type="text"
              placeholder="Search Title"
              className="w-full p-2 border rounded-full"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Category</label>
            <select
              className="w-full p-2 border rounded-md dark:bg-gray-900 dark:text-white"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">All</option>
              {categories.map((e) => {
                return (
                  <option value={e} key={e}>
                    {e}
                  </option>
                );
              })}
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Price</label>
            <select
              className="w-full p-2 border rounded-md dark:bg-gray-900 dark:text-white"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            >
              <option value="">Select</option>
              <option value="lowToHigh">Low to High</option>
              <option value="highToLow">High to Low</option>
            </select>
          </div>

          <Button className="mt-2" onClick={clearFilter}>
            Clear Filter
          </Button>
        </div>
      </div>

      <div className="flex-1 p-4">
        <button
          onClick={() => setShow(true)}
          className="md:hidden bg-blue-500 text-white px-4 py-2 rounded-md mb-4"
        >
          <Filter />
        </button>

        {loading ? (
          <Loading />
        ) : (
          <div className="grid grid-cols-1  md:grid-cols-2 lg:grid-cols-4 gap-6">
            {products && products.length > 0 ? (
              products.map((e) => {
                return <ProductCard key={e._id} product={e} latest={"no"} />;
              })
            ) : (
              <p>No Products Yet</p>
            )}
          </div>
        )}

        <div className="mt-2 mb-3">
          <Pagination>
            <PaginationContent>
              {page !== 1 && (
                <PaginationItem className="cursor-pointer" onClick={prevPage}>
                  <PaginationPrevious />
                </PaginationItem>
              )}

              {page !== totalPages && (
                <PaginationItem className="cursor-pointer" onClick={nextPage}>
                  <PaginationNext />
                </PaginationItem>
              )}
            </PaginationContent>
          </Pagination>
        </div>
      </div>
    </div>
  );
};

export default Products;
