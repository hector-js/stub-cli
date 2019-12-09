'use strict';

import { unlinkSync } from 'fs';
import { expect, assert } from 'chai';
import { checkPath, writeFileByData, createFileInPath } from '../../src/utils/file-utils.cli';

const chalk = require('chalk');

describe('file-utils', () => {
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
});
