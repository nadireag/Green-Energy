// get our url for the data
var url = "/api/green_energy";

// //  use d3 to select variables for the plot
// d3.json(url, function(data){
//     console.log(data)
//     //  grab the variables necessary for the plots
//     var energy_consumption = data.energy_consumption;
//     var population = data.population;
//     var state = data.state
//     var rural_solar = data.rural_solar;
//     var urban_solar = data.urban_solar;

//     console.log(energy_consumption)
//     console.log(population)

//     //  create the trace
//     var trace1 = {
//         x: state,
//         y: energy_consumption,
//         type: "bar",
//         name: "Energy Consumption"
//     };
    
//     //  create the data array
//     var data = [trace1];
    
//     // create layout
//     var layout = {
//         title: "Total Energy Consumption per Capita (million Btu)",
//         xaxis: { 
//             title : "States",
//             tickangle: -36
//         },
//         yaxis: { title: "Energy Consumption"}
//     };

//     // create the bar plot
//     Plotly.newPlot("plot4", data, layout)


//     ////////////////////////////////////////////////
//     //  create the traces for the scatter plot
//     var trace2 = {
//         x: state,
//         y: urban_solar,
//         mode: "markers",
//         type: "scatter",
//         name: "Urban Solar",
//         marker: {size: 12}
//     };

//     var trace3 = {
//         x: state,
//         y: rural_solar,
//         mode:"markers",
//         type: "scatter",
//         name: "Rural Solar",
//         marker: {size: 12}
//     };

//     // create data1 array
//     var data1 = [trace2, trace3]

//     var layout1 = {
//         title: "Rural vs Urban Solar Energy",
//         xaxis: { 
//                 title : "States",
//                 tickangle: -36,
//             },
//         yaxis: { title: "Solar"}
//     };

//     // create the scatter plot
//     Plotly.newPlot("plot3", data1, layout1)
 
// });

// ////////////////////////////////////////////////////

// Select data and get value variale for the plot
d3.json(url, function(data) {
    document.getElementById("selDataset2").addEventListener("change", function() {
        var value = this[this.selectedIndex].value;
        getPlot(value, data);
    });

    //  select and get dropdown variable
    var dropdown = d3.select("#selDataset2");

    //  create keys variable
    var keys = Object.keys(data);

    // get the data for the dropdwown menu
    keys.forEach(function(d) {
        if (d !== "state" && d !== "id" && d!="rank"){
            dropdown.append("option").text(d).property("value");
        }       
    });
    //  display the plot for the second index value
    getPlot(keys[1], data);
});

//  create a function that creates the plot
function getPlot(value, data) {
    
    //  create the trace variable
    var trace = {
        x: data.state,
        y: data[value],
        mode:"markers",
        type: "scatter",
        name: "Renewable Energy",
        marker: {
            size: 15,
            color: 'rgb(44, 160, 101)',
        }       
    };

    // create the layout
    var layout = {
        title: "Renewable Energy Comparison for States",
        font:{
            size: 12
        },
        xaxis: { 
            title : "States",
            tickangle: -45,
            dtick:0.85
        },
        margin: {
            l: 50,
            r: 50,
            b: 100,
            t: 100,
            pad: 5
          }
    };
    // create the plot
    Plotly.newPlot("plot3", [trace], layout);
}
