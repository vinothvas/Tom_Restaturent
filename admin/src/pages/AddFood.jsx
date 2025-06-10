import React, { useEffect, useState } from "react";
import axios from "axios";
import { backendUrl } from "../App";
import { toast } from "react-toastify";

const AddFood = ({ token, initialData = null, onClose, onSuccess }) => {
  const isEdit = !!initialData;

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Main Course");
  const [price, setPrice] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [popular, setPopular] = useState(false);
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    if (initialData) {
      setName(initialData.name);
      setDescription(initialData.description);
      setCategory(initialData.category);
      setPrice(initialData.price);
      setPopular(initialData.popular);
      setImageUrl(initialData.image);
    }
  }, [initialData]);

  const handleImageHandler = (e) => {
    setImageUrl(e.target.files[0]);
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const formData = new FormData();
      if (isEdit) formData.append("id", initialData._id);
      formData.append("name", name);
      formData.append("description", description);
      formData.append("category", category);
      formData.append("price", price);
      // formData.append("image", imageUrl);
      formData.append("popular", popular);
      if (imageUrl && typeof imageUrl !== 'string') {
        formData.append("image", imageUrl);
      } // only send image if changed

      const apiPath = isEdit ? "update" : "add";

      const response = await axios.post(
        `${backendUrl}/api/product/${apiPath}`,
        formData,
        {
          headers: { token },
        }
      );
      if (response.data.success) {
        toast.success(isEdit ? 'Food updated successfully!' : 'Food added successfully!');
        if (isEdit) {
          onSuccess?.();      // ✅ refetch list
          onClose?.();        // ✅ close edit form
        } else {
          setName('');
          setDescription('');
          setCategory('');
          setPrice('');
          setImageUrl('');
          setPopular(false);
          onSuccess?.();      // ✅ refetch list
        }
      } else {
        onClose?.(); // close edit form
        toast.error(
          response.data.message || "Failed to add food. Please try again."
        );
      }
    } catch (error) {
      console.error("Error adding food:", error);
      toast.error(
        error.response?.data?.message ||
          "An error occurred while adding food. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="h-screen flex flex-col  justify-center bg-gray-100 p-4">
      <div className="max-w-lg mx-auto w-full mb-4">
        {" "}
        <h4 className='text-2xl font-medium'>{isEdit ? 'Edit Food' : 'Add Food'}</h4>
      </div>
      {loading && <div className='text-center text-lg font-medium'>Submitting...</div>}
      <form
        onSubmit={onSubmitHandler}
        className="max-w-lg mx-auto w-full bg-white p-6 rounded-lg shadow-md space-y-4"
      >
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Food Name
          </label>
          <input
            type="text"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
            placeholder="Enter food name"
            required
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <textarea
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all resize-none"
            placeholder="Enter food description"
            required
            onChange={(e) => setDescription(e.target.value)}
            value={description}
            rows="4"
            cols="5"
          ></textarea>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Category
          </label>
          {/* <input
            type="text"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
            placeholder="Enter category name"
            required
            onChange={(e) => setCategory(e.target.value)}
            value={category}
          /> */}
          <select onChange={(e) => setCategory(e.target.value)} value={category} className="w-full  h-[42px] border border-[#d1d5dc] rounded-lg">
            <option value={"Main Course"}>Main Course</option>
            <option value={"Appetizer"}>Appetizer</option>
            <option value={"Combo"}>Combo</option>
            <option value={"Drinks"}>Drinks</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Price
          </label>
          <input
            type="number"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
            placeholder="Enter food price"
            required
            onChange={(e) => setPrice(e.target.value)}
            value={price}
            min={1}
          />
        </div>
        <div>
          <label className="text-sm font-medium text-gray-700 inline-block">
            <span className="mb-2 block">Upload Image</span>
            {/* <img src={imageUrl ? URL.createObjectURL(imageUrl) : "Upload"} className='w-14 h-14 aspect-square object-cover' /> */}
            <img
              src={
                imageUrl
                  ? typeof imageUrl === "string"
                    ? imageUrl // already a URL (edit mode)
                    : URL.createObjectURL(imageUrl) // new upload
                  : "/images/upload-img.jpg" // default placeholder
              }
              className="w-14 h-14 aspect-square object-cover cursor-pointer"
            />
            <input
              type="file"
              className="hidden"
              onChange={handleImageHandler}
              id="image"
            />
          </label>
        </div>
        <div>
          <input
            type="checkbox"
            className="mr-2 leading-tight"
            onChange={() => setPopular(!popular)}
            checked={popular}
            id="popular"
          />
          <label className="text-sm font-medium text-gray-700">
            Add to Popular
          </label>
        </div>
        <button
          type="submit"
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2.5 rounded-lg transition-colors mt-4"
        >
          {isEdit ? 'Update Food' : 'Add Food'}
        </button>
      </form>
    </div>
  );
};

export default AddFood;
