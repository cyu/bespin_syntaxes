"define metadata";
({
    "description": "MIPS Assembler syntax highlighter",
    "dependencies": { "textmate_syntax": "0.0.0" },
    "environments": { "worker": true },
    "provides": [
        {
            "ep": "syntax",
            "name": "s",
            "pointer": "#MIPS AssemblerSyntax",
            "fileexts": [
  "s",
  "mips",
  "spim",
  "asm"
]
        }
    ]
});
"end";

var Promise = require('bespin:promise').Promise;
var TextmateSyntax = require('textmate_syntax').TextmateSyntax;

var repositories = null;

var patterns = [
  {
    "name": "support.function.pseudo.mips",
    "comment": "ok actually this are instructions, but one also could call them funtions…",
    "match": "\\b(mul|abs|div|divu|mulo|mulou|neg|negu|not|rem|remu|rol|ror|li|seq|sge|sgeu|sgt|sgtu|sle|sleu|sne|b|beqz|bge|bgeu|bgt|bgtu|ble|bleu|blt|bltu|bnez|la|ld|ulh|ulhu|ulw|sd|ush|usw|move|mfc1\\.d|l\\.d|l\\.s|s\\.d|s\\.s)\\b"
  },
  {
    "name": "support.function.mips",
    "match": "\\b(abs\\.d|abs\\.s|add|add\\.d|add\\.s|addi|addiu|addu|and|andi|bc1f|bc1t|beq|bgez|bgezal|bgtz|blez|bltz|bltzal|bne|break|c\\.eq\\.d|c\\.eq\\.s|c\\.le\\.d|c\\.le\\.s|c\\.lt\\.d|c\\.lt\\.s|ceil\\.w\\.d|ceil\\.w\\.s|clo|clz|cvt\\.d\\.s|cvt\\.d\\.w|cvt\\.s\\.d|cvt\\.s\\.w|cvt\\.w\\.d|cvt\\.w\\.s|div|div\\.d|div\\.s|divu|eret|floor\\.w\\.d|floor\\.w\\.s|j|jal|jalr|jr|lb|lbu|lh|lhu|ll|lui|lw|lwc1|lwl|lwr|madd|maddu|mfc0|mfc1|mfhi|mflo|mov\\.d|mov\\.s|movf|movf\\.d|movf\\.s|movn|movn\\.d|movn\\.s|movt|movt\\.d|movt\\.s|movz|movz\\.d|movz\\.s|msub|mtc0|mtc1|mthi|mtlo|mul|mul\\.d|mul\\.s|mult|multu|neg\\.d|neg\\.s|nop|nor|or|ori|round\\.w\\.d|round\\.w\\.s|sb|sc|sdc1|sh|sll|sllv|slt|slti|sltiu|sltu|sqrt\\.d|sqrt\\.s|sra|srav|srl|srlv|sub|sub\\.d|sub\\.s|subu|sw|swc1|swl|swr|syscall|teq|teqi|tge|tgei|tgeiu|tgeu|tlt|tlti|tltiu|tltu|trunc\\.w\\.d|trunc\\.w\\.s|xor|xori)\\b"
  },
  {
    "name": "storage.type.mips",
    "match": "\\.(ascii|asciiz|byte|data|double|float|half|kdata|ktext|space|text|word|set\\s*(noat|at))\\b"
  },
  {
    "name": "storage.modifier.mips",
    "match": "\\.(align|extern||globl)\\b"
  },
  {
    "name": "meta.function.label.mips",
    "captures": {
      "1": {
        "name": "entity.name.function.label.mips"
      }
    },
    "match": "\\b([A-Za-z0-9_]+):"
  },
  {
    "name": "variable.other.register.usable.by-number.mips",
    "captures": {
      "1": {
        "name": "punctuation.definition.variable.mips"
      }
    },
    "match": "(\\$)(0|[2-9]|1[0-9]|2[0-5]|2[89]|3[0-1])\\b"
  },
  {
    "name": "variable.other.register.usable.by-name.mips",
    "captures": {
      "1": {
        "name": "punctuation.definition.variable.mips"
      }
    },
    "match": "(\\$)(zero|v[01]|a[0-3]|t[0-9]|s[0-7]|gp|sp|fp|ra)\\b"
  },
  {
    "name": "variable.other.register.reserved.mips",
    "captures": {
      "1": {
        "name": "punctuation.definition.variable.mips"
      }
    },
    "match": "(\\$)(at|k[01]|1|2[67])\\b"
  },
  {
    "name": "variable.other.register.usable.floating-point.mips",
    "captures": {
      "1": {
        "name": "punctuation.definition.variable.mips"
      }
    },
    "match": "(\\$)f([0-9]|1[0-9]|2[0-9]|3[0-1])\\b"
  },
  {
    "name": "constant.numeric.float.mips",
    "match": "\\b\\d+\\.\\d+\\b"
  },
  {
    "name": "constant.numeric.integer.mips",
    "match": "\\b(\\d+|0(x|X)[a-fA-F0-9]+)\\b"
  },
  {
    "name": "string.quoted.double.mips",
    "begin": "\"",
    "endCaptures": {
      "0": {
        "name": "punctuation.definition.string.end.mips"
      }
    },
    "beginCaptures": {
      "0": {
        "name": "punctuation.definition.string.begin.mips"
      }
    },
    "end": "\"",
    "patterns": [
      {
        "name": "constant.character.escape.mips",
        "match": "\\\\[rnt\\\\\"]"
      }
    ]
  },
  {
    "name": "comment.line.number-sign.mips",
    "captures": {
      "1": {
        "name": "punctuation.definition.comment.mips"
      }
    },
    "match": "(#).*$\\n?"
  }
];

exports.MIPS AssemblerSyntax = new TextmateSyntax(repositories, patterns);
