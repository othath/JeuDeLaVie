let nextClick = 0;
let previousClick = 0;
let countClick = 0;
let countPrevious = 0;
let previous = new Array();
for (let i = 0; i < 1000; i++) {
    previous[i] = [];
}


function makeGrid(height, width) {
    let root = document.documentElement;
    let container = document.createElement("div");
    container.id = "container";
    let form = document.getElementById("form");
    form.insertBefore(container, form.children[3]);// insert the container in position3
    for (let rows = 0; rows < height; rows++) {
        for (let columns = 0; columns < width; columns++) {
            let div = document.createElement('div');
            let cell = document.createElement("div");
            cell.id = "Cellule" + rows + columns;
            cell.className = "grid";
            cell.value = 0;
            //console.log("CellValue " + cell.value);
            div.className = 'ball';
            div.id = 'd' + cell.id;
            div.innerText = 0;
            cell.append(div);
            container.append(cell);
        }
        let w = 1200 / width;
        let h = 400 / height;
        root.style.setProperty('--height', h + "px");
        root.style.setProperty('--width', w + "px");
        // $(".grid").width(960/r);
    }
    return false;
}
function next() {
    let width = document.getElementById('width').value;
    let height = document.getElementById('height').value;
    if (nextClick === 1) { //stocker grid initial dans previous[0]
        for (let i = 0; i < height; i++) {
            for (let j = 0; j < width; j++) {
                previous[countPrevious].push(getGrid()[i][j]);
            }
        }
    }
      else {
        countPrevious++;
        let grid = new Array(height * width);
        for (let i = 0; i < grid.length; i++) {
            grid[i] = jeu()[i];
        }
        for (let i = 0; i < height; i++) {
            for (let j = 0; j < width; j++) {
                previous[countPrevious].push(grid[i][j]);
            }
        }
        let cont = document.getElementById("container");//if container already exists,delete it to avoid duplicate;
        if (typeof (cont) != 'undefined' && cont != null) cont.parentNode.removeChild(document.getElementById('container'));
        makeGrid(height, width);
        let i = 0, k = 0, j = 0;
        while (k < width * height) {
            if (k < (i + 1) * width) {
                if (previous[countPrevious][k] === 1) {
                    document.getElementById("dCellule" + i + j).style = "background-color:black;border-radius:50%";
                    document.getElementById("Cellule" + i + j).value = 1;
                }
                k++;
                j++;
            } else {
                i++;
                j = 0;
            }
        }
    }
        document.getElementById('nbreGeneration').innerText=countPrevious;

}
addEventListener('input', function () {
    let width = document.getElementById('width').value;
    let height = document.getElementById('height').value;
    let gridName   = document.getElementById('gridName').value;
    if (height != "" && width != "") {
        if (!isNaN(height) && !isNaN(width)) {
            document.getElementById('create').disabled = false;
            document.getElementById('taille').innerText = height + "*" + width + "=" + width * height;
            document.getElementById('next').disabled = false;
            document.getElementById('previous').disabled = false;
        } else {
            document.getElementById('create').disabled = true;
            document.getElementById('next').disabled = true;
            document.getElementById('previous').disabled = true;
        }
    }
    if(gridName!=""){
        document.getElementById('save').disabled = false;
    }
});


