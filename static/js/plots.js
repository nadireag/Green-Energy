// get our url for the data
var url = "/api/green_energy";

//  use d3 to select variables for the plot
d3.json(url, function(data){
    console.log(data)
    //  grab the variables necessary for the plots
    var energy_consumption = data.energy_consumption;
    var population = data.population;
    var state = data.state
    var rural_solar = data.rural_solar;
    var urban_solar = data.urban_solar;

    console.log(energy_consumption)
    console.log(population)

    //  create the trace
    var trace1 = {
        x: state,
        y: energy_consumption,
        type: "bar",
        name: "Energy Consumption"
    };
    
    //  create the data array
    var data = [trace1];
    
    // create layout
    var layout = {
        title: "Total Energy Consumption per Capita (million Btu)",
        xaxis: { 
            title : "States",
            tickangle: -36
        },
        yaxis: { title: "Energy Consumption"}
    };

    // create the bar plot
    Plotly.newPlot("plot4", data, layout)


    ////////////////////////////////////////////////
    //  create the traces for the scatter plot
    var trace2 = {
        x: state,
        y: urban_solar,
        mode: "markers",
        type: "scatter",
        name: "Urban Solar",
        marker: {size: 12}
    };

    var trace3 = {
        x: state,
        y: rural_solar,
        mode:"markers",
        type: "scatter",
        name: "Rural Solar",
        marker: {size: 12}
    };

    // create data1 array
    var data1 = [trace2, trace3]

    var layout1 = {
        title: "Rural vs Urban Solar Energy",
        xaxis: { 
                title : "States",
                tickangle: -36,
            },
        yaxis: { title: "Solar"}
    };

    // create the scatter plot
    Plotly.newPlot("plot3", data1, layout1)
 
});



