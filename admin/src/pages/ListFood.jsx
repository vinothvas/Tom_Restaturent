import React, { useEffect, useState } from "react";
import axios from "axios";
import { backendUrl } from "../App";
import { toast } from "react-toastify";
import { TbTrash, TbEdit } from "react-icons/tb";
import AddFood from "./AddFood";

const ListFood = ({ token }) => {
  const [list, setList] = useState([]);

  const [editTarget, setEditTarget] = useState(null); // 👈 Add edit state

  const [searchTerm, setSearchTerm] = useState('');

  const fetchFoodList = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/product/list`);
      console.log(response.data);
      if (response.data.products) {
        setList(response.data.products);
      } else {
        toast.error(error.response?.data?.message);
      }
    } catch (error) {
      console.error("Error fetching food list:", error);
      toast.error(error.message);
    }
  };

  const removeFoodItem = async (id) => {
    try {
      const response = await axios.post(
        `${backendUrl}/api/product/remove`,
        { id },
        { headers: { token } }
      );
      if (response.data.success) {
        toast.success("Food item removed successfully!");
        await fetchFoodList(); // Refresh the list after removal
      } else {
        toast.error(response.data.message || "Failed to remove food item.");
      }
    } catch (error) {
      console.error("Error removing food item:", error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchFoodList();
  }, []);


  // Updated filter: match name OR category
  const filteredList = list.filter(item => {
    const search = searchTerm.toLowerCase();
    return (
      item.name.toLowerCase().includes(search) ||
      (item.category && item.category.toLowerCase().includes(search))
    );
  });

  // Group foods by category
  const groupedFoods = filteredList.reduce((acc, item) => {
    const cat = item.category || "Others";
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(item);
    return acc;
  }, {});

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <h1 className="text-2xl font-bold mb-4">Food List</h1>
      <input
        type="text"
        placeholder="Search food by name or category.."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="mb-6 w-full p-2 rounded border border-gray-300"
      />

      {editTarget && (
        <AddFood
          token={token}
          initialData={editTarget}
          onClose={() => setEditTarget(null)}
          onSuccess={fetchFoodList}
        />
      )}

      {Object.entries(groupedFoods).length === 0 && (
        <p className="text-gray-500 mt-4">No food items available.</p>
      )}

      {Object.entries(groupedFoods).map(([category, items]) => (
        <section key={category} className="mb-8">
          <h2 className="text-xl font-semibold mb-4">{category}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {items.map((item) => (
              <div
                key={item._id}
                className="bg-white p-4 rounded-lg shadow-md relative"
              >
                <img
                  src={item.image || "/images/no-img.png"}
                  alt={item.name}
                  className="w-full h-32 object-cover rounded-md mb-2"
                />
                <div className="flex items-center justify-between mb-1">
                  <h2 className="text-lg font-medium">{item.name}</h2>
                  <button
                    onClick={() => setEditTarget(item)}
                    className="text-blue-600"
                  >
                    <TbEdit />
                  </button>
                 
                </div>
                <p className="text-gray-600 text-xs food-desc mb-2">
                  {item.description}
                </p>
                <div className="flex items-center justify-between">
                <p className="text-green-600 font-medium">
                    ${item.price.toFixed(2)}
                  </p>
                  <button
                    onClick={() => removeFoodItem(item._id)}
                    className="mt-2 bg-red-600 text-white px-1 py-1 rounded hover:bg-red-700 transition-colors cursor-pointer"
                  >
                    <TbTrash />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
};

export default ListFood;
