import { useState, useEffect } from 'react';

const EditProfile = () => {

  const [profileData, setProfileData] = useState({
    name: '',
    surname: '',
    username: '',
    bio: '',
    title: '',
    area: '',
    image: ''
  });


  useEffect(() => {
  
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzVmZTQyYTBlYTI4NjAwMTUyOGI5MjgiLCJpYXQiOjE3MzQzNTU4NjYsImV4cCI6MTczNTU2NTQ2Nn0._mM-8UleqRbxgpxj8ZvCLSjX7BLa6GtjHdKZORmW3Rw';
    fetch('https://striveschool-api.herokuapp.com/api/profile/me', {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setProfileData({
          name: data.name,
          surname: data.surname,
          username: data.username,
          bio: data.bio,
          title: data.title,
          area: data.area,
          image: data.image,
        });
      })
      .catch((error) => console.error('Error fetching profile data:', error));
  }, []);


  const handleUpdateProfile = () => {
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzVmZTQyYTBlYTI4NjAwMTUyOGI5MjgiLCJpYXQiOjE3MzQzNTU4NjYsImV4cCI6MTczNTU2NTQ2Nn0._mM-8UleqRbxgpxj8ZvCLSjX7BLa6GtjHdKZORmW3Rw';
    const updatedProfile = {
      name: profileData.name,
      surname: profileData.surname,
      username: profileData.username,
      bio: profileData.bio,
      title: profileData.title,
      area: profileData.area,
      image: profileData.image, 
    };

    fetch('https://striveschool-api.herokuapp.com/api/profile/', {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedProfile), 
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Failed to update profile');
        }
      })
      .then((data) => {
        console.log('Profile updated successfully', data);
   
      })
      .catch((error) => {
        console.error('Error:', error);
      });

      alert('Profile Updated')
  };

  return (
    <div className="border border-2 mt-5 d-flex flex-column shadow-sm">
      <h1 className="text-center mt-5">Edit Profile</h1>
     
      <form className='p-5 d-flex flex-column'>
        <div className='mb-2 d-flex flex-column'>
          <label >Name</label>
          <input
          id='name-input'
            type="text"
            value={profileData.name}
            onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
          />
        </div>
        <div className='mb-2 d-flex flex-column'>
          <label>Surname</label>
          <input
          id='surname-input'
            type="text"
            value={profileData.surname}
            onChange={(e) => setProfileData({ ...profileData, surname: e.target.value })}
          />
        </div>
        <div className='mb-2 d-flex flex-column'>
          <label>Username</label>
          <input
          id='username-input'
            type="text"
            value={profileData.username}
            onChange={(e) => setProfileData({ ...profileData, username: e.target.value })}
          />
        </div>
        <div className='mb-2 d-flex flex-column'>
          <label>Bio</label>
          <input
          id='bio-input'
            type="textarea"
        
            value={profileData.bio}
            onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
          />
        </div>
        <div className='mb-2 d-flex flex-column'>
          <label>Title</label>
          <input
            type="text"
            value={profileData.title}
            onChange={(e) => setProfileData({ ...profileData, title: e.target.value })}
          />
        </div>
        <div className='mb-2 d-flex flex-column'>
          <label>Area</label>
          <input
          id='location-input'
            type="text"
            value={profileData.area}
            onChange={(e) => setProfileData({ ...profileData, area: e.target.value })}
          />
        </div>
        <div className='mb-2 d-flex flex-column'>
          <label>Image URL</label>
          <input
          id='url-img-input'
            type="text"
            value={profileData.image}
            onChange={(e) => setProfileData({ ...profileData, image: e.target.value })}
          />
        </div>

        <button type="button" onClick={handleUpdateProfile} style={{width: '100px', padding:'0.25em, 1em'}} className='btn-sm border border-primary rounded-pill bg-white text-primary float-start'>Save Profile</button>
      </form>
    </div>
  );
};

export default EditProfile;
