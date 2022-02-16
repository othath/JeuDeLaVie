<?php
   if(isset($_POST['submit'])){  
            if(!empty($_POST['selected'])) {
                  $file= file("../pattern/".$_POST['selected'].".pattern");
                  $counterline=0;
                  $countcolumn=0;
                 foreach ($file as $line){
                    $line=explode(",",$line);
                    foreach ($line as $column){
                     $array[$counterline][$countcolumn]=$column;
                     $countcolumn++;   
                     }
                 $counterline++;
                 }
                 $width=$countcolumn;
                 $height=$counterline;
                echo "height:". $height;
                echo "<script>  //send the grid array to js 
                charger(".json_encode($array).",". $height . "," . $width .")</script>";
      }
    }    
        if(isset($_POST["gridName"]) && $_POST["gridName"]!="") {
                 $file = "../pattern/" . $_POST["gridName"] . ".pattern";
                if (isset($_POST["save"])) {
                 $array = json_decode($_COOKIE['saved']);;
                 $file = fopen($file,"w");
                     if (isset($_POST['height']) && (isset($_POST['width']))) {
                         for ($i = 0; $i < $_POST['height']; $i++) {
                              for ($j = 0; $j < $_POST['width']; $j++) {
                                   var_dump($array[$i][$j]);
                                     if ($j == $_POST['width'] - 1) fwrite($file, $array[$i][$j] . "\n");
                                      else {
                                         fwrite($file, $array[$i][$j]);
                                         fwrite($file, ',');
                                      }
                              }
                         }
                 fclose($file);
                 echo "<script>makeGrid(" . $_POST['height'] . "," . $_POST['width'] . ")</script>";
                     }
                }
        }
 ?>