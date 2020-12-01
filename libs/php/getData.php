<?php

ini_set('display_errors', 1);
ini_set('log_errors', 1);
ini_set('error_log', dirname(__FILE__) . '/server_logs.txt');
error_reporting(E_ALL);

$executionStartTime = microtime(true) / 1000;


	function fetch_api($url, $executionStartTime) {

		$ch = curl_init();
		curl_setopt($ch, CURLOPT_URL,$url);
		curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
		
		$result = curl_exec($ch);
		curl_close($ch);
	
		$decode = json_decode($result,true);	
		
		header('Content-Type: application/json; charset=UTF-8');
		$output['status']['code'] = "200";
		$output['status']['name'] = "ok";
		$output['status']['description'] = "mission saved";
		$output['status']['returnedIn'] = (microtime(true) - $executionStartTime) / 1000 . " ms";
		$output['data'] = $decode['geonames'];
		
		return json_encode($output['data']); 
	}

	function getUrl(){
		switch ($_REQUEST['from']) {
			case 'geoWiki':
				return 'http://api.geonames.org/wikipediaSearchJSON??formatted=true&lang=' . $_REQUEST['lang'] . '&q=' . $_REQUEST['query'] . '&username=h5623_cc&style=full';
			break;
			case 'geoNames':
				return 'http://api.geonames.org/searchJSON?q=' . $_REQUEST['query'] . '&maxRows=10&username=h5623_cc';
			break;

			case 'geoCountries':
				return 'http://api.geonames.org/countryInfoJSON?&username=h5623_cc';
			break;
		}
	}

	$url = getUrl();
	echo fetch_api($url, $executionStartTime);

?>
