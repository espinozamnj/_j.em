/* ========================================
<?php
/*
// Initialize the session
session_start();

// Check if the user is logged in, if not then redirect him to login page
if (!isset($_SESSION["loggedin"]) || $_SESSION["loggedin"] !== true) {
  header("location: login.php");
  exit;
}

foreach ($yt_data as $lt_names) {
  echo '<div id="lt-name">';
     foreach ($lt_names as $name_g) {
        echo '<div>' . array_search($name_g, $lt_names) . '</div>';
        echo '<script>alert("cargando titulos");</script>';
     }
  echo '</div>';
}
foreach ($yt_data as $tree) {
  //echo json_encode($tree);
  echo '<div id="lists">';
  foreach ($tree as $categ) {
     // echo '<h2>' . array_search ($categ, $tree) . '</h2>';
     echo '<div class="d_trr">';
     foreach ($categ as $folder) {
        echo '<div class="group-type">';
        echo '<div class="group-name">' . $folder['folder'] . '</div>';
        echo '<div class="group-list">';
        foreach ($folder['list'] as $item) {
          if ($item['type'] == 'user') {
             echo '<p><a href="' . "https://www.youtube.com/channel/" . $item['url'] . '">' . $item['name'] . "</a></p>";
          } elseif ($item['type'] == 'list') {
             echo '<p><a href="' . "https://www.youtube.com/playlist?list=PL" . $item['url'] . '">' . $item['name'] . "</a></p>";
          } else {
             echo 'info unknown';
          }
        }
        echo '</div></div>';
     }
     echo '</div>';
  }
  echo '</div>';
}

$yt_data = array([
    'channels' => [
        0 => ['folder' => 'code','list' => [],],
        1 => [
            'folder' => 'tech',
            'list' => [],
        ],
    ],
    'myplay' => [0 => ['folder' => 'code','list' => [],],],
    'pubplay' => [
        0 => ['folder' => 'code','list' => [],],
        1 => ['folder' => 'diseño','list' => [],],
        2 => [
            'folder' => 'serie',
            'list' => [
                0 => ['name' => 'Estrategias para pensar', 'url' => 'p4PFtsMaRqWSzERPesYGQYWPjFq1YMG-', 'type' => 'list',],
            ],
        ],
    ],
]);
?>
============================================== */