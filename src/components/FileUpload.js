import React, { Fragment, useState } from 'react';
import Message from './Message';
import Progress from './Progress';
// import axios from 'axios';

const FileUpload = () => {
  const [file, setFile] = useState('');
  const [link, setLink] = useState();
  const [filename, setFilename] = useState('Choose File');
  const [uploadedFile, setUploadedFile] = useState({});
  const [message, setMessage] = useState('');
  const [uploadPercentage] = useState(0); //, setUploadPercentage] = useState(0);

  const onChange = e => {
    setFile(e.target.files[0]);
    setFilename(e.target.files[0].name);
  };

  const onSubmit = async e => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('file', file);

    setMessage('File uploaded');

    try {
      // const res = await axios.post('/upload', formData, {
      //   headers: {
      //     'Content-Type': 'multipart/form-data'
      //   },
      //   onUploadProgress: progressEvent => {
      //     setUploadPercentage(parseInt(Math.round((progressEvent.loaded * 100) / progressEvent.total)));
      //     setTimeout(() => setUploadPercentage(0), 10000);
      //   }
      // });

      console.log(file);
      var fileName = filename;
      var filePath = "../test/" + filename;

      // const { fileName, filePath } = res.data;
      setUploadedFile({ fileName, filePath });
      setLink("https://www.planetware.com/wpimages/2020/02/france-in-pictures-beautiful-places-to-photograph-eiffel-tower.jpg")
      console.log(uploadedFile.filePath)
      setMessage('File uploaded');
    } catch (err) {
      if (err.response.status === 500) {
        setMessage('There was a problem with the server');
      } else {
        setMessage(err.response.data.msg);
      }
    }
  }

  return (
    <Fragment>
      { message ? <Message msg={message} /> : null}
      { link ? <div className="app_row" style={{ flexDirection: "column" }}>
        <div className="app_row">Your link is: </div>
        <div className="app_row">
          <a href={link}>{link}</a>
        </div>
      </div> : null}
      <form onSubmit={onSubmit}>
        <div className="custom-file mb-4">
          <input
            type="file"
            className="custom-file-input"
            id="customFile"
            onChange={onChange}
          />
          <label className='custom-file-label' htmlFor='customFile'>
            {filename}
          </label>
        </div>

        <Progress percentage={uploadPercentage} />

        <input
          type="submit"
          value="Upload"
          className="btn btn-primary btn-block mt-4"
        />
      </form>
    </Fragment>
  );
};

export default FileUpload;
