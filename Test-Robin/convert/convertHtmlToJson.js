const cheerio = require('cheerio');
const fs = require('fs');

// Read the HTML content from a file
const html = fs.readFileSync('myHtmlFile.html', 'utf8');

// Load the HTML into Cheerio
const $ = cheerio.load(html);

// Initialize an empty object to store the JSON data
const jsonData = {};

// Initialize id_Y and id_X
let id_Y = 1;
let id_X = 1;

// Loop through the rows with class 'row'
$('.row').each((index, row) => {
    const $row = $(row);

    // Extract the colors and algorithm
    const colors = $row.find('.cube-square').map((_, cubeSquare) =>
        $(cubeSquare).css('background-color')
    ).get().join(', ');
    const algorithm = $row.find('.font-monospace').text().trim();
    
    // Remove the id at the beginning of the algorithm (if it exists)
    const cleanedAlgorithm = algorithm.replace(/^\d+\s*/, '');

    // Create a unique key combining id_Y and id_X
    const uniqueKey = `${id_Y}_${id_X}`;

    jsonData[uniqueKey] = {
        id_Y: id_Y.toString(),
        id_X: id_X.toString(),
        colors: colors,
        algorithm: cleanedAlgorithm
    };

    // Increment id_X, and if it's a multiple of 90, increment id_Y and reset id_X to 1
    id_X++;
    if (id_X > 90) {
        id_Y++;
        id_X = 1;
    }
});

// Output the JSON data
console.log(JSON.stringify(jsonData, null, 2));

// Write the JSON data to a file
fs.writeFileSync('myJsonFile.json', JSON.stringify(jsonData, null, 2));
