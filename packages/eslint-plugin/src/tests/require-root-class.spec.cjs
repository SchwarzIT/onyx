"use strict";

const { runClassic } = require("eslint-vitest-rule-tester");
const rule = require("../rules/require-root-class.cjs");

runClassic(
  "require-onyx-component-class",
  rule,
  {
    valid: [
      {
        code: `
        <template>
          <div class="onyx-component">
            <p>Valid component</p>
          </div>
        </template>
      `,
      },
      {
        code: `
        <template>
          <div :class="'onyx-component'">
            <p>Dynamic class</p>
          </div>
        </template>
      `,
      },
      {
        code: `
        <template>
          <div :class="['class1', 'onyx-component']">
            <p>Array class binding</p>
          </div>
        </template>
      `,
      },
      {
        code: `
        <template>
          <div :class="{ 'onyx-component': true, 'other-class': false }">
            <p>Object class binding</p>
          </div>
        </template>
      `,
      },
      {
        code: `
        <template>
          <onyx-custom-element>
            <p>Custom Onyx element</p>
          </onyx-custom-element>
        </template>
      `,
      },
    ],
    invalid: [
      {
        code: `
        <template>
          <div>
            <p>Missing class</p>
          </div>
        </template>
      `,
        errors: [
          {
            messageId: "missingClass",
          },
        ],
      },
      {
        code: `
        <template>
          <div :class="['class1', 'class2']">
            <p>Array binding without onyx-component</p>
          </div>
        </template>
      `,
        errors: [
          {
            messageId: "missingClass",
          },
        ],
      },
      {
        code: `
        <template>
          <div :class="{ 'other-class': true }">
            <p>Object binding without onyx-component</p>
          </div>
        </template>
      `,
        errors: [
          {
            messageId: "missingClass",
          },
        ],
      },
    ],
  },
  {
    languageOptions: {
      parser: require("vue-eslint-parser"),
      ecmaVersion: 2020,
      sourceType: "module",
    },
  },
);
