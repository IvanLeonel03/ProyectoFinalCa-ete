import React, { useState, useEffect } from 'react';
import { 
  addProduct, 
  getProducts, 
  updateProduct,
  deleteProduct 
} from './productsService';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export function Admin() {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    title: '',
    category: '',
    price: 0,
    description: '',
    details: '',
    image: '',
    stock: 0
  });
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setRefreshing(true);
    try {
      const productos = await getProducts();
      setProducts(productos);
      toast.success("Lista de productos actualizada");
    } catch (error) {
      toast.error("Error al cargar productos");
      console.error("Error fetching products:", error);
    } finally {
      setRefreshing(false);
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct(prev => ({
      ...prev,
      [name]: name === 'price' || name === 'stock' ? Number(value) : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      if (editingId) {
        await updateProduct(editingId, newProduct);
        toast.success("Producto actualizado correctamente");
      } else {
        await addProduct(newProduct);
        toast.success("Producto agregado correctamente");
      }
      setNewProduct({
        title: '',
        category: '',
        price: 0,
        description: '',
        details: '',
        image: '',
        stock: 0
      });
      setEditingId(null);
      await fetchProducts();
    } catch (error) {
      toast.error("Error al guardar el producto");
      console.error("Error saving product:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (product) => {
    setNewProduct(product);
    setEditingId(product.id);
  };

  const handleDelete = async (id) => {
    if (window.confirm("¿Estás seguro de eliminar este producto?")) {
      try {
        await deleteProduct(id);
        toast.success("Producto eliminado correctamente");
        await fetchProducts();
      } catch (error) {
        toast.error("Error al eliminar el producto");
        console.error("Error deleting product:", error);
      }
    }
  };

  return (
    <div className="admin-panel">
      <h1>Panel de Administración</h1>
      
      <div className="refresh-section">
        <button 
          onClick={fetchProducts}
          disabled={refreshing}
          className="refresh-btn"
        >
          {refreshing ? (
            <>
              <i className="fa fa-spinner fa-spin"></i> Actualizando...
            </>
          ) : (
            <>
              <i className="fa fa-sync-alt"></i> Actualizar Lista
            </>
          )}
        </button>
      </div>
      
      <div className="product-form">
        <h2>{editingId ? 'Editar Producto' : 'Agregar Nuevo Producto'}</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Nombre:</label>
            <input
              type="text"
              name="title"
              value={newProduct.title}
              onChange={handleInputChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label>Categoría:</label>
            <input
              type="text"
              name="category"
              value={newProduct.category}
              onChange={handleInputChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label>Precio:</label>
            <input
              type="number"
              name="price"
              value={newProduct.price}
              onChange={handleInputChange}
              min="0"
              required
            />
          </div>
          
          <div className="form-group">
            <label>Descripción:</label>
            <textarea
              name="description"
              value={newProduct.description}
              onChange={handleInputChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label>Detalles:</label>
            <textarea
              name="details"
              value={newProduct.details}
              onChange={handleInputChange}
            />
          </div>
          
          <div className="form-group">
            <label>Imagen (URL):</label>
            <input
              type="text"
              name="image"
              value={newProduct.image}
              onChange={handleInputChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label>Stock:</label>
            <input
              type="number"
              name="stock"
              value={newProduct.stock}
              onChange={handleInputChange}
              min="0"
              required
            />
          </div>
          
          <div className="form-actions">
            <button 
              type="submit" 
              disabled={loading}
              className="submit-btn"
            >
              {loading ? 'Procesando...' : editingId ? 'Actualizar Producto' : 'Agregar Producto'}
            </button>
            
            {editingId && (
              <button 
                type="button" 
                onClick={() => {
                  setNewProduct({
                    title: '',
                    category: '',
                    price: 0,
                    description: '',
                    details: '',
                    image: '',
                    stock: 0
                  });
                  setEditingId(null);
                }}
                className="cancel-btn"
              >
                Cancelar
              </button>
            )}
          </div>
        </form>
      </div>

      <div className="product-list">
        <h2>Lista de Productos ({products.length})</h2>
        {loading ? (
          <div className="loading-message">
            <i className="fa fa-spinner fa-spin"></i> Cargando productos...
          </div>
        ) : (
          <>
            <p className="last-updated">
              Última actualización: {new Date().toLocaleTimeString()}
            </p>
            <div className="table-responsive">
              <table>
                <thead>
                  <tr>
                    <th>Imagen</th>
                    <th>Nombre</th>
                    <th>Precio</th>
                    <th>Stock</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product) => (
                    <tr key={product.id}>
                      <td>
                        {product.image && (
                          <img 
                            src={product.image} 
                            alt={product.title} 
                            className="product-thumbnail"
                          />
                        )}
                      </td>
                      <td>{product.title}</td>
                      <td>${product.price.toLocaleString()}</td>
                      <td>{product.stock}</td>
                      <td className="actions">
                        <button 
                          onClick={() => handleEdit(product)}
                          className="edit-btn"
                        >
                          <i className="fa fa-edit"></i> Editar
                        </button>
                        <button 
                          onClick={() => handleDelete(product.id)}
                          className="delete-btn"
                        >
                          <i className="fa fa-trash-alt"></i> Eliminar
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Admin;