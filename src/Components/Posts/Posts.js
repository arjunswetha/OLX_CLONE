import React, { useEffect, useContext, useState } from 'react'
import Heart from '../../assets/Heart'
import './Post.css'
import { FirebaseContext } from '../../store/FirebaseContext'
import { PostContext } from '../../store/PostContext'
import { useNavigate } from 'react-router-dom'

function Posts() {
  const { firebase } = useContext(FirebaseContext)
  const [products, setProducts] = useState([])
  const navigate = useNavigate()
  const { setPostDetails } = useContext(PostContext)

  useEffect(() => {
    firebase.firestore().collection('products').get().then((snapshot) => {
      const allPosts = snapshot.docs.map((product) => ({
        ...product.data(),
        id: product.id
      }));
      setProducts(allPosts)
    });
  }, [firebase])

  return (
    <div className="postParentDiv">
      <div className="moreView">
        <div className="heading">
          <span>Quick Menu</span>
          <span className="viewMore">View more</span>
        </div>
        <div className="cards">
          {products.map(product => (
            <div
              key={product.id}
              className="card"
              onClick={() => {
                setPostDetails(product);
                navigate('/view');
              }}
            >
              <div className="favorite">
                <Heart />
              </div>
              <div className="image">
                <img src={product.url} alt={product.name || 'Product'} />
              </div>
              <div className="content">
                <p className="rate">&#x20B9; {product.price}</p>
            
                <p className="name">{product.name}</p>
                <span className="kilometer">{product.category}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      
    </div>
  );
}

export default Posts
