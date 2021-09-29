//TODO: Nome file temporaneo, capire

function search_query() {
	//if (typeof graph_viz.simulation!=='undefined') {graph_viz.simulation.stop(); console.log('Simulation stopped!');}
	graphioGremlin.search_query();
	//graphioGremlin.search_query2("x");
}

function get_graph_info() {
	graphioGremlin.get_graph_info();
	infobox.show_element("#graphInfo");
/*
	document.getElementById("showgraphinfo").checked = true;
*/
}

function saveSvg(svgEl, name) {
	svgEl.setAttribute("xmlns", "http://www.w3.org/2000/svg");
	let svgData = svgEl.outerHTML;
	let preface = '<?xml version="1.0" standalone="no"?>\r\n';
	let svgBlob = new Blob([preface, svgData], {type: "image/svg+xml;charset=utf-8"});
	let svgUrl = URL.createObjectURL(svgBlob);
	let downloadLink = document.createElement("a");
	downloadLink.href = svgUrl;
	downloadLink.download = name;
	document.body.appendChild(downloadLink);
	downloadLink.click();
	document.body.removeChild(downloadLink);
}

function save_as_svg() {


	let svg_data = document.getElementById("").innerHTML //put id of your svg element here

	let head = '<svg title="graph" version="1.1" xmlns="http://www.w3.org/2000/svg">'

	//if you have some additional styling like graph edges put them inside <style> tag

	let style = '<style>circle {cursor: pointer;stroke-width: 1.5px;}text {font: 10px arial;}path {stroke: DimGrey;stroke-width: 1.5px;}</style>'

	let full_svg = head + style + svg_data + "</svg>"
	let blob = new Blob([full_svg], {type: "image/svg+xml"});
	saveAs(blob, "graph.svg");


}
