const shapeSelector = document.getElementById("area-shape-selector");
const sizeInput = document.getElementById("area-size-input");
const applyButton = document.getElementById("apply-button");
const freePointsGenerator = document.getElementById("optional-free-points-size-generator");

const areaCellsBaseColorCode = "#C4C4C4";
const areaCellsBaseRGBCode = "rgb(196, 196, 196)";
const areaCellsColoredElementColorCode = "#BA4A4A";
const areaCellsColoredElementRGBCode = "rgb(186, 74, 74)";
const areaCellsPreviewElementColorCode = "#F0917C";
const areaCellsPreviewElementRGBCode = "rgb(240, 145, 124)";

var previousColor = "";
var paths = [];

buildPathsArray();

applyButton.addEventListener("click", () => {
    var shape = parseInt(shapeSelector.value.split("(")[1].split(")")[0]);
    var size = sizeInput.value.split(",");
    size = size.map(elem => parseInt(elem.trim()));

    updateAreaArea(shape, size);
});

shapeSelector.addEventListener("change", () => {
    if (parseInt(shapeSelector.value.split("(")[1].split(")")[0]) == 8) {
        var checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.setAttribute("id", "optional-free-points-size-checkbox");

        var label = document.createElement("label");
        label.setAttribute("id", "optional-free-points-size-checkbox-label");
        label.setAttribute("for", "optional-free-points-size-checkbox");
        label.innerText = "Free selection";

        checkbox.addEventListener("change", () => {
            if (checkbox.checked) {
                freePointsNavigation(true);
            } else {
                freePointsNavigation(false);
            }
        });
        label.appendChild(checkbox);
        freePointsGenerator.appendChild(label);
    } else {
        if (document.getElementById("optional-free-points-size-checkbox-label")) {
            freePointsGenerator.removeChild(document.getElementById("optional-free-points-size-checkbox-label"));
            freePointsNavigation(false);
        }
    }
});

function freePointsNavigation(activated) {
    if (activated) {
        for (let cell = 0; cell < document.getElementById("areaareacells").children.length; cell++) {
            let cellElement = document.getElementById("areaareacells").children[cell];
            previousColor = cellElement.style.fill;

            cellElement.style.fill = areaCellsBaseColorCode;
            colorCentralCell();

            cellElement.addEventListener("mouseover", () => {
                previousColor = cellElement.style.fill;
                freePointsMouseOverEvent(cellElement);
            });
            cellElement.addEventListener("mouseout", () => {
                freePointsMouseOutEvent(cellElement, previousColor);
            });
            cellElement.addEventListener("click", () => {
                freePointsClickEvent(cellElement);
                recomputeFreePointsSize();
            });
        };
    } else {
        for (let cell = 0; cell < document.getElementById("areaareacells").children.length; cell++) {
            let cellElement = document.getElementById("areaareacells").children[cell];
            cellElement.style.fill = areaCellsBaseColorCode;
            recreateNode(cellElement);
            buildPathsArray();

            colorCentralCell();
        }
    }
};

function recomputeFreePointsSize() {
    let size = "";
    for (let cell = 0; cell < document.getElementById("areaareacells").children.length; cell++) {
        let cellElement = document.getElementById("areaareacells").children[cell];
        let cellElementAbs = parseInt(cellElement.id.split("-")[0]);
        let cellElementOrd = parseInt(cellElement.id.split("-")[1]);

        if (cellElement.style.fill == areaCellsColoredElementColorCode || cellElement.style.fill == areaCellsColoredElementRGBCode) {
            size += "," + (cellElementAbs - 11) + "," + (11 - cellElementOrd);
        }
    }
    sizeInput.value = (size.charAt() != "," ? size : size.slice(1));
};

function freePointsMouseOverEvent(cellElement) {
    if (cellElement.style.fill == areaCellsBaseRGBCode || cellElement.style.fill == areaCellsBaseColorCode || cellElement.style.fill == "") {
        cellElement.style.fill = areaCellsPreviewElementColorCode;
    }
};

function freePointsMouseOutEvent(cellElement, previousColor) {
    if (cellElement.style.fill == areaCellsPreviewElementRGBCode) {
        cellElement.style.fill = previousColor;
    }
};

function freePointsClickEvent(cellElement) {
    if (cellElement.style.fill != areaCellsColoredElementRGBCode) {
        cellElement.style.fill = areaCellsColoredElementColorCode;
    } else {
        cellElement.style.fill = areaCellsBaseColorCode;
    }
};

