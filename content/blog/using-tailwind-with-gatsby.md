---
path: using-tailwind-with-gatsby
date: 2020-09-20T02:12:58.029Z
lastUpdated: 2020-09-21T02:18:56.039Z
title: Using Tailwind CSS with Gatsby
description: Tailwind takes writing CSS down to a fraction by providing many easy to use classes so you can focus on functionality over flash. In this walk through I'm going to be covering how to add Tailwind CSS to a Gatsby project
tldr: Install tailwind css, gatsby plugins including purgecss, restart your gatsby server, and test with some of the basics such as changing background color (bg-teal-600)
image: /img/tailwind.png
tags:
  - Tailwind
  - CSS
  - Gatsby
  - React
---

# Table of Contents

```toc

```

## Why

Why do anything? As of writing this post I am using [bulma](https://bulma.io/). I enjoyed it initially but it got to a point where I was having to overwrite many of their container classes to do simple things like have a responsive site on mobile and desktop platforms. I had the argument of "Why didn't I just write this from scratch" many of times already.

![Why do anything?](https://media3.giphy.com/media/nhYGNAUuxDua4/giphy.gif?cid=6104955e8bb0b4fc72e7a2ff8f904b535862bcd69d6e34cb&rid=giphy.gif)

Coworkers have mentioned this [Tailwind CSS](https://tailwindcss.com) after numerous complaints of the amount of time I spend styling something to do generic things. After looking at it for a bit I gained interest into it enough so to entertain a complete rewrite of my developer site you're referencing now. I've been treating this site as a platform to try out new things. By the time you view this post you may see the new site or the old. Regardless I am going to keep the old site on the `pre-tailwind` branch so you can reference a before and after.

## What is [Tailwind CSS](https://tailwindcss.com/#what-is-tailwind)

Can't say it any better than their docs do. Summary incoming!

### Great documentation

Nothing is ever enjoyable to develop with if the documentation is hard to understand. No matter where I'm at I can find the low level class definitions quickly using their documentation. Starting straight from the [homepage](https://tailwindcss.com) hit the `/` and type `colors` and get links to documentation relavent to your search 🎉. As a backup, if I want to lookup the colors provided I can either go to the ole [Senior software engineering experience](https://google.com) and type in `tailwindcss colors` and I get great [SEO](https://en.wikipedia.org/wiki/Search_engine_optimization)

### Avoid the "Use this component do x and y" and just give you access to the low-level classes

I can't tell you how many times I tried using a hero component or a flex box setup to support mobile and desktop that flat out led me down a path of hatred for css. I like many other [React](https://reactjs.org/) developers love making components and using props to scale them for the situation as they arise. Tailwind gives me that access toCSSutility classes I would write myself in the past

### "Responsive to the core"

Back to the mobile and desktop config failures in my past experiences... I'm still testing this out so I'm not totally sold here. So far it's very promising!

### Designed to be customized

Overwriting default configuration can be done in multiple places but I enjoy this setup

```js
// tailwind.config.js
module.exports = {
  theme: {
    screens: {
      tablet: "768px",
      desktop: "1024px"
    },
    colors: {
      primary: {
        100: "#ebf8ff",
        300: "#90cdf4",
        500: "#4299e1",
        700: "#2b6cb0",
        900: "#2a4365"
      },
      secondary: {
        100: "#fffff0",
        300: "#faf089",
        500: "#ecc94b",
        700: "#b7791f",
        900: "#744210"
      }
    },
    extend: {
      boxShadow: {
        huge: "0 30px 60px -15px rgba(0, 0, 0, .25)"
      }
    }
  }
}
```

You can easily add/overwrite any of their existing classes in one spot

## How

For this example I will be making the changes directly to my [personal developer site](https://github.com/keonik/dev-portfolio). If you'd like to follow along start on the `pre-tailwind` branch. Feel free to tag along in my repo or translate to your own.

```shell
git clone https://github.com/keonik/dev-portfolio && cd dev-portfolio && git checkout pre-tailwind
```

I may make references to certain directories or file structure for a smoother walk through. If you'd like to follow along please checkout/fork this repo and start on the `pre-tailwind` branch.

### 1. Add dependencies to your existing project

I'm using [yarn](https://yarnpkg.com/) but feel free to swap out any yarn calls with [npm](https://www.npmjs.com/)

```shell
yarn add  tailwindcss gatsby-plugin-postcss
```

`gatsby-plugin-postcss` will resolve imports to use tailwind on build

### 2. Add this plugin into your gatsby config

```js
module.exports = {
    ...,
    plugins: [
        ...
        // highlight-start
        {
        resolve: `gatsby-plugin-postcss`,
        options: {
            postCssPlugins: [require("tailwindcss")],
            },
        },
        // highlight-end
        ...
    ],
    ...
};
```

### 3. Initialized a config file for Tailwind CSS

```shell
npx tailwindcss init
```

You should now see a new file `tailwind.config.js`. Although you might not need this config file you can override and change themes easily using this file in the future.

### 4. Create a CSS file and import tailwind packages

Create and open a new file

```shell
touch src/assets/tailwind.css && code src/assets/tailwind.css
```

Import Tailwind CSS packages

```css
@tailwind base;

@tailwind components;

@tailwind utilities;
```

### 5. Import your CSS file into gatsby's browser step

```
import "./src/assets/tailwind.css"
```

### 6. Test to ensure Tailwind CSS is ready for use!

Because we changed things in the `gatsby-config.js` and `gatsby-browser.js` we typically need to restart our gatsby server. So cancel your currently running server and restart it

```shell
killall node -9 && yarn start
```

Let's test out a change on the home page which is located at `src/pages/index.tsx`

```shell
    code src/pages/index.tsx
```

To quickly test if it is working lets apply a background color to an element

```tsx
const IndexPage = ({ data }) => {
  const image = data?.file?.childImageSharp?.fixed
  return (
    <Layout>
      <SEO title="Home" />
      // highlight-next-line
      <div className="columns bg-teal-600">
        <div className="column">
          <div className="content">
            <h1 className="title is-1">John Fay</h1>
            <h2 className="title">Software Engineer</h2>
            <p>
              Hello. I'm a Software Engineer working remotely from
              Ohio, US.
            </p>
            <p>
              I make web applications, usually with React, Node, and
              Postgres
            </p>
          </div>
        </div>
        <div className="column">
          {image && (
            <Img style={{ borderRadius: "50%" }} fixed={image} />
          )}
        </div>
      </div>
    </Layout>
  )
}
```

If successful you should see a home page with a teal background like...

![Teal background home page](/img/teal-homepage.png)

#### 🎉🎉🎉 Good to go?

Not quite! Tailwind includes all of its CSS at once in the current configuration. You can view this by taking a look at the page source and seeing how much CSS is included per page... or you can just trust me and I'll show you how to remove it

![Trust me](https://media0.giphy.com/media/gk3R16JhLP8RUka2nD/giphy.gif?cid=6104955e0b97e9e4ba45f9bfd5cc1e75ffd90d8a30631817&rid=giphy.gif)

### 7. Remove unused Tailwind CSS code

Install purge-css which trims out unused CSS for you!

```shell
yarn add gatsby-plugin-purgecss
```

Add in the plugin to `gatsby-config.js`

```js
module.exports = {
    ...,
    plugins: [
        ...
        {
            resolve: `gatsby-plugin-postcss`,
        options: {
            postCssPlugins: [require("tailwindcss")],
            },
        },
        // highlight-start
        {
            resolve: `gatsby-plugin-purgecss`,
            options: {
                printRejected: false,
                develop: false,
                tailwind: true
            }
        },
        // highlight-end
        ...
    ],
    ...
};
```

Restart your gatsby server

```shell
killall node -9 && yarn start
```

![🎉 And we're off!](https://media3.giphy.com/media/WOYKaXG2xJsBO/giphy.gif?cid=6104955ebaab207d21c51268597be29958df5cd9ce84f607&rid=giphy.gif)

## Summary

Thus far we've learned

- how to add tailwind to a gatsby project
- purge unused css.

At this point, my site focus has been to add in and get familiar with gatsby and its plugins. I've got a lot of opportunity to spend some time styling and tweaking my developer site and I've got Tailwind CSS in my back pocket. I will most likely have another post to go through some things I've learned from getting familiar with the Tailwind docs and maybe a little show and tell
