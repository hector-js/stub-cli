'use strict';

import {
  sizeObject,
  sanitizeRootFile,
  getIdFormatted,
  getHeaders,
  getCookies,
  getStatus,
  convertIdsToJsonProperties,
  convertArrayToJsonProperties,
  arrayToJson,
  arrayToArrayValues,
  buildUrl,
  removeLastComma
} from '../../../src/utils/utils.cli';
import { expect, assert } from 'chai';

const chalk = require('chalk');

describe('Utils', () => {
  it('should pass', () => {
    expect(true).to.be.true;
  });

  describe('#sizeObject', () => {
    it('should return the number of keys that an object has', () => {
      const obj = {
        keyOne: 'anyOne',
        keyTwo: 'anyTwo'
      };

      const result = sizeObject(obj);

      expect(result).to.equal(2);
    });

    [{}, undefined, null].forEach((value) => {
      context(`when the object is ${JSON.stringify(value)}`, () => {
        it('should return 0', () => {
          const result = sizeObject(value);

          expect(result).to.equal(0);
        });
      });
    });
  });

  describe('#sanitizeRootFile', () => {
    ['/{', '}/', '=', '?', '&', '{'].forEach((value) => {
      it(`should replace ${value} for "-"`, () => {
        const path = `my-name${value}is-hulk`;

        const result = sanitizeRootFile(path);

        expect(result).to.equal(`my-name-is-hulk`);
      });
    });

    ['}', '/'].forEach((value) => {
      it(`should replace ${value} for "-"`, () => {
        const path = `my-name${value}-hulk`;

        const result = sanitizeRootFile(path);

        expect(result).to.equal(`my-name-hulk`);
      });
    });

    ['--', '---'].forEach((value) => {
      it(`should replace ${value} for "-"`, () => {
        const path = `my-name${value}hulk`;

        const result = sanitizeRootFile(path);

        expect(result).to.equal(`my-name-hulk`);
      });
    });

    [undefined, null].forEach((value) => {
      context(`when the path is ${value}`, () => {
        it(`should throw an error`, () => {
          const fn = () => sanitizeRootFile(value);

          assert.throws(fn, Error, ``);
        });
      });
    });

    context('when the path start with -', () => {
      it('should remove it', () => {
        const path = `-my-name-is-hulk`;

        const result = sanitizeRootFile(path);

        expect(result).to.equal(`my-name-is-hulk`);
      });
    });

    context('the path ends with -', () => {
      it('should remove it', () => {
        const path = `my-name-is-hulk-`;

        const result = sanitizeRootFile(path);

        expect(result).to.equal(`my-name-is-hulk`);
      });
    });

    context('the path comes with multiple - at the front and at the end', () => {
      ['-', '--', '---', '-------'].forEach((value) => {
        it(`should omit for ${value}`, () => {
          const path = `${value}my-name-is-hulk${value}`;

          const result = sanitizeRootFile(path);

          expect(result).to.equal(`my-name-is-hulk`);
        });
      });
    });

    context('when the path just contain - after replacing', () => {
      it('should return to-be-define', () => {
        const path = `----------------`;

        const result = sanitizeRootFile(path);

        expect(result).to.equal(`to-be-defined`);
      });
    });

    context('when the path does not have any value', () => {
      it('should return to-be-define', () => {
        const path = ` `;

        const result = sanitizeRootFile(path);

        expect(result).to.equal(`to-be-defined`);
      });
    });
  });

  describe('#getIdFormatted', () => {
    it('should get the ids of a path', () => {
      const path = '/customers/{id}/data?product={param}&query={param1}';

      const result = getIdFormatted(path);

      expect(result).to.deep.equal(['id', 'param', 'param1']);
    });

    context('when there are no ids', () => {
      it('should return an empty array', () => {
        const path = '/customers';

        const result = getIdFormatted(path);

        expect(result).to.deep.equal([]);
      });
    });

    describe('the path when is no well-format', () => {
      context('when the id is repeated', () => {
        it('should throw an error', () => {
          const path = '/customers/{id}/data?product={id}&query={param1}';

          const fn = () => getIdFormatted(path);

          assert.throws(fn, Error,
              chalk.red(`The path /customers/{id}/data?product={id}&query={param1} contains 1 ids repeated.`));
        });
      });

      context('when the path is undefined', () => {
        it('should throw an error', () => {
          const path = undefined;

          const fn = () => getIdFormatted(path);

          assert.throws(fn, Error, 'The path must exits');
        });
      });
    });
  });

  describe('request values', () => {
    describe('#getHeaders', () => {
      context('more than one header is set', () => {
        it('should return an array with the values', () => {
          const result = getHeaders('header1,header2');

          expect(result).to.deep.equal(['header1', 'header2']);
        });
      });

      context('one header is set', () => {
        it('should return an array with the value', () => {
          const headers = 'header1';

          const result = getHeaders(headers);

          expect(result).to.deep.equal([headers]);
        });
      });

      context('no headers are set', () => {
        [undefined, null, ''].forEach((value) => {
          it(`should return null for ${value}`, () => {
            const result = getHeaders(value);

            expect(result).to.be.null;
          });
        });
      });
    });

    describe('#getCookies', () => {
      context('more than one cookie is set', () => {
        it('should return an array with the values', () => {
          const result = getCookies('cookie1,cookie2');

          expect(result).to.deep.equal(['cookie1', 'cookie2']);
        });
      });

      context('one cookie is set', () => {
        it('should return an array with the value', () => {
          const cookies = 'cookie1';

          const result = getCookies(cookies);

          expect(result).to.deep.equal([cookies]);
        });
      });

      context('no cookies are set', () => {
        [undefined, null, ''].forEach((value) => {
          it(`should return null for ${value}`, () => {
            const result = getCookies(value);

            expect(result).to.be.null;
          });
        });
      });
    });

    describe('#getStatus', () => {
      context('a value exist', () => {
        ['404', 404].forEach((value) => {
          it(`should return the value for ${value}`, () => {
            const status = value;

            const result = getStatus(status);

            expect(result).to.equal(status);
          });
        });
      });

      context('there is no value', () => {
        [undefined, null, '', 'foo'].forEach((value) => {
          it(`should return null for ${value}`, () => {
            const status = value;

            const result = getStatus(status);

            expect(result).to.be.null;
          });
        });
      });
    });
  });

  describe('#convertIdsToJsonProperties', () => {
    it('should convert array  to this format: "_id":"idTBD", "_param":"paramTBD"', () => {
      const array = ['id', 'param'];

      const result = convertIdsToJsonProperties(array);

      expect(result).to.equal(`"_id": "idTBD","_param": "paramTBD",`);
    });

    context('when array is not defined', () => {
      [undefined, null, []].forEach((value) => {
        it(`should return empty for ${value}`, () => {
          const array = value;

          const result = convertIdsToJsonProperties(array);

          expect(result).to.be.empty;
        });
      });
    });
  });

  describe('#convertArrayToJsonProperties', () => {
    it('should convert array  to this format: "id", "param"', () => {
      const array = ['id', 'param'];

      const result = convertArrayToJsonProperties(array);

      expect(result).to.equal(`"id","param"`);
    });

    context('when array is not defined', () => {
      [undefined, null, []].forEach((value) => {
        it(`should return empty for ${value}`, () => {
          const array = value;

          const result = convertArrayToJsonProperties(array);

          expect(result).to.be.empty;
        });
      });
    });
  });

  describe('#arrayToJson', () => {
    it('should convert array to this format: "id":"any value", "param":"any value"', () => {
      const array = ['id', 'param'];

      const result = arrayToJson(array);

      expect(result).to.equal(`"id": "any value","param": "any value"`);
    });

    context('when array is not defined', () => {
      [undefined, null, []].forEach((value) => {
        it(`should return empty for ${value}`, () => {
          const array = value;

          const result = arrayToJson(array);

          expect(result).to.be.empty;
        });
      });
    });
  });

  describe('#arrayToArrayValues', () => {
    it('should convert array to this format: "id=anyValue", "param=anyValue"', () => {
      const array = ['id', 'param'];

      const result = arrayToArrayValues(array);

      expect(result).to.equal(`"id=anyValue","param=anyValue"`);
    });

    context('when array is not defined', () => {
      [undefined, null, []].forEach((value) => {
        it(`should return empty for ${value}`, () => {
          const array = value;

          const result = arrayToArrayValues(array);

          expect(result).to.be.empty;
        });
      });
    });
  });

  describe('#buildUrl', () => {
    it('should build a path with ramdon values', () => {
      const path = '/data-one/{id}/data-two?product={param}';
      const ids = ['id', 'param'];

      const result = buildUrl(path, ids);

      expect(result).to.equal('/data-one/idTBD/data-two?product=paramTBD');
    });

    context('when ids is not defined', () => {
      [undefined, null, []].forEach((value) => {
        it(`should return same path for ${value}`, () => {
          const array = '/data-one';

          const result = buildUrl(array, value);

          expect(result).to.equal(array);
        });
      });
    }); ;

    context('when path is not defined', () => {
      [undefined, null, ''].forEach((value) => {
        it(`should throw error for ${value}`, () => {
          const fn = () => buildUrl(value, null);

          assert.throws(fn, Error, chalk.red('no path'));
        });
      });
    });
  });

  describe('#removeLastComma',()=>{

    it.only('should remove last comma found of a string',()=>{

      const data = `{
        "_body": "whatever",
      }`;

      const result = removeLastComma(data);

      expect(result).to.equal(`{
        "_body": "whatever"
      }`);
    });
  });
});
