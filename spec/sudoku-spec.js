var sudoku = require("../sudoku-parser.js");

describe("Getter return should be array", function () {
  it("should be array", function () {
   sudoku.SudokuFileParser.parseSudokuPuzzles();
   var puzzlesArray = sudoku.SudokuFileParser.getPuzzlesArray();
    expect(puzzlesArray).toBeDefined();
    expect(puzzlesArray instanceof Array).toBe(true);
  });
});

describe("Puzzles should be Array", function () {
  it("should be array", function () {
   sudoku.SudokuFileParser.parseSudokuPuzzles();
   var puzzlesArray = sudoku.SudokuFileParser.getPuzzlesArray();
    expect(puzzlesArray).toBeDefined();
    expect(puzzlesArray instanceof Array).toBe(true);
  });
});