import assert from "assert";
import { logDiagnostics, logVerboseTestOutput } from "../compiler/diagnostics.js";
import { hasParseError, NodeFlags, parse } from "../compiler/parser.js";
import { ADLScriptNode, SyntaxKind } from "../compiler/types.js";

describe("syntax", () => {
  describe("import statements", () => {
    parseEach(['import "x";']);

    parseErrorEach([
      ['namespace Foo { import "x"; }', [/Imports must be top-level/]],
      ['namespace Foo { } import "x";', [/Imports must come prior/]],
      ['model Foo { } import "x";', [/Imports must come prior/]],
    ]);
  });

  describe("model statements", () => {
    parseEach([
      "model Car { };",
      `@foo()
       model Car { };`,

      `model Car {
         prop1: number,
         prop2: string
       };`,

      `model Car {
         prop1: number;
         prop2: string;
       }`,

      `model Car {
          engine: V6
        }
        
        model V6 {
          name: string
        }`,

      `model Car {
         @foo.bar(a, b)
         prop1: number,
         
         @foo.baz(10, "hello")
         prop2: string
       };`,

      `model Car {
         @foo()
         "prop-1": number;
       }`,

      `
      @Foo()
      model Car {
         @Foo.bar(10, "hello")
         prop1: number,
         
         @Foo.baz(a, b)
         prop2: string
       };`,

      `@doc("""
       Documentation
       """)
       model Car {
         @doc("first")
         prop1: number;

         @doc("second")
         prop2: number;
       }`,

      'model Foo { "strKey": number, "😂😂😂": string }',

      "model Foo<A, B> { }",

      "model Car { @foo @bar x: number }",

      "model Car { ... A, ... B, c: number, ... D, e: string }",

      "model Car { ... A.B, ... C<D> }",
    ]);
  });

  describe("model extends statements", () => {
    parseEach([
      "model foo extends bar { }",
      "model foo extends bar, baz { }",
      "model foo extends bar.baz { }",
      "model foo extends bar<T> { }",
      "model foo<T> extends bar<T> { }",
      "model foo<T> extends bar.baz<T> { }",
    ]);
    parseErrorEach([
      ["model foo extends { }", [/Identifier expected/]],
      ["model foo extends = { }", [/Identifier expected/]],
      ["model foo extends bar = { }", [/'{' expected/]],
    ]);
  });

  describe("model = statements", () => {
    parseEach(["model x = y;", "model foo = bar | baz;", "model bar<a, b> = a | b;"]);
  });

  describe("model expressions", () => {
    parseEach(['model Car { engine: { type: "v8" } }']);
  });

  describe("tuple model expressions", () => {
    parseEach(['namespace A { op b(param: [number, string]): [1, "hi"]; }']);
  });

  describe("array expressions", () => {
    parseEach(["model A { foo: B[] }", "model A { foo: B[][] }"]);
  });

  describe("union expressions", () => {
    parseEach(["model A { foo: B | C }", "model A { foo: B | C & D }", "model A { foo: | B | C }"]);
  });

  describe("template instantiations", () => {
    parseEach(["model A = Foo<number, string>;", "model B = Foo<number, string>[];"]);
  });

  describe("intersection expressions", () => {
    parseEach(["model A { foo: B & C }", "model A { foo: & B & C }"]);
  });

  describe("parenthesized expressions", () => {
    parseEach(["model A = ((B | C) & D)[];"]);
  });

  describe("namespace statements", () => {
    parseEach([
      "namespace Store {}",
      "namespace Store { op read(): int32; }",
      "namespace Store { op read(): int32; op write(v: int32): {}; }",
      "namespace Store { op read(): int32; op write(v: int32): {}; }",
      "@foo namespace Store { @dec op read(): number; @dec op write(n: number): {}; }",
      "@foo @bar namespace Store { @foo @bar op read(): number; }",
      "namespace Store { namespace Read { op read(): int32; } namespace Write { op write(v: int32): {}; } }",
      "namespace Store.Read { }",
      "namespace Store;",
      "namespace Store.Read;",
      "@foo namespace Store.Read;",
      "@foo namespace Store.Read { };",
    ]);

    parseErrorEach([
      ["namespace Foo { namespace Store; }", [/Blockless namespace can only be top-level/]],
      ["namespace Store; namespace Store2;", [/Cannot use multiple blockless namespaces/]],
      ["model Foo { }; namespace Store;", [/Blockless namespaces can't follow other/]],
      ["namespace Foo { }; namespace Store;", [/Blockless namespaces can't follow other/]],
    ]);
  });

  describe("using statements", () => {
    parseEach(["using A;", "using A.B;", "namespace Foo { using A; }"]);
  });

  describe("multiple statements", () => {
    parseEach([
      `
      model A { };
      model B { }
      model C = A;
      ;
      namespace I {
        op foo(): number;
      }
      namespace J {

      }


    `,
    ]);
  });

  describe("comments", () => {
    parseEach([
      `
      // Comment
      model A { /* Another comment */
        /*
          and
          another
        */
        property /* 👀 */ : /* 👍 */ int32; // one more
      }
      `,
    ]);
  });

  describe("empty statements", () => {
    parseEach([`;;;;`, `namespace Foo { model Car { }; };`, `model Car { };;;;`]);
  });

  describe("recovery", () => {
    parseErrorEach([
      [`model M { ]`, [/Property expected/]],
      [
        `
        @dec1 @dec2 import "foo";
        banana
        model Foo
        `,
        [
          /Cannot decorate import/,
          /Cannot decorate import/,
          /Statement expected/,
          /Expected '{', '=', or 'extends'/,
        ],
      ],
      ["model M {}; This is not a valid statement", [/Statement expected/]],
      ["model M {}; @dec ;", [/Cannot decorate empty statement/]],
    ]);
  });

  describe("unterminated tokens", () => {
    parseErrorEach([
      ['model X = "banana', [/Unterminated string literal/]],
      ['model X = "banana\\', [/Unterminated string literal/]],
      ['model X = """\nbanana', [/Unterminated string literal/]],
      ['model X = """\nbanana\\', [/Unterminated string literal/]],
      ["/* Yada yada yada", [/Unterminated comment/]],
    ]);
  });

  describe("terminated tokens at EOF with missing semicolon", () => {
    parseErrorEach([
      ["model X = 0x10101", [/';' expected/]],
      ["model X = 0xBEEF", [/';' expected/]],
      ["model X = 123", [/';' expected/]],
      ["model X = 123e45", [/';' expected/]],
      ["model X = 123.45", [/';' expected/]],
      ["model X = 123.45e2", [/';' expected/]],
      ["model X = Banana", [/';' expected/]],
      ['model X = "Banana"', [/';' expected/]],
      ['model X = """\nBanana\n"""', [/';' expected/]],
    ]);
  });

  describe("numeric literals", () => {
    const good: [string, number][] = [
      // Some questions remain here: https://github.com/Azure/adl/issues/506
      ["-0", -0],
      ["1e9999", Infinity],
      ["1e-9999", 0],
      ["-1e-9999", -0],
      ["-1e9999", -Infinity],

      // NOTE: No octal in ADL
      ["077", 77],
      ["+077", 77],
      ["-077", -77],

      ["0xABCD", 0xabcd],
      ["0xabcd", 0xabcd],
      ["0x1010", 0x1010],
      ["0b1010", 0b1010],
      ["0", 0],
      ["+0", 0],
      ["0.0", 0.0],
      ["+0.0", 0],
      ["-0.0", -0.0],
      ["123", 123],
      ["+123", 123],
      ["-123", -123],
      ["123.123", 123.123],
      ["+123.123", 123.123],
      ["-123.123", -123.123],
      ["789e42", 789e42],
      ["+789e42", 789e42],
      ["-789e42", -789e42],
      ["654.321e9", 654.321e9],
      ["+654.321e9", 654.321e9],
      ["-654.321e9", -654.321e9],
    ];

    const bad: [string, RegExp][] = [
      ["123.", /Digit expected/],
      ["123.0e", /Digit expected/],
      ["123e", /Digit expected/],
      ["0b", /Binary digit expected/],
      ["0b2", /Binary digit expected/],
      ["0x", /Hexadecimal digit expected/],
      ["0xG", /Hexadecimal digit expected/],
    ];

    parseEach(good.map((c) => [`model M = ${c[0]};`, (node) => isNumericLiteral(node, c[1])]));
    parseErrorEach(bad.map((c) => [`model M = ${c[0]};`, [c[1]]]));

    function isNumericLiteral(node: ADLScriptNode, value: number) {
      const statement = node.statements[0];
      assert(statement.kind === SyntaxKind.ModelStatement, "model statement expected");
      const assignment = statement.assignment;
      assert(assignment?.kind === SyntaxKind.NumericLiteral, "numeric literal expected");
      assert.strictEqual(assignment.value, value);
    }
  });

  describe("non-ascii identifiers", () => {
    parseEach([
      "model Incompréhensible {}",
      "model 𐌰𐌲 {}",
      "model Banana𐌰𐌲42Banana {}",
      "model deaf\u{200c}ly {}", // ZWNJ
      "model क्‍ष {}", // ZWJ
    ]);
    parseErrorEach([["model 😢 {}", [/Invalid character/]]]);
  });
});

function parseEach(cases: (string | [string, (node: ADLScriptNode) => void])[]) {
  for (const each of cases) {
    const code = typeof each === "string" ? each : each[0];
    const callback = typeof each === "string" ? undefined : each[1];
    it("parses `" + shorten(code) + "`", () => {
      logVerboseTestOutput("=== Source ===");
      logVerboseTestOutput(code);

      logVerboseTestOutput("\n=== Parse Result ===");
      const astNode = parse(code);
      if (callback) {
        callback(astNode);
      }
      dumpAST(astNode);

      logVerboseTestOutput("\n=== Diagnostics ===");
      if (astNode.parseDiagnostics.length > 0) {
        const diagnostics: string[] = [];
        logDiagnostics(astNode.parseDiagnostics, (e) => diagnostics.push(e!));

        assert.strictEqual(
          hasParseError(astNode),
          astNode.parseDiagnostics.some((e) => e.severity === "error"),
          "root node claims to have no parse errors, but these were reported:\n" +
            diagnostics.join("\n")
        );

        assert.fail("Unexpected parse errors in test:\n" + diagnostics.join("\n"));
      }
    });
  }
}

function parseErrorEach(cases: [string, RegExp[]][]) {
  for (const [code, matches] of cases) {
    it(`doesn't parse ${shorten(code)}`, () => {
      logVerboseTestOutput("=== Source ===");
      logVerboseTestOutput(code);

      const astNode = parse(code);
      logVerboseTestOutput("\n=== Parse Result ===");
      dumpAST(astNode);

      logVerboseTestOutput("\n=== Diagnostics ===");
      logVerboseTestOutput((log) => logDiagnostics(astNode.parseDiagnostics, log));
      assert.notStrictEqual(astNode.parseDiagnostics.length, 0);
      let i = 0;
      for (const match of matches) {
        assert.match(astNode.parseDiagnostics[i++].message, match);
      }
      assert(
        hasParseError(astNode),
        "node claims to have no parse errors, but above were reported."
      );
    });
  }
}

function dumpAST(astNode: ADLScriptNode) {
  logVerboseTestOutput((log) => {
    const hasErrors = hasParseError(astNode); // force flags to initialize
    const json = JSON.stringify(astNode, replacer, 2);
    log(json);
  });

  function replacer(key: string, value: any) {
    if (key === "kind") {
      // swap numeric kind for readable name
      return SyntaxKind[value];
    }

    if (key === "pos" || key === "end") {
      // include line and column numbers
      const pos = astNode.file.getLineAndCharacterOfPosition(value);
      const line = pos.line + 1;
      const col = pos.character + 1;
      return `${value} (line ${line}, column ${col})`;
    }

    if (key === "parseDiagnostics" || key === "file") {
      // these will be logged separately in more readable form
      return undefined;
    }

    if (key === "locals" && value.size === 0) {
      // this will be an empty symbol table after parsing, hide it
      return undefined;
    }

    if (Array.isArray(value) && value.length === 0) {
      // hide empty arrays too
      return undefined;
    }

    if (key === "flags") {
      return [
        value & NodeFlags.DescendantErrorsExamined ? "DescendantErrorsExamined" : "",
        value & NodeFlags.ThisNodeHasError ? "ThisNodeHasError" : "",
        value & NodeFlags.DescendantHasError ? "DescendantHasError" : "",
      ].join(",");
    }

    if (value && typeof value === "object" && !Array.isArray(value)) {
      // Show the text of the given node
      if ("pos" in value && "end" in value) {
        value.source = shorten(astNode.file.text.substring(value.pos, value.end));
      }

      // sort properties by type so that the short ones can be read without
      // scrolling past the long ones and getting disoriented.
      const sorted: any = {};
      for (const prop of sortKeysByType(value)) {
        sorted[prop] = value[prop];
      }
      return sorted;
    }

    return value;
  }

  function sortKeysByType(o: any) {
    const score = {
      undefined: 0,
      string: 1,
      boolean: 2,
      number: 3,
      bigint: 4,
      symbol: 5,
      function: 6,
      object: 7,
    };
    return Object.keys(o).sort((x, y) => score[typeof o[x]] - score[typeof o[y]]);
  }
}

function shorten(code: string) {
  return code.replace(/\s+/g, " ");
}
