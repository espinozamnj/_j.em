<?php
require_once("../../src/config.php");
/*
if ($mysqli->connect_error) {
    die('Database Connect Error (' . $mysqli->connect_errno . '): '.$mysqli->connect_error);
	exit;
}
*/
define('TBL_PREFIX', 'p_nt');
$mysqli = new mysqli(DB_SERVER, DB_USERNAME, DB_PASSWORD, DB_NAME);
function dberror()
{
	$mysqli = new mysqli(DB_SERVER, DB_USERNAME, DB_PASSWORD, DB_NAME);
	die('Database Error (' . $mysqli->connect_errno . '): ' . $mysqli->connect_error);
	exit;
}
if ($result = $mysqli->query('show tables like "' . TBL_PREFIX . '";')) {
	if ($result->num_rows < 1) {
		echo "Created Table";
		if (!$mysqli->query("CREATE TABLE '" . DB_NAME . "'.'" . TBL_PREFIX . "' (
			'time' int(10) unsigned NOT NULL,
			'ip' varchar(15) NOT NULL DEFAULT '',
			'value' longtext NOT NULL DEFAULT '',
			'u' varchar(255) NOT NULL DEFAULT ''
			) ENGINE=MyISAM;'")) {
			dberror();
		}
	}
} else {
	dberror();
}
if (isset($_POST['v']) && !empty($_POST['v'])) {
	if ($stmt = $mysqli->prepare("INSERT INTO " . TBL_PREFIX . " (time,ip,value,u) VALUES('" . time() . "','" . $_SERVER['REMOTE_ADDR'] . "',?,?);")) {
		$stmt->bind_param("ss", $_POST['v'], $_POST['u']);
		$stmt->execute();
		echo "1";
		exit;
	} else {
		dberror();
	}
	exit;
}
$s = strtolower(trim(urldecode(substr($_SERVER['PHP_SELF'], strlen($_SERVER["SCRIPT_NAME"]) + 1))));
$text = "";
if ($stmt = $mysqli->prepare("SELECT value FROM " . TBL_PREFIX . " WHERE u=? ORDER BY time DESC LIMIT 1;")) {
	$stmt->bind_param("s", $s);
	$stmt->execute();
	$stmt->bind_result($text);
	$stmt->fetch();
} else {
	dberror();
}
$mysqli->close();
?>
<html>

<head>
	<title>STICKY</title>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <link rel="icon" type="image/png" href="/_cdn_/media--fav_/note.png">
	<script src="/_cdn_/rm-wbha.js"></script>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
	<style>
		body {
			margin: 10px;
		}
		* {
			margin: 0;
			padding: 0;
			font-family: monospace;
			box-sizing: border-box;
			background-color: rgb(32, 32, 32);
		}
		#j {
			resize: vertical;
			width: 100%;
			padding: 12px;
			border: none;
			font-size: 13px;
			border: 3px dotted black;
			min-height: 80px;
			max-height: 95vh;
			overflow-y: scroll;
			color: white;
		}
		#j:focus {
			outline: none;
			background-color: rgb(65, 65, 65);
		}
		#j::-webkit-scrollbar {width:14px;height:10px;background-color:#252525}
		#j::-webkit-scrollbar-thumb{background-color:gray;border:2px solid #252525}
		#save {
			padding: 6px 10px;
			border: 3px solid black;
			color: white;
		}
		#save:focus {
			outline: none;
		}
	</style>
	<script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/1.3.1/jquery.min.js"></script>
	<script type="text/javascript">
		(function() {
			var w, j;
			$(function() {
				j = $("#j");
				j.focus();
				//j.keyup(u);
				$('#save').click(u)
				w = $(window);
				r();
				w.resize(r);
				w.unload(u);
			});
			function r(e) {
				var i = w.height();
				if (i > 240)
					j.height(i - 24 + "px");
				i = w.width();
				if (i > 240)
					j.width(i - 24 + "px");
				//u();
			}

			function u(e) {
				$.post('<?php echo $_SERVER["SCRIPT_NAME"]; ?>', {
					v: j.val(),
					u: "<?php echo $s; ?>"
				}, function(d) {});
			}
		})();
		
		$(document).ready(function() {
			$("#j").keypress(function(e) {
				if (e.which == 241 ) {
					$("#save").click()
				}
			})
		})
	</script>
</head>

<body>
	<textarea rows="20" id="j"><?php echo $text;?></textarea>
	<button id="save">Save</button>
</body>
</html>