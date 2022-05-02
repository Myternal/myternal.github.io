// if you understand the code I can give you all my money
let vestigeAlreadyInput = 0;
let stillHere = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];

const checkbox = document.getElementsByClassName("checkbox");
const turnCounter = document.getElementById("tour");
const turnAlert = document.getElementById("turnalert");

/////////////////////////////////////////////////////////////////

var vestigevisual = document.querySelector('#vestigevisual');

vestigePrevisu("base-name1", "Tonnerre");
vestigePrevisu("base-name2", "Obscurité");
vestigePrevisu("base-name3", "Ressac");
vestigePrevisu("base-name4", "Météore");
vestigePrevisu("base-name5", "Grêle");
vestigePrevisu("base-name6", "Malédiction");
vestigePrevisu("base-name7", "Bond");
vestigePrevisu("base-name8", "Oblitération");
vestigePrevisu("base-name9", "Grondement");
vestigePrevisu("base-name10", "Explosion");
vestigePrevisu("base-name11", "Ouragan");
vestigePrevisu("base-name12", "Cyclone");
vestigePrevisu("base-name13", "Dévastation");
vestigePrevisu("base-name14", "Saccage");
vestigePrevisu("base-name15", "Massacre");
vestigePrevisu("base-name16", "Fracas");

/////////////////////////////////////////////////////////////////
document.addEventListener("change", () => {
    for (let element = 0; element < checkbox.length; element++) {
        if (vestigeAlreadyInput < 4) {
            if (checkbox[element].checked == true) {
                let baseName = document.getElementById("base-name" + (stillHere[element]));
                let baseImage = document.getElementById("base-image" + (stillHere[element]));
                let resultName = document.getElementById("result-name" + (vestigeAlreadyInput + 1));
                let resultImage = document.getElementById("result-image" + (vestigeAlreadyInput + 1));
                let resultState = document.getElementById("result-state" + (vestigeAlreadyInput + 1));
                let resultSpell = document.getElementById("result-spell" + (vestigeAlreadyInput + 1));

                //setting the values
                resultName.innerText = baseName.innerText;
                resultImage.innerHTML = baseImage.innerHTML;
                resultState.innerText = 2;
                resultSpell.innerText = getSpellDecription(resultName.innerText, resultState.innerText);
                resultSpell.innerHTML = resultSpell.innerHTML.replace("$", "<span style=\"font-weight:bold;\">");
                resultSpell.innerHTML = resultSpell.innerHTML.replace("^", "</span>");

                //deleting the element from the first array
                checkbox[element].closest("tr").remove(); //fonction de OUF

                //deleting the index from the array "stillHere"
                stillHere.splice(element, 1);
                vestigeAlreadyInput++;
            }
        } else {
            checkbox[element].disabled = true;
            checkbox[element].checked = false;
        }
    }
});

