<?php
/**
 * Template part for displaying posts.
 *
 * @package QOD_Theme
 */

/**
 * CMB2 Fields
 */
$source     = get_post_meta( get_the_ID(), '_qod_quote_source', true );
$source_url = get_post_meta( get_the_ID(), '_qod_quote_source_url', true );
?>

<article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>

    <div class="entry-content">
		<?php the_content(); ?>
    </div><!-- .entry-content -->

    <div class="entry-meta">
		<?php the_title( '<h2 class="entry-title">&mdash; ', '</h2>' );
		/**
		 * CMB2 Fields
		 */
		if ( $source && $source_url ) : ?>
            <span class="source">, <a href="<?php echo $source_url; ?>"><?php echo $source; ?></a></span>
		<?php elseif ( $source ) : ?>
            <span class="source">, <?php echo $source; ?></span>
		<?php else : ?>
            <span class="source"></span>
		<?php endif; ?>
    </div><!-- .entry-meta -->

</article><!-- #post-## -->

<?php if ( is_home() || is_single() ) : ?>
    <button type="button" class="new-quote-button">Show Me Another!</button>
<?php endif; ?>
