if (host) {
	$('#server_address').val(host);
}
init_property_bar();
// Create the graph canvas in the chosen div element
graph_viz.init("#main");
// Add the zoom layer to the graph
//let svg_graph =
graph_viz.addzoom();
//graph_viz.layers.set_nb_layers(4);

// Create the info box for node details
infobox.create("#graphInfo", "#nodeInfo"); // from module in infobox.js

//console.log(graph_viz.graph_events.ev);
//graph_viz.graph_events.test();


function init_property_bar() {
	document.getElementById('nbLayers').value = default_nb_of_layers;
}

function change_nav_bar(node_data, edge_data) {
	let nav_bar = d3.select("#prop_choice");
	nav_bar.select("input").remove();
	nav_bar.select("select").remove();
	//nav_choices = nav_bar.append("ul");
	//nav_choices.append("li").append("button").attr("onclick",search_query).text("Search")
	let select = d3.select('#prop_choice')
		.append('select').attr('class', 'select').attr('id', 'search_field')

	let select_node = select.append('optgroup').attr('label', 'Nodes')
	//.on('change',onchange)

	let select_edge = select.append('optgroup').attr('label', 'Edges')

	let node_options = select_node
		.selectAll('option')
		.data(node_data).enter()
		.append('option')
		.text(function (d) {
			return d;
		});

	let edge_options = select_edge
		.selectAll('option')
		.data(edge_data).enter()
		.append('option')
		.text(function (d) {
			return d;
		});

}

function display_properties_bar(prop_list, item, text) {
	let nav_bar = d3.select("#graphInfoBar");
	nav_bar.select("#property_bar_" + item).remove();
	let property_bar = nav_bar.append("div").attr("id", "property_bar_" + item);
	property_bar.append('text').text(text).style("font-weight", "bold");
	//d3.select('#property_bar').append('text').text('hello')
	let property_label = property_bar.selectAll('input').append("ul")
		.data(prop_list).enter().append("li");
	//.append('label');


	property_label.append('input').attr('type', 'checkbox').attr('id', function (d) {
		return item + "_" + d;
	})
		.attr('id_nb', function (d) {
			return prop_list.indexOf(d);
		})
		//.attr('onchange',function(d){display_prop(d);});
		.attr('onchange', 'display_prop(this)');

	property_label.append('label').text(function (d) {
		return d;
	});


}

function display_color_choice(prop_list, item, text) {
	prop_list = ['none', 'label'].concat(prop_list);
	let nav_bar = d3.select("#graphInfoBar");
	nav_bar.select("#color_choice_" + item).remove();
	let color_bar = nav_bar.append("div").attr("id", "color_choice_" + item);
	color_bar.append("div").append("text").text(text).style("font-weight", "bold");
	color_bar.append("div").append("select").attr("class", "select").attr("id", "color_select_" + item)
		.attr("onchange", "colorize(this)")
		.selectAll("option")
		.data(prop_list).enter()
		.append("option")
		.text(function (d) {
			return d;
		});
}

function colorize(selection) {
	let value = selection.value;
	console.log('Color by ' + value);
	graphShapes.colorize(value);

}