turnCounter.addEventListener("click", () => { //passage de tours
    if ((parseInt(turnCounter.innerText.split("T")[1]) < 19)) {
        turnCounter.innerText = "T" + (parseInt(turnCounter.innerText.split("T")[1]) + 1);

        switch (parseInt(turnCounter.innerText.split("T")[1])) {
            case 4:
                turnAlert.style.opacity = 1;
                turnAlert.innerText = "Drop les vestiges, AOE autour des vestiges";
                break;

            case 9:
                turnAlert.style.opacity = 1;
                turnAlert.innerText = "Drop les vestiges, AOE autour des vestiges, -6PM";
                break;

            case 14:
                turnAlert.style.opacity = 1;
                turnAlert.innerText = "Drop les vestiges, AOE autour des vestiges, -6PM, Lave autour du terrain";
                break;

            case 19:
                turnAlert.style.opacity = 1;
                turnAlert.innerText = "Drop les vestiges, AOE autour des vestiges, -6PM, Lave autour du terrain, Croix autour des entités";
                break;

            default:
                turnAlert.style.opacity = 0;
                break;
        }

        let state1 = document.getElementById("result-state1");
        let state2 = document.getElementById("result-state2");
        let state3 = document.getElementById("result-state3");
        let state4 = document.getElementById("result-state4");

        let spell1 = document.getElementById("result-spell1");
        let spell2 = document.getElementById("result-spell2");
        let spell3 = document.getElementById("result-spell3");
        let spell4 = document.getElementById("result-spell4");

        state1.innerText = state1.innerText == "-" ? "-" : (parseInt(state1.innerText) < 10 ? parseInt(state1.innerText) + 1 : parseInt(state1.innerText));
        state2.innerText = state2.innerText == "-" ? "-" : (parseInt(state2.innerText) < 10 ? parseInt(state2.innerText) + 1 : parseInt(state2.innerText));
        state3.innerText = state3.innerText == "-" ? "-" : (parseInt(state3.innerText) < 10 ? parseInt(state3.innerText) + 1 : parseInt(state3.innerText));
        state4.innerText = state4.innerText == "-" ? "-" : (parseInt(state4.innerText) < 10 ? parseInt(state4.innerText) + 1 : parseInt(state4.innerText));

        spell1.innerText = state1.innerText == "-" ? "-" : getSpellDecription(document.getElementById("result-name1").innerText, state1.innerText);
        spell2.innerText = state2.innerText == "-" ? "-" : getSpellDecription(document.getElementById("result-name2").innerText, state2.innerText);
        spell3.innerText = state3.innerText == "-" ? "-" : getSpellDecription(document.getElementById("result-name3").innerText, state3.innerText);
        spell4.innerText = state4.innerText == "-" ? "-" : getSpellDecription(document.getElementById("result-name4").innerText, state4.innerText);

        spell1.innerHTML = spell1.innerHTML.replace("$", "<span style=\"font-weight:bold;\">");
        spell1.innerHTML = spell1.innerHTML.replace("^", "</span>");
        spell2.innerHTML = spell2.innerHTML.replace("$", "<span style=\"font-weight:bold;\">");
        spell2.innerHTML = spell2.innerHTML.replace("^", "</span>");
        spell3.innerHTML = spell3.innerHTML.replace("$", "<span style=\"font-weight:bold;\">");
        spell3.innerHTML = spell3.innerHTML.replace("^", "</span>");
        spell4.innerHTML = spell4.innerHTML.replace("$", "<span style=\"font-weight:bold;\">");
        spell4.innerHTML = spell4.innerHTML.replace("^", "</span>");


        if ((parseInt(turnCounter.innerText.split("T")[1]) % 5 == 0)) {
            document.getElementById("result-plate").innerHTML = "<thead><tr><th class=\"tf-c3ow\">Vestige</th><th class=\"tf-c3ow\">Nom</th><th class=\"tf-c3ow\">Niveau de l'état</th><th class=\"tf-c3ow\">Sort de Rushu</th></tr></thead><tbody id=\"result-menus\"><tr id=\"result-menu1\"><td class=\"tf-c3ow\" id=\"result-image1\">-</td><td class=\"tf-c3ow\" id=\"result-name1\">-</td><td class=\"tf-c3ow\" id=\"result-state1\">-</td><td class=\"tf-c3ow\" id=\"result-spell1\">-</td></tr><tr id=\"result-menu2\"><td class=\"tf-c3ow\" id=\"result-image2\">-</td><td class=\"tf-c3ow\" id=\"result-name2\">-</td><td class=\"tf-c3ow\" id=\"result-state2\">-</td><td class=\"tf-c3ow\" id=\"result-spell2\">-</td></tr><tr id=\"result-menu3\"><td class=\"tf-c3ow\" id=\"result-image3\">-</td><td class=\"tf-c3ow\" id=\"result-name3\">-</td><td class=\"tf-c3ow\" id=\"result-state3\">-</td><td class=\"tf-c3ow\" id=\"result-spell3\">-</td></tr><tr id=\"result-menu4\"><td class=\"tf-c3ow\" id=\"result-image4\">-</td><td class=\"tf-c3ow\" id=\"result-name4\">-</td><td class=\"tf-c3ow\" id=\"result-state4\">-</td><td class=\"tf-c3ow\" id=\"result-spell4\">-</td></tr></tbody>"

            for (let element = 0; element < checkbox.length; element++) {
                checkbox[element].disabled = false;
                checkbox[element].checked = false;
            }

            document.getElementById("result-state1").addEventListener("click", () => {

                if (parseInt(document.getElementById("result-state1").innerText) >= 10) {
                    document.getElementById("result-state1").innerText = 1;
                } else if (parseInt(document.getElementById("result-state1").innerText) >= 1 && parseInt(document.getElementById("result-state1").innerText) < 10) {
                    document.getElementById("result-state1").innerText = parseInt(document.getElementById("result-state1").innerText) + 1;
                }

                let state1 = document.getElementById("result-state1");
                let state2 = document.getElementById("result-state2");
                let state3 = document.getElementById("result-state3");
                let state4 = document.getElementById("result-state4");

                let spell1 = document.getElementById("result-spell1");
                let spell2 = document.getElementById("result-spell2");
                let spell3 = document.getElementById("result-spell3");
                let spell4 = document.getElementById("result-spell4");

                spell1.innerText = state1.innerText == "-" ? null : getSpellDecription(document.getElementById("result-name1").innerText, state1.innerText);
                spell2.innerText = state2.innerText == "-" ? null : getSpellDecription(document.getElementById("result-name2").innerText, state2.innerText);
                spell3.innerText = state3.innerText == "-" ? null : getSpellDecription(document.getElementById("result-name3").innerText, state3.innerText);
                spell4.innerText = state4.innerText == "-" ? null : getSpellDecription(document.getElementById("result-name4").innerText, state4.innerText);

                spell1.innerHTML = spell1.innerHTML.replace("$", "<span style=\"font-weight:bold;\">");
                spell1.innerHTML = spell1.innerHTML.replace("^", "</span>");
                spell2.innerHTML = spell2.innerHTML.replace("$", "<span style=\"font-weight:bold;\">");
                spell2.innerHTML = spell2.innerHTML.replace("^", "</span>");
                spell3.innerHTML = spell3.innerHTML.replace("$", "<span style=\"font-weight:bold;\">");
                spell3.innerHTML = spell3.innerHTML.replace("^", "</span>");
                spell4.innerHTML = spell4.innerHTML.replace("$", "<span style=\"font-weight:bold;\">");
                spell4.innerHTML = spell4.innerHTML.replace("^", "</span>");
            });

            document.getElementById("result-state2").addEventListener("click", () => {

                if (parseInt(document.getElementById("result-state2").innerText) >= 10) {
                    document.getElementById("result-state2").innerText = 1;
                } else if (parseInt(document.getElementById("result-state2").innerText) >= 1 && parseInt(document.getElementById("result-state2").innerText) < 10) {
                    document.getElementById("result-state2").innerText = parseInt(document.getElementById("result-state2").innerText) + 1;
                }

                let state1 = document.getElementById("result-state1");
                let state2 = document.getElementById("result-state2");
                let state3 = document.getElementById("result-state3");
                let state4 = document.getElementById("result-state4");

                let spell1 = document.getElementById("result-spell1");
                let spell2 = document.getElementById("result-spell2");
                let spell3 = document.getElementById("result-spell3");
                let spell4 = document.getElementById("result-spell4");

                spell1.innerText = state1.innerText == "-" ? null : getSpellDecription(document.getElementById("result-name1").innerText, state1.innerText);
                spell2.innerText = state2.innerText == "-" ? null : getSpellDecription(document.getElementById("result-name2").innerText, state2.innerText);
                spell3.innerText = state3.innerText == "-" ? null : getSpellDecription(document.getElementById("result-name3").innerText, state3.innerText);
                spell4.innerText = state4.innerText == "-" ? null : getSpellDecription(document.getElementById("result-name4").innerText, state4.innerText);

                spell1.innerHTML = spell1.innerHTML.replace("$", "<span style=\"font-weight:bold;\">");
                spell1.innerHTML = spell1.innerHTML.replace("^", "</span>");
                spell2.innerHTML = spell2.innerHTML.replace("$", "<span style=\"font-weight:bold;\">");
                spell2.innerHTML = spell2.innerHTML.replace("^", "</span>");
                spell3.innerHTML = spell3.innerHTML.replace("$", "<span style=\"font-weight:bold;\">");
                spell3.innerHTML = spell3.innerHTML.replace("^", "</span>");
                spell4.innerHTML = spell4.innerHTML.replace("$", "<span style=\"font-weight:bold;\">");
                spell4.innerHTML = spell4.innerHTML.replace("^", "</span>");
            });

            document.getElementById("result-state3").addEventListener("click", () => {

                if (parseInt(document.getElementById("result-state3").innerText) >= 10) {
                    document.getElementById("result-state3").innerText = 1;
                } else if (parseInt(document.getElementById("result-state3").innerText) >= 1 && parseInt(document.getElementById("result-state3").innerText) < 10) {
                    document.getElementById("result-state3").innerText = parseInt(document.getElementById("result-state3").innerText) + 1;
                }

                let state1 = document.getElementById("result-state1");
                let state2 = document.getElementById("result-state2");
                let state3 = document.getElementById("result-state3");
                let state4 = document.getElementById("result-state4");

                let spell1 = document.getElementById("result-spell1");
                let spell2 = document.getElementById("result-spell2");
                let spell3 = document.getElementById("result-spell3");
                let spell4 = document.getElementById("result-spell4");

                spell1.innerText = state1.innerText == "-" ? null : getSpellDecription(document.getElementById("result-name1").innerText, state1.innerText);
                spell2.innerText = state2.innerText == "-" ? null : getSpellDecription(document.getElementById("result-name2").innerText, state2.innerText);
                spell3.innerText = state3.innerText == "-" ? null : getSpellDecription(document.getElementById("result-name3").innerText, state3.innerText);
                spell4.innerText = state4.innerText == "-" ? null : getSpellDecription(document.getElementById("result-name4").innerText, state4.innerText);

                spell1.innerHTML = spell1.innerHTML.replace("$", "<span style=\"font-weight:bold;\">");
                spell1.innerHTML = spell1.innerHTML.replace("^", "</span>");
                spell2.innerHTML = spell2.innerHTML.replace("$", "<span style=\"font-weight:bold;\">");
                spell2.innerHTML = spell2.innerHTML.replace("^", "</span>");
                spell3.innerHTML = spell3.innerHTML.replace("$", "<span style=\"font-weight:bold;\">");
                spell3.innerHTML = spell3.innerHTML.replace("^", "</span>");
                spell4.innerHTML = spell4.innerHTML.replace("$", "<span style=\"font-weight:bold;\">");
                spell4.innerHTML = spell4.innerHTML.replace("^", "</span>");
            });

            document.getElementById("result-state4").addEventListener("click", () => {

                if (parseInt(document.getElementById("result-state4").innerText) >= 10) {
                    document.getElementById("result-state4").innerText = 1;
                } else if (parseInt(document.getElementById("result-state4").innerText) >= 1 && parseInt(document.getElementById("result-state4").innerText) < 10) {
                    document.getElementById("result-state4").innerText = parseInt(document.getElementById("result-state4").innerText) + 1;
                }

                let state1 = document.getElementById("result-state1");
                let state2 = document.getElementById("result-state2");
                let state3 = document.getElementById("result-state3");
                let state4 = document.getElementById("result-state4");

                let spell1 = document.getElementById("result-spell1");
                let spell2 = document.getElementById("result-spell2");
                let spell3 = document.getElementById("result-spell3");
                let spell4 = document.getElementById("result-spell4");

                spell1.innerText = state1.innerText == "-" ? null : getSpellDecription(document.getElementById("result-name1").innerText, state1.innerText);
                spell2.innerText = state2.innerText == "-" ? null : getSpellDecription(document.getElementById("result-name2").innerText, state2.innerText);
                spell3.innerText = state3.innerText == "-" ? null : getSpellDecription(document.getElementById("result-name3").innerText, state3.innerText);
                spell4.innerText = state4.innerText == "-" ? null : getSpellDecription(document.getElementById("result-name4").innerText, state4.innerText);

                spell1.innerHTML = spell1.innerHTML.replace("$", "<span style=\"font-weight:bold;\">");
                spell1.innerHTML = spell1.innerHTML.replace("^", "</span>");
                spell2.innerHTML = spell2.innerHTML.replace("$", "<span style=\"font-weight:bold;\">");
                spell2.innerHTML = spell2.innerHTML.replace("^", "</span>");
                spell3.innerHTML = spell3.innerHTML.replace("$", "<span style=\"font-weight:bold;\">");
                spell3.innerHTML = spell3.innerHTML.replace("^", "</span>");
                spell4.innerHTML = spell4.innerHTML.replace("$", "<span style=\"font-weight:bold;\">");
                spell4.innerHTML = spell4.innerHTML.replace("^", "</span>");
            });

            vestigeAlreadyInput = 0
        }
    } else {
        turnCounter.innerText = "T1";
        turnAlert.style.opacity = 0;

        document.getElementById("result-plate").innerHTML = "<thead><tr><th class=\"tf-c3ow\">Vestige</th><th class=\"tf-c3ow\">Nom</th><th class=\"tf-c3ow\">Niveau de l'état</th><th class=\"tf-c3ow\">Sort de Rushu</th></tr></thead><tbody id=\"result-menus\"><tr id=\"result-menu1\"><td class=\"tf-c3ow\" id=\"result-image1\">-</td><td class=\"tf-c3ow\" id=\"result-name1\">-</td><td class=\"tf-c3ow\" id=\"result-state1\">-</td><td class=\"tf-c3ow\" id=\"result-spell1\">-</td></tr><tr id=\"result-menu2\"><td class=\"tf-c3ow\" id=\"result-image2\">-</td><td class=\"tf-c3ow\" id=\"result-name2\">-</td><td class=\"tf-c3ow\" id=\"result-state2\">-</td><td class=\"tf-c3ow\" id=\"result-spell2\">-</td></tr><tr id=\"result-menu3\"><td class=\"tf-c3ow\" id=\"result-image3\">-</td><td class=\"tf-c3ow\" id=\"result-name3\">-</td><td class=\"tf-c3ow\" id=\"result-state3\">-</td><td class=\"tf-c3ow\" id=\"result-spell3\">-</td></tr><tr id=\"result-menu4\"><td class=\"tf-c3ow\" id=\"result-image4\">-</td><td class=\"tf-c3ow\" id=\"result-name4\">-</td><td class=\"tf-c3ow\" id=\"result-state4\">-</td><td class=\"tf-c3ow\" id=\"result-spell4\">-</td></tr></tbody>"

        document.getElementById("result-state1").addEventListener("click", () => {

            if (parseInt(document.getElementById("result-state1").innerText) >= 10) {
                document.getElementById("result-state1").innerText = 1;
            } else if (parseInt(document.getElementById("result-state1").innerText) >= 1 && parseInt(document.getElementById("result-state1").innerText) < 10) {
                document.getElementById("result-state1").innerText = parseInt(document.getElementById("result-state1").innerText) + 1;
            }

            let state1 = document.getElementById("result-state1");
            let state2 = document.getElementById("result-state2");
            let state3 = document.getElementById("result-state3");
            let state4 = document.getElementById("result-state4");

            let spell1 = document.getElementById("result-spell1");
            let spell2 = document.getElementById("result-spell2");
            let spell3 = document.getElementById("result-spell3");
            let spell4 = document.getElementById("result-spell4");

            spell1.innerText = state1.innerText == "-" ? null : getSpellDecription(document.getElementById("result-name1").innerText, state1.innerText);
            spell2.innerText = state2.innerText == "-" ? null : getSpellDecription(document.getElementById("result-name2").innerText, state2.innerText);
            spell3.innerText = state3.innerText == "-" ? null : getSpellDecription(document.getElementById("result-name3").innerText, state3.innerText);
            spell4.innerText = state4.innerText == "-" ? null : getSpellDecription(document.getElementById("result-name4").innerText, state4.innerText);

            spell1.innerHTML = spell1.innerHTML.replace("$", "<span style=\"font-weight:bold;\">");
            spell1.innerHTML = spell1.innerHTML.replace("^", "</span>");
            spell2.innerHTML = spell2.innerHTML.replace("$", "<span style=\"font-weight:bold;\">");
            spell2.innerHTML = spell2.innerHTML.replace("^", "</span>");
            spell3.innerHTML = spell3.innerHTML.replace("$", "<span style=\"font-weight:bold;\">");
            spell3.innerHTML = spell3.innerHTML.replace("^", "</span>");
            spell4.innerHTML = spell4.innerHTML.replace("$", "<span style=\"font-weight:bold;\">");
            spell4.innerHTML = spell4.innerHTML.replace("^", "</span>");
        });

        document.getElementById("result-state2").addEventListener("click", () => {

            if (parseInt(document.getElementById("result-state2").innerText) >= 10) {
                document.getElementById("result-state2").innerText = 1;
            } else if (parseInt(document.getElementById("result-state2").innerText) >= 1 && parseInt(document.getElementById("result-state2").innerText) < 10) {
                document.getElementById("result-state2").innerText = parseInt(document.getElementById("result-state2").innerText) + 1;
            }

            let state1 = document.getElementById("result-state1");
            let state2 = document.getElementById("result-state2");
            let state3 = document.getElementById("result-state3");
            let state4 = document.getElementById("result-state4");

            let spell1 = document.getElementById("result-spell1");
            let spell2 = document.getElementById("result-spell2");
            let spell3 = document.getElementById("result-spell3");
            let spell4 = document.getElementById("result-spell4");

            spell1.innerText = state1.innerText == "-" ? null : getSpellDecription(document.getElementById("result-name1").innerText, state1.innerText);
            spell2.innerText = state2.innerText == "-" ? null : getSpellDecription(document.getElementById("result-name2").innerText, state2.innerText);
            spell3.innerText = state3.innerText == "-" ? null : getSpellDecription(document.getElementById("result-name3").innerText, state3.innerText);
            spell4.innerText = state4.innerText == "-" ? null : getSpellDecription(document.getElementById("result-name4").innerText, state4.innerText);

            spell1.innerHTML = spell1.innerHTML.replace("$", "<span style=\"font-weight:bold;\">");
            spell1.innerHTML = spell1.innerHTML.replace("^", "</span>");
            spell2.innerHTML = spell2.innerHTML.replace("$", "<span style=\"font-weight:bold;\">");
            spell2.innerHTML = spell2.innerHTML.replace("^", "</span>");
            spell3.innerHTML = spell3.innerHTML.replace("$", "<span style=\"font-weight:bold;\">");
            spell3.innerHTML = spell3.innerHTML.replace("^", "</span>");
            spell4.innerHTML = spell4.innerHTML.replace("$", "<span style=\"font-weight:bold;\">");
            spell4.innerHTML = spell4.innerHTML.replace("^", "</span>");
        });

        document.getElementById("result-state3").addEventListener("click", () => {

            if (parseInt(document.getElementById("result-state3").innerText) >= 10) {
                document.getElementById("result-state3").innerText = 1;
            } else if (parseInt(document.getElementById("result-state3").innerText) >= 1 && parseInt(document.getElementById("result-state3").innerText) < 10) {
                document.getElementById("result-state3").innerText = parseInt(document.getElementById("result-state3").innerText) + 1;
            }

            let state1 = document.getElementById("result-state1");
            let state2 = document.getElementById("result-state2");
            let state3 = document.getElementById("result-state3");
            let state4 = document.getElementById("result-state4");

            let spell1 = document.getElementById("result-spell1");
            let spell2 = document.getElementById("result-spell2");
            let spell3 = document.getElementById("result-spell3");
            let spell4 = document.getElementById("result-spell4");

            spell1.innerText = state1.innerText == "-" ? null : getSpellDecription(document.getElementById("result-name1").innerText, state1.innerText);
            spell2.innerText = state2.innerText == "-" ? null : getSpellDecription(document.getElementById("result-name2").innerText, state2.innerText);
            spell3.innerText = state3.innerText == "-" ? null : getSpellDecription(document.getElementById("result-name3").innerText, state3.innerText);
            spell4.innerText = state4.innerText == "-" ? null : getSpellDecription(document.getElementById("result-name4").innerText, state4.innerText);

            spell1.innerHTML = spell1.innerHTML.replace("$", "<span style=\"font-weight:bold;\">");
            spell1.innerHTML = spell1.innerHTML.replace("^", "</span>");
            spell2.innerHTML = spell2.innerHTML.replace("$", "<span style=\"font-weight:bold;\">");
            spell2.innerHTML = spell2.innerHTML.replace("^", "</span>");
            spell3.innerHTML = spell3.innerHTML.replace("$", "<span style=\"font-weight:bold;\">");
            spell3.innerHTML = spell3.innerHTML.replace("^", "</span>");
            spell4.innerHTML = spell4.innerHTML.replace("$", "<span style=\"font-weight:bold;\">");
            spell4.innerHTML = spell4.innerHTML.replace("^", "</span>");
        });

        document.getElementById("result-state4").addEventListener("click", () => {

            if (parseInt(document.getElementById("result-state4").innerText) >= 10) {
                document.getElementById("result-state4").innerText = 1;
            } else if (parseInt(document.getElementById("result-state4").innerText) >= 1 && parseInt(document.getElementById("result-state4").innerText) < 10) {
                document.getElementById("result-state4").innerText = parseInt(document.getElementById("result-state4").innerText) + 1;
            }

            let state1 = document.getElementById("result-state1");
            let state2 = document.getElementById("result-state2");
            let state3 = document.getElementById("result-state3");
            let state4 = document.getElementById("result-state4");

            let spell1 = document.getElementById("result-spell1");
            let spell2 = document.getElementById("result-spell2");
            let spell3 = document.getElementById("result-spell3");
            let spell4 = document.getElementById("result-spell4");

            spell1.innerText = state1.innerText == "-" ? null : getSpellDecription(document.getElementById("result-name1").innerText, state1.innerText);
            spell2.innerText = state2.innerText == "-" ? null : getSpellDecription(document.getElementById("result-name2").innerText, state2.innerText);
            spell3.innerText = state3.innerText == "-" ? null : getSpellDecription(document.getElementById("result-name3").innerText, state3.innerText);
            spell4.innerText = state4.innerText == "-" ? null : getSpellDecription(document.getElementById("result-name4").innerText, state4.innerText);

            spell1.innerHTML = spell1.innerHTML.replace("$", "<span style=\"font-weight:bold;\">");
            spell1.innerHTML = spell1.innerHTML.replace("^", "</span>");
            spell2.innerHTML = spell2.innerHTML.replace("$", "<span style=\"font-weight:bold;\">");
            spell2.innerHTML = spell2.innerHTML.replace("^", "</span>");
            spell3.innerHTML = spell3.innerHTML.replace("$", "<span style=\"font-weight:bold;\">");
            spell3.innerHTML = spell3.innerHTML.replace("^", "</span>");
            spell4.innerHTML = spell4.innerHTML.replace("$", "<span style=\"font-weight:bold;\">");
            spell4.innerHTML = spell4.innerHTML.replace("^", "</span>");
        });
    }
});

