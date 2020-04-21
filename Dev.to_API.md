# Dev.to API integrations Series

## Starting with the API - 001

On this doc I'll write about my process of learning to use the api of the dev.to. To requests that needs an authorization, you can use the API Token or OAuth2 authentication. I'm going to use the API Token, so the first step is to acess your account settings and go to the account section (or [follow this link](https://dev.to/settings/account)) and generate your API Key. Our *hello world* will be a GET request that retrieves the posts of the feed, you can send some parameters, see all the possibilities at the [api documentation](https://docs.dev.to/api/#operation/getArticles).

We are going to send a GET request to `https://dev.to/api/articles`.

 #### curl
 ```shell
 curl https://dev.to/api/articles
 ```
 #### node
 ```javascript
  unirest.get('https://dev.to/api/articles')
 ```
 This will return a list of objects containing some information about the article and its author, see an example below:
 
 ```json
 {
    'type_of': 'article',
    'id': 315312,
    'title': 'I Built an App to Accompany Questlove’s DJ Set in 20 Minutes',
    'description': 'Twelve hours of live music, fifteen thousand words of commentary, one Glitch app',
    'cover_image': 'https://res.cloudinary.com/practicaldev/image/fetch/s--cdWtimkP--/c_imagga_scale,f_auto,fl_progressive,h_420,q_auto,w_1000/https://dev-to-uploads.s3.amazonaws.com/i/ixvv8wylkr9xwp4b2jvw.png',
    'readable_publish_date': 'Apr 20',
    'social_image': 'https://res.cloudinary.com/practicaldev/image/fetch/s--eouLbf3o--/c_imagga_scale,f_auto,fl_progressive,h_500,q_auto,w_1000/https://dev-to-uploads.s3.amazonaws.com/i/ixvv8wylkr9xwp4b2jvw.png',
    'slug': 'i-built-an-app-to-accompany-questlove-s-dj-set-in-20-minutes-5ep4',
    'path': '/glitch/i-built-an-app-to-accompany-questlove-s-dj-set-in-20-minutes-5ep4',
    'url': 'https://dev.to/glitch/i-built-an-app-to-accompany-questlove-s-dj-set-in-20-minutes-5ep4',
    'canonical_url': 'https://glitch.com/glimmer/post/questlove-live-prince-music-notes-app',
    'comments_count': 0,
    'positive_reactions_count': 36,
    'collection_id': null,
    'created_at': '2020-04-20T21:49:18Z',
    'edited_at': null,
    'crossposted_at': null,
    'published_at': '2020-04-20T21:58:09Z',
    'last_comment_at': '2020-04-20T21:58:09Z',
    'published_timestamp': '2020-04-20T21:58:09Z',
    'tag_list': [
      'showdev',
      'javascript',
      'node'
    ],
    'tags': 'showdev, javascript, node',
    'user': {
      'name': 'Anil Dash',
      'username': 'anildash',
      'twitter_username': 'anildash',
      'github_username': null,
      'website_url': 'https://anildash.com/',
      'profile_image': 'https://res.cloudinary.com/practicaldev/image/fetch/s--5QdTfjfY--/c_fill,f_auto,fl_progressive,h_640,q_auto,w_640/https://dev-to-uploads.s3.amazonaws.com/uploads/user/profile_image/35740/7a2a5a03-9913-4a5d-a5d8-d89881c5de32.jpg',
      'profile_image_90': 'https://res.cloudinary.com/practicaldev/image/fetch/s--_jstlNmz--/c_fill,f_auto,fl_progressive,h_90,q_auto,w_90/https://dev-to-uploads.s3.amazonaws.com/uploads/user/profile_image/35740/7a2a5a03-9913-4a5d-a5d8-d89881c5de32.jpg'
    },
    'organization': {
      'name': 'Glitch',
      'username': 'glitch',
      'slug': 'glitch',
      'profile_image': 'https://res.cloudinary.com/practicaldev/image/fetch/s--rVDCwPJW--/c_fill,f_auto,fl_progressive,h_640,q_auto,w_640/https://dev-to-uploads.s3.amazonaws.com/uploads/organization/profile_image/609/d36daa95-5d60-4559-a0cd-f234d10ef61d.png',
      'profile_image_90': 'https://res.cloudinary.com/practicaldev/image/fetch/s--S4GfcNfo--/c_fill,f_auto,fl_progressive,h_90,q_auto,w_90/https://dev-to-uploads.s3.amazonaws.com/uploads/organization/profile_image/609/d36daa95-5d60-4559-a0cd-f234d10ef61d.png'
    },
    'flare_tag': {
      'name': 'showdev',
      'bg_color_hex': '#091b47',
      'text_color_hex': '#b2ffe1'
    }
  }
 ```