function initialisationAleatoire(h, w) {
    for (let i = 0; i < h; i++) {
        for (let j = 0; j < w; j++) {
            if (Math.floor(Math.random() * 10) % 2) {
                document.getElementById("Cellule" + i + j).value = 1;
                document.getElementById("dCellule" + i + j).style = "background-color:black;border-radius:50%";
                // document.getElementById("dCellule" + i + j).innerText = 1;
            }
            else {
                document.getElementById("Cellule" + i + j).value = 0;

            }
          //  console.log("CellValue" + i + j + " " + document.getElementById("Cellule" + i + j).value);
        }
    }
}
window.onload = function () {
    var autostopListner = document.getElementById('autostop');
    let autoclik = 0;
    var interval;
    autostopListner.addEventListener('click', function () {
        autoclik++;
            if (autoclik % 2 !== 0) {
                autostopListner.value = "stop";
                autostopListner.style = "background-color:red;"
                interval = setInterval(function () {
                    // method to be executed;
                    if(isEmpty()===0) {
                        next();
                    }
                    else  {
                        console.log("hani");
                        autostopListner.value = "auto";
                        autostopListner.style = "background-color:reset;"
                        clearInterval(interval);
                        autoclik++;
                    }

                }, 1000);
            } else {
                autostopListner.value = "auto";
                autostopListner.style = "background-color:reset;"
                clearInterval(interval);
            }
    });
    document.getElementById("save").addEventListener("click", function () {
        createCookie("saved", getGrid(), "10");//send Grid via cookie

    });
    var makeGridListner = document.getElementById("create");
    makeGridListner.addEventListener("click", function () {
        let width = document.getElementById('width').value;
        let height = document.getElementById('height').value;
        let cont = document.getElementById("container");
        //if container already exists,delete it to avoid duplicate;
        if (typeof (cont) != 'undefined' && cont != null) {
            cont.parentNode.removeChild(document.getElementById('container'));
            countClick = 0;
        }
        makeGrid(height, width);
        document.getElementById('create').disabled = true;

        return false;
    });
    var nextListner = document.getElementById("next");
    nextListner.addEventListener("click", function () {
        nextClick++;
        if(isEmpty()==1) {
            let width = document.getElementById('width').value;
            let height = document.getElementById('height').value;
            let cont = document.getElementById("container");
            //if container already exists,delete it to avoid duplicate;
            if (typeof (cont) != 'undefined' && cont != null) cont.parentNode.removeChild(cont);
            makeGrid(height, width);
            let i = 0, j = 0, k = 0;
            while (k < width * height) {
                if (k < (i + 1) * width) {
                    if (previous[countPrevious][k] === 1) {
                        document.getElementById("dCellule" + i + j).style = "background-color:black;border-radius:50%";
                        document.getElementById("Cellule" + i + j).value=1;
                    }
                    k++;
                    j++;
                } else {
                    i++;
                    j = 0;
                }
            }//true
        }
        else {
            next();
        }
    });
    var initialisationListner = document.getElementById("init");
    initialisationListner.addEventListener("click", function () {
        let width = document.getElementById('width').value;
        let height = document.getElementById('height').value;
        countClick++;
        initialisationAleatoire(height, width);
        return false;
    });
    var previousListner = document.getElementById("previous");
    previousListner.addEventListener("click", function () {
        let cont = document.getElementById("container");
        previousClick++;
         if (countPrevious > 0) {
            if (previousClick <= nextClick) {
                countPrevious--;
                let width = document.getElementById('width').value;
                let height = document.getElementById('height').value;
                //if container already exists,delete it to avoid duplicate;
                if (typeof (cont) != 'undefined' && cont != null) cont.parentNode.removeChild(cont);
                makeGrid(height, width);
                let i = 0, j = 0, k = 0;
                while (k < width * height) {
                    if (k < (i + 1) * width) {
                        if (previous[countPrevious][k] === 1) {
                            document.getElementById("dCellule" + i + j).style = "background-color:black;border-radius:50%";
                            document.getElementById("Cellule" + i + j).value=1;
                        }
                        k++;
                        j++;
                    } else {
                        i++;
                        j = 0;
                    }
                }
                document.getElementById('nbreGeneration').innerText=countPrevious;
            }
        }
        else if(countPrevious==0){ //return grid initial
            let width = document.getElementById('width').value;
            let height = document.getElementById('height').value;
            if (typeof (cont) != 'undefined' && cont != null) cont.parentNode.removeChild(document.getElementById('container'));
            makeGrid(height, width);
        }
        else{
            document.getElementById('previous').disabled = true;
        }

    });
}


