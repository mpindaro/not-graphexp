let firstFabClick = false
let legenda=[]

$(document).ready(function(){
    $('select').formSelect();
    $('select').css("color", "#ffffff");
    let elems = document.querySelectorAll('.fixed-action-btn');
    let instances = M.FloatingActionButton.init(elems, {
        direction: 'up',
        hoverEnabled: false
    });

    $('.modal').modal();
    $('.tooltipped').tooltip();


    addListeners()
    popUpInit()
});

function addListeners() {
    $("#fab_showgraphinfo").click(showGraphInfoFromFabPopUp)
    $("#fabLegenda").click(showLegendaPopUp)
    $("#fabAttributi").click(showAttributePopUp)
    $("#closeGraphInfoPopUpDiv").click(function (){
        $("#popUpGraphInfo").addClass("hidden")
        $("#popUpGraphInfo").removeClass("visible")
    })
    $("#search_query").click(function (){
        //bug fix
        graph_viz.clear()
        console.log("%cTHIS LINE OF CODE IS NEEDED EVEN IF IT RAISE AN ERROR. DO NOT REMOVE", "color: #cf0000")
        sleep(100)
        search_query();
    })
    $("#closeEntityInfoPopUpDiv").click(function (){
        $("#popUpEntityInfo").addClass("hidden")
        $("#popUpEntityInfo").removeClass("visible")
    })
    $("#closeLegendaPopUpDiv").click(function (){
        $("#popUpLegenda").addClass("hidden")
        $("#popUpLegenda").removeClass("visible")
    })
    $("#closeAttributesPopUpDiv").click(function (){
        $("#popUpAttributes").addClass("hidden")
        $("#popUpAttributes").removeClass("visible")
    })

    $("#searchQueryInput").click(function (){
        searchQueryInput($("#queryInput").val())
    })

    $("#salva").click(saveAsPng)
    $("#body").on("contextmenu", function (e){
        bodyContextMenuListener(e)
    })
    $("#body").click(function (e){
        bodyClickListener(e)
    })



}

//--------------Funzioni FAB-------------------

function showLegendaPopUp() {
    $("#popUpLegenda").addClass("visible")
    $("#popUpLegenda").removeClass("hidden")
    if (d3.selectAll('g.node').nodes().length!==0) {
        legenda = getAllUniqueLabelColors()
        showLegenda(legenda)
    }else{
        $("#legenda").html("<br><h3>Informazione al momento non disponbile</h3><br>")
    }
}

function showGraphInfoFromFabPopUp(){

    $("#popUpGraphInfo").addClass("visible")
    $("#popUpGraphInfo").removeClass("hidden")
    if (!firstFabClick)
        get_graph_info();
}

//----------------Utilities-------------------------------

function saveAsPng() {
    html2canvas(document.getElementById("content"), {scale: 1}).then(canvas => {
        document.body.appendChild(canvas);
        canvas.style.display = "none"
        let dataURL = canvas.toDataURL('image/png')
        let downloadLink = document.createElement('a');
        let url = dataURL.replace(/^data:image\/png/, 'data:application/octet-stream');
        downloadLink.setAttribute('download', 'view.png');
        downloadLink.setAttribute('href', url);
        downloadLink.click();
    });
}

function shadeColor(color, percent) {

    var R = parseInt(color.substring(1,3),16);
    var G = parseInt(color.substring(3,5),16);
    var B = parseInt(color.substring(5,7),16);

    R = parseInt(R * (100 + percent) / 100);
    G = parseInt(G * (100 + percent) / 100);
    B = parseInt(B * (100 + percent) / 100);

    R = (R<255)?R:255;
    G = (G<255)?G:255;
    B = (B<255)?B:255;

    var RR = ((R.toString(16).length==1)?"0"+R.toString(16):R.toString(16));
    var GG = ((G.toString(16).length==1)?"0"+G.toString(16):G.toString(16));
    var BB = ((B.toString(16).length==1)?"0"+B.toString(16):B.toString(16));

    return "#"+RR+GG+BB;
}

function capitalize(s) {
    return s[0].toUpperCase() + s.slice(1);
}

function searchQueryInput(query){
    console.log("%cQuery:\n%s", "color: #ff7700", query.toString())
    graphioGremlin.search_raw_query(query);
}

// --------------- funzioni di appoggio per la legenda----------------

function createColorPropertyObject(label, color) {
    return {
        label: label,
        color: color
    };
}

function isNotInArray(element, array){

    return array.filter(v => v.label === element.label).length===0
}

function getAllUniqueLabelColors(){
    let nodes = Array.from(d3.selectAll("g.node")._groups[0])
    let colorProperties = []
    nodes.forEach(v => colorProperties.push(createColorPropertyObject( v.childNodes[2].textContent,getColorFromG(v))))
    let uniqueColorProperties = []
    for (const colorProperty of colorProperties) {
        if (isNotInArray(colorProperty, uniqueColorProperties))
            uniqueColorProperties.push(colorProperty)
    }
    return uniqueColorProperties
}

function getAllUniqueNodeColors(){
    let nodes = Array.from(d3.selectAll("g.node")._groups[0])

    return new Set(nodes.map(v => getColorFromG(v)))
}

function showLegenda(legenda) {
    let s = "        \n" +
        "        <table class=\"highlight\"> <tbody>"

    legenda.forEach( v => s+= "<tr>\n" +
        "                <td style='text-align: center'><span style='background-color:"+ v.color +"' class=\"dot\"></span></td>\n" +
        "                <td>"+v.label+"</td>\n" +
        "            </tr>")


    s+="</tbody>\n" +
        "        </table>"

    $("#legenda").html(s)
}

// ---------------- init draggable pop up------------------
function popUpInit() {
    let d = document.getElementById('popUpGraphInfo');
    let d2 = document.getElementById('popUpEntityInfo');
    let d3 = document.getElementById('popUpLegenda');
    let d4 = document.getElementById('popUpAttributes');
    d.style.position = "absolute";
    d2.style.position = "absolute";
    d3.style.position = "absolute";
    d4.style.position = "absolute";
    d.style.left = 90+'px';
    d2.style.left = 90+'px';
    d3.style.left = 90+'px';
    d4.style.left = 90+'px';
    d.style.top = 300+'px';
    d2.style.top = 300+'px';
    d3.style.top = 300+'px';
    d4.style.top = 300+'px';
    dragElement(document.getElementById("popUpGraphInfo"));
    dragElement(document.getElementById("popUpEntityInfo"));
    dragElement(document.getElementById("popUpLegenda"));
    dragElement(document.getElementById("popUpAttributes"));
}

function dragElement(elmnt) {
    let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    if (document.getElementById(elmnt.id + "Header")) {
        // if present, the header is where you move the DIV from:
        document.getElementById(elmnt.id + "Header").onmousedown = dragMouseDown;
    } else {
        // otherwise, move the DIV from anywhere inside the DIV:
        elmnt.onmousedown = dragMouseDown;
    }

    function dragMouseDown(e) {
        e = e || window.event;
        e.preventDefault();
        // get the mouse cursor position at startup:


        pos3 = e.clientX;
        pos4 = e.clientY;

        document.onmouseup = closeDragElement;
        // call a function whenever the cursor moves:
        document.onmousemove = elementDrag;
    }

    function elementDrag(e) {
        e = e || window.event;
        e.preventDefault();
        // calculate the new cursor position:
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        // set the element's new position:
        elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
        elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
    }

    function closeDragElement() {
        // stop moving when mouse button is released:
        document.onmouseup = null;
        document.onmousemove = null;
    }
}

