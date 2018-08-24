# 'Quotes on Dev' Generator

#### Author: Jarid Warren [ <jaridwarren@gmail.com> ]

![alt-text](./themes/quotesondev-theme/screenshot.png 'Quotes on Dev Theme Image')

## Motivation

The intention of this project is get experience with WP's REST API. The website utilizes a 'GET' request to generate new quotes from WordPress, and also allows users to submit their own quote with a 'POST' request.

## Technology

- JavaScript ES6 / [jQuery](https://jquery.com/)
- [WordPress](https://wordpress.org/) / [REST API](https://developer.wordpress.org/rest-api/)
- [Gulp](https://gulpjs.com/)
- [Scss](https://sass-lang.com/) / CSS

## Code Sample

Each time a new quote is input, an ajax 'POST' request grabs field data to send to the WordPress backend:

```javascript
$.ajax({
  method: 'POST',
  url: `${apiVars.restUrl}wp/v2/posts/`,
  data: {
    _qod_quote_source: $('#quote-source').val(),
    _qod_quote_source_url: $('#quote-source-url').val(),
    title: $('#quote-author').val(),
    content: $('#quote-content').val()
  },
  beforeSend: xhr => xhr.setRequestHeader('X-WP-Nonce', apiVars.nonce)
})
  .done(() => {
    $('.entry-header').after(`<p>${apiVars.success}</p>`);
    $('.quote-submission-wrapper').slideUp();
  })
  .fail(() => alert(apiVars.failure));
```
