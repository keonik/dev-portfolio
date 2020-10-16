---
path: catching-up-a-forked-repo
date: 2020-10-16T01:12:58.029Z
lastUpdated: 2020-10-17T01:12:56.039Z
title: Catching up a forked repo on GitHub
description: When contributing to open source repositories you often need to catch up your fork of that repository to submit a contribution. Here's how to do it
tldr: add remote origin as upstream, fetch upstream, checkout master, merge upstream/master
image: /img/richy-great-github-unsplash.jpg
tags:
  - github
  - open source
  - git
---

# Table of Contents

```toc

```

## Story time

I was trying to do a rewrite of an open source project I frequently use to benefit from typescript. I submitted my PR and I was excited about it!

![Open Source comment](/img/github-open-source-comment.png)

Others gave me some positive feedback and things were progressing, but there were other priority requests in the backlog. My contribution was overlooked for a bit as expected. Most of these people aren't getting paid to maintain a project. They do it as courtesy and way to give back to the community that has done it for them in the past 💪

The other requests were approved and merged into `master` and I realized there were many conflicts (it was a complete typescript rewrite so...). I wanted to resolve them quickly but ran into a new case I have yet to need to know until now. Someone else could learn from this so here's my quick take on it including some context

![Because that is what good people do](https://media3.giphy.com/media/gg9LCtsjjBninkG52i/giphy-downsized.gif?cid=6104955e88c4cd9d467590ce06a7cfa4f49ee86153b09ae0&rid=giphy-downsized.gif)

## Why should we contribute to open source projects?

If you haven't contributed to any open source projects I would encourage you to do so. Even the simplest things such as a typo in documentation will change the way you consume as a javascript developer

### Avoid giving up on a project

I've heard many people complain about how a library isn't working for their use case so they give up on it. Some of these abandonments are warranted...many are not. It is often complaints that continue person to person until someone is courteous enough to report an issue to the maintainer

### Relieving some duties of the maintainer(s)

The next adventure is addressing and prioritizing the work so someone can start. You can imagine being a maintainer would be stressful if it all fell to you. By writing up the issue and contributing some code these maintainers should be ecstatic to see the community engaged in their work and wanting to improve on it

### Changing your outlook

I often run into people that don't grasp how the open source repositories get updated. For some reason it's easy to assume these are well funded organizations that will tackle every and all issues in a short time.

![Haha good one](https://media4.giphy.com/media/4T3r8IKOkGDcLKBJ6y/giphy.gif?cid=6104955ed6909916cd9742d6474f68fe5e060573dc74dabb&rid=giphy.gif)

Getting into the code and contributing will show you how it all works! All the effort put in by everyone to build something useable is fascinating to me and I love the idea of helping to benefit more than yourself.

### It's good for resume building and networking

This one is self explanatory but shouldn't be your top reason for contributing but...

![You do you bud](https://media2.giphy.com/media/3o7btPUCHe5SptITo4/giphy.gif?cid=6104955effd2f64ef70e747c30756575a7cb783578effd50&rid=giphy.gif)

## How

Cool so we're ready to catch up our contribution... Story time is over. Let's do this!

### Prerequisites

1. You've already forked the repository

2. You've created a branch and PR to go into the original maintainer project

3. You have conflicts or an out of date forked repository

4. You're tired of reading leading in information and want to see what to do

### Configure git remote for the forked repository

For my example I'll be contributing to the [react iOS PWA prompt](https://github.com/chrisdancee/react-ios-pwa-prompt/pull/49). If you haven't seen it and enjoy the idea of [PWA's](https://web.dev/progressive-web-apps/) check it out! iOS users don't have the generic google PWA prompt so this creates a react component to handle that case

```bash
git remote add upstream https://github.com/chrisdancee/react-ios-pwa-prompt.git
```

If you'd like to validate it worked you can run

```bash
git remote -v
```

and should see it listed as one of the remote repositories

### Checkout master

```bash
git checkout master
```

### Merge upstream remote to master

```bash
git merge upstream/master
```

### Push it to your forked repo

```bash
git push
```

### Checkout your branch that is currently under review

```bash
git checkout {name-of-branch}
```

### Resolve the conflicts

Make sure you test and do all you can to catch the errors that could have been introduced by the new code 🤞

### Push that out

```bash
git push
```

### If you have to notify appropriate maintainers

I typically just tag them in the PR to let them know it's good to go

![Notification to maintainers](/img/notification-to-maintainers.png)

## You're done! 🎉

![Celebrate](https://media1.giphy.com/media/6nuiJjOOQBBn2/giphy.gif?cid=6104955e84eaf10d9a63254d453351fcdc4cbbec18a5fa39&rid=giphy.gif)
