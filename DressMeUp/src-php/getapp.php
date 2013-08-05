<?php
//Usage:
//getapp.php?appid=dm

//define
//hidden folder. Note: add / at the end
$SOURCE_FOLDER			= 'hidden_2879e2343GDd030Po/';



class App
{
	public $name;
	public $googlePlayRedirectLink;
	public $appStoreRedirectLink;
	public $defaultRedirectLink;
}


$dressMeUpApp = new App();
$dressMeUpApp->name = 'Dress Me Up';
$dressMeUpApp->googlePlayRedirectLink = 'http://play.google.com/store/apps/details?id=com.axisapplications.axistravelmobile';
$dressMeUpApp->appStoreRedirectLink = 'http://www.dressmeup.com/download';
$dressMeUpApp->defaultRedirectLink = 'http://www.dressmeup.com/download';

//register all appid and matching app
$apps = array(
		'dm' => $dressMeUpApp,
);

//define
function getClientIP() {
	$ip;
	if (getenv("HTTP_CLIENT_IP")) {
		$ip = getenv("HTTP_CLIENT_IP");
	} else if(getenv("HTTP_X_FORWARDED_FOR")) {
		$ip = getenv("HTTP_X_FORWARDED_FOR");
	} else if(getenv("REMOTE_ADDR")) {
		$ip = getenv("REMOTE_ADDR");
	} else {
		$ip = "UNKNOWN";
	}
	return $ip;
}


//log file
$logFile		= $SOURCE_FOLDER.'getapp.log';
function logMessage($message) {
	global $logFile;
	
	//append log to file
	$clientIP	= getClientIP();
	$fileHandler	= fopen($logFile, 'a') or die('Could not log download. Please contact support@axisapplications.com');
	fwrite($fileHandler, date("Y-m-d H:i").'  '.'['.$clientIP.']: '.$message."\n");
	fclose($fileHandler);
}

//get appid
$appid=$_REQUEST['appid'];
if ((is_null($appid)) || (strlen($appid)==0)) {
	$message='Error: empty appid.';
	logMessage($message);
	die($message);
}

//check if appid exist in table
$app=$apps[$appid];
if (is_null($app)) {
	$message='Error: unknown appid ['.$appid.'].';
	logMessage($message);
	die($message);
}



//recognize phone
$httpUserAgent=$_SERVER['HTTP_USER_AGENT'];

$iPod = stripos($httpUserAgent,"iPod");
$iPhone = stripos($httpUserAgent,"iPhone");
$iPad = stripos($httpUserAgent,"iPad");
$Android= stripos($httpUserAgent,"Android");
//$palmpre = stripos($_SERVER['HTTP_USER_AGENT'],"webOS");
//$berry = stripos($_SERVER['HTTP_USER_AGENT'],"BlackBerry");


//create redirect link
$redirectLink=$app->defaultRedirectLink;
//check if user is using ipod, iphone or ipad...
if ( $iPod || $iPhone || $iPad ) {
	$redirectLink=$app->appStoreRedirectLink;
} else if ($Android) {
	$redirectLink=$app->googlePlayRedirectLink;
}


//redirect
header('Location: '.$redirectLink);
echo "<script>window.location='".$redirectLink."'</script>";

logMessage('User httpUserAgent=['.$httpUserAgent.'] redirected to ['.$redirectLink.']');

?>