function isEmpty(){ //return 1 si empty
    let width = document.getElementById('width').value;
    let height = document.getElementById('height').value;
    let count=0;
    let Grille1 = new Array();
    for (let i = 0; i < height; i++) {
        Grille1[i] = getGrid()[i];
    }
    for (let i = 0; i < height; i++) {
        for (let j = 0; j < width; j++) {
          if(Grille1[i][j]===1) count++;
        }
    }
    return (count!=0)?0:1;
}
function getGrid() {
    //  let container=document.getElementById('container');
    let width = document.getElementById('width').value;
    let height = document.getElementById('height').value;
    let tmp = new Array();
    for (let i = 0; i < height; i++) {
        tmp[i] = [];
    }
    for (let i = 0; i < height; i++) {
        for (let j = 0; j < width; j++) {
            let cell = document.getElementById("Cellule" + i + j);
            tmp[i][j] = cell.value;
        }
    }
    return tmp;
}
function jeu() { //fonction des regles de jeux
    let width = document.getElementById('width').value;
    let height = document.getElementById('height').value;
    let Grille2 = new Array();
    for (let i = 0; i < height; i++) { // 2D Array
        Grille2[i] = [];
    }
    let Grille1 = new Array();
    for (let i = 0; i < height; i++) {
        Grille1[i] = getGrid()[i];
    }
    for (let i = 0; i < height; i++) {
        for (let j = 0; j < width; j++) {
            if (Grille1[i][j] === 1) {
                //top i
                if (i === 0) {
                    //left point
                    if (j === 0) {
                        if ((Grille1[i][j + 1] + Grille1[i + 1][j + 1] + Grille1[i + 1][j]) === 2 || (Grille1[i][j + 1] + Grille1[i + 1][j + 1] + Grille1[i + 1][j]) === 3) {
                            Grille2[i][j] = 1;
                        }
                        else {
                            Grille2[i][j] = 0;
                        }
                    }
                    //right point
                    else if (j === (width - 1)) {
                        if ((Grille1[i + 1][j - 1] + Grille1[i + 1][j] + Grille1[i][j - 1]) === 2 || (Grille1[i + 1][j - 1] + Grille1[i + 1][j] + Grille1[i][j - 1]) === 3) {
                            Grille2[i][j] = 1;
                        }
                        else {
                            Grille2[i][j] = 0;
                        }
                    }
                    else {
                        if ((Grille1[i][j - 1] + Grille1[i + 1][j] + Grille1[i][j + 1] + Grille1[i + 1][j + 1] + Grille1[i + 1][j - 1]) === 2 || (Grille1[i][j - 1] + Grille1[i + 1][j] + Grille1[i][j + 1] + Grille1[i + 1][j + 1] + Grille1[i + 1][j - 1]) === 3) {
                            Grille2[i][j] = 1;
                        }
                        else {
                            Grille2[i][j] = 0;
                        }
                    }
                }
                //without top and bottom borders
                else if (i > 0 && i < (height- 1)) {
                    //border left
                    if (j === 0) {
                        if ((Grille1[i - 1][j + 1] + Grille1[i - 1][j] + Grille1[i][j + 1] + Grille1[i + 1][j + 1] + Grille1[i + 1][j]) === 2 || (Grille1[i - 1][j + 1] + Grille1[i - 1][j] + Grille1[i][j + 1] + Grille1[i + 1][j + 1] + Grille1[i + 1][j]) === 3) {
                            Grille2[i][j] = 1;
                        }
                        else {
                            Grille2[i][j] = 0;
                        }
                    }
                    //border top
                    else if (j === width-1) {
                        if ((Grille1[i - 1][j - 1] + Grille1[i - 1][j] + Grille1[i][j - 1] + Grille1[i + 1][j - 1] + Grille1[i + 1][j]) === 2 || (Grille1[i - 1][j - 1] + Grille1[i - 1][j] + Grille1[i][j - 1] + Grille1[i + 1][j - 1] + Grille1[i + 1][j]) === 3) {
                            Grille2[i][j] = 1;
                        }
                        else {
                            Grille2[i][j] = 0;
                        }
                    }
                    //every other cells
                    else {
                        if ((Grille1[i - 1][j + 1] + Grille1[i - 1][j] + Grille1[i - 1][j - 1] + Grille1[i][j + 1] + Grille1[i][j - 1] + Grille1[i + 1][j - 1] + Grille1[i + 1][j] + Grille1[i + 1][j + 1]) === 2 || (Grille1[i - 1][j + 1] + Grille1[i - 1][j] + Grille1[i - 1][j - 1] + Grille1[i][j + 1] + Grille1[i][j - 1] + Grille1[i + 1][j - 1] + Grille1[i + 1][j] + Grille1[i + 1][j + 1]) === 3) {
                            Grille2[i][j] = 1;
                        }
                        else {
                            Grille2[i][j] = 0;
                        }
                    }
                }
                //bottom border
                else if (i === height-1) {
                    //left point
                    if (j === 0) {
                        if ((Grille1[i - 1][j + 1] + Grille1[i - 1][j] + Grille1[i][j + 1]) === 2 || (Grille1[i - 1][j + 1] + Grille1[i - 1][j] + Grille1[i][j + 1]) === 3) {
                            Grille2[i][j] = 1;
                        }
                        else {
                            Grille2[i][j] = 0;
                        }
                    }
                    //right point
                    else if (j === width-1) {
                        if ((Grille1[i - 1][j - 1] + Grille1[i - 1][j] + Grille1[i][j - 1]) === 2 || (Grille1[i - 1][j - 1] + Grille1[i - 1][j] + Grille1[i][j - 1]) === 3) {
                            Grille2[i][j] = 1;
                        }
                        else {
                            Grille2[i][j] = 0;
                        }
                    }
                    else {
                        if ((Grille1[i - 1][j] + Grille1[i][j - 1] + Grille1[i - 1][j - 1] + Grille1[i - 1][j + 1] + Grille1[i][j + 1]) === 2 || (Grille1[i - 1][j] + Grille1[i][j - 1] + Grille1[i - 1][j - 1] + Grille1[i - 1][j + 1] + Grille1[i][j + 1]) === 3) {
                            Grille2[i][j] = 1;
                        }
                        else {
                            Grille2[i][j] = 0;
                        }
                    }

                }
            }
            //empty cells
            else if (Grille1[i][j] === 0) {

                if (i === 0) {
                    if (j === 0) {
                        if ((Grille1[i][j + 1] + Grille1[i + 1][j + 1] + Grille1[i + 1][j]) === 3) {
                            Grille2[i][j] = 1;
                        }
                        else {
                            Grille2[i][j] = 0;
                        }
                    }
                    else if (j === (width - 1)) {
                        if ((Grille1[i + 1][j - 1] + Grille1[i + 1][j] + Grille1[i][j - 1]) === 3) {
                            Grille2[i][j] = 1;
                        }
                        else {
                            Grille2[i][j] = 0;
                        }
                    }
                    else {
                        if ((Grille1[i][j - 1] + Grille1[i + 1][j] + Grille1[i][j + 1] + Grille1[i + 1][j + 1] + Grille1[i + 1][j - 1]) === 3) {
                            Grille2[i][j] = 1;
                        }
                        else {
                            Grille2[i][j] = 0;
                        }
                    }
                }
                else if (i > 0 && i < (height -1)) {
                    if (j === 0) {
                        if ((Grille1[i - 1][j + 1] + Grille1[i - 1][j] + Grille1[i][j + 1] + Grille1[i + 1][j + 1] + Grille1[i + 1][j]) === 3) {
                            Grille2[i][j] = 1;
                        }
                        else {
                            Grille2[i][j] = 0;
                        }
                    }
                    else if (j === width-1) {
                        if ((Grille1[i - 1][j - 1] + Grille1[i - 1][j] + Grille1[i][j - 1] + Grille1[i + 1][j - 1] + Grille1[i + 1][j]) === 3) {
                            Grille2[i][j] = 1;
                        }
                        else {
                            Grille2[i][j] = 0;
                        }
                    }
                    else {
                        if ((Grille1[i - 1][j + 1] + Grille1[i - 1][j] + Grille1[i - 1][j - 1] + Grille1[i][j + 1] + Grille1[i][j - 1] + Grille1[i + 1][j - 1] + Grille1[i + 1][j] + Grille1[i + 1][j + 1]) === 3) {
                            Grille2[i][j] = 1;
                        }
                        else {
                            Grille2[i][j] = 0;
                        }
                    }
                }
                else if (i === height -1) {
                    if (j === 0) {
                        if ((Grille1[i - 1][j + 1] + Grille1[i - 1][j] + Grille1[i][j + 1]) === 3) {
                            Grille2[i][j] = 1;
                        }
                        else {
                            Grille2[i][j] = 0;
                        }
                    }
                    else if (j === width-1) {
                        console.log("dans jeu i:"+i+" j:"+j +"grille1:"+Grille1[i][j]);
                        if ((Grille1[i - 1][j - 1] + Grille1[i - 1][j] + Grille1[i][j - 1]) === 3) {
                            Grille2[i][j] = 1;
                        }
                        else {
                            Grille2[i][j] = 0;
                        }
                    }
                    else {
                        if ((Grille1[i - 1][j] + Grille1[i][j - 1] + Grille1[i - 1][j - 1] + Grille1[i - 1][j + 1] + Grille1[i][j + 1]) === 3) {
                            Grille2[i][j] = 1;
                        }
                        else {
                            Grille2[i][j] = 0;
                        }
                    }

                }
            }
        }
    }

    return Grille2;
}
function charger(tab, h, w) {
    document.getElementById('width').value = w;
    document.getElementById('height').value = h;
    makeGrid(h, w);
    for (let i = 0; i < h; i++) {
        for (let j = 0; j < w; j++) {
            if (tab[i][j] == 1) {
                document.getElementById("Cellule" + i + j).value = 1;
                document.getElementById("dCellule" + i + j).style = "background-color:black;border-radius:50%";
                document.getElementById("dCellule" + i + j).innerText = 1;
            }
            else document.getElementById("Cellule" + i + j).value = 0;
        }
    }
}

/*  $.ajax({ //another method to pass data from js to php
      type: 'POST',
      url: 'main.php',
      data: { ajax: myJSONText },
      success: function (response) {
          alert(response);
          $('#result').html(response);
      },
      error: function (e) {
          alert('Error' + JSON.stringify(e));
      }
  });
*/

function createCookie(name, value, days) {
    value = JSON.stringify(value);// to sent an array
    var expires;
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toGMTString();
    }
    else {
        expires = "";
    }
    document.cookie = name + "=" + value + expires + "; path=/";
}