import Item from './components/Item'
import './App.css'

export default function ItemList({ products }) {
  return (
    <div className="item-list">
      {products.map(product => (
        <Item key={product.id} product={product} />
      ))}
    </div>
  )
}