import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../../AuthContext'
import { Link } from 'react-router-dom';
import axios from 'axios';
import Nav2 from '../../components/nav2';
import Footer from '../../components/footer';



const HomeShopper = () => {

  const { user } = useContext(AuthContext)
  const [stores, setstores] = useState([])

  useEffect(() => {
    axios.post(`${process.env.REACT_APP_API_URL}/Stores`, { user },
      {
        headers: {
          "x-access-token": JSON.parse(localStorage.getItem('AccToken')),
          "x-refresh-token": JSON.parse(localStorage.getItem('RefToken')),
          "user": JSON.parse(localStorage.getItem('user'))
        }
      })
      .then(res => {
        setstores(res.data)
      })
  }, [])

  return (
    <>
      <Nav2 />
      <header className="bg-dark py-5">
        <div className="container px-4 px-lg-5 my-5">
          <div className="text-center text-white">
            <h1 className="display-4 fw-bolder">welcome to shop</h1>
            <p className="lead fw-normal text-white-50 mb-0">With this shop hompeage template</p>
          </div>
        </div>
      </header>
      <main className='py-5'>

        <div className='text-center' style={{ overflowX: 'hidden' }}>
          <h2 className="display-5 fw-bolder mb-5">Stores</h2>
          <div className="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center mb-5 mx-5">
            {stores.map((store, count) => (
              <div className="col mb-5" key={store.name}>
                <div className="card h-100">
                  <img className="card-img-top" src="https://dummyimage.com/450x300/dee2e6/6c757d.jpg" alt="..." />
                  <div className="card-body p-4">
                    <Link to={{ pathname: `/show-store/${store._id}`, state: { store } }}>
                      <div className="text-center">
                        <h5 className="fw-bolder text-dark">{store.name}</h5>
                        <p className='text-dark mt-4'>{store.category}</p>
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
            ))}

          </div>
        </div>

      </main>
      <Footer />
    </>
  );
}
export default HomeShopper;
