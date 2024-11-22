import React, { useState } from 'react';

const Filters = ({ onFilter }) => {
  const [category, setCategory] = useState('');
  const [availability, setAvailability] = useState('');
  const [priceRange, setPriceRange] = useState('');

  const handleFilter = () => {
    onFilter({ category, availability, priceRange });
  };

  return (
    <div className="filters">
      <h2>Filtrar Productos</h2>
      <div className="filter-group">
        <label>Categoría:</label>
        <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} />
      </div>
      <div className="filter-group">
        <label>Disponibilidad:</label>
        <select value={availability} onChange={(e) => setAvailability(e.target.value)}>
          <option value="">Todos</option>
          <option value="available">Disponibles</option>
          <option value="out-of-stock">Agotados</option>
          <option value="best-sellers">Más Vendidos</option>
        </select>
      </div>
      <div className="filter-group">
        <label>Rango de Precios:</label>
        <select value={priceRange} onChange={(e) => setPriceRange(e.target.value)}>
          <option value="">Todos</option>
          <option value="over-30000">Mayor a 30,000</option>
          <option value="under-10000">Menor a 10,000</option>
        </select>
      </div>
      <button className="filter-button" onClick={handleFilter}>Aplicar Filtros</button>
    </div>
  );
};

export default Filters;
