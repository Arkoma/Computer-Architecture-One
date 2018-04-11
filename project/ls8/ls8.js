const RAM = require('./ram');
const CPU = require('./cpu');
const readline = require('readline');
const fs = require('fs');


/**
 * Load an LS8 program into memory
 *
 * TODO: load this from a file on disk instead of having it hardcoded
 */
function loadMemory() {

    // Hardcoded program to print the number 8 on the console

  /* const program = [ // print8.ls8
      "10011001", // LDI R0,8  Store 8 into R0
        "00000000",
        "00001000",
        "01000011", // PRN R0    Print the value in R0
        "00000000",
        "00000001"  // HLT       Halt and quit
    ]; */

  /*  const program = [
    //# mult.ls8

    "10011001", // # LDI R0,8
    "00000000",
    "00001000",
    "10011001", // # LDI R1,9
    "00000001",
    "00001001",
    "10101010", // # MUL R0,R1 <---
    "00000000",
    "00000001",
    "01000011", // # PRN R0
    "00000000",
    "00000001" // # HLT
  
  ];
  */
  // const mul = fs.readFileSync('./mult.ls8', { encoding: 'utf8' } );
  let ended = false;
  const instream = fs.createReadStream('./mult.ls8');
  instream.on('end', () => { ended = true });
 
  const rl = readline.createInterface({
    input: instream
  });
  let n = -3;
  rl.on('line', function (line) {
    n++;
    console.log('function (line)');
    if (!line) {
    } else if (!isNaN(line.slice(0,7))) {
      line = line.replace(/#/g, "//");
      cpu.poke(n, parseInt(line.slice(0,7), 2));
      console.log(ram.read(n));
    } else if (ended) {
      console.log('eof reached'); 
    }
  });
  // Load the program into the CPU's memory a byte at a time
  /*for (let i = 0; i < program.length; i++) {
        cpu.poke(i, parseInt(program[i], 2));
    } */ 
}

/**
 * Main
 */

let ram = new RAM(256);
let cpu = new CPU(ram);

// TODO: get name of ls8 file to load from command line

loadMemory(cpu);
console.log('starting the clock');
cpu.startClock();
