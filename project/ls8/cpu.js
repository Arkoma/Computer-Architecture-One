/**
 * LS-8 v2.0 emulator skeleton code
 */

//const ADD = 10101000;
//const AND = 10110011;
//const CALL = 01001000;
//const CMP =
//const DEC =
//const DIV =
const HLT = 0b00000001;
//const INC =
// const INT =
//const IRET =
//const JEQ = 
// const JGT =
//const JLT =
//const JMP =
//const JNE =
//const LD =
const LDI = 0b10011001;
//const MOD =
const MUL = 0b10101010;
//const NOP =
//const NOT =
//const OR =
//const POP =
//const PRA =
const PRN = 0b01000011;
//const PUSH = 
//const RET = 00001001;
//const ST = 10011010;
//const SUB = 10101001;
//const XOR = 10110010;

/**
 * Class for simulating a simple Computer (CPU & memory)
 */
class CPU {

    /**
     * Initialize the CPU
     */
    constructor(ram) {
        this.ram = ram;

        this.reg = new Array(8).fill(0); // General-purpose registers R0-R7
        
        // Special-purpose registers
        this.reg.PC = 0; // Program Counter
    }
	
    /**
     * Store value in memory address, useful for program loading
     */
    poke(address, value) {
        this.ram.write(address, value);
    }

    /**
     * Starts the clock ticking on the CPU
     */
    startClock() {
        this.clock = setInterval(() => {
            this.tick();
        }, 1); // 1 ms delay == 1 KHz clock == 0.000001 GHz
    }

    /**
     * Stops the clock
     */
    stopClock() {
        clearInterval(this.clock);
    }

    /**
     * ALU functionality
     *
     * The ALU is responsible for math and comparisons.
     *
     * If you have an instruction that does math, i.e. MUL, the CPU would hand
     * it off to it's internal ALU component to do the actual work.
     *
     * op can be: ADD SUB MUL DIV INC DEC CMP
     */
    alu(op, regA, regB) {
        switch (op) {
          case MUL:
            this.reg[regA] = this.reg[regA] * this.reg[regB];
            console.log('result of multiplication', this.reg[regA]);
            break;
        }
    }

    /**
     * Advances the CPU one cycle
     */
    tick() {
        // Load the instruction register (IR--can just be a local variable here)
        // from the memory address pointed to by the PC. (I.e. the PC holds the
        // index into memory of the instruction that's about to be executed
        // right now.)

        let IR = this.ram.read(this.reg.PC);

        // Debugging output
        // console.log(`${this.reg.PC}: ${IR.toString(2)}`);

        // Get the two bytes in memory _after_ the PC in case the instruction
        // needs them.

        let operandA = this.ram.read(this.reg.PC + 1);
        let operandB = this.ram.read(this.reg.PC + 2);

        // Execute the instruction. Perform the actions for the instruction as
        // outlined in the LS-8 spec. 
        switch(IR) {
          case LDI:
            console.log('loading ...');
            this.reg[operandA] = operandB;
            break;
          case PRN:
            console.log('printing...');
            console.log(this.reg[operandA]);
            break;
          case HLT:
            console.log('halting now ...');
            this.stopClock();
            break;
          case MUL:
            console.log('multiplying ' + operandA + ' with ' + operandB);
            this.alu(IR, operandA, operandB);
            break;
        }	
        // Increment the PC register to go to the next instruction. Instructions
        // can be 1, 2, or 3 bytes long. Hint: the high 2 bits of the
        // instruction byte tells you how many bytes follow the instruction byte
        // for any particular instruction.
        
        let operandCount = (IR >>> 6) & 0b11;
        let totalInstructionLen = operandCount + 1;
        this.reg.PC += totalInstructionLen;
        // if (IR >= 0b01000000 && IR < 0b10000000) this.reg.PC += 2;
        //     if (IR >= 0b10000000) this.reg.PC += 3;
        //     this.reg.PC += 1;
    }
}

module.exports = CPU;
