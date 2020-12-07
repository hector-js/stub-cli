'use strict';

import { unlinkSync } from 'fs';
import { expect, assert } from 'chai';
import { stub, match } from 'sinon';
import { getAllFiles } from '../../../src/utils/file-utils.cli';

const proxyquire = require('proxyquire');
const chalk = require('chalk');


describe('file-utils', () => {
  describe('#checkPath', () => {
    let pq;
    let existsSyncStub;

    beforeEach(()=>{
      existsSyncStub = stub();
      pq = proxyquire('../../../src/utils/file-utils.cli', {
        'fs': {
          existsSync: existsSyncStub
        }
      });
    });

    afterEach(()=>proxyquire.callThru());

    context('when the patch exits', () => {
      it('returns true', () => {
        const path = './test';
        existsSyncStub.returns(true);

        const result = pq.checkPath(path);

        expect(result).to.be.true;
        assert.ok(existsSyncStub.calledOnceWith(path));
      });
    });

    ['/noPath', undefined, null].forEach((path) => {
      context(`when the path is ${path}`, () => {
        it('returns false', () => {
          existsSyncStub.throws(new Error);

          const result = pq.checkPath(path);

          expect(result).to.be.false;
          assert.ok(existsSyncStub.calledOnceWith(path));
        });
      });
    });
  });

  describe('#writeFileByData', () => {
    let pq;
    let writeFileStub;

    beforeEach(()=>{
      writeFileStub = stub();
      pq = proxyquire('../../../src/utils/file-utils.cli', {
        'fs': {
          writeFile: writeFileStub
        }
      });
    });

    context('when the path exits and the data is correct', () => {
      it('writes a file with the data provided', () => {
        const file = 'temporal';
        const data = 'hello world';

        pq.writeFileByData(file, data);

        assert.ok(writeFileStub.calledOnceWith(file, data, match.any));
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
    ].forEach((value) => {
      context(`when:
          -file name: `+ chalk.magenta(`${value[0]}`) + `
          -data:      `+ chalk.magenta(`${value[1]}`), () => {
        it('returns false', () => {
          const fn = () => pq.writeFileByData(value[0], value[1]);

          assert.throws(fn, Error, `It couldn't create a file`);
        });
      });
    });
  });

  describe('#createFileInPath', () => {
    let pq;
    let cdStub;
    let mkdirStub;
    let touchStub;

    beforeEach(()=>{
      cdStub = stub();
      mkdirStub = stub();
      touchStub = stub();
      pq = proxyquire('../../../src/utils/file-utils.cli', {
        'shelljs': {
          cd: cdStub,
          mkdir: mkdirStub,
          touch: touchStub
        }
      });
    });

    context('when the fileName exits and path is correct', () => {
      it('creates a file in the correct path', () => {
        const fileName = 'tempFile';
        const path = 'temp';

        pq.createFileInPath(fileName, path);

        assert.ok(cdStub.calledOnceWith(path));
        assert.ok(mkdirStub.calledOnceWith(path));
        assert.ok(touchStub.calledOnceWith(fileName));
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

    ].forEach((value) => {
      context(`when:
          -file name: `+ chalk.magenta(`${value[0]}`) + `
          -data:      `+ chalk.magenta(`${value[1]}`), () => {
        it('returns false', () => {
          const fn = () => pq.createFileInPath(value[0], value[1]);

          assert.throws(fn, Error, `It couldn't create a file`);
        });

        afterEach((done) => {
          done();
          unlinkSync(value[0]);
        });
      });
    });
  });

  describe('#getAllFiles', ()=>{
    const rootPath = 'test/unit/temp';

    it('gets an array with all the files under one root folder', ()=>{
      const arrayItems = getAllFiles(rootPath);

      expect(arrayItems).to.deep.equal([
        rootPath+'/file1.js',
        rootPath+'/sub-temp/file2.js']);
    });
  });
});
