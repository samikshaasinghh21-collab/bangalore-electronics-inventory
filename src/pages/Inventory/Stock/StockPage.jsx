import React from "react";

const StockPage = () => {
  return (
    <div>
      <h2>Stock</h2>

      <table border="1" cellPadding="10" cellSpacing="0" width="100%">
        <thead>
          <tr>
            <th>Item Name</th>
            <th>Category</th>
            <th>Quantity</th>
            <th>Location</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td>LED Panel</td>
            <td>Lighting</td>
            <td>120</td>
            <td>Warehouse A</td>
          </tr>

          <tr>
            <td>MCB Switch</td>
            <td>Electrical</td>
            <td>18</td>
            <td>Warehouse B</td>
          </tr>

          <tr>
            <td>Copper Wire Roll</td>
            <td>Cables</td>
            <td>0</td>
            <td>Warehouse A</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default StockPage;
