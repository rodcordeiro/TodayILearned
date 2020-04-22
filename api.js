const unirest = require("unirest");

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

var markdown = "# Some text \
And some *markdown* **here**";


unirest
    .post('https://api.github.com/markdown')
    .type('json')
    .headers({
        'user-agent': 'rodcordeiro'
    })
    .send({
        "text": markdown,
        "mode": "markdown",
        "context": "github/gollum"
      })
    .then((response)=>{
      const html = response.body
      console.log('Creating Post')
      unirest.post('https://dev.to/api/articles')
        .type('json')
        .headers({
        'api-key':'KDLqvK3FqiU78P1sg22EuzNK'
        })
        .send({
        "article": {
            "title": "Some test",
            "published": false,
            "body_markdown": html,
            "main_image":"https://images.unsplash.com/photo-1544256718-3bcf237f3974?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjEyNzg0MX0",
            "tags": [
            "todayilearned",
            "showdev",
            "api",
            "integrations"
            ]
        }
        })
        .then((response)=>{
            message=  `Hey guys, new post:\n **${response.body.title}**\n${response.body.description}\n\n${response.body.url}`
            sendMessage(message)
            console.log({
                status: response.statusCode,
                message:response.body
            })
            
        })
    })
