import { useContext, useEffect } from "react";
import { Product } from "../../interface/Product";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import instance from "../../api";
import { ProductContext } from "../../contexts/ProductContext";

const productSchema = z.object({
  title: z.string().min(3).max(255).trim(),
  description: z.string().min(3).max(255).trim(),
  category: z.string().min(3).max(255).trim(),
  price: z.number().min(0),
  thumbnail: z.string().min(3),
});
const ProductForm = () => {
  const { id } = useParams();
  const { onSubmitProduct } = useContext(ProductContext);

  useEffect(() => {
    if (id) {
      (async () => {
        const { data } = await instance.get(`/products/${id}`);
        reset(data);
      })();
    }
  }, [id]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Product>({
    resolver: zodResolver(productSchema),
  });

  return (
    <div className="w-full max-w-xs m-auto">
      <form
        onSubmit={handleSubmit((data) => onSubmitProduct({ ...data, id }))}
        className="shadow-md rounded px-8 pt-6 pb-8 mb-4"
      >
        <h4 className="text-center text-3xl font-semibold">
          {id ? "Update Product" : "Add product"}
        </h4>
        <div className="form-group mb-8">
          <label className="text-sm text-slate-600" htmlFor="password">
            Title:<span className="text-red-500">*</span>
          </label>
          <br />
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            {...register("title", {
              required: true,
            })}
          />
          {errors.title && (
            <small className="text-red-500">{errors.title.message}</small>
          )}
        </div>
        <div className="form-group mb-8">
          <label className="text-sm text-slate-600" htmlFor="password">
            Description:<span className="text-red-500">*</span>
          </label>
          <br />
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            {...register("description", {
              required: true,
            })}
          />
          {errors.description && (
            <small className="text-red-500">{errors.description.message}</small>
          )}
        </div>

        <div className="form-group mb-8">
          <label className="text-sm text-slate-600" htmlFor="password">
            Category:<span className="text-red-500">*</span>
          </label>
          <br />
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            {...register("category", {
              required: true,
            })}
          />
          {errors.category && (
            <small className="text-red-500">{errors.category.message}</small>
          )}
        </div>

        <div className="form-group mb-8">
          <label className="text-sm text-slate-600" htmlFor="password">
            Price:<span className="text-red-500">*</span>
          </label>
          <br />
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            {...register("price", {
              required: true,
              valueAsNumber: true,
            })}
          />
          {errors.price && (
            <small className="text-red-500">{errors.price.message}</small>
          )}
        </div>

        <div className="form-group mb-8">
          <label className="text-sm text-slate-600" htmlFor="password">
            Thumbnail:<span className="text-red-500">*</span>
          </label>
          <br />
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            {...register("thumbnail", {
              required: true,
            })}
          />
          {errors.thumbnail && (
            <small className="text-red-500">{errors.thumbnail.message}</small>
          )}
        </div>

        <div className="form-group text-center">
          <button
            className="btn-submit border border-black py-2 px-16 text-sm text-white bg-black font-bold"
            type="submit"
          >
            {id ? "Update product" : "Add product"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProductForm;