document.getElementById("result-state1").addEventListener("click", () => {

    if (parseInt(document.getElementById("result-state1").innerText) >= 10) {
        document.getElementById("result-state1").innerText = 1;
    } else if (parseInt(document.getElementById("result-state1").innerText) >= 1 && parseInt(document.getElementById("result-state1").innerText) < 10) {
        document.getElementById("result-state1").innerText = parseInt(document.getElementById("result-state1").innerText) + 1;
    }

    let state1 = document.getElementById("result-state1");
    let state2 = document.getElementById("result-state2");
    let state3 = document.getElementById("result-state3");
    let state4 = document.getElementById("result-state4");

    let spell1 = document.getElementById("result-spell1");
    let spell2 = document.getElementById("result-spell2");
    let spell3 = document.getElementById("result-spell3");
    let spell4 = document.getElementById("result-spell4");

    spell1.innerText = state1.innerText == "-" ? null : getSpellDecription(document.getElementById("result-name1").innerText, state1.innerText);
    spell2.innerText = state2.innerText == "-" ? null : getSpellDecription(document.getElementById("result-name2").innerText, state2.innerText);
    spell3.innerText = state3.innerText == "-" ? null : getSpellDecription(document.getElementById("result-name3").innerText, state3.innerText);
    spell4.innerText = state4.innerText == "-" ? null : getSpellDecription(document.getElementById("result-name4").innerText, state4.innerText);

    spell1.innerHTML = spell1.innerHTML.replace("$", "<span style=\"font-weight:bold;\">");
    spell1.innerHTML = spell1.innerHTML.replace("^", "</span>");
    spell2.innerHTML = spell2.innerHTML.replace("$", "<span style=\"font-weight:bold;\">");
    spell2.innerHTML = spell2.innerHTML.replace("^", "</span>");
    spell3.innerHTML = spell3.innerHTML.replace("$", "<span style=\"font-weight:bold;\">");
    spell3.innerHTML = spell3.innerHTML.replace("^", "</span>");
    spell4.innerHTML = spell4.innerHTML.replace("$", "<span style=\"font-weight:bold;\">");
    spell4.innerHTML = spell4.innerHTML.replace("^", "</span>");
});

