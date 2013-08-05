<?php

$title=$_REQUEST['title'];
if ((is_null($title)) || (strlen($title)==0)) {
	$message='Error: empty title';
	die($message);
}

$image=$_REQUEST['image'];
if ((is_null($image)) || (strlen($image)==0)) {
	$message='Error: empty image';
	die($message);
}

$url=$_REQUEST['url'];
if ((is_null($url)) || (strlen($url)==0)) {
	$message='Error: empty url';
	die($message);
}

$description=$_REQUEST['description'];
if ((is_null($description)) || (strlen($description)==0)) {
	$message='Error: empty description';
	die($message);
}


header('Location: '.$url);

echo '<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">'."\n";
echo '<html>'."\n";
echo '<head>'."\n";

// for Facebook
echo '<meta property="og:type" content="article" />'."\n";
echo '<meta property="og:title" content="'.$title.'" />'."\n";
echo '<meta property="og:description" content="'.$description.'" />'."\n";
echo '<meta property="og:image" content="'.$image.'" />'."\n";
echo '<meta property="og:url" content="'.$url.'" />'."\n";



// for Twitterphp
echo '<meta name="twitter:card" content="summary" />'."\n";
echo '<meta name="twitter:title" content="'.$title.'" />'."\n";
echo '<meta name="twitter:description" content="'.$description.'" />'."\n";
echo '<meta name="twitter:image" content="'.$image.'" />'."\n";
echo '<meta name="twitter:url" content="'.$url.'">'."\n";
echo '<meta name="twitter:site" content="@Les_AOF">'."\n";

echo '</head>'."\n";
echo '<body>'."\n";
echo '<script>window.location="'.$url.'"</script>';
echo '</body>'."\n";
echo '</html>';


?>