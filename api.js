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

var markdown = "## 002 - Creating a Post with the API\n\
\n\
Ok, now we already know what to do to get the feed and the basic to work with the API, so, now we're going to post something using the API. To this, we must send a `POST` request to `/articles` with a the information about the post, see all the parameters possibilities at the [api documentation](https://docs.dev.to/api/).\n\
\n\
#### curl\n\
\n\
```shell\n\
curl --request POST \ \n\
--url https://dev.to/api/articles \ \n\
--header 'api-key: YOUR_API_TOKEN' \ \n\
--header 'content-type: application/json' \ \n\
--data '{ \n\
 \"article\": { \n\
     \"title\": \"Creating new post\", \n\
     \"published\": true, \n\
     \"body_markdown\": \"Hey there, here go some post.\", \n\
     \"tags\": [ \n\
         \"todayilearned\", \n\
         \"showdev\" \n\
     ]\n\
 }\n\
}'\n\
```\n\
\n\
#### node\n\
\n\
```javascript\n\
var unirest = require(\"unirest\");\n\
\n\
unirest.post('https://dev.to/api/articles')\n\
 .type('json')\n\
 .headers({\n\
   'api-key':'YOUR_API_TOKEN'\n\
 })\n\
 .send({\n\
   \"article\": {\n\
     \"title\": \"Creating new post\",\n\
     \"published\": true,\n\
     \"body_markdown\": \"Hey there, here go some post.\",\n\
     \"tags\": [\n\
       \"todayilearned\",\n\
       \"showdev\"\n\
     ]\n\
   }\n\
 })\n\
 .then((response)=>{\n\
   console.log(response.body)\n\
 })\n\
```\n\
That's all folks!!\n\
";


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
