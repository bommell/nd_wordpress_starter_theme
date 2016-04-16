<?php
/*=============================================>>>>>
= functions.php file - here are all the functions =
===============================================>>>>>*/



/*----------- constants -----------*/

define('THEMEROOT', get_stylesheet_directory_uri());




/*----------- loading the scripts -----------*/
if (! function_exists('nd_starter_theme_scripts') ){
  function nd_starter_theme_scripts(){
    // register scripts
    wp_register_script('main-js', THEMEROOT . '/js/dist/script.js', array('jquery'), false, true );

    // load scripts
    wp_enqueue_script('main-js');

    // load stylesheets
    wp_enqueue_style('main-css', THEMEROOT . '/css/style.css');

  }
  add_action('wp_enqueue_scripts', 'nd_starter_theme_scripts');
}


?>
