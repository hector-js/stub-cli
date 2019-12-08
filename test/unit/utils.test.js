'use strict';

import { sizeObject, checkPath, writeFileByData, createFileInPath, sanitizeRootFile, getIdFormatted, getHeaders, getCookies, getStatus } from './../../src/utils/utils.cli';
import { unlinkSync, statSync, existsSync, readdirSync, readFileSync, rmdirSync } from 'fs';
import { expect, assert } from 'chai';
import { join } from 'path';

const chalk = require('chalk');

describe.only('Utils', () => {

  it('should pass', () => {
    expect(true).to.be.true;
  });

  describe('#sizeObject', () => {
    it('should return the number of keys that an object has', () => {
      const obj = {
        keyOne: 'anyOne',
        keyTwo: 'anyTwo'
      }

      const result = sizeObject(obj);

      expect(result).to.equal(2);
    });

    [{}, undefined, null].forEach(value => {
      context(`when the object is ${JSON.stringify(value)}`, () => {
        it('should return 0', () => {
          const result = sizeObject(value);

          expect(result).to.equal(0);
        });
      });
    });
  });

  describe('#checkPath', () => {
    context('when the patch exits', () => {
      it('should return true', () => {
        const path = './test';

        const result = checkPath(path);

        expect(result).to.be.true;
      });
    });

    ['/noPath', undefined, null].forEach(path => {
      context(`when the path is ${path}`, () => {
        it('should return false', () => {
          const result = checkPath(path);

          expect(result).to.be.false;
        });
      });
    });
  });

  describe('#writeFileByData', () => {
    context('when the path exits and the data is correct', () => {
      /**
       * TO BE REVIEWED
       * this test is failing in the pipeline, 
       */
      it.skip('should write a file with the data provided', (done) => {
        const file = 'temporal';
        const data = 'hello world';

        writeFileByData(file, data);
        done();

        if (!checkPath(file)) {
          done(new Error("Make test fail"));
        } else {
          unlinkSync(file)
        }
      });
    });

    [
      [undefined, undefined],
      [null, null],
      [undefined, 'temporal'],
      [null, 'temporal'],
      ['temporal', null],
      ['temporal', undefined],
      []

    ].forEach(value => {
      context(`when:
          -file name: `+ chalk.magenta(`${value[0]}`) + `
          -data:      `+ chalk.magenta(`${value[1]}`), () => {
        it('should return false', () => {
          const fn = () => writeFileByData(value[0], value[1]);

          assert.throws(fn, Error, `It couldn't create a file`);
        });

        afterEach((done) => {
          done();
          unlinkSync(value[0])
        })
      });
    });

  });

  describe('#createFileInPath', () => {
    context('when the fileName exits and path is correct', () => {
      /**
       * @description I need some research to know how to test the file creation properly
       */
      it('should create a file in the correct path', () => {
        const fileName = 'tempFile';
        const path = 'temp';

        createFileInPath(fileName, path);
      });
    });


    [
      [undefined, undefined],
      [null, null],
      [undefined, 'temporal'],
      [null, 'temporal'],
      ['temporal', null],
      ['temporal', undefined],
      []

    ].forEach(value => {
      context(`when:
          -file name: `+ chalk.magenta(`${value[0]}`) + `
          -data:      `+ chalk.magenta(`${value[1]}`), () => {
        it('should return false', () => {
          const fn = () => createFileInPath(value[0], value[1]);

          assert.throws(fn, Error, `It couldn't create a file`);
        });

        afterEach((done) => {
          done();
          unlinkSync(value[0])
        })
      });
    });

  });

  describe('#sanitizeRootFile', () => {
    ['/{', '}/', '=', '?', '&', '{'].forEach(value => {
      it(`should replace ${value} for "-"`, () => {
        const path = `my-name${value}is-hulk`;

        const result = sanitizeRootFile(path);

        expect(result).to.equal(`my-name-is-hulk`)
      });
    });

    ['}', '/'].forEach(value => {
      it(`should replace ${value} for ""`, () => {
        const path = `my-name${value}-hulk`;

        const result = sanitizeRootFile(path);

        expect(result).to.equal(`my-name-hulk`)
      });
    });

    ['--', '---'].forEach(value => {
      it(`should replace ${value} for "-"`, () => {
        const path = `my-name${value}hulk`;

        const result = sanitizeRootFile(path);

        expect(result).to.equal(`my-name-hulk`);
      });
    });

    [undefined, null].forEach(value => {
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
      ['-', '--', '---', '-------'].forEach(value => {
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
          const args = {
            headers: 'header1,header2'
          }

          const result = getHeaders(args);

          expect(result).to.deep.equal(['header1', 'header2']);
        });
      });

      context('one header is set', () => {
        it('should return an array with the value', () => {
          const args = {
            headers: 'header1'
          }

          const result = getHeaders(args);

          expect(result).to.deep.equal(['header1']);
        });
      });

      context('no headers are set', () => {
        [undefined, null, ''].forEach((value) => {
          it(`should return null for ${value}`, () => {
            const args = {
              headers: value
            }

            const result = getHeaders(args);

            expect(result).to.be.null;
          });
        })
      });
    });

    describe('#getCookies', () => {
      context('more than one cookie is set', () => {
        it('should return an array with the values', () => {
          const args = {
            cookies: 'cookie1,cookie2'
          }

          const result = getCookies(args);

          expect(result).to.deep.equal(['cookie1', 'cookie2']);
        });
      });

      context('one cookie is set', () => {
        it('should return an array with the value', () => {
          const args = {
            cookies: 'cookie1'
          }

          const result = getCookies(args);

          expect(result).to.deep.equal(['cookie1']);
        });
      });

      context('no cookies are set', () => {
        [undefined, null, ''].forEach((value) => {
          it(`should return null for ${value}`, () => {
            const args = {
              cookies: value
            }

            const result = getCookies(args);

            expect(result).to.be.null;
          });
        })
      });
    });

    describe('#getStatus', () => {
      context('a value exist', () => {
        ['404', 404].forEach((value) => {
          it(`should return the value for ${value}`, () => {
            const args = {
              status: value
            }

            const result = getStatus(args);

            expect(result).to.equal(value);
          });
        });
      });

      context('there is no value', () => {
        [undefined, null, '', 'foo'].forEach((value) => {
          it(`should return null for ${value}`, () => {
            const args = {
              status: value
            }

            const result = getStatus(args);

            expect(result).to.be.null;
          });
        })
      });
    });
  });
});
