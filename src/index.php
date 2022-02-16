<!doctype html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
    <link href="style.css" rel="stylesheet">  
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.0/jquery.min.js"></script>
    <script src="script.js"></script>
    <title>Projet</title>
</head>
<body>

<nav class="navbar navbar-light bg-dark">
    <div class="container-fluid">
        <a class="navbar-brand" href="#">
            <img src="../images/logo.jpg" alt="" width="50" height="40" class="d-inline-block ">
            <span style="color: aliceblue">Universe  Game</span>
        </a>
        <button type="button" class="btn-close btn-close-white" aria-label="Close"></button>
    </div>
</nav>
<form action="#" method="post" id="form" >
    <div class="inline first">
     <input class="btn btn-outline-dark btn-lg" type="text" id="width" name="width" placeholder="Longueur de la grille" autocomplete="off">
    <input class="btn btn-outline-secondary btn-lg" type="text" id="height" name="height" placeholder="Largeur de la grille" autocomplete="off">
        <input type="button" id="create" class="btn btn-dark btn-group-sm " name="submit"  value="Creer la grille" disabled >
        <p>Taille de la Grille :  <span id="taille"></span></p>
    </div>

    <div class="inline second">
    <input type="button" id="previous" class="btn btn-dark less" value="<" disabled >
    <input type="button" id="next" class="btn btn-dark great " value=">" disabled>
        <input type="button" id="autostop" class="btn btn-dark  auto" value="auto">
        <p>Nombre de Generation:</p><span id="nbreGeneration"></span>
    </div>
    <div class="initialisation">
        <input type="button" name="init" id="init" class="btn btn-dark" value="Initialisation aleatoire">
    </div>
    <div class="inline first" >
   
        <div id="select">
        <input type="submit" class="btn btn-dark" name='submit'  value="charge" >
        <select class="form-select" id="selected" name="selected">
            <option value="beacon">Beacon</option>
            <option value="blinker">Blinker</option>
            <option value="glider">Glider</option>
            <option value="pulsar">Pulsar</option>
        </select>
        </div>

    </div>
 

    <div class="inline second"  >
        <input class="btn btn-outline-secondary save" name="gridName" id="gridName" type="text" placeholder="Nom de la grille">
        <input type="submit" class="btn btn-outline-secondary save " name="save" id="save"  value="Sauvegarder" disabled>
    </div>
 </form>
 <?php include("main.php")?>
</body>
</html>