document.getElementById("result-state2").addEventListener("click", () => {

    if (parseInt(document.getElementById("result-state2").innerText) >= 10) {
        document.getElementById("result-state2").innerText = 1;
    } else if (parseInt(document.getElementById("result-state2").innerText) >= 1 && parseInt(document.getElementById("result-state2").innerText) < 10) {
        document.getElementById("result-state2").innerText = parseInt(document.getElementById("result-state2").innerText) + 1;
    }

    let state1 = document.getElementById("result-state1");
    let state2 = document.getElementById("result-state2");
    let state3 = document.getElementById("result-state3");
    let state4 = document.getElementById("result-state4");

    let spell1 = document.getElementById("result-spell1");
    let spell2 = document.getElementById("result-spell2");
    let spell3 = document.getElementById("result-spell3");
    let spell4 = document.getElementById("result-spell4");

    spell1.innerText = state1.innerText == "-" ? null : getSpellDecription(document.getElementById("result-name1").innerText, state1.innerText);
    spell2.innerText = state2.innerText == "-" ? null : getSpellDecription(document.getElementById("result-name2").innerText, state2.innerText);
    spell3.innerText = state3.innerText == "-" ? null : getSpellDecription(document.getElementById("result-name3").innerText, state3.innerText);
    spell4.innerText = state4.innerText == "-" ? null : getSpellDecription(document.getElementById("result-name4").innerText, state4.innerText);

    spell1.innerHTML = spell1.innerHTML.replace("$", "<span style=\"font-weight:bold;\">");
    spell1.innerHTML = spell1.innerHTML.replace("^", "</span>");
    spell2.innerHTML = spell2.innerHTML.replace("$", "<span style=\"font-weight:bold;\">");
    spell2.innerHTML = spell2.innerHTML.replace("^", "</span>");
    spell3.innerHTML = spell3.innerHTML.replace("$", "<span style=\"font-weight:bold;\">");
    spell3.innerHTML = spell3.innerHTML.replace("^", "</span>");
    spell4.innerHTML = spell4.innerHTML.replace("$", "<span style=\"font-weight:bold;\">");
    spell4.innerHTML = spell4.innerHTML.replace("^", "</span>");
});

