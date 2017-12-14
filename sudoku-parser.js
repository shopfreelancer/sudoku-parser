module.exports.SudokuFileParser = (function () {
        
    var delimiterString = "Grid";
    var importFilePath = "./data/p096_sudoku.txt";
    var exportFilePath = "./data/puzzles-json.js"
    var puzzles;
    
    /**
     * Setter for import file path and name of csv file
     * @param {String}
     */    
    function setImportFilePath(filePath){
        importFilePath = filePath;
    }
    
    /**
     * Setter for export file path and name of csv file
     * @param {String}
     */    
    function setExportFilePath(filePath){
        exportFilePath = filePath;
    }    

    /**
     * Setter for delimiter String of csv file
     * @param {String}
     */
    function setDelimiterString(delimiterString){
        delimiterString = delimiterString;
    }

    /**
     * Getter for puzzles
     * @returns {JSON} Returns puzzles
     */
    function getPuzzlesJson(){
        if(puzzles.length === 0){
            parseSudokuPuzzles();
        }
        return JSON.parse(JSON.stringify(puzzles));
    }
    
     /**
     * Getter for puzzles
     * @returns {Array} Returns puzzles
     */
    function getPuzzlesArray(){
        if(puzzles.length === 0){
            parseSudokuPuzzles();
        }
        return puzzles
    }

    /**
    * Parses local txt file with sudoku puzzles from https://projecteuler.net/index.php?section=problems&id=96
    * every array key contains the 9x9 values for each field ordered by rows
    */
    function parseSudokuPuzzles(){
        
        // Read File, get one string
        var csvString = readCsvFile();
        
        // Split all lines of String to array elements
        var allLinesArray = csvString.split(/\r\n|\n/);
        
        // Find all lines with the Headline of each puzzle as delimiter.
        var delimiterArrayKeys = findArrayKeysOfDelimiterLines(allLinesArray);
        
        // Now transform every sudoku to string and put all in one array
        puzzles = extractAllSinglePuzzles(allLinesArray,delimiterArrayKeys);
    }
    
    /**
    * Open and read file from file system
    * @returns {String}
    */
    function readCsvFile(){
        var fs = require('fs'),
        path = require('path'),   
        filePath = path.join(__dirname, importFilePath);
        
        var csvString = fs.readFileSync(filePath, { encoding: 'utf8' });
        return csvString;
    }
    
    /**
    * All the puzzles start with a row called Grid 01, Grid 02...
    * Get all array keys with delimiter key word
    * @param {Array}
    * @returns {Array}
    */
    function findArrayKeysOfDelimiterLines(allLinesArray){
        let delimiterArrayKeys = [];
        for(let i=0;i< allLinesArray.length;i++){
            if(allLinesArray[i].search(delimiterString) !== -1){
                delimiterArrayKeys.push(i);
            }
        }
        return delimiterArrayKeys;
    }
    
    /**
    * We have basically the rows of all sudoku as array elements, seperated by the delimiter "Grid X"
    * Each puzzle consits of a range of all array elements between delimter key 1 and key 2
    * @param {Array}
    * @returns {Array}
    */
    function extractAllSinglePuzzles(allLinesArray,delimiterArrayKeys){
        let puzzlesArray = [];
        for(var index = 0; index < delimiterArrayKeys.length; index++){
              let singlePuzzleArray = allLinesArray.slice(delimiterArrayKeys[index]+1,delimiterArrayKeys[index+1]);
              let puzzleString = singlePuzzleArray.join("");

              puzzlesArray[index] = [];

              for(let start = 0; start < puzzleString.length; start++){
                  let end = start+1;
                  puzzlesArray[index].push(parseInt(puzzleString.substring(start,end)));
              }
        }
        return puzzlesArray;
    }
    
    function exportPuzzlesToFile(){
        var fs = require('fs'),
        path = require('path'),   
        filePath = path.join(__dirname, exportFilePath);
        
        fs.writeFileSync(filePath, JSON.stringify(puzzles));
    }

    /**
    * Revealing module pattern. public access for method parseGrid
    */
    return {
        setImportFilePath,
        setExportFilePath,
        setDelimiterString,
        getPuzzlesArray,
        getPuzzlesJson,
        parseSudokuPuzzles,
        exportPuzzlesToFile
    }
    
})();