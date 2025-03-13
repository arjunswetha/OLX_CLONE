import React, { useEffect, useState, useContext } from 'react';
import './View.css';
import { PostContext } from '../../store/PostContext';
import { FirebaseContext } from '../../store/FirebaseContext';

function View() {
  const [userDetails, setUserDetails] = useState(null);
  const { postDetails } = useContext(PostContext);
  const { firebase } = useContext(FirebaseContext);

  useEffect(() => {

    console.log(postDetails)
    if (postDetails && postDetails.userId) {
      const { userId } = postDetails;
      console.log('Fetching details for userId:', userId);

     

      firebase
        .firestore()
        .collection('users')
        .where('id', '==', userId)
        .get()
        .then((res) => {
          if (!res.empty) {
            res.forEach((doc) => {
              console.log('User data fetched:', doc.data());
              setUserDetails(doc.data());
            });
          } else {
            console.warn('No user found for userId:', userId);
          }
        })
        .catch((error) => {
          console.error('Error fetching user details:', error);
        });
    }
  }, [postDetails, firebase]);

  if (!postDetails) {
    return <div>Loading post details...</div>;
  }

  const formattedDate = postDetails.createdAt 
    ? new Date(postDetails.createdAt).toLocaleDateString()
    : 'Date not available';

  return (
    <div className="viewParentDiv">
      <div className="imageShowDiv">
        <img src={postDetails.url} alt={postDetails.name || 'Product Image'} />
      </div>
      <div className="rightSection">
        <div className="productDetails">
          <p>&#x20B9; {postDetails.price} </p>
          <span>{postDetails.name || 'Product Name'}</span> 
          <p>{postDetails.category || 'Product Category'}</p>
          <span>{formattedDate}</span> 
        </div>
        {userDetails ? (
          <div className="contactDetails">
            <p>Seller details</p>
            <p>{userDetails.username}</p>
            <p>{userDetails.phone}</p>
          </div>
        ) : (
          <div>Loading seller details...</div>
        )}
      </div>
    </div>
  );
}

export default View;
