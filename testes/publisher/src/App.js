import React, {useState, useEffect} from 'react';

import unirest from 'unirest';

function App() {
  const [ title, setTitle] = useState('Test case');
  const [ post, setPost] = useState('');
  const [ image, setImage] = useState('https://images.unsplash.com/photo-1544256718-3bcf237f3974?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjEyNzg0MX0');
  const [html, setHtml] =useState('');
  const discordURL = 'https://discordapp.com/api/'
  const taverna_do_vader = 'webhooks/697454334455054357/2Of5GAKdFpm4yNLAQB8MUNZOS_aUtzdgUUuEozltUxxcn4W6vESiSwXofP7QEKa8e2_H';        

  useEffect(()=>{
    
    console.log({
      "article": {
          "title": title,
          "published": false,
          "body_markdown": html,
          "main_image":image,
          "tags": [
          "todayilearned",
          "showdev",
          "api",
          "integrations"
          ]
      }
      })
  },[html]);

  async function sendMessage(template){
      await unirest.post(discordURL + taverna_do_vader)
            .send({
                "content": `${template}`,
                "username":"Lord Darth Vader",
                "avatar_url": "https://rodcordeiro.github.io/shares/img/vader.png"
            })
            .then(function (response) {
                return {status:response.statusCode,message:response.body}
            });
    }
  function render(){
    unirest
    .post('https://api.github.com/markdown')
    .type('json')
    .headers({
        'user-agent': 'rodcordeiro'
    })
    .send({
        "text": post,
        "mode": "markdown",
      })
    .then((response)=>{
      setHtml(response.body)
      publisher(response.body)
    });
  }
  
  function publisher(doc){
    const publish = {
      "article": {
          "title": title,
          "published": false,
          "body_markdown": doc,
          "main_image":image,
          "tags": [
          "todayilearned",
          "showdev",
          "api",
          "integrations"
          ]
      }
      }
    unirest.post('https://dev.to/api/articles')
        .type('json')
        .headers({
          "content-type": "application/json",
          "api-key":"TStc8sLhHXibcMJ6jt6BfCab"
        })
        .send(publish)
        .then((response)=>{
            // const message =  `Hey guys, new post:\n **${response.body.title}**\n${response.body.description}\n\n${response.body.url}`
            // sendMessage(message)
            console.log(response.body
            )
            
        })  
  }
  async function postHandler(e){
    e.preventDefault();
    console.log("Rendering")
    await render()
    console.log("Publishing")
    await publisher(html)
  }
  return (
    <div>
      <form onSubmit={postHandler}>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Put your title here"
        />
        <br />
        <input
          value={image}
          onChange={(e) => setImage(e.target.value)}
          placeholder="Put your image url here"
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
    </div>
  );
}

export default App;
