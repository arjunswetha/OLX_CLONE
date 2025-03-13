import React, { Fragment, useState, useContext } from 'react'
import './Create.css'
import Header from '../Header/Header'
import { FirebaseContext, AuthContext } from '../../store/FirebaseContext'
import { useNavigate } from 'react-router-dom'


const Create = () => {
  const { firebase } = useContext(FirebaseContext)
  const { user } = useContext(AuthContext)

  const [name, setName] = useState('')
  const [category, setCategory] = useState('')
  const [price, setPrice] = useState('')
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState('')
const date=new Date()
const Navigate=useNavigate()

  const handleSubmit = () => {
    if (!user) {
      alert('You must be logged in to create a post.')
      return;
    }
    if (!image) {
      alert('Please select an image to upload.')
      return;
    }
  
    // Ensure image has a valid name
    if (!image.name) {
      alert('Selected file is invalid or has no name.')
      return
    }
  
    // Upload the image to Firebase Storage
    firebase
      .storage()
      .ref(`image/${image.name}`) // Ensure image.name is defined
      .put(image)
      .then(({ ref }) => {
        ref.getDownloadURL().then((url) => {
          console.log('Image URL:', url)
  firebase.firestore().collection('products').add({
    name,
    category,
    price,
    url,
    userId:user.uid,
    createdAt:date.toString()

  })
  Navigate('/')
        });
      })
      .catch((error) => {
        console.error('Error uploading image:', error)
        alert('Failed to upload image. Please try again.')
      });
  };
  

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file); // Set the actual file object
      setImagePreview(URL.createObjectURL(file)); // Set image preview URL
    }
  };

  return (
    <Fragment>
      <Header />
      <card>
        <div className="centerDiv">
          <form>
            <label htmlFor="name">Name</label>
            <br />
            <input
              className="input"
              type="text"
              id="name"
              name="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <br />
            <label htmlFor="category">Category</label>
            <br />
            <input
              className="input"
              type="text"
              id="category"
              name="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
            <br />
            <label htmlFor="price">Price</label>
            <br />
            <input
              className="input"
              type="number"
              id="price"
              name="Price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
            <br />
          </form>
          <br />
          {/* Display selected image if available */}
          {imagePreview && <img alt="Posts" width="200px" height="200px" src={imagePreview} />}
          <br />
          <input type="file" onChange={handleImageChange} />
          <br />
          <button onClick={handleSubmit} className="uploadBtn" type="button">
            Upload and Submit
          </button>
        </div>
      </card>
    </Fragment>
  );
};

export default Create;
