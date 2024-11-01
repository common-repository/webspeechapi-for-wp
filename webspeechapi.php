<?php
/**
* @package WebSpeechAPI for WP
* @version 1.1
*/
/*
Plugin Name: WebSpeechAPI for WP
Plugin URI: https://www.value-web.asia/
Description: WebSpeechAPI for WP.
Author: Cross&Crown LLC
Version: 1.1
Author URI: http://www.crossandcrown.co.jp/
*/

function wsapiwp_admin_script(){
		wp_enqueue_script('wsapiwp_script', plugins_url('js/webspeechapi.js',__FILE__));
}
add_action( 'admin_enqueue_scripts', 'wsapiwp_admin_script' );

function wsapiwp_admin_style(){
		wp_enqueue_style('wsapiwp_css', plugins_url('css/style.css',__FILE__));
}
add_action( 'admin_enqueue_scripts', 'wsapiwp_admin_style' );

function wsapiwp_voice_btn_title_bottom(){ ?>

<div class="wsapiwp_body clearfix">
	<div class="wsapiwp_content_left">
    	<h2>Interim sentence:</h2>
	    <span id="progress" cols="" rows="3"></span>
	</div>
	<div class="wsapiwp_content_right">
	<h2>Status:<span id="status"></span></h2>
	    <div class="wsapiwp_content_btns"><input type="button" onClick="wsapiwp_function();" value="START" id="speech_start">
	    <input type="button" value="STOP" id="speech_stop"></div>
	</div>
</div>

<hr>
<?php }
add_action( 'edit_form_after_title', wsapiwp_voice_btn_title_bottom );

