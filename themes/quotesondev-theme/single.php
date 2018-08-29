<?php
/**
 * The template for displaying all single posts.
 *
 * @package QOD_Theme
 */

get_header(); ?>

<main id="main" class="site-main" role="main">

	<?php while ( have_posts() ) : the_post(); ?>

		<?php get_template_part( 'template-parts/content' ); ?>

	<?php endwhile; // End of the loop. ?>

</main><!-- #main -->

<?php get_footer(); ?>
