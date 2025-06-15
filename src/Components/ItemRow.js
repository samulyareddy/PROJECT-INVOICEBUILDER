import React from "react";

const ItemRow = ({ item, index, updateItem, deleteItem }) => {
  return (
    <div className="flex gap-2 mb-2">
      <input
        type="text"
        value={item.description}
        onChange={(e) => updateItem(index, "description", e.target.value)}
        placeholder="Description"
        className="border p-2 rounded flex-1"
      />
      <input
        type="number"
        value={item.quantity}
        onChange={(e) =>
          updateItem(index, "quantity", parseInt(e.target.value))
        }
        placeholder="Quantity"
        className="border p-2 rounded w-20"
      />
      <input
        type="number"
        value={item.unitRate}
        onChange={(e) =>
          updateItem(index, "unitRate", parseFloat(e.target.value))
        }
        placeholder="Unit Rate"
        className="border p-2 rounded w-24"
      />
      <button
        onClick={() => deleteItem(index)}
        className="bg-red-500 text-white px-2 py-1 rounded"
      >
        Delete
      </button>
    </div>
  );
};

export default ItemRow;
