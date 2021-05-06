import React, { Fragment, useState } from 'react';
import Message from './Message';
import Progress from './Progress';
import axios from 'axios';

const FileUpload = () => {
  const [file, setFile] = useState('');
  const [link, setLink] = useState();
  const [filename, setFilename] = useState('Choose File');
  const [uploadedFile, setUploadedFile] = useState({});
  const [message, setMessage] = useState('');
  const [uploadPercentage, setUploadPercentage] = useState(0);

  function getBase64(file) {
    return new Promise(resolve => {
      let fileInfo;
      let baseURL = "";
      // Make new FileReader
      let reader = new FileReader();

      // Convert the file to base64 text
      reader.readAsDataURL(file);

      // on reader load somthing...
      reader.onload = () => {
        // Make a fileInfo Object
        console.log("Called", reader);
        baseURL = reader.result.split(",");
        console.log(baseURL);
        resolve(baseURL[1]);
      };
      console.log(fileInfo);
    });
  };

  const onChange = e => {
    setFilename(e.target.files[0].name);
    getBase64(e.target.files[0])
      .then(result => {
        setFile(result);
        console.log("File Is", file);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const onSubmit = async e => {
    e.preventDefault();
    const formData = {};
    formData['fileName'] = filename;
    formData['fileContents'] = file;

    setMessage('File uploaded');

    try {
      const res = await axios.post('https://1jjs7qjlgj.execute-api.us-east-2.amazonaws.com/dev/upload', formData, {
        onUploadProgress: progressEvent => {
          setUploadPercentage(parseInt(Math.round((progressEvent.loaded * 100) / progressEvent.total)));
          setTimeout(() => setUploadPercentage(0), 10000);
        }
      });

      // console.log(file);
      var fileName = filename;
      var filePath = "../test/" + filename;

      const result = res.data;
      console.log(res);
      setUploadedFile({ fileName, filePath });
      setLink("https://www.planetware.com/wpimages/2020/02/france-in-pictures-beautiful-places-to-photograph-eiffel-tower.jpg")
      console.log(uploadedFile.filePath)
      setMessage('File uploaded');
    } catch (err) {
      // if (err.response.status === 500) {
      //   setMessage('There was a problem with the server');
      // } else {
      //   setMessage(err.response.data.msg);
      // }
      console.log(err);
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
