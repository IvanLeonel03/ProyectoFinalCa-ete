import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import ItemList from './ItemList';
import { getProducts } from './productsService';
import '../App.css';

export default function ItemListContainer() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { categoryId } = useParams();

  const categories = [
    { id: 'zapatillas', name: 'Zapatillas' },
    { id: 'pantalones', name: 'Pantalones' },
    { id: 'camisetas', name: 'Camisetas' },
    { id: 'abrigos', name: 'Abrigos' }
  ];

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const productos = await getProducts();
        const filteredProducts = categoryId 
          ? productos.filter(p => p.category === categoryId)
          : productos;
        setProducts(filteredProducts);
      } catch (error) {
        console.error("Error al cargar productos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [categoryId]);

  if (loading) return <div className="loading">Cargando productos...</div>;

  return (
    <div className="products-container">
      <div className="categories-nav">
        <Link 
          to="/products" 
          className={!categoryId ? 'active-category' : ''}
        >
          Todos
        </Link>
        {categories.map(cat => (
          <Link
            key={cat.id}
            to={`/products/${cat.id}`}
            className={categoryId === cat.id ? 'active-category' : ''}
          >
            {cat.name}
          </Link>
        ))}
      </div>

      <h2 className="category-title">
        {categoryId 
          ? `Categoría: ${categories.find(c => c.id === categoryId)?.name || categoryId}`
          : 'Todos los productos'}
      </h2>

      <ItemList products={products} />
    </div>
  );
}