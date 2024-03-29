<?php
/**
 * The template for displaying archive pages.
 *
 * @package QOD_Theme
 */


get_header(); ?>

<div id="primary" class="content-area">
    <main id="main" class="archive-main" role="main">

		<?php if ( have_posts() ) : ?>

            <header class="page-header">
				<?php the_archive_title( '<h1 class="page-title">', '</h1>' ); ?>
            </header><!-- .page-header -->

			<?php /* Start the Loop */ ?>
			<?php while ( have_posts() ) : the_post(); ?>

				<?php
				get_template_part( 'template-parts/content' );
				?>

			<?php endwhile; ?>

			<?php qod_numbered_pagination(); ?>

		<?php else : ?>

			<?php get_template_part( 'template-parts/content', 'none' ); ?>

		<?php endif; ?>

    </main><!-- #main -->
</div><!-- #primary -->

<?php get_footer(); ?>
