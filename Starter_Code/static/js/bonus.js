//Performing D3 to fetch JSON and logging it
d3.json(url).then(function(data) {
  console.log(data);
});

//Initializing the dashboard at startup 
function init() {

    //Performing D3 to select the dropdown menu
    let dropdown = d3.select("#selDataset");

    //Using D3 to get sample names and populate the dropdown selector
    d3.json(url).then((data) => {
        
        //Variable for the sample names
        let names = data.names;

        //Adding the samples menu
        names.forEach((id) => {

            //Logging id for each interation 
            console.log(id);
            //Append an option element to the dropdown menu
            dropdown.append("option")
            .text(id)
            .property("value",id);
        });

        //Set the first sample from the list
        let sample_1 = names[0];

        //Log the value of sample_1
        console.log(sample_1);

        //Building the initial plots
        GaugeChart(sample_1);
    });
};

//Building the Gauge Chart
function GaugeChart(sample) {

    //Using D3 to get all of the data
    d3.json(url).then((data) => {

        //Retrieve all metadata
        let metadata = data.metadata;

        //Filtering based on the value of the sample
        let value = metadata.filter(result => result.id == sample);

        //Logging the array
        console.log(value)

        //Gets the first index from the array
        let valueData = value[0];

        //Use Object.entries to get the key/value pairs and and retrieve the wash frequency
        let WashFrequency = Object.values(valueData)[6];
        
        //Trace for the gauge chart
        let trace2 = {
            value: WashFrequency,
            domain: {x: [0,1], y: [0,1]},
            title: {
                text: "<b>Belly Button Washing Frequency</b><br>Scrubs per Week",
                font: {color: "black", size: 16}
            },
            type: "indicator",
            mode: "gauge+number",
            gauge: {
                axis: {range: [0,10], tickmode: "linear", tick0: 2, dtick: 2},
                bar: {color: "black"},
                steps: [
                    {range: [0,1], color: "rgba(255, 255, 255, 0)"},
                    {range: [1, 2], color: "rgba(232, 226, 202, .5)"},
                    {range: [2, 3], color: "rgba(210, 206, 145, .5)"},
                    {range: [3, 4], color:  "rgba(202, 209, 95, .5)"},
                    {range: [4, 5], color:  "rgba(184, 205, 68, .5)"},
                    {range: [5, 6], color: "rgba(170, 202, 42, .5)"},
                    {range: [6, 7], color: "rgba(142, 178, 35 , .5)"},
                    {range: [7, 8], color:  "rgba(110, 154, 22, .5)"},
                    {range: [8, 9], color: "rgba(50, 143, 10, 0.5)"},
                    {range: [9, 10], color: "rgba(14, 127, 0, .5)"},
                ]
            } 
        };

        //Set up the Layout
        let layout = {
            width: 600, 
            height: 500,
            margin: {t: 0, b:0}
        };

        //Call Plotly to plot the gauge chart
        Plotly.newPlot("gauge", [trace2], layout)
    });
};

// Call the initialize function
init();