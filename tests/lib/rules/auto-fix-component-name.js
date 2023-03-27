/**
 * @fileoverview test and fix name of the fucking vue.js
 * @author iamsb
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const rule = require("../../../lib/rules/auto-fix-component-name"),
  RuleTester = require("eslint").RuleTester;


//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const ruleTester = new RuleTester();
ruleTester.run("auto-fix-component-name", rule, {
  valid: [
    // give me some code that won't trigger a warning
  ],

  invalid: [
    {
      code: "hello word",
      errors: [{ message: "Fill me in.", type: "Me too" }],
    },
  ],
});