function updateAreaArea(areaShape, areaSize) { // generate and change areas
    let cote;
    let largeurBarre;
    let piedBarre;
    let largeur;
    let longueur;
    let hauteur;
    let rayonInt;
    let rayonExt;

    for (let abs = 1; abs <= 21; abs++) { // reset area
        for (let ord = 0; ord <= 21; ord++) {
            paths[abs][ord] ? paths[abs][ord].style.fill = areaCellsBaseColorCode : null;
        }
    }

    switch (areaShape) {
        case 1:
            paths[11][10].style.fill = areaCellsColoredElementColorCode;
            break;

        case 2:
            circleView(areaSize[0], areaCellsColoredElementColorCode);
            break;

        case 3:
            if (areaSize.length == 1) {
                for (i = 11 - areaSize[0]; i <= 11 + areaSize[0]; i++) {
                    (paths[i] && paths[i][10] != null) ? paths[i][10].style.fill = areaCellsColoredElementColorCode: null;
                    paths[11][i - 1] ? paths[11][i - 1].style.fill = areaCellsColoredElementColorCode : null;
                }
            } else {
                console.log("Cas non prévu => Croix avec size.length = " + areaSize.length);
            }
            break;

        case 4:
            largeurBarre = areaSize[0];
            piedBarre = areaSize[1];

            for (i = 0; i <= piedBarre; i++) { // longueur
                (paths[12 + i] && paths[12 + i][10] != null) ? paths[12 + i][10].style.fill = areaCellsColoredElementColorCode: null;
            }

            for (let i = 0; i <= largeurBarre; i++) { // largeur barre
                (paths[12 + piedBarre] && paths[12 + piedBarre][10 + i] != null) ? paths[12 + piedBarre][10 + i].style.fill = areaCellsColoredElementColorCode: null; // haut
                (paths[12 + piedBarre] && paths[12 + piedBarre][10 - i] != null) ? paths[12 + piedBarre][10 - i].style.fill = areaCellsColoredElementColorCode: null; // bas
            }
            break;

        case 5:
            rayonInt = areaSize[0];
            rayonExt = areaSize[1];

            circleView(rayonExt, areaCellsColoredElementColorCode);
            circleView(rayonInt - 1, areaCellsBaseColorCode);
            break;

        case 6:
            if (areaSize.length == 1) {
                cote = areaSize[0];
                if (cote % 2 == 1) { //majorité des cas
                    for (let i = 11 - ((cote - 1) / 2); i <= 11 + ((cote - 1) / 2); i++) {
                        for (let j = 10 - ((cote - 1) / 2); j <= 10 + ((cote - 1) / 2); j++) {
                            (paths[i] && paths[i][j] != null) ? paths[i][j].style.fill = areaCellsColoredElementColorCode: null;
                        }
                    }
                } else {
                    for (let i = 11 - (cote / 2); i <= 10 + (cote / 2); i++) {
                        for (let j = 11 - (cote / 2); j <= 10 + (cote / 2); j++) {
                            (paths[i] && paths[i][j] != null) ? paths[i][j].style.fill = areaCellsColoredElementColorCode: null;
                        }
                    }
                }
            } else {
                largeur = areaSize[0];
                hauteur = areaSize[1];
                if (largeur % 2 == 1) { //majorité des cas
                    if (hauteur % 2 == 1) {
                        for (let i = 11 - ((largeur - 1) / 2); i <= 11 + ((largeur - 1) / 2); i++) {
                            for (let j = 10 - ((hauteur - 1) / 2); j <= 10 + ((hauteur - 1) / 2); j++) {
                                (paths[i] && paths[i][j] != null) ? paths[i][j].style.fill = areaCellsColoredElementColorCode: null;
                            }
                        }
                    } else {
                        for (let i = 11 - ((largeur - 1) / 2); i <= 11 + ((largeur - 1) / 2); i++) {
                            for (let j = 11 - (hauteur / 2); j <= 10 + (hauteur / 2); j++) {
                                (paths[i] && paths[i][j] != null) ? paths[i][j].style.fill = areaCellsColoredElementColorCode: null;
                            }
                        }
                    }
                } else {
                    if (hauteur % 2 == 1) {
                        for (let i = 12 - (largeur / 2); i <= 11 + (largeur / 2); i++) {
                            for (let j = 10 - ((hauteur - 1) / 2); j <= 10 + ((hauteur - 1) / 2); j++) {
                                (paths[i] && paths[i][j] != null) ? paths[i][j].style.fill = areaCellsColoredElementColorCode: null;
                            }
                        }
                    } else {
                        for (let i = 12 - (largeur / 2); i <= 11 + (largeur / 2); i++) {
                            for (let j = 11 - (hauteur / 2); j <= 10 + (hauteur / 2); j++) {
                                (paths[i] && paths[i][j] != null) ? paths[i][j].style.fill = areaCellsColoredElementColorCode: null;
                            }
                        }
                    }
                }
            }
            break;

        case 7:
            if (areaSize.length == 2) {
                largeur = areaSize[0];
                longueur = areaSize[1];

                for (let i = 10 - longueur; i <= 10 + longueur; i++) { //côté gôche
                    (paths[11 - largeur] && paths[11 - largeur][i] != null) ? paths[11 - largeur][i].style.fill = areaCellsColoredElementColorCode: null;
                }

                for (let i = 10 - longueur; i <= 10 + longueur; i++) { //côté droua
                    (paths[11 + largeur] && paths[11 + largeur][i] != null) ? paths[11 + largeur][i].style.fill = areaCellsColoredElementColorCode: null;
                }

                for (let i = 11 - largeur; i <= 10 + largeur; i++) { //côté haut
                    (paths[i] && paths[i][10 + longueur] != null) ? paths[i][10 + longueur].style.fill = areaCellsColoredElementColorCode: null;
                }

                for (let i = 11 - largeur; i <= 10 + largeur; i++) { //côté bas
                    (paths[i] && paths[i][10 - longueur] != null) ? paths[i][10 - longueur].style.fill = areaCellsColoredElementColorCode: null;
                }
            } else {
                console.log("Cas non prévu pour le pourtour de carré");
            }
            break;

        case 8:
            for (let i = 0; i < (areaSize.length - 1); i += 2) {
                paths[11 + areaSize[i]][10 - areaSize[i + 1]] ? paths[11 + areaSize[i]][10 - areaSize[i + 1]].style.fill = areaCellsColoredElementColorCode : null;
            }
            break;

        case 9:
            largeurBarre = areaSize[0];
            piedBarre = areaSize[1];

            for (i = 0; i <= piedBarre; i++) { //longueur
                (paths[12 + i] && paths[12 + i][10] != null) ? paths[12 + i][10].style.fill = areaCellsColoredElementColorCode: null;
            }

            for (let i = 0; i <= largeurBarre; i++) {
                (paths[12] && paths[12][10 + i] != null) ? paths[12][10 + i].style.fill = areaCellsColoredElementColorCode: null; // haut
                (paths[12] && paths[12][10 - i] != null) ? paths[12][10 - i].style.fill = areaCellsColoredElementColorCode: null; // bas
            }
            break;

        case 10:
            longueur = areaSize[1];
            for (let i = 0; i <= longueur; i++) {
                (paths[11] && paths[11 + i][10] != null) ? paths[11 + i][10].style.fill = areaCellsColoredElementColorCode: null;
            }
            break;

        case 11:
            if (areaSize.length == 1) {
                cote = areaSize[0];

                for (let i = 0; i <= cote; i++) {
                    (paths[11 + i] && paths[11 + i][10 + i] != null) ? paths[11 + i][10 + i].style.fill = areaCellsColoredElementColorCode: null; // haut droit
                    (paths[11 + i] && paths[11 + i][10 - i] != null) ? paths[11 + i][10 - i].style.fill = areaCellsColoredElementColorCode: null; // haut gauche
                    (paths[11 - i] && paths[11 - i][10 + i] != null) ? paths[11 - i][10 + i].style.fill = areaCellsColoredElementColorCode: null; // bas droit
                    (paths[11 - i] && paths[11 - i][10 - i] != null) ? paths[11 - i][10 - i].style.fill = areaCellsColoredElementColorCode: null; // bas gauche
                }
            } else {
                console.log("Cas non prévu : areaSize.length = " + areaSize.length);
            }
            break;

        case 32767:
            paths[11][10].style.fill = areaCellsBaseColorCode;
            break;
    }

    colorCentralCell();
}

