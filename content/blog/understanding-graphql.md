---
path: understanding-graphql
date: 2020-12-28T20:12:18.415Z
lastUpdated: 2020-12-28T22:22:18.457Z
title: Understanding GraphQL through REST
description: Why GraphQL is a useful API specification
tldr: GraphQL solves some of the cases developers were trying to solve using REST.
image: /img/graphql_rest.png
tags:
  - graphql
  - rest
  - api
  - specifications
  - architecture
---

In order to understand why GraphQL is continuing to gain attention, it is increasingly helpful to understand what it was intended to improve upon. One of the beauties of Software Engineering is the constant desire to improve upon what was provided to us. GraphQL tries to do this with REST. By the end, you will have examples of REST API(Application Programming Interface) endpoints, how GraphQL queries relate to those REST endpoints, and why GraphQL exists. Let's get started.

![Let's get started](https://media3.giphy.com/media/UUgTEncAfGQIcNmAk8/giphy.gif?cid=ecf05e47blkk5oc2hbf7aukhtxovwedemfeq79got7wbm1qn&rid=giphy.gif)

# Table of Contents

```toc

```

# Understanding REST

[REST](https://www.codecademy.com/articles/what-is-rest) stands for REpresentational State Transfer.

![Holy forking shirt balls - The Good Place](https://media1.giphy.com/media/ZB95y3XSFbljaNu7mT/giphy.gif?cid=6104955e9ed767b058c292236c53e3e34fbac5473c9869c9&rid=giphy.gif)

This architecture is known for being `stateless` and able to `separate concern between client and server`.

## Stateless

Stateless in this sense means the server does not need to know what the state of the client is to execute an action.

## Separation of Concern

Client and server separations allow for developers to change the server without it effecting the client side code and vice versa.

## Communication

When comparisons come into play with other API specifications, what actually makes REST unique is how the client and server communicate. REST was developed alongside with HTTP(Hypertext Protocol Transfer) 1.1 back in the late 90's. Because of this, REST was able to leverage benefits of HTTP. To illustrate the communication I'll be using a generic model with genres and books.

![1 Genre to Many Books](/img/genre-book-model.png)

We will review receiving and updating a data source through a REST API.

### Receiving Information from a REST API

GET `/genres`

When a client visits this endpoint they will be returned a list of genres.

```json
[
  {
    "id": 1,
    "name": "Mystery"
  },
  {
    "id": 2,
    "name": "Romance"
  }
]
```

Similar to genres, books would be the exact same

GET `/books`

```json
[
  {
    "id": 1,
    "title": "The lost man",
    "author": "Jane Harper",
    "img": "/img/jh-tlm.png"
  },
  {
    "id": 2,
    "title": "And then there were none",
    "author": "Agatha Christie",
    "img": "/img/ac-attwn.png"
  }
]
```

As you can see, this is a very predictable and scalable process. If our model above changed to include another model such as `Libraries`, we could easily add in that endpoint and keep chugging along.

### CRUD Operations in REST

In creating a service to handle CRUD(create, replace, update, and destroy) operations we would create the following

- POST `/genres`

  Create a new genre

- PUT `/genres`

  Update an existing genre

- DELETE `/genres`

  Remove or delete an existing genre

In REST API development taking advantage of the HTTP methods provided makes communicating with these available endpoints very predictable.

## Summary

The general idea behind REST API's is to make everything an endpoint. If you need to add or remove pieces of information from a request to take the load away from your client's browser, you can easily do so without giving the client too much knowledge of what is going on behind the scenes. Above all, REST aims to be fast, reliable, and predictable while taking advantage of all HTTP.

![Laughing](https://media0.giphy.com/media/KeWcgrh6Beq4BrqZUS/giphy.gif?cid=ecf05e4754lccuuklczptrovt9uccflhodlo89dqifsb59un&rid=giphy.gif)

# What is GraphQL?

[GraphQL](https://graphql.org/) is a language for querying an API. Not enough? Don't worry, more is coming.

![This broke me](https://media3.giphy.com/media/2fTOT5PhBUdJbDeVLH/giphy.gif?cid=ecf05e477hp9tnjikw8s3z66omn0vvuy6xqunj3zcf3yf8uf&rid=giphy.gif)

Contrary to REST API's, GraphQL provides one HTTP endpoint and an `understandable description of the data available` through `type specification`. This gives the client the ability to `request what they need and nothing more`. This query language is much closer to the data sources giving the frontend developers more access to available models and relationships between them. With that they are able to `get many resources in a single request`.

## Type Specification and Self Documentation

Instead of REST endpoints returning different return types per endpoint, GraphQL relies on types and fields to tell your client what is possible.

```gql
type Query {
  books: [Book]
  genres: [Genre]
}

type Book {
  id: Int
  title: String
  author: String
  img: String
}

type Genre {
  id: Int
  name: String
  books: [Book]
}
```

With this, anyone needing the API to develop client side code can reference developer tooling to see all the possible queries thanks to the type specifications and self documenting.

![Hot diggity dog!](https://media4.giphy.com/media/3o7WIJtCve3cNZKhRC/giphy.gif?cid=ecf05e47idcs10z45ee46p6nhik8fa0pmjpyglskgbq04q8z&rid=giphy.gif)

## Request What is Needed and Nothing More

In our genres and books data source, when we request a book we will always get all available keys.

```json
[
  {
    "id": 1,
    "title": "The lost man",
    "author": "Jane Harper",
    "img": "/img/jh-tlm.png"
  },
  {
    "id": 2,
    "title": "And then there were none",
    "author": "Agatha Christie",
    "img": "/img/ac-attwn.png"
  }
]
```

With GraphQL we can add and remove keys to format only the data needed on the frontend. Lets say for example, we are creating a page that only wants the title and image we could create a query to do so.

```gql
query {
  books {
    title
    img
  }
}
```

This would return the same result without the `author` and `id` keys.

```json
[
  {
    "title": "The lost man",
    "img": "/img/jh-tlm.png"
  },
  {
    "title": "And then there were none",
    "img": "/img/ac-attwn.png"
  }
]
```

![Now here we go](https://media1.giphy.com/media/xThtalkAxYnZd94uB2/giphy.gif?cid=ecf05e47ka7zh7pxst7qvt4i4b7mepgmlkxea0yumhxtgptz&rid=giphy.gif)

## Get many resources in a single request

In the above REST example, if we wanted to get both genres and books we would have a few options.

1. Make multiple requests to `/genres` and `/books`

   - This would force the client side to resolve these relationships itself.

2. Add books relationship into the `/genres` endpoint.

   - The only negative to this would be now anytime you want to fetch genres you are forced to also include books with it which is a problem of over fetching as referenced above.

3. Make a new endpoint or add an option that would allow fetching of both genres and books.

   - This is most common because it will not interfere with existing frontend applications connected to your API.

Instead of planning the relationship and response for each endpoint GraphQL aims to make all relationships available through the type specification.

![Nice](https://media0.giphy.com/media/l3mZfxgPWhmuXa8Cc/giphy.gif?cid=ecf05e47jl4reclv0ispkk8jjsq0189fam9g75eheskzivdb&rid=giphy.gif)

## Versioning

Communication between frontend and backend teams can be difficult. In the example of changing an endpoint, you would need to communicate with the frontend teams to ensure they prepare for any breaking changes. With GraphQL it's easy to add or remove fields relative to your types above.

```gql
type Book {
  id: Int
  title: String
  author: String @deprecated // highlight-line
  authoredBy: Author // highlight-line
  img: String
}

type Author {
  firstName: String
  lastName: String
}
```

This could result in less communication needed between the teams and less breaking changes downstream.

![Happy](https://media0.giphy.com/media/KH2LcVDaBM7DyKNs3f/giphy.gif?cid=ecf05e47abustlot69n9nswa5rj4eedhrqiw101fzoccvnwf&rid=giphy.gif)

## The Basics

### Query vs. Mutation

Thus far the examples above are all queries. Queries and mutations replace endpoints to all resolve to one endpoint `POST /graphql`. This endpoint can be changed but what is always consistent is everything is a POST request. Past that you either send a query variable or mutation variable. The formatting used is always spaced out for ease of reading and copied from the developer tools frequently used such as GraphiQL. [Here](https://countries.trevorblades.com/) is an example of GraphiQL used to query countries. Try it out!

![GraphiQL is awesome](https://media.giphy.com/media/Y4zPj5zzfCLAFKjvpa/giphy.gif)

#### Query

Queries are all related to GET requests in a REST API. Queries are the primary focus of GraphQL and what makes it unique. Instead of hitting a REST endpoint `GET /books` you would use a single endpoint `POST /graphql` and send a query variable. Here is an example.

```gql
query {
  books {
    id
    title
  }
}
```

#### Mutation

PUT, POST, and DELETE endpoint equivalents in GraphQL are mutations.

`POST /book?name=Storyteller`

```gql
mutation {
  createBook(
      {
          name: 'Storyteller'
      }
  ){
      // what you want to return
      id
      name
  }
}
```

One key difference above, regardless of mutations or queries, we always need to resolve the responses in the `// what you want to return` section. To me this still seems awkward because you typically just want to know whether creating the books succeeded or failed. It's up to the client to decide how to handle that as opposed to a REST endpoint returning an id for example.

![Nothing left to teach](https://media2.giphy.com/media/l4dUikt9M3YvX4hTMp/giphy.gif?cid=ecf05e476buwwqkg6iapbtbcanbbk9y7kic98x3ea4l6zz2f&rid=giphy.gif)

# Why you should know GraphQL

## A Brief History

GraphQL was made by the internal team at Facebook but released to the open-source community in 2015. Sometime around 2012 the Facebook team wanted to combat a few problems they saw in their REST API's. Mobile applications were getting slower with their heavily over-fetched data. They were sharing API's across multiple client applications, and changing one endpoint could be considered a breaking change to one client app.

## It's Still Growing

![GraphQL Impact](/img/stateofjs_graphql.png)

In the [State of JS 2019](https://2019.stateofjs.com/data-layer/graphql/#graphql_experience) survey, about 6% of developers in the JavaScript community are still unfamiliar with it but the remaining majority express interest in it. Since it's inception to the open source community in 2015, it's been gradually growing. The open source community has really run with this API specification and is building more tools to take this thing further and further.

## Connect to Multiple Data Sources

I'm used to creating a three-tier app with an API that connects directly to a database, so restarting your API to leverage GraphQL benefits might seem like a large overhaul. This isn't the case, in fact the community has fantastic resources on leveraging your already existing REST API to generate a GraphQL layer. So take your REST API, database, or an existing GraphQL API and you can make one unifying endpoint for all.

## Support

Facebook isn't going anywhere and they make great tools that help the open source community build great things. If you're a React developer you know all about this! Open source is also having a field day with tooling to make this an even better developer experience. One of my favorites is the [graphql-code-generator ](https://graphql-code-generator.com/) where we can auto generate TypeScript types and type-graphql types after creating your schema.

![Support](https://media2.giphy.com/media/h46nEPQoQKpJoekafy/giphy.gif?cid=ecf05e474fh7gu839dan42bltcyavhfpthf8ylx3rjmwx6bo&rid=giphy.gif)

# Part 2. Creating a GraphQL API using an REST API

If you are interested in learning about creating a GraphQL API utilizing a REST API as your data source I will update this article and push that update out within the week! Stay tuned for that as I will try to sprinkle in more GraphQL knowledge throughout the tutorials. Please be patient!

![I like not knowing](https://media1.giphy.com/media/LqxE3PyepavPVSwPnb/giphy.gif?cid=ecf05e477hp9tnjikw8s3z66omn0vvuy6xqunj3zcf3yf8uf&rid=giphy.gif)

# Summary

REST and GraphQL are useful specifications for sharing data. REST is scalable, stateless, and great at separating concerns. GraphQL tries to build on REST's shortcomings in terms of over-fetching data, needing to request multiple times to get all the information needed on the client side, versioning, and manual documentation. We learned the basics of the differences between REST and GraphQL and their various terminology such as queries and mutations. GraphQL is growing thanks to open-source software development and developer experience satisfaction. If you haven't already, try it out.

![You're ready](https://media3.giphy.com/media/efxhHqExIsZuvAg2d8/giphy.gif?cid=ecf05e47qrlsu9jtwbp6d00lwjmu0sb8suyaetqqjj50xthu&rid=giphy.gif)
