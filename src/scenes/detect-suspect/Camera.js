import React, { useState, useRef, useEffect } from "react";
import axios from "axios";


const FaceRecognition = () => {
  const [previewSrc, setPreviewSrc] = useState(null);
  const [recognizedSrc, setRecognizedSrc] = useState(null);


  const videoRef = useRef(null);

  // start the live video preview
  const [imageSrc, setImageSrc] = useState('');

  useEffect(() => {
    // Fetch image from backend API
    fetch('http://localhost:5000/image')
      .then(response => response.blob())
      .then(blob => {
        // Convert blob to URL and store in state
        const url = URL.createObjectURL(blob);
        setImageSrc(url);
      })
      .catch(error => console.error(error));
  }, [imageSrc]);

  const startPreview = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      videoRef.current.srcObject = stream;
    } catch (error) {
      console.error("Error starting video preview", error);
    }
  };
  function dataURLtoBlob(dataurl) {
    var arr = dataurl.split(","),
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]),
      n = bstr.length,
      u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], { type: mime });
  }
  const captureImage = async () => {
    const canvas = document.createElement("canvas");
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(videoRef.current, 0, 0);

    console.log("capture clicked");
    // console.log(canvas.toDataURL('image/png'))

    const blob = dataURLtoBlob(canvas.toDataURL("image/jpeg"));
    const url = "http://localhost:5000/detect_faces";
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "image/png", // specify the content-type here
      },
      body: blob,
      // the blob object you want to send
    };
    const options_ = {
        method: "GET",
      };

    

    fetch(url, options)
      .then((response) => response.json())
      .then((data) => {
         console.log(data);
         fetch('http://localhost:5000/image',options_)
         .then((response)=>{
            setImageSrc(response.data)
            console.log("response  ",response.data)
         })
         .catch((error)=>console.log("image error",error));
      })
      .catch((error) => console.error(error));
  };
  // capture an image from the video preview and send to backend for facial recognition

  return (
    <div>
      <div>
        <video ref={videoRef} autoPlay />
        <button onClick={startPreview}>Start Preview</button>
        <button onClick={captureImage}>Capture Image</button>
      </div>
      <div>
        {previewSrc && <img src={previewSrc} alt="Preview" />}
        {recognizedSrc && <img src={recognizedSrc} alt="Recognized" />}
        
       
    
      </div>
      <div>
      {imageSrc && <img src={imageSrc} alt="Imaged" />}
       </div>
    </div>
  );
};

export default FaceRecognition;
