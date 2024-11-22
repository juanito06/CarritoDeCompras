import React, { useState, useEffect } from 'react';
import { data } from '../data';
import Filters from './Filters';
import SortOptions from './SortOptions';

export const ProductList = ({
  allProducts,
  setAllProducts,
  countProducts,
  setCountProducts,
  total,
  setTotal,
}) => {
  const [filteredProducts, setFilteredProducts] = useState(data);
  const [filters, setFilters] = useState({ category: '', availability: '', priceRange: '' });
  const [sortOption, setSortOption] = useState('');

  useEffect(() => {
    applyFilters();
  }, [filters, sortOption]);

  const onAddProduct = (product) => {
    if (allProducts.find((item) => item.id === product.id)) {
      const products = allProducts.map((item) =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
      setTotal(total + product.price);
      setCountProducts(countProducts + 1);
      return setAllProducts([...products]);
    }

    setTotal(total + product.price);
    setCountProducts(countProducts + 1);
    setAllProducts([...allProducts, { ...product, quantity: 1 }]);
  };

  const applyFilters = () => {
    let filtered = data;

    if (filters.category) {
      filtered = filtered.filter((product) =>
        product.category.includes(filters.category)
      );
    }

    if (filters.availability) {
      filtered = filtered.filter((product) => {
        if (filters.availability === 'available') return product.available;
        if (filters.availability === 'out-of-stock') return !product.available;
        if (filters.availability === 'best-sellers') return product.bestSeller;
        return true;
      });
    }

    if (filters.priceRange) {
      filtered = filtered.filter((product) => {
        if (filters.priceRange === 'over-30000') return product.price > 30000;
        if (filters.priceRange === 'under-10000') return product.price < 10000;
        return true;
      });
    }

    if (sortOption) {
      if (sortOption === 'name') {
        filtered = filtered.sort((a, b) => a.nameProduct.localeCompare(b.nameProduct));
      } else if (sortOption === 'highest-price') {
        filtered = filtered.sort((a, b) => b.price - a.price);
      } else if (sortOption === 'lowest-price') {
        filtered = filtered.sort((a, b) => a.price - b.price);
      }
    }

    setFilteredProducts(filtered);
  };

  return (
    <div>
      <div className="filters-container">
        <Filters onFilter={setFilters} />
        <SortOptions onSort={setSortOption} />
      </div>
      <div className='container-items'>
        {filteredProducts.map((product) => (
          <div className='item' key={product.id}>
            <figure>
              <img src={product.img} alt={product.nameProduct} />
            </figure>
            <div className='info-product'>
              <h2>{product.nameProduct}</h2>
              <p>Categoría: {product.category}</p>
              <p className='price'>${product.price}</p>
              <button onClick={() => onAddProduct(product)}>
                Añadir al carrito
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
