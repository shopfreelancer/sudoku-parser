'use strict';

let sudoku = require("./sudoku-parser.js");

sudoku.SudokuFileParser.parseSudokuPuzzles();

let puzzles = sudoku.SudokuFileParser.getPuzzlesArray();
console.log(puzzles);

sudoku.SudokuFileParser.exportPuzzlesToFile();