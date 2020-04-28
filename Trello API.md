---
created: 2020-04-28T15:28:58-03:00
modified: 2020-04-28T16:30:14-03:00
title: Trello API
---

# Trello API
 Hey guys, on this serie we're going to see how to work with the Trello API.

 1. [Starting with the API](#001---starting-with-the-api)

//notPosted 
## 001 - Starting with the API
  Today we're going to work with the Trello API (see the docs [here](https://developer.atlassian.com/cloud/trello/rest/)
 
 get boards
 curl https://api.trello.com/1/members/me/boards?fields=name,url&key={apiKey}&token={apiToken}

 get board info
 https://api.trello.com/1/boards/{id}?key={apiKey}&token={apiToken}


 
 get all board lists
 https://api.trello.com/1/boards/{id}/lists?key={apiKey}&token={apiToken}


//002 working with the cards

get all board cards
 https://api.trello.com/1/boards/{id}/cards?key={apiKey}&token={apiToken}

 get list cards
 https://api.trello.com/1/Lists/{id}/cards?key={apiKey}&token={apiToken}

 create card
 https://api.trello.com/1/cards?key={apiKey}&token={apiToken}&name={card_name}&desc={card_description}&idList={list_id)&idLabels={label_id}

 delete
 https://api.trello.com/1/cards/{id}?key={apiKey}&token={apiToken}