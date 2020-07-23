---
title: 'How to create a Chrome Extension that saves things to the clipboard' 
excerpt: A tutorial on how to create a chrome extension
date: '2020-07-23T07:22:34Z'
# date -u +"%Y-%m-%dT%H:%M:%SZ"
author:
  name: Richard McSorley
---

In this tutorial we'll create a chrome extension that copies github repository URLs to your clipboard.

I recently created an extension for my stock brokage
check out the source code to M1 Export [here](https://github.com/RichardMcSorley/M1-Export-Chrome-Extension).


## 1. Permissions First

First we'll need to create a manifest file. I'd recommend to create a new directory for this extension project.

manifest.json
```json
{
    "name": "Copy stuff",
    "description": "Copy stuff from the the dom",
    "version": "1.0",
    "manifest_version": 2,
    "permissions": ["contextMenus"],
    "background":
        {
            "scripts": ["background.js"]
        },
    "content_scripts": [
        {
            "matches": ["https://github.com"],
            "js": ["content.js"]
        }
    ],
    "icons": {
      "16": "images/16.png",
      "32": "images/32.png",
      "48": "images/48.png",
      "128": "images/128.png"
    }
}
```


manifest.json
```json
    ...
    "name": "Copy stuff",
    "description": "Copy stuff from the the dom",
    "version": "1.0",
    ...
```
"name, description, version" These should feel pretty familiar if you've worked on nodeJS libraries i.e. package.json files.

In permissions we'll need to declare a list of things our extension needs access to, in this case we just need access to context menus. You can find other permissions in google's documentation [here](https://developer.chrome.com/extensions/permission_warnings).

```json
    "permissions": ["contextMenus"],
```

![a chrome context menu](https://i.stack.imgur.com/jy3gn.png)

We also need to declare which sites our code is injectable. We'll be creating the content.js file in a bit.

```json
    "content_scripts": [
        {
            "matches": ["<all_urls>"],
            "js": ["content.js"]
        }
    ],
```

Background scripts are those that run in the background, separate from the current tab the user is looking at. Later we'll talk about message passing between content.js and background.js

```json
    "background":
        {
            "scripts": ["background.js"]
        },
```

And finally the icons for the extension, this is optional unless you plan to deploy your extension to the [Chrome Web Store](https://chrome.google.com/webstore/category/extensions).

```json
    "icons": {
      "16": "images/16.png",
      "32": "images/32.png",
      "48": "images/48.png",
      "128": "images/128.png"
    }
```

## 2. Creating the Context Menu

We'll want to create a background.js file like so:


background.js
```javascript
chrome.contextMenus.create({
    id: "copy",
    title: "Copy Repos to Clipboard",
    onclick: () => send("copy"),
    documentUrlPatterns: ["https://github.com/*"]
});

function send(type) {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, type);
    });
}
```

The first part creates a context menu with an onclick function.

The send function will query for the current active tab and send a message to that tab.

Next we'll need to setup our content.js script.


## 3. Copying to the clipboard

We'll need to listen for messages being sent by the background.js script so next we'll create a content.js file:

content.js
```javascript

chrome.runtime.onMessage.addListener(function (message) {
    if (message === "copy") copy();
});

function copy(){
    const urls = [...document.querySelectorAll('a[itemprop*="codeRepository"]')].map(elm=>elm.href);
    const text = urls.join('\n')
    navigator.clipboard
    .writeText(text)
    .then(
        () => {
            console.log("Copied to clipboard.");
        },
        e => {
            alert("Could not copy to clipboard. Please try again");
        }
    );
}
```

The first part here sets up a listener for messages.

When a message with the with the string `copy` is sent we'll then call the copy function.

The copy function creates an array of urls on the page with the query selector `a[itemprop*="codeRepository"]` if you open the chrome developer tools on github you'll see a tags with this property set, this is how we only select github repo links on the page.

We then use the join function to convert the urls array into a string and that separates each url by a new line `\n`.

## 4. Test it out


1. In Chrome go to [chrome://extensions](chrome://extensions) -> Enable "Developer Mode"

> Alternatively go to Menu -> More tools -> Extensions -> Enable "Developer mode".

2. Finally click “Load unpacked” and open your project's directory.

3. See it in action, right click on a github page and see if anything copies to the clipboard. You can try it at this url [here](github.com/richardmcsorley)

## 5. Final thoughts

This is a great way to add functionality to existing websites. You can imagine you can extract or manipulate elements on the DOM in any fashion.

After all is said and done. You might ask "Where to go from here?"

- [Chrome Extension Documentation](https://developer.chrome.com/extensions)
- [Publish your extension](https://chrome.google.com/webstore/devconsole/)