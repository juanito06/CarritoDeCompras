import React from 'react';

const SortOptions = ({ onSort }) => {
  const handleSort = (e) => {
    onSort(e.target.value);
  };

  return (
    <div className="sort-options">
      <h2>Ordenar Productos</h2>
      <select onChange={handleSort}>
        <option value="name">Nombre</option>
        <option value="highest-price">Mayor Precio</option>
        <option value="lowest-price">Menor Precio</option>
      </select>
    </div>
  );
};

export default SortOptions;
