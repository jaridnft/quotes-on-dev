# 'Quotes on Dev' Generator

#### Author: Jarid Warren [ <jaridwarren@gmail.com> ]

WordPress based quote generator that uses a REST 'GET' API to fetch posts from the backend. In addition, a section to submit your own quotes is included and executed with the 'POST' API.

<img src="/themes/quotesondev-theme/assets/images/readme-images/get-demo.gif" width="425"><img src="/themes/quotesondev-theme/assets/images/readme-images/post-demo.gif" width="425">

## Motivation

The intention of this project is get experience with WP's REST API. The website utilizes a 'GET' request to generate new quotes from WordPress, and also allows users to submit their own quote with a 'POST' request.

## Technology

- <img src="./themes/quotesondev-theme/assets/images/readme-images/js.svg" width="15"> JavaScript ES6 / <img src="./themes/quotesondev-theme/assets/images/readme-images/jquery.svg" width="40"> jQuery
- <img src="./themes/quotesondev-theme/assets/images/readme-images/wordpress.svg" width="18"> WordPress / REST API / <img src="./themes/quotesondev-theme/assets/images/readme-images/php.svg" width="23"> PHP
- <img src="./themes/quotesondev-theme/assets/images/readme-images/npm.svg" width="20"> npm / <img src="./themes/quotesondev-theme/assets/images/readme-images/gulp.svg" width="10"> Gulp / <img src="./themes/quotesondev-theme/assets/images/readme-images/babel.svg" width="30"> Babel
- <img src="./themes/quotesondev-theme/assets/images/readme-images/sass.svg" width="20"> Sass / <img src="./themes/quotesondev-theme/assets/images/readme-images/css3.svg" width="12"> CSS3

## Code Sample

Each time a new quote is input, an ajax 'POST' request grabs field data to send to the WordPress backend. Here, custom fields are used to store the quote source and author information:

```javascript
$.ajax({
  method: 'POST',
  url: `${apiVars.restUrl}wp/v2/posts/`,
  data: {
    _qod_quote_source: $('#quote-source').val(),
    _qod_quote_source_url: $('#quote-source-url').val(),
    title: $('#quote-author').val(),
    content: $('#quote-content').val(),
    status: 'pending'
  },
  beforeSend: xhr => xhr.setRequestHeader('X-WP-Nonce', apiVars.nonce)
})
  .done(() => {
    $('.entry-header').after(`<p>${apiVars.success}</p>`);
    $('.quote-submission-wrapper').slideUp();
  })
  .fail(() => alert(apiVars.failure));
```

## Setup

**Install WordPress:**

- [Download Wordpress](https://wordpress.org/latest.zip) and place directory at root of server (you'll need a tool like [MAMP](https://www.mamp.info/en/) if you wish to host locally)
- Replace `themes`, `plugins` and `uploads` folders from install with ones in this repo

**Initialize NPM:**

`> npm init`

**Install Gulp:**

`> npm install`

**Convert Sass files to CSS:**

`> gulp sass`

**Call Babel & Uglify on JS files:**

`> gulp scripts`

**Launch Browser-Sync to automatically update changes:**

`> gulp browser-sync`

**Watch changes to Sass/JS and automatically run scripts/sass:**

`> gulp watch` or `gulp`

