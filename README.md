Lesterius (Claris) FileMaker 19 Data API Postman Collection
=======================

# Presentation

## Team
[Lesterius](https://www.lesterius.com "Lesterius") is first and foremost a collective of FileMaker and Web developers who are experts and passionated.\
Sharing knowledge takes part of our DNA, that's why we created this postman collection to make the FileMaker Data API easy-to-use.\
Break the limits of your application!\
![Lesterius logo](http://i1.createsend1.com/ei/r/29/D33/DFF/183501/csfinal/Mailing_Lesterius-logo.png "Lesterius")

## Description

Postman collection for (Claris) FileMaker 19 Data API.

You can find the PHP wrapper of the FileMaker Data API 19 [here](https://github.com/myFMbutler/myFMApiLibrary-for-PHP)<br/>
You can find the Javascript wrapper of the FileMaker Data API 19 [here](https://github.com/myFMbutler/myFMApiLibrary-for-JS)<br/>

You will be able to use every functions like it's documented in your FileMaker server Data Api documentation (accessible via https://[your server domain]/fmi/data/apidoc).
General Claris document on the Data API is available [here](https://help.claris.com/en/data-api-guide/)


## Requirements

- Postman application

## Installation

The recommended way to install it is through [Developer.ft.com](https://developer.ft.com/portal/docs-start-install-postman-and-import-request-collection).

# Usage

## Prepare your FileMaker solution

1. Enable the (Claris) FileMaker Data API option on your FileMaker server admin console.
2. Create a specific user in your FileMaker database with the 'fmrest' privilege
3. Define records, scripts & layouts access for this user

## Use the collection

Don't forget to replace {options} variables by your required options.

## Bonus: No-code Tailwind Website Builder

This repository now includes a Wix-style no-code website builder located at `builder/index.html`.

### What it does
- Drag-and-drop prebuilt sections (hero, text, CTA button, feature cards).
- Edit content and Tailwind CSS classes directly from an inspector panel.
- Reorder sections by dragging them in the canvas.
- Duplicate or remove blocks.
- Choose a JavaScript runtime style for exported sites (`Alpine.js`, `Vue 3`, or `Vanilla JS`).
- Export a deployable `site-export.html` file that can be hosted on any standard web server.

### Run locally
From repository root:

```bash
python3 -m http.server 4173
```

Then open:

- `http://localhost:4173/builder/`

### Hosting exported sites
The exported HTML file is static and can be hosted on:
- Nginx / Apache
- GitHub Pages
- Netlify / Vercel static hosting
- Any CDN or object storage static website hosting
