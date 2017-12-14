'use strict';

let sudoku = require("./sudoku-parser.js");
sudoku.SudokuFileParser.setImportFilePath("wrong/file.text");
sudoku.SudokuFileParser.parseSudokuPuzzles();


let puzzles = sudoku.SudokuFileParser.getPuzzlesArray();
console.log(puzzles.length);

sudoku.SudokuFileParser.exportPuzzlesToFile();