document.getElementById("result-state3").addEventListener("click", () => {

    if (parseInt(document.getElementById("result-state3").innerText) >= 10) {
        document.getElementById("result-state3").innerText = 1;
    } else if (parseInt(document.getElementById("result-state3").innerText) >= 1 && parseInt(document.getElementById("result-state3").innerText) < 10) {
        document.getElementById("result-state3").innerText = parseInt(document.getElementById("result-state3").innerText) + 1;
    }

    let state1 = document.getElementById("result-state1");
    let state2 = document.getElementById("result-state2");
    let state3 = document.getElementById("result-state3");
    let state4 = document.getElementById("result-state4");

    let spell1 = document.getElementById("result-spell1");
    let spell2 = document.getElementById("result-spell2");
    let spell3 = document.getElementById("result-spell3");
    let spell4 = document.getElementById("result-spell4");

    spell1.innerText = state1.innerText == "-" ? null : getSpellDecription(document.getElementById("result-name1").innerText, state1.innerText);
    spell2.innerText = state2.innerText == "-" ? null : getSpellDecription(document.getElementById("result-name2").innerText, state2.innerText);
    spell3.innerText = state3.innerText == "-" ? null : getSpellDecription(document.getElementById("result-name3").innerText, state3.innerText);
    spell4.innerText = state4.innerText == "-" ? null : getSpellDecription(document.getElementById("result-name4").innerText, state4.innerText);

    spell1.innerHTML = spell1.innerHTML.replace("$", "<span style=\"font-weight:bold;\">");
    spell1.innerHTML = spell1.innerHTML.replace("^", "</span>");
    spell2.innerHTML = spell2.innerHTML.replace("$", "<span style=\"font-weight:bold;\">");
    spell2.innerHTML = spell2.innerHTML.replace("^", "</span>");
    spell3.innerHTML = spell3.innerHTML.replace("$", "<span style=\"font-weight:bold;\">");
    spell3.innerHTML = spell3.innerHTML.replace("^", "</span>");
    spell4.innerHTML = spell4.innerHTML.replace("$", "<span style=\"font-weight:bold;\">");
    spell4.innerHTML = spell4.innerHTML.replace("^", "</span>");
});

document.getElementById("result-state4").addEventListener("click", () => {

    if (parseInt(document.getElementById("result-state4").innerText) >= 10) {
        document.getElementById("result-state4").innerText = 1;
    } else if (parseInt(document.getElementById("result-state4").innerText) >= 1 && parseInt(document.getElementById("result-state4").innerText) < 10) {
        document.getElementById("result-state4").innerText = parseInt(document.getElementById("result-state4").innerText) + 1;
    }

    let state1 = document.getElementById("result-state1");
    let state2 = document.getElementById("result-state2");
    let state3 = document.getElementById("result-state3");
    let state4 = document.getElementById("result-state4");

    let spell1 = document.getElementById("result-spell1");
    let spell2 = document.getElementById("result-spell2");
    let spell3 = document.getElementById("result-spell3");
    let spell4 = document.getElementById("result-spell4");

    spell1.innerText = state1.innerText == "-" ? null : getSpellDecription(document.getElementById("result-name1").innerText, state1.innerText);
    spell2.innerText = state2.innerText == "-" ? null : getSpellDecription(document.getElementById("result-name2").innerText, state2.innerText);
    spell3.innerText = state3.innerText == "-" ? null : getSpellDecription(document.getElementById("result-name3").innerText, state3.innerText);
    spell4.innerText = state4.innerText == "-" ? null : getSpellDecription(document.getElementById("result-name4").innerText, state4.innerText);

    spell1.innerHTML = spell1.innerHTML.replace("$", "<span style=\"font-weight:bold;\">");
    spell1.innerHTML = spell1.innerHTML.replace("^", "</span>");
    spell2.innerHTML = spell2.innerHTML.replace("$", "<span style=\"font-weight:bold;\">");
    spell2.innerHTML = spell2.innerHTML.replace("^", "</span>");
    spell3.innerHTML = spell3.innerHTML.replace("$", "<span style=\"font-weight:bold;\">");
    spell3.innerHTML = spell3.innerHTML.replace("^", "</span>");
    spell4.innerHTML = spell4.innerHTML.replace("$", "<span style=\"font-weight:bold;\">");
    spell4.innerHTML = spell4.innerHTML.replace("^", "</span>");
});

function getSpellDecription(name, stateLevel) {
    stateLevel = parseInt(stateLevel);
    switch (name) {
        case "Tonnerre":
            return "Dommages sur $" + (stateLevel == 1 ? "l'ennemi" : "les " + stateLevel + " ennemis") + "^ les plus éloignés de Rushu"

        case "Obscurité":
            return "Invoque une prison autour des joueurs"

        case "Ressac":
            return "Applique un malus de $" + 40 * stateLevel + "^ Résistance Élémentaire sur le personnage le moins affaibli"

        case "Météore":
            return "En fin de tour, pose un glyphe de taille $" + (1 + stateLevel) + "^ sur 3 personnages"

        case "Grêle":
            return "Lancé sur $" + (stateLevel == 1 ? "l'ennemi^ le plus proche" : "les " + stateLevel + " ennemis^ les plus proches") + " de Rushu"

        case "Malédiction":
            return "Dommages et Incurable sur le personnage le plus affaibli"

        case "Bond":
            return "Saute sur une cellule libre de 4 à $" + (5 + stateLevel) + "^ cases"

        case "Oblitération":
            return "Anneau de taille $" + (13 - stateLevel) + "^-30"

        case "Grondement":
            return "Invoque $" + (2 * stateLevel) + "^ Rochers autour de Rushu"

        case "Explosion":
            return "Cible tous les ennemis entre 4 et $" + (6 + stateLevel) + "^ cases (sort sur l'armure)"

        case "Ouragan":
            return "Attire la cible de $" + (2 * stateLevel) + "^ cases"

        case "Cyclone":
            return "Pousse la cible de $" + (2 * stateLevel) + "^ cases"

        case "Dévastation":
            return "Anneau de taille 5-8 autour $" + (stateLevel == 1 ? " de l'ennemi^ le plus proche" : "des " + stateLevel + " ennemis^ les plus proches") + " de Rushu"

        case "Saccage":
            return "Anneau de taille 1-2 autour $" + (stateLevel == 1 ? " de l'ennemi^ le plus proche" : "des " + stateLevel + " ennemis^ les plus proches") + " de Rushu"

        case "Massacre":
            return "Cercle de rayon $" + (3 + stateLevel) + "^ autour de Rushu"

        case "Fracas":
            return "-$" + stateLevel + "^PM et stabilise la cible"
    }
}

function vestigePrevisu(place, name) {
    document.getElementById(place).addEventListener('mouseenter', () => {
        vestigevisual.classList = "active";
        vestigevisual.innerText = getSpellDecription(name, 1);
        vestigevisual.innerHTML = vestigevisual.innerHTML.replace("$", "<span style=\"font-weight:bold;\">");
        vestigevisual.innerHTML = vestigevisual.innerHTML.replace("^", "</span>");
    })

    document.getElementById(place).addEventListener('mouseout', () => {
        vestigevisual.classList = "";
    })
}