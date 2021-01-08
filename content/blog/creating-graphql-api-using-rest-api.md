---
path: creating-graphql-api-using-rest-api
date: 2021-01-03T20:12:18.415Z
lastUpdated: 2021-01-03T20:12:18.415Z
title: Creating a GraphQL API while utilizing your REST API
description: Using an existing REST API we'll learn how to create a GraphQL API around our existing services instead of a complete rewrite of our API.
tldr: n/a
image: /img/graphql-using-rest.png
tags:
  - graphql
  - rest
  - api
  - javascript
---

# Table of Contents

```toc

```

# Introduction

GraphQL is a fun service to consume on the client-side. With its documentation, playground, and state management options such as [relay](https://relay.dev/) or [apollo](https://www.apollographql.com/), developer experience has been a blast for myself and my co-workers. There is a common misconception that you can use either REST OR GraphQL, but not both. You can have both! When I was learning I thought it was all in GraphQL or all in REST. To learn more about the difference between these services visit [Understanding GraphQL through REST](../understanding-graphql). Many of us are in a situation where we have an existing REST API that we don't want to completely abandon to start to try out GraphQL.

By the end, you'll have a GraphQL API leveraging a REST API of your choice in JavaScript. For the purpose of quickness I'll be utilizing the [Covid Act Now API](https://apidocs.covidactnow.org/), but feel free to sub out your own REST API and models. If you will be using the same API I would recommend [obtaining your API key](https://apidocs.covidactnow.org/access) now. It's immediate so no wait time needed! Let's get started.

![Awesome](https://media.giphy.com/media/3ohzdIuqJoo8QdKlnW/giphy.gif)

# Building your API

We'll be setting up JavaScript with a hello world script, converting that to a GraphQL hello world endpoint, adding a REST data source, and making a relationship to combine API calls.

## Project Setup

Project setup has some optional steps such as using [nodemon](https://nodemon.io/) to reload our app for us, and [dotenv](https://github.com/motdotla/dotenv) to load environment variables. This would be where you would add in the tools you prefer to work with in JavaScript.

### Create Project

```bash
mkdir covid-graphql
```

### Initialize an npm Package

```bash
npm init -y
```

### Create a Source Directory and an `index.js` File

```bash
touch src/index.js
```

### Add a `hello world` Log to `index.js`

```js
console.log("hello world")
```

### Open `package.json` and Add `dev` and `start` Scripts

```json
 "dev": "nodemon src/index.js --watch src/",
 "start": "node src/index.js"
```

- `dev` utilizes nodemon to watch for any changes in the `src` directory
- `start` using node (lighter than nodemon in production)

### Run `npm run dev` in Terminal

Making sure we're up and running and don't need to restart our app for every change going forward.

```bash
 hello world
```

Take it easy on me if you thought this was pointless. It will help someone.

![Everybody love everybody](https://media2.giphy.com/media/K7AoBNsPXQIO4/giphy.gif?cid=ecf05e47o0hxggite6l1xhc7ynb8wk9xjwb1y1cfrljdu87e&rid=giphy.gif)

### Install Dependencies

```bash
npm install apollo-server apollo-datasource-rest dotenv
```

#### apollo-server

Used to spin up an express server

#### apollo-datasource-rest

Used to take advantage of caching and other class-based inheritance around REST sources

#### dotenv

Used to pass in environment variables

#### nodemon

Used in development mode so you don't need to restart your app every time there is a file change

### Create a Hello World Schema

This schema file will be where we define what we can do with our GraphQL API

```bash
touch src/schema.js
```

<br/>

```js
// schema.js
const { gql } = require("apollo-server")

const typeDefs = gql`
  type Query {
    hello: String
  }
`

module.exports = typeDefs
```

What we're saying in the `typeDefs` object is when we go to query in our graphQL API, we're only able to query `hello` and we expect a nullable `String` return type. In order to make that response not nullable we would just add an exclamation point to the end like so `hello: String!`.

### Build Apollo Server

Open `src/index.js`

```js
require("dotenv").config()
const { ApolloServer } = require("apollo-server")
const typeDefs = require("./schema")

const server = new ApolloServer({ typeDefs })
const port = process.env.port || 9000

server.listen(port).then(() => {
  console.log(`server running 🚀 http://localhost:${port}`)
})
```

Inspect at http://localhost:9000 to see your schema defined. If you happen to try querying `hello` you will realize the response is null. We need to still define our resolver response.

![It's all good](https://media.giphy.com/media/CKrlUi30dn44w/giphy.gif)

### Create Resolver for `hello`

Resolvers are where the actual work gets done. The schema sets the limitations of the API in terms of what the clients can do. Actually doing that work is the job of the resolver. Similar to the query and mutation explanation in my previous posts, we will return `Query` and `Mutation` if needed. Under query, we now add in our `hello` resolver to return `hello world`.

```bash
touch src/resolvers.js
```

<br/>

```js
module.exports = {
  Query: {
    hello: () => {
      return "hello world"
    }
  }
}
```

### Add Resolver to `src/index.js` apollo-server Declaration

```js
const resolvers = require("./resolvers")

const server = new ApolloServer({ typeDefs, resolvers })
```

At this point, when you query `hello` you should get your expected response.

![hello world query](/img/hello-world-query.png)

## Hooking Up a REST Source

Here we're going to build a REST Data source class that will be able to be utilized in our resolver to leverage some actual results!

### Create REST Data Source

```bash
mkdir src/datasources
touch src/datasources/CovidActNowAPI.js
```

<br/>

```js
const { RESTDataSource } = require("apollo-datasource-rest")

class CovidActNowAPI extends RESTDataSource {
  constructor() {
    super()
    this.baseURL = "https://api.covidactnow.org/v2/"
  }
}

module.exports = CovidActNowAPI
```

All we really need to do here is extend `RESTDataSource` to get access to in-memory caching, HTTP helper functions, and pagination. To learn more visit [apollo-datasource-rest](https://github.com/apollographql/apollo-server/tree/main/packages/apollo-datasource-rest).

### Create .env File and Add-in API Key from Introduction

Hopefully, you've stowed away the key after [obtaining your API key](https://apidocs.covidactnow.org/access) from the Covid Act Now API.

![What is this amateur hour](https://media.giphy.com/media/2fC4V2UeJveb6/giphy.gif)

```bash
touch .env
```

<br/>

```bash
COVID_ACT_NOW=YOUR_KEY_HERE
```

### Add Some Methods to Get States and Counties in CovidActNowAPI Class

Taking a look at the [Covid Act Now API documentation](https://apidocs.covidactnow.org/api#tag/State-Data) we can see JSON response can be hit at our baseURL(https://api.covidactnow.org/v2/) plus `states` for all US states, `state/OH` for an individual US state such as Ohio, `counties` for all US counties, and `county/39001` for an individual county by [fips](https://www.nrcs.usda.gov/wps/portal/nrcs/detail/national/home/?cid=nrcs143_013697) plus our API key as a parameter. There is also an optional `.timeseries` we can append to include an array of values for things like metrics and actual figures. For getting a list of states or counties I'm choosing to avoid this as it's a much larger payload, but I am enabling the time series for individual US states and counties. Using this we can create functions to interact with the REST service now!

```js
async getAllStates() {
    const response = await this.get(`states.json?apiKey=${process.env.COVID_ACT_NOW}`);
    return response || [];
}

async getState(stateCode) {
    const response = await this.get(
    `state/${stateCode}.timeseries.json?apiKey=${process.env.COVID_ACT_NOW}`
    );
    return response;
}

async getAllCounties() {
    const response = await this.get(`counties.json?apiKey=${process.env.COVID_ACT_NOW}`);
    return response || [];
}

async getCounty(fips) {
    const response = await this.get(
    `county/${fips}.timeseries.json?apiKey=${process.env.COVID_ACT_NOW}`
    );
    return response;
}
```

### Add Data Source to apollo-graphql Server

```js
// index.js
const CovidActNowAPI = require("./datasources/CovidActNowAPI")

const server = new ApolloServer({
  dataSources: () => ({
    covidApi: new CovidActNowAPI()
  }),
  typeDefs,
  resolvers
})
```

### Update Schema to Reflect States and Counties as Queries

This should be your most time-consuming part. Relative to the Covid Act Now API they have a convenient [models](https://apidocs.covidactnow.org/api#tag/Actuals) section that will show you some of the subcategory types you'll need to recreate to tell consumers of this API what is possible. My process here for any API is to just look through the JSON response and make sure all the data I want available is covered. Every nested object needs a type in your schema to be recognized. If you don't need it, don't make a type for it and it's ignored 😊 You can also reference [apollo docs - build a schema](https://www.apollographql.com/docs/tutorial/schema/) to look at any syntax here such as the non-nullable(!), input parameters on a query or mutation (`county(fips: String!): County`), or array response(`[County]`).

```js
const typeDefs = gql`
  type Query {
    counties: [County!]!
    county(fips: String!): County
    states: [State!]!
    state(stateCode: String!): State
  }

  type County {
    fips: String!
    country: String!
    state: String!
    county: String!
    population: Int!
    metrics: Metric!
    riskLevels: RiskLevel!
    actuals: Actual!
    lastUpdatedDate: String
    url: String
    metricsTimeseries: [Metric!]
    actualsTimeseries: [Actual!]
    riskLevelsTimeseries: [RiskLevel!]
  }

  type State {
    fips: String!
    country: String!
    state: String!
    population: Int!
    metrics: Metric!
    riskLevels: RiskLevel!
    actuals: Actual!
    lastUpdatedDate: String
    url: String
    metricsTimeseries: [Metric!]
    actualsTimeseries: [Actual!]
  }

  type Metric {
    testPositivityRatio: Float
    caseDensity: Float
    contactTracerCapacityRatio: Float
    infectionRate: Float
    infectionRateCI90: Float
    icuHeadroomRatio: Float
    icuHeadroomDetails: ICUHeadroomDetails
    icuCapacityRatio: Float
    date: String
  }

  type ICUHeadroomDetails {
    currentIcuCovid: Int
    currentIcuCovidMethod: String
    currentIcuNonCovid: Int
    currentIcuNonCovidMethod: String
    icuCapacityRatio: Float
  }

  type RiskLevel {
    overall: Int
    testPositivityRatio: Float
    caseDensity: Float
    contactTracerCapacityRatio: Float
    infectionRate: Float
    icuHeadroomRatio: Float
    icuCapacityRatio: Float
    date: String
  }

  type Actual {
    cases: Int
    deaths: Int
    positiveTests: Int
    negativeTests: Int
    contactTracers: Float
    hospitalBeds: HospitalBed
    icuBeds: ICUBed
    newCases: Int
    date: String
  }

  type HospitalBed {
    capacity: Int
    currentUsageTotal: Int
    currentUsageCovid: Int
    typicalUsageRate: Float
  }

  type ICUBed {
    capacity: Int
    currentUsageTotal: Int
    currentUsageCovid: Int
    typicalUsageRate: Float
  }
`
```

I went all out here on models. I left very few keys out and got a lot of great information here. Start small and incrementally add-in types if this is a lot. Or get it all done in one pass.

![Go for it all](https://media.giphy.com/media/QLkC9I8VTwkdW/giphy.gif)

### Update Resolvers to Resolve Correctly

As part of any of our query functions, there is a list of inputs provided to each query.

```js
fieldName: (parent, args, context, info) => data
```

We don't need `parent` or `info` for our functions but what we do need is access to the input `args` or arguments and the `context` because that includes our `dataSources` nested inside our defined Apollo GraphQL server.

```js
// resolvers.js
Query: {
    counties: (_, __, { dataSources }) => dataSources.covidApi.getAllCounties(),
    county: (_, { fips }, { dataSources }) => dataSources.covidApi.getCounty(fips),
    states: (_, __, { dataSources }) => dataSources.covidApi.getAllStates(),
    state: (_, { stateCode }, { dataSources }) => dataSources.covidApi.getState(stateCode),
},
```

### Validate

Once you've wired up your newly created REST Data source to resolvers, you should be able to test in the playground!

![Validate a few queries](/img/validate-queries.png)

## Faking a Relationship Through API Calls

Let's say the consumers of this API are building a US map showcasing a state and it's counties impact from Covid-19. They want both a US state and all counties to render their UI. If this isn't already a REST endpoint, it is two endpoints: the `/state/OH` and the `/counties` endpoints. Let's combine these to push off the lifting to GraphQL and away from the client-side.

### Add County Array to State

```json
// schema.js
const typeDefs = gql`
  type State {
    counties: [County!] // highlight-line
    fips: String!
    country: String!
    state: String!
    population: Int!
    metrics: Metric!
    riskLevels: RiskLevel!
    actuals: Actual!
    lastUpdatedDate: String
    url: String
    metricsTimeseries: [Metric!]
    actualsTimeseries: [Actual!]
  }

```

### Get Counties in `getState`

```js
// CovidActNowAPi.js

  async getState(stateCode) {
    const state = await this.get(
      `state/${stateCode}.timeseries.json?apiKey=${process.env.COVID_ACT_NOW}`
    );
    const counties = await this.get(`counties.json?apiKey=${process.env.COVID_ACT_NOW}`);

    return {
      ...state,
      counties: counties.filter(({ state: stateCode }) => stateCode === state.state),
    };
  }
```

If you want you could also add counties to the `getAllStates` function at this time. Although it won't perform well, it is better here rather than on the client-side.

![Laughter](https://media.giphy.com/media/lszAB3TzFtRaU/giphy.gif)

### Validate Counties in State

Test out to make sure you can query what you expect.

```json
{
  state(stateCode:"OH"){
    state
    counties{
      fips
      county
      population
      metrics{
        testPositivityRatio
      }
      actuals{
        cases
        deaths
      }
    }
  }
}
```

![Example state including counties](/img/state-counties-query.png)

# Up Next: Schema First vs. Code First

If you're interested in learning the pro's and con's behind these two GraphQL approaches, stay tuned for my next post where we will take the API written in this tutorial and take it a step further by switching from schema first to code first and scaling up with better developer tooling. I'm kind of winging it on where to go next. If you want to see something specific let me know!

![Immediately rethinking my decision](https://media.giphy.com/media/bI5BEfwbdVPcA/giphy.gif)

# Summary

We have created a GraphQL API from scratch, built a REST service data source to leverage our existing services, and got to utilize the playground to start to see some of those GraphQL perks. If you got lost at any point [here](https://github.com/keonik/covid-graphql) is the repository code on the `part-1` branch. You also can reference the [playground](https://covid-act-now-graphql.herokuapp.com/) hosted on Heroku to try out some queries.

![Old School reference - You're my boy blue!](https://media.giphy.com/media/11p1o3yoAQ7Sne/giphy.gif)
