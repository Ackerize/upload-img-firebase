import React from 'react'
import ImagesUploader from 'react-images-uploader';
import './style.css';

const MyUploader = () => {
  return (
    <div>
      <ImagesUploader 
        url=""
        optimisticPreviews
        multiple={false}
        onLoadEnd={(err, response) => {
          if(err) console.log(err);
          if(response) console.log(response);
        }}
        label="Upload a picture"
      />
    </div>
  )
}

export default MyUploader
