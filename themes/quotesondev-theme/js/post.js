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
        content: $('#quote-content').val()
      },
      beforeSend: xhr => xhr.setRequestHeader('X-WP-Nonce', apiVars.nonce)
    })
      .done(() => {
        $('.entry-header').after(`<p>${apiVars.success}</p>`);
        $('.quote-submission-wrapper').slideUp();
      })
      .fail(() => alert(apiVars.failure));
  });
})(jQuery);
