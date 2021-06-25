// from data.js
var tableData = data;
var tbody = d3.select("tbody");

//select all tr and tds and append the tableData
tbody.selectAll("tr")
    .data(tableData, function(d) { return d.datetime, d.city, d.state, d.country, d.shape, d.durationMinutes, d.comments; })
    .enter()
    .append("tr")
    .selectAll("td")
    .data(function(d) { return [d.datetime, d.city, d.state, d.country, d.shape, d.durationMinutes, d.comments]; })
    .enter()
    .append("td")
    .text(function(d) { return d; });

//select the search button
var button = d3.select('#filter-btn')

// Select the form
var form = d3.select("#form");

// Create event handlers 
button.on("click", runEnter);
form.on("submit", runEnter);

// Complete the event handler function for the form
function runEnter() {

    // Prevent the page from refreshing
    d3.event.preventDefault();

    // Select the input element and get the raw HTML node
    var inputElement = d3.select("#datetime");

    // Get the value property of the input element
    var inputValue = inputElement.property("value");
    //console.log(inputValue);

    //use filter and compare the filtered data with input value
    var filteredData = tableData.filter(data => data.datetime === inputValue);
    //console.log(filteredData);

    //select all tr and tds and append the filtered tableData
    var rows = tbody.selectAll("tbody tr")
        .data(filteredData, function(d) { return d.datetime, d.city, d.state, d.country, d.shape, d.durationMinutes, d.comments; });

    rows.enter()
        .append('tr')
        .selectAll("td")
        .data(function(d) { return [d.datetime, d.city, d.state, d.country, d.shape, d.durationMinutes, d.comments]; })
        .enter()
        .append("td")
        .text(function(d) { return d; });

    rows.exit().remove();

    var cells = rows.selectAll('td')
        .data(function(d) { return [d.datetime, d.city, d.state, d.country, d.shape, d.durationMinutes, d.comments]; })
        .text(function(d) { return d; });

    cells.enter()
        .append("td")
        .text(function(d) { return d; });

    cells.exit().remove();

};