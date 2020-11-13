---
path: upgrade-from-react-16-to-17
date: 2020-10-26T01:12:58.029Z
lastUpdated: 2020-10-27T04:22:56.039Z
title: Upgrading from React 16 to React 17
description: The time has come to upgrade and although the team says there are no new changes, development speed will increase for many
tldr: npm install react-scripts@4.0.0 react@17.0.0 react-dom@17.0.0, rm -rf node_modules package-lock.json, npm install, npm run build, resolve any eslint errors
image: /img/webstack_bandaids.jpg
tags:
  - react
  - create react app
  - fast refresh
---

# Table of Contents

```toc

```

## New Release

As with any major release there are typically breaking changes. Although the change log for React states ["No New Features"](https://reactjs.org/blog/2020/10/20/react-v17.html#no-new-features) there are a [few](https://github.com/facebook/react/blob/master/CHANGELOG.md#1701-october-22-2020). The TLDR for this is a preparation for the next version to resolve many issues they forsee in migration to the new major version. I'm going to highlight some changes with React and [Create React App](https://create-react-app.dev/) that will clean up code and increase some efficiency

### JSX transform

Plenty of posts have already [summarized](https://reactjs.org/blog/2020/09/22/introducing-the-new-jsx-transform.html) this so I'm not gonna spend too much time on this. TLDR:

| New Benefit                                   | Problems it solved                                                                                                          |
| --------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------- |
| No longer need to `import React from 'react'` | JSX is understood by all files compiled below the root, possibly slightly smaller bundle sizes, and enabled future releases |

### Fast Refresh

`react-refresh` is the successor for `react-hot-loader`. For a long time hot loading in react has been a great developer experience where we can keep our frontend application running and it will refresh when the changes are detected. What react-refresh does is a step further. If you are someone who builds client side rendered applications and pass around a lot of state management in tools such as react context, redux, apollo, or really any react hooks, changes to your code no longer do a complete page refresh! It stores many of those changes and updates only the changes being made. My coworkers and I will love this because we have quite a bit of complex state management being passed around so we no longer lose our place when we want to make a minor JSX change! Here's a preview

![Fast Refresh](https://user-images.githubusercontent.com/1770056/75599918-5c0a2c00-5a77-11ea-92d3-278fa044e8c6.gif)

Notice the changes to the return JSX and the imports and it still stores state. Get excited! I am!

## Migrating an unejected Create React App project

### Install updated packages

```bash
npm install react-scripts@4.0.0 react@17.0.0 react-dom@17.0.0
```

### Remove old installation and version lock file

```bash
rm -rf node_modules package-lock.json
```

Although this isn't necessary if you run into any odd eslint related errors I found doing a clean install removed quite a few for me

### Reinstall

```bash
npm install
```

### Rebuild

```bash
npm run build
```

This is really only applicable to typescript projects. There is a flag that you'll see get set and after that...

### Restart your app

```bash
npm run start
```

#### Potential issues others are running in to

Since create-react-app [updated their eslint setup](https://github.com/facebook/create-react-app/blob/master/CHANGELOG.md#eslint) you may see some errors thrown that are new. I just spent the time to understand them and resolve them as I see fit. Some of the rules such as import order we're incorrect because I was using a relative import plugin. If you run into any other problems look for an existing issue or create your own [here](https://github.com/facebook/create-react-app/issues)

##### Other issues

If you find an issue that hasn't been captured by the facebook/create-react-app team [here](https://github.com/facebook/create-react-app/issues) be a good open source developer and create an issue. I had one where I was referencing an image under my `public/` directory in a sass file to use as a `background-image:...` reference when myself and others realized the public directory is no longer available. Read more on this issue [here](https://github.com/facebook/create-react-app/issues/9937)

## Migrating other projects

For most cases you still would install the updates

```bash
npm install react@17.0.0 react-dom@17.0.0
```

After that you would lookup your specific platform. Both webpack and babel have plugins to help with the fast refresh and JSX transform config. If you're using other setup's such as react-app-rewired or nextjs refer to their documentation to lookup how others are migrating. It's less common so I am not going to be able to stay up to date with the latest way to migrate.

![That is all folks. Thanks for tuning in](https://media2.giphy.com/media/Mp4hQy51LjY6A/giphy.gif?cid=6104955e97f054e33d0ddf8e0e9f32c3b6ad76176e3ed6b0&rid=giphy.gif)
