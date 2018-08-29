<?php
/**
 * The main template file.
 *
 * @package QOD_Theme
 */

get_header(); ?>

<main id="main" class="site-main" role="main">

	<?php if ( have_posts() ) : ?>

		<?php /* Start the Loop */ ?>
		<?php while ( have_posts() ) : the_post(); ?>

			<?php
			/**
			 * Content Template
			 */
			get_template_part( 'template-parts/content' ); ?>

		<?php endwhile; ?>

	<?php else : ?>

		<?php get_template_part( 'template-parts/content', 'none' ); ?>

	<?php endif; ?>

</main><!-- #main -->

<?php get_footer(); ?>
