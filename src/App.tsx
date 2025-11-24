import axios from 'axios'
import './App.css'
import { useEffect, useState } from 'react'

interface Product {
  id: number;
  name: string;
  price: number;
}

function App() {

  const [data, setData] = useState<Product[]>([])
  const url: string = "http://localhost:8080/api/products" // sau này đổi thành URL Railway

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(url)
        setData(res.data)
      } catch (err) {
        console.error("Error fetching products:", err)
      }
    }

    fetchData();
  }, [])

  return (
    <div className="container">
      <h2>Products</h2>

      {data && data.length > 0 ? (
        <table border={1} cellPadding={8} cellSpacing={0}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {data.map((product) => (
              <tr key={product.id}>
                <td>{product.id}</td>
                <td>{product.name}</td>
                <td>${product.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No products found.</p>
      )}
    </div>
  )
}

export default App
