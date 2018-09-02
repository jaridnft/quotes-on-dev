(function($) {
  'use strict';
  $('.quote-submission-wrapper input[type=submit]').on('click', function(
    event
  ) {
    event.preventDefault();

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
      .fail(() => {
        $('.entry-header').after(
          `<p style="color:red;">${
            apiVars.failure
          } Please refresh the page and try again.</p>`
        );
        $('.quote-submission-wrapper').slideUp();
      });
  });
})(jQuery);
