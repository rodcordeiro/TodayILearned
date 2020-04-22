import React, {useState} from 'react';

import unirest from 'unirest';

function App() {
  const [ title, setTitle] = useState('');
  const [ post, setPost] = useState('');
  const [ image, setImage] = useState('https://images.unsplash.com/photo-1544256718-3bcf237f3974?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjEyNzg0MX0');

  const discordURL = 'https://discordapp.com/api/'
  const taverna_do_vader = 'webhooks/697454334455054357/2Of5GAKdFpm4yNLAQB8MUNZOS_aUtzdgUUuEozltUxxcn4W6vESiSwXofP7QEKa8e2_H';        

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
  
  function publisher(e){
    e.preventDefault();
    console.log('Publishing')
    unirest
    .post('https://api.github.com/markdown')
    .type('json')
    .headers({
        'user-agent': 'rodcordeiro'
    })
    .send({
        "text": post,
        "mode": "markdown",
        "context": "github/gollum"
      })
    .then((response)=>{
      const html = response.body
      console.log('Creating Post')
      unirest.post('https://dev.to/api/articles')
        .type('json')
        .headers({
        "api-key":"KDLqvK3FqiU78P1sg22EuzNK"
        })
        .send({
        "article": {
            "title": "title",
            "published": true,
            "body_markdown": html,
            // "main_image":image,
            "tags": [
              "todayilearned",
              "showdev",
              "api",
              "integrations"
            ]
        }
        })
        .then((response)=>{
            if (response.statusCode === 201){
              const message=  `Hey guys, new post:\n **${response.body.title}**\n${response.body.description}\n\n${response.body.url}`
              sendMessage(message)
            }
            console.log({
                status: response.statusCode,
                message:response.body
            })
            
        })
    })

  }
  return (
    <div>
      <form onSubmit={publisher}>
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
