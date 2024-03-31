import { useEffect, useState } from 'react';
import './index.css';
import Header from './assets/Header';
import Map from './assets/Map';

function App() {
  const [data, setData] = useState([]);
  const [categories, setCategories] = useState([]);
  const [option, setOption] = useState('');
  const [loading, setLoading] = useState(false); // State to track loading

  useEffect(() => {
    setLoading(true); 
    fetch(`https://eonet.gsfc.nasa.gov/api/v3/events?category=${option}`)
      .then(res => res.json())
      .then(data => {
        setData(data.events);
        setLoading(false); 
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setLoading(false); 
      });
  }, [option]);

  useEffect(() => {
    setLoading(true);
    fetch('https://eonet.gsfc.nasa.gov/api/v3/categories')
      .then(res => res.json())
      .then(data => {
        setCategories(data.categories);
        setLoading(false); 
      })
      .catch(error => {
        console.error('Error fetching categories:', error);
        setLoading(false); 
      });
  }, []);

  return (
    <div className='container'>
      <Header />
      <div className='category'>
        <span>Please choose one:</span>
        <select name='' id='' onChange={(e) => setOption(e.target.value)}>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.title}
            </option>
          ))}
        </select>
      <span>{data?.length} results</span>
      </div>
      {loading ? <div className='loader-container'> <div className='spinner'></div> </div> : (data?.length > 0 ? <Map data={data} /> : <div className='not-found'>No {option} found!</div>)}
    </div>
  );
}

export default App;
