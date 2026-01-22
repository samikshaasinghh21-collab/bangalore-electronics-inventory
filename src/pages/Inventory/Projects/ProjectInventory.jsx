import { useState } from "react";

// NextStep component to add inventory items
function NextStep({ projectData }) {
  const [items, setItems] = useState([
    { itemName: "", quantity: "", unitPrice: "" },
  ]);

  const handleItemChange = (index, e) => {
    const { name, value } = e.target;
    const newItems = [...items];
    newItems[index][name] = value;
    setItems(newItems);
  };

  const addNewItem = () => {
    setItems([...items, { itemName: "", quantity: "", unitPrice: "" }]);
  };

  const handleSaveItems = () => {
    console.log("Inventory Items:", items);
    alert("Project and inventory saved successfully!");
  };

  return (
    <div className="bg-white p-10 rounded-lg shadow mt-6">
      <h2 className="text-2xl font-semibold mb-4">
        Project Saved: {projectData.projectName}
      </h2>
      <p>
        <strong>Customer:</strong> {projectData.customerName}
      </p>
      <p>
        <strong>Start Date:</strong> {projectData.startDate}
      </p>
      <p>
        <strong>Project Type:</strong> {projectData.projectType}
      </p>

      <h3 className="mt-6 text-xl font-semibold">Add Inventory Items</h3>

      {items.map((item, index) => (
        <div key={index} className="grid grid-cols-3 gap-4 mt-4">
          <input
            className="border p-2 rounded"
            placeholder="Item Name"
            name="itemName"
            value={item.itemName}
            onChange={(e) => handleItemChange(index, e)}
          />
          <input
            className="border p-2 rounded"
            placeholder="Quantity"
            name="quantity"
            type="number"
            value={item.quantity}
            onChange={(e) => handleItemChange(index, e)}
          />
          <input
            className="border p-2 rounded"
            placeholder="Unit Price"
            name="unitPrice"
            type="number"
            value={item.unitPrice}
            onChange={(e) => handleItemChange(index, e)}
          />
        </div>
      ))}

      <button
        onClick={addNewItem}
        className="mt-4 bg-green-600 text-white px-4 py-2 rounded"
      >
        + Add Item
      </button>

      <button
        onClick={handleSaveItems}
        className="mt-4 ml-4 bg-blue-600 text-white px-6 py-2 rounded"
      >
        Save Project & Inventory
      </button>
    </div>
  );
}

export default function ProjectInventory() {
  const [formData, setFormData] = useState({
    projectName: "",
    customerName: "",
    startDate: "",
    projectType: "",
  });

  const [nextStep, setNextStep] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    if (
      !formData.projectName ||
      !formData.customerName ||
      !formData.startDate ||
      !formData.projectType
    ) {
      alert("Please fill all project details!");
      return;
    }
    console.log("Project Data:", formData);
    setNextStep(true);
  };

  return (
    <div className="bg-white p-10 rounded-lg shadow">
      {!nextStep ? (
        <>
          <h2 className="text-2xl font-semibold mb-6">
            Create Project – Specify Customer
          </h2>

          <div className="grid grid-cols-2 gap-6">
            <input
              className="border p-3 rounded"
              placeholder="Project Name"
              name="projectName"
              value={formData.projectName}
              onChange={handleChange}
            />
            <input
              className="border p-3 rounded"
              placeholder="Customer Name"
              name="customerName"
              value={formData.customerName}
              onChange={handleChange}
            />
            <input
              className="border p-3 rounded"
              type="date"
              name="startDate"
              value={formData.startDate}
              onChange={handleChange}
            />
            <select
              className="border p-3 rounded"
              name="projectType"
              value={formData.projectType}
              onChange={handleChange}
            >
              <option value="">Project Type</option>
              <option value="Sales">Sales</option>
              <option value="Service">Service</option>
            </select>
          </div>

          <button
            onClick={handleSave}
            className="mt-8 bg-blue-600 text-white px-6 py-3 rounded"
          >
            Save & Continue
          </button>
        </>
      ) : (
        <NextStep projectData={formData} />
      )}
    </div>
  );
}