function colorCentralCell() {
    if (paths[11][10].style.fill == "rgb(186, 74, 74)") {
        paths[11][10].style.fill = "#873DC4"
    } else if (paths[11][10].style.fill != areaCellsBaseColorCode) {
        paths[11][10].style.fill = "#3361FF"
    }
};

function circleView(value, color) {
    let j = 12 - value; //partie gôche
    for (let i = 1; i <= value; i++) {
        for (let h = 0; h <= i; h++) { // partie supérieure
            (paths[j] && paths[j][10 + h] != null) ? paths[j][10 + h].style.fill = color: null;
        }
        for (let h = 0; h <= i; h++) { // partie inférieure
            (paths[j] && paths[j][10 - h] != null) ? paths[j][10 - h].style.fill = color: null;
        }
        j++;
    }
    (paths[11 - value] && paths[11 - value][10] != null) ? paths[11 - value][10].style.fill = color: null;


    j = 10 + value; //partie drouate
    for (let i = 1; i < value; i++) {
        for (let h = 0; h <= i; h++) { // partie supérieure
            (paths[j] && paths[j][10 + h] != null) ? paths[j][10 + h].style.fill = color: null;
        }
        for (let h = 0; h <= i; h++) { // partie inférieure
            (paths[j] && paths[j][10 - h] != null) ? paths[j][10 - h].style.fill = color: null;
        }
        j--;
    }
    (paths[11 + value] && paths[11 + value][10] != null) ? paths[11 + value][10].style.fill = color: null;
};

function buildPathsArray() {
    paths = [];
    for (let i = 0; i <= 21; i++) { // generates a "paths" table that contains all the cells for the zones - attention : milieu abs = 11, milieu ord = 10
        paths.push([]);
        for (let j = 1; j <= 21; j++) {
            paths[i].push(document.getElementById(i + '-' + j));
        }
    }
};

function recreateNode(el, withChildren) {
    if (withChildren) {
        el.parentNode.replaceChild(el.cloneNode(true), el);
    } else {
        var newEl = el.cloneNode(false);
        while (el.hasChildNodes()) newEl.appendChild(el.firstChild);
        el.parentNode.replaceChild(newEl, el);
    }
};