'use strict';

import parseDocumentCode from '../parsers/parseDocumentCodeId';
import { parseDocumentNumberOptional } from '../parsers/parseDocumentNumberOptional';
import { parseOptional } from '../parsers/parseOptional';

import createFieldParser from './createFieldParser';
import {
  documentCodeTemplate,
  issuingStateTemplate,
  documentNumberTemplate,
  documentNumberCheckDigitTemplate,
  birthDateTemplate,
  birthDateCheckDigitTemplate,
  sexTemplate,
  expirationDateTemplate,
  expirationDateCheckDigitTemplate,
  nationalityTemplate,
  compositeCheckDigitTemplate,
  lastNameTemplate,
  firstNameTemplate,
} from './fieldTemplates';

export default [
  {
    ...documentCodeTemplate,
    line: 0,
    start: 0,
    end: 2,
    parser: parseDocumentCode,
  },
  { ...issuingStateTemplate, line: 0, start: 2, end: 5 },
  {
    ...documentNumberTemplate,
    line: 0,
    start: 5,
    end: 14,
    related: [
      {
        line: 0,
        start: 14,
        end: 15,
      },
      {
        line: 0,
        start: 15,
        end: 30,
      },
    ],
  },
  {
    ...documentNumberCheckDigitTemplate,
    line: 0,
    start: 14,
    end: 15,
    related: [
      {
        line: 0,
        start: 5,
        end: 14,
      },
      {
        line: 0,
        start: 15,
        end: 30,
      },
    ],
  },
  {
    label: 'Optional field 1',
    field: 'optional1',
    line: 0,
    start: 15,
    end: 30,
    related: [
      {
        line: 0,
        start: 5,
        end: 14,
      },
      {
        line: 0,
        start: 14,
        end: 15,
      },
    ],
    parser: parseDocumentNumberOptional,
  },
  { ...birthDateTemplate, start: 0, end: 6, line: 1 },
  {
    ...birthDateCheckDigitTemplate,
    line: 1,
    start: 6,
    end: 7,
    related: [
      {
        line: 1,
        start: 0,
        end: 6,
      },
    ],
  },
  { ...sexTemplate, line: 1, start: 7, end: 8 },
  { ...expirationDateTemplate, line: 1, start: 8, end: 14 },
  {
    ...expirationDateCheckDigitTemplate,
    line: 1,
    start: 14,
    end: 15,
    related: [
      {
        line: 1,
        start: 8,
        end: 14,
      },
    ],
  },
  { ...nationalityTemplate, line: 1, start: 15, end: 18 },
  {
    label: 'Optional field 2',
    field: 'optional2',
    line: 1,
    start: 18,
    end: 29,
    parser: parseOptional,
  },
  {
    ...compositeCheckDigitTemplate,
    line: 1,
    start: 29,
    end: 30,
    related: [
      {
        line: 0,
        start: 5,
        end: 30,
      },
      {
        line: 1,
        start: 0,
        end: 7,
      },
      {
        line: 1,
        start: 8,
        end: 15,
      },
      {
        line: 1,
        start: 18,
        end: 29,
      },
    ],
  },
  { ...lastNameTemplate, line: 2, start: 0, end: 30 },
  { ...firstNameTemplate, line: 2, start: 0, end: 30 },
].map(createFieldParser);