function display_prop(prop) {
	let prop_id = prop.id;
	let prop_id_nb = prop.getAttribute('id_nb');
	let text_base_offset = 10;
	let text_offset = 10;
	let prop_name = prop_id.slice(prop_id.indexOf("_") + 1);
	let item = prop_id.slice(0, prop_id.indexOf("_"));
	console.log(prop_id, item)
	if (d3.select("#" + prop_id).property("checked")) {
		if (item == 'nodes') {
			let tmp1 = document.getElementById('nodesckprops').value.toString();
			let tmp = tmp1.split(",");
			tmp.push("a" + prop_id_nb.toString());
			document.getElementById('nodesckprops').value = tmp.toString();
//                document.getElementById('nodesckprops').value = parseInt(document.getElementById('nodesckprops').value)+1;  // numero di proprieta dei nodi da visualizzare
//                prop_id_nb = document.getElementById('nodesckprops').value.indexOf(prop_id_nb);
			let elements_text = d3.selectAll('.node');
		} else if (item == 'edges') {
			let elements_text = d3.selectAll('.edgelabel');
		}
		attach_property(elements_text, prop_name, prop_id_nb, item)
	} else {
		if (item == 'nodes') {
			let tmp1 = document.getElementById('nodesckprops').value.toString();
			let tmp = tmp1.split(",");
			let i = tmp.indexOf("a" + prop_id_nb.toString());
			if (i > -1) {
				tmp.splice(i, 1);
				document.getElementById('nodesckprops').value = tmp.toString()
			}
			//document.getElementById('nodesckprops').value = parseInt(document.getElementById('nodesckprops').value)-1;
			// numero di proprieta dei nodi da visualizzare
			d3.selectAll('.node').select('.' + prop_id).remove();
		} else if (item == 'edges') {
			d3.selectAll('.edgelabel').select('.' + prop_id).remove();
		}

	}
}


function attach_property(graph_objects, prop_name, prop_id_nb, item) {
	let text_base_offset = 10;
	let text_offset = 10;
	let prop_id = item + "_" + prop_name;
	if (item == 'nodes') {
		elements_text = graph_objects.append("text").style("pointer-events", "none");
	} else if (item == 'edges') {
		let elements_text = graph_objects.append("textPath")
			.attr('class', 'edge_text')
			.attr('href', function (d, i) {
				return '#edgepath' + d.id
			})
			.style("text-anchor", "middle")
			.style("pointer-events", "none")
			.attr("startOffset", "70%");
		//.text(function (d) {return d.label});
		prop_id_nb = prop_id_nb + 1;
	} else {
		console.log('Bad item name.');
		return 1;
	}
	let tmp1 = document.getElementById('nodesckprops').value.toString();
	let tmp = tmp1.split(",");
	prop_id_nb = tmp.indexOf("a" + prop_id_nb.toString());
	if (prop_id_nb < 0) prop_id_nb = 0;
	elements_text.classed("prop_details", true).classed(prop_id, true)
		//.attr("x", 12)
		.attr("dy", function (d) {
			return graphShapes.node_size(d) + text_base_offset + text_offset * parseInt(prop_id_nb);
		})
		//.attr("y", ".31em")
		.text(function (d) {
			return get_prop_value(d, prop_name, item);
		});
}


function get_prop_value(d, prop_name, item) {
	//let COMMUNICATION_METHOD = $('#communication_method').val();
	if (prop_name in d.properties) {
		prop_value = d.properties[prop_name]
		if (item == 'nodes') {
			if (typeof prop_value === "string") {
				return prop_value;
			} else {
				if ('summary' in prop_value) {
					return prop_value['summary'];
				} else if (COMMUNICATION_METHOD == 'GraphSON1') {
					return prop_value[0].value;
				}
			}
		} else if (item == 'edges') {
			//console.log(d.properties[prop_name])
			return d.properties[prop_name];
		}
	} else {
		return "";
	}
}


function set_nb_layers() {
	let nb_layers = parseInt(document.getElementById('nbLayers').value);
	//let nb_layers = parseInt(layer_input.getAttribute("value"));
	console.log(nb_layers)
	graph_viz.layers.set_nb_layers(nb_layers);

}

function set_fade_layers() {
	let fade_layers = document.getElementById('fadeLayers');
	let isChecked = fade_layers.checked;
	//let nb_layers = parseInt(layer_input.getAttribute("value"));
	//console.log(nb_layers)
	if (isChecked) {
		graph_viz.layers.set_fade_layers(1);
	} else {
		graph_viz.layers.set_fade_layers(0);
	}

}

function show_hide_element(element_label) {
	let element = d3.select(element_label);
	let input = document.getElementById("showgraphinfo");
	let isChecked = input.checked;
	if (isChecked) element.style("display", "inline");
	else {
		element.style("display", "none");
	}
}