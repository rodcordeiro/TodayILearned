import React, {useState, useEffect} from 'react';

import Unirest from 'unirest';

function App() {
  const [ title, setTitle] = useState('Test case');
  const [ post, setPost] = useState('');
  const [ image, setImage] = useState('https://images.unsplash.com/photo-1544256718-3bcf237f3974?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjEyNzg0MX0');
  const [ publish, setPublish] = useState(false);
  const [ serie, setSerie ] = useState('');
  const [ data, setData] = useState({});
  
  useEffect(()=>{
    loadData()
    document.getElementById('resultado').innerHTML = `{
      "article": {
          "title": ${title},
          "published": ${publish},
          "body_markdown": ${post},
          "main_image":${image},
          "tags": [
          "todayilearned",
          "showdev",
          "api",
          "integrations"
          ],
          "series" : "${serie}"
      
      }
      }`
  },[post,title, image,publish]);

  function loadData(){
  setData({
    "article": {
        "title": title,
        "published": publish,
        "body_markdown": post,
        "main_image":image,
        "tags": [
        "todayilearned",
        "showdev",
        "api",
        "integrations"
        ],
        "series" : serie
    }
    })
    console.log(data)
  }

  async function publisher(){
    Unirest.post('https://cordeiro-backend.herokuapp.com/devpost')
      .headers({
        "key":"KDLqvK3FqiU78P1sg22EuzNK"
      })
      .type('json')
      .send(data)
      .then((response)=>{
        alert(`Post return:\nStatus: ${response.statusCode}`)
      })
  }

  async function postHandler(e){
    e.preventDefault();
    loadData()
    console.log("Publishing")
    publisher()
  }
  return (
    <div onLoad={loadData}>
      <form onSubmit={postHandler}>
        <input
          value={title}
          onChange={(e) => {setTitle(e.target.value)}}
          placeholder="Put your title here"
        />
        <input
          type='checkbox'
          id='publish'
          value={publish}
          onClick={(e) => {if (e.target.checked){setPublish(true)}else{setPublish(false)}}}
        /><label for='publish'>Publish</label>
        <br />
        <input
          value={image}
          onChange={(e) => setImage(e.target.value)}
          placeholder="Put your image url here"
        />
        <br />
        <input
          value={serie}
          onChange={(e) => setSerie(e.target.value)}
          placeholder="Is this from a serie?"
        />
        <br />
        <textarea
          id="postText"
          value={post}
          onChange={(e) => setPost(e.target.value)}
          placeholder="Put your markdown here"
        >
        </textarea>
        <br />
        <button type="submit">Publish</button>
      </form>
      <div><pre  id='resultado'></pre></div>
    </div>
  );
}

export default App;
