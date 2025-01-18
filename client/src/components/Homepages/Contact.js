import React, { useState } from 'react'
import './contact.css'
import axios from 'axios'
import API_BASE_URL from "../../apiConfig";



const Contact = () => {


const [name, setName] = useState('');
const [email, setEmail] = useState('');
const [message, setMessage] = useState('');
const [banner,setBanner]=useState('');
const [bool, setBool] = useState(false);


// handle inputs

const handleNameChange=(e)=>{
  setName(e.target.value);
  console.log(name);
}


const handleEmailChange=(e)=>{
  setEmail(e.target.value);
   console.log(email);
}

const handleMessageChange = (e) => {
  setMessage(e.target.value);
   console.log(message);
}



// submitform


const formSubmit=(e)=>{
  e.preventDefault();
  let data={
    name:name,
    email:email,
    message:message
  }


  setBool(true);
  axios.post(`${API_BASE_URL}/contact`,data)
  .then(res=>{
    setBanner(res.data.msg);
    setBool(false);
    setTimeout(()=>{
      setBanner('');
    },2000)
    setName('');
    setEmail('');
    setMessage('');
  }).catch((err)=>console.log(err))
}

  return (
    <div className="main-container">
      <div className="contactForm">
        <h2 className="title">Contact me</h2>
        <div className="contactForm-center">
          <div className="contact-form">
            <form onSubmit={formSubmit}>
              <p>{banner}</p>

              <label htmlFor="name">Name</label>
              <input
                type="text"
                placeholder="input name...."
                required
                value={name}
                onChange={handleNameChange}
              />

              <label htmlFor="email">Email</label>
              <input
                type="email"
                placeholder="input email...."
                required
                value={email}
                onChange={handleEmailChange}
              />

              <label htmlFor="message">Message</label>

              <textarea
                type="text"
                name="message"
                id=""
                placeholder="input contact reason..."
                value={message}
                onChange={handleMessageChange}
              />
{/* put image name inside img src */}
              <div className="send-btn">
                <button type="submit">
                  Send
                  {bool ? (
                    <b className="load">
                      <img
                        src=""
                        alt=""
                      />
                    </b>
                  ) : 
                    ""
                  }
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact
