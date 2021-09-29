//Menu del nodo
let menu = $("#contextMenu")[0];
//Stato menu nodo
let menuState = 0;
//Classe
let active = "context-menu--active";
//Per posizionare il menu
let menuWidth;
let menuHeight;
let windowWidth;
let windowHeight;
let clickCoords;
let clickCoordsX;
let clickCoordsY;

//Elementi correnti
let currentNode;
let currentNodeElement
let selectedNodeElements = []

let currentEdge
let currentEdgeElement
let selectedEdgeElements= []

 //---------Metodi richiamati dai context menu listener di nodo e edge---------

function nodeContextMenu(node, e, d, i, p, self){
        currentNode=d
        currentNodeElement = p[i]
        toogleMenuOn(e, "n")
        positionMenu(e)
        addNodeColors()
}


function edgeContextMenu(edge, e, d, i, p, self){
    console.log(edge, e, d, i , p, self, p[i])
    currentEdge = d
    currentEdgeElement = p[i]
    toogleMenuOn(e, "e")
    positionMenu(e)
    addEdgeColors()


}

//----------funzioni mostra e nascondi menu-----------------------


function toogleMenuOn(e, type){
    if ( menuState !== 1 ) {
        menuState = 1;
        menu.classList.add(active);
    }

    if (type=="n"){
        $("#contextMenu").html("<ul class=\"context-menu__items\">" +
            "        <li class=\"context-menu__item\">" +
            "            <a id=\"showPopUpEntityInfo\" onclick='showEntityInfoPopUp(\"n\")' class=\"context-menu__link black-text\">Visualizza dettagli</a>" +
            "        </li>" +
            "        <li class=\"context-menu__item\">" +
            "            <a id=\"showNeighboursContextMenuNode\" onclick='showNeighbours()' class=\"context-menu__link black-text\"> Mostra neighbours</a>" +
            "        </li>" +
            "        <li class=\"context-menu__item\">" +
            "            <div class=\"row\" id=\"colorPicker\"></div>" +
            "        </li>" +
            "        <li class=\"context-menu__item\">" +
            "            <div class=\"row\">" +
            "                <div class=\"input-field col s7\">" +
            "                    <input placeholder=\"Placeholder\" oninput='changeNodeDimension()' id=\"nodeDimension\" type=\"number\" class=\"validate\">" +
            "                    <label class=\"unselectable\" for=\"nodeDimension\">Dimensione nodo</label>" +
            "                </div>" +
            "            </div>" +
            "        </li>" +
            "    </ul>")
        M.updateTextFields();
        $("#nodeDimension").val(currentNodeElement.getElementsByTagName("circle")[1].getAttribute("r"))

        if (isSelectedMoreOfOneNode()){
            $("#showPopUpEntityInfo").addClass("hidden")
        }else{
            $("#showPopUpEntityInfo").removeClass("hidden")

        }

    }else if (type=="e"){
        $("#contextMenu").html("<ul class=\"context-menu__items\">" +
            "        <li class=\"context-menu__item\">" +
            "            <a id=\"showPopUpEntityInfo\" onclick='showEntityInfoPopUp(\"e\")' class=\"context-menu__link black-text\">Visualizza dettagli</a>" +
            "        </li>" +
            "        <li class=\"context-menu__item\">" +
            "            <div class=\"row\" id=\"colorPicker\"></div>" +
            "        </li>" +
            "        <li class=\"context-menu__item\">" +
            "            <div class=\"row\">" +
            "                <div class=\"input-field col s7\">" +
            "                    <input placeholder=\"Placeholder\" oninput='changeEdgeDimension()' id=\"edgeDimension\" type=\"number\" class=\"validate\">" +
            "                    <label class=\"unselectable\" for=\"edgeDimension\">Dimensione edge</label>" +
            "                </div>" +
            "            </div>" +
            "        </li>" +
            "    </ul>")
        M.updateTextFields();
        $("#edgeDimension").val(currentEdgeElement.getAttribute("stroke-width"))


        if (isSelectedMoreOfOneEdge()){
            $("#showPopUpEntityInfo").addClass("hidden")
        }else{
            $("#showPopUpEntityInfo").removeClass("hidden")

        }
    }


}

function toogleMenuOff() {
    if ( menuState !== 0 ) {
        menuState = 0;
        menu.classList.remove(active);
    }
}

//----------funzioni riguardanti la posizione del menu-----------------

function positionMenu(e) {
    clickCoords = getPosition(e);
    clickCoordsX = clickCoords.x;
    clickCoordsY = clickCoords.y;

    menuWidth = menu.offsetWidth + 4;
    menuHeight = menu.offsetHeight + 4;

    windowWidth = window.innerWidth;
    windowHeight = window.innerHeight;

    if ( (windowWidth - clickCoordsX) < menuWidth ) {
        menu.style.left = windowWidth - menuWidth + "px";
    } else {
        menu.style.left = clickCoordsX + "px";
    }

    if ( (windowHeight - clickCoordsY) < menuHeight ) {
        menu.style.top = windowHeight - menuHeight + "px";
    } else {
        menu.style.top = clickCoordsY + "px";
    }

}

function getPosition(e) {
    var posx = 0;
    var posy = 0;

    if (!e) var e = window.event;

    if (e.pageX || e.pageY) {
        posx = e.pageX;
        posy = e.pageY;
    } else if (e.clientX || e.clientY) {
        posx = e.clientX + document.body.scrollLeft +
            document.documentElement.scrollLeft;
        posy = e.clientY + document.body.scrollTop +
            document.documentElement.scrollTop;
    }

    return {
        x: posx,
        y: posy
    }
}

//--------------Gestione eventi per chiudere il menu----------------

function bodyClickListener(e){
    if(!clickedOnClassName(e, "context-menu")){
        toogleMenuOff();

    }
    if (!clickedOnClassName(e, "node") && !clickedOnClassName(e, "context-menu")){
        selectedNodeElements.forEach(v => deselectNode(null, v))
        selectedNodeElements = []
    }


}

function bodyContextMenuListener(e){
    if (!clickedOnClassName(e, "node") && !clickedOnClassName(e, "edge") && !clickedOnClassName(e,"edgelabel")){
        toogleMenuOff();
    }else{
        e.preventDefault()
    }
}

function clickedOnClassName(e, className){
    let el = e.target
    if (el.classList.contains(className)){
        console.log("cucu")
        return true
    }else {
        while ( el = el.parentNode ) {
            if ( el.classList && el.classList.contains(className) ) {
                return true;
            }
        }
    }

    return false
}

//------------------Aggiunta dei dot di colori nel context menu-------------

function addNodeColors() {
    if (selectedNodeElements.length>1){
        let s = ""
        for (const color of defaultColors) {
                s += "<div class=\"col s2\">\n" +
                    "                    <a class=\"smaller-dot\" style='background-color: " + color + "' onclick=\"changeNodeColor(this,'" + color + "')\"></a>\n" +
                    "                </div>"
        }
        for (const color of getAllUniqueNodeColors()) {
                s += "<div class=\"col s2\">\n" +
                    "                    <a class=\"smaller-dot\" style='background-color: " + color + "' onclick=\"changeNodeColor(this,'" + color + "')\"></a>\n" +
                    "                </div>"
        }
        $("#colorPicker").html(s)

    }else {
        let s = ""
        for (const color of defaultColors) {
            if (getNotRealColorFromG(currentNodeElement) == color) {
                s += "<div class=\"col s2\"><a class=\"smaller-dot-active\" style='background-color: " + color + "' onclick=\"changeNodeColor(this,'" + color + "', true)\"></a></div>"
            } else {
                s += "<div class=\"col s2\"><a class=\"smaller-dot\" style='background-color: " + color + "' onclick=\"changeNodeColor(this,'" + color + "')\"></a></div>"
            }
        }

        for (const color of getAllUniqueNodeColors()) {
            if (getNotRealColorFromG(currentNodeElement) == color) {
                s += "<div class=\"col s2\"> <a class=\"smaller-dot-active\" style='background-color: " + color + "' onclick=\"changeNodeColor(this,'" + color + "', true)\"></a></div>"
            } else {
                s += "<div class=\"col s2\"><a class=\"smaller-dot\" style='background-color: " + color + "' onclick=\"changeNodeColor(this,'" + color + "')\"></a></div>"
            }
        }
        $("#colorPicker").html(s)
    }
}

function addEdgeColors() {
    let s = ""
    for (const color of defaultColors) {
        if (currentEdgeElement.style.stroke == color) {
            s += "<div class=\"col s2\"> <a class=\"smaller-dot\" style='background-color: " + color + "' onclick=\"changeEdgeColor(this,'" + color + "', true)\"></a></div>"
        }else{
            s += "<div class=\"col s2\"><a class=\"smaller-dot\" style='background-color: " + color + "' onclick=\"changeEdgeColor(this,'" + color + "')\"></a></div>"
        }
    }
    for (const color of getAllUniqueEdgeColors()) {
        if (currentEdgeElement.style.stroke == color) {
            s += "<div class=\"col s2\"> <a class=\"smaller-dot\" style='background-color: " + color + "' onclick=\"changeEdgeColor(this,'" + color + "', true)\"></a></div>"
        }else{
            s += "<div class=\"col s2\"><a class=\"smaller-dot\" style='background-color: " + color + "' onclick=\"changeEdgeColor(this,'" + color + "')\"></a></div>"
        }
    }
    for (const color of defaultEdgeColors) {
        if (currentEdgeElement.style.stroke == color) {
            s += "<div class=\"col s2\"> <a class=\"smaller-dot\" style='background-color: " + color + "' onclick=\"changeEdgeColor(this,'" + color + "', true)\"></a></div>"
        }else{
            s += "<div class=\"col s2\"><a class=\"smaller-dot\" style='background-color: " + color + "' onclick=\"changeEdgeColor(this,'" + color + "')\"></a></div>"
        }
    }
    $("#colorPicker").html(s)

}

//--------------Funzioni onClick dei contextMenu--------------------


function showNeighbours(){
    console.log(currentNode)
    if(isSelectedMoreOfOneNode()) {
        let selectedNodes = selectedNodeElements.map(v => d3.select(v).data()[0])
        selectedNodes.forEach(v => graph_viz.showNeighbours(v))
    }else
        graph_viz.showNeighbours(currentNode)
}

function showEntityInfoPopUp(type) {
    $("#popUpEntityInfo").addClass("visible")
    $("#popUpEntityInfo").removeClass("hidden")
    let input = document.getElementById("freeze-in");
    console.log(input, input.checked)
    let isChecked = input.checked;
    if (!isChecked)
        if (type=="n")
            infobox.display_info(currentNode)
        else
            infobox.display_info(currentEdge);
}

function changeNodeDimension(){
    if(isSelectedMoreOfOneNode())
        selectedNodeElements.forEach(v => changeSingleNodeDimension(v))
    else
        changeSingleNodeDimension(currentNodeElement)
}

function changeEdgeDimension(){
    if (isSelectedMoreOfOneEdge())
        selectedEdgeElements.forEach(v => graphShapes.changeEdgeDimension($("#nodeDimension").val(), v))
    else
        graphShapes.changeEdgeDimension($("#edgeDimension").val(), currentEdgeElement)
}

function changeNodeColor(dot,color, active){
    dot = $(dot)
    if (dot.hasClass("smaller-dot-active"))
        return

    if (isSelectedMoreOfOneNode()){
        selectedNodeElements.forEach(v => changeSingleNodeColor(color, v))
        selectedNodeElements.forEach(v => selectNode(null, v))
    }else{
        changeSingleNodeColor(color, currentNodeElement)
        let currentActive = $(".smaller-dot-active")
        currentActive.addClass("smaller-dot")
        currentActive.removeClass("smaller-dot-active")

        dot.addClass("smaller-dot-active")
        dot.removeClass("smaller-dot")
        if (isNodeSelected(currentNodeElement))
            selectNode(null, currentNodeElement)
    }

}

function changeEdgeColor(dot, color, active){
    dot = $(dot)
    if (dot.hasClass("smaller-dot-active"))
        return

    if (isSelectedMoreOfOneEdge()){
        selectedNodeElements.forEach(v => changeSingleEdgeColor(color, v))
    }else{
        changeSingleEdgeColor(color, currentEdgeElement)
        let currentActive = $(".smaller-dot-active")
        currentActive.addClass("smaller-dot")
        currentActive.removeClass("smaller-dot-active")

        dot.addClass("smaller-dot-active")
        dot.removeClass("smaller-dot")
        //TODO: sistemare qua
      /*  if (isNodeSelected(currentNodeElement))
            selectNode(null, currentNodeElement)*/
    }
}

//---------------Utilities---------------------

function isSelectedMoreOfOneEdge() {
    return selectedEdgeElements.length > 1
}

function isSelectedMoreOfOneNode(){
    return selectedNodeElements.length > 1
}

function isNodeSelected(g){
    let circle = $(g.getElementsByTagName("circle")[1])
    if (circle.data("selected") == undefined) {
        return false
    }else if (!circle.data("selected")){
        return false
    }
    return true

}

function selectNode(d,g){
    g = $(g.getElementsByClassName("base_circle")[0])
    g.css("stroke",  shadeColor(g.attr("fill"), 20))
    g.css("stroke-width",  "6px")
    g.data("selected", true)
}

function deselectNode(d,g){
    //TODO: fixare stroke problems
    g = $(g.getElementsByClassName("base_circle")[0])
    g.css("stroke",  "transparent")
    g.css("stroke-width",  "0px")
    g.data("selected", false)
}


//----------------Funzioni di appoggio a modifica aspetto nodo e archi------------
function changeSingleNodeDimension(element) {
    let newDimension = $("#nodeDimension").val()
    let childrens = Array.from(element.getElementsByTagName("circle"))
    childrens[0].setAttribute("r", newDimension /2 )
    //TODO: Spostare quello sotto
    childrens[1].setAttribute("r", newDimension)
    centerTextNode(element)

    if (newDimension - 11 < 11) return

    $(Array.from(element.getElementsByTagName("text"))[0]).css("font-size", newDimension-19)

}

function centerTextNode(node){
    d3.select(node).selectAll("tspan").each(function (d){
        let text = d3.select(this)
        let x = Number(text.attr('x'));
        let y = Number(text.attr('y'));
        let bb = text.node().getBBox()
        let centerX = bb.width/2
        let centerY = bb.height/2
        //text.attr('x', centerX);
        text.attr('y', centerY);
    })

}

function changeSingleNodeColor(color, node){
    if ($(node).data("realColor")===undefined)
        $(node).data("realColor", getColorFromG(node))

    let childrens = Array.from(node.getElementsByTagName("circle"))
    childrens.forEach(v => v.setAttribute('fill', color))
    graphShapes.updateTextColors()
}

function changeSingleEdgeColor(color, v) {
    graphShapes.changeEdgeColor(color, v)
    return undefined;
}

function getNotRealColorFromG(g){
    let childrens = Array.from(g.getElementsByTagName("circle"))
    return childrens[0].getAttribute("fill");
}

function getColorFromG(g){
    if ($(g).data("realColor") !== undefined || $(g).data("realColor") != null) {
        return $(g).data("realColor")
    }
    let childrens = Array.from(g.getElementsByTagName("circle"))
    return childrens[0].getAttribute("fill");
}

function getAllUniqueEdgeColors(){
    let nodes = Array.from(d3.selectAll("g.node")._groups[0])

    return new Set(nodes.map(v => getColorFromG(v)))
}
