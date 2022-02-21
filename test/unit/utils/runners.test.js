'use strict';
const { stub, assert } = require('sinon');
const proxyquire = require('proxyquire');

describe('Runners', () => {
  let runTests;
  let getAllFilesStub;
  let runStub;
  let addFileStub;


  beforeEach(() => {
    getAllFilesStub = stub();
    runStub = stub();
    addFileStub = stub();
    class Mocha {
      constructor() {
        this.addFile = addFileStub;
        this.run= runStub;
      };
    };
    runTests = proxyquire('../../../src/utils/runners.cli', {
      './file-utils.cli': { getAllFiles: getAllFilesStub },
      'mocha': Mocha
    }).runTests;
  });

  describe('#runnerTest', () => {
    it('returns every single path file under a root', () => {
      const dir = 'my/dir';
      const regex = '.mateo.js';
      getAllFilesStub.returns(['path/1/file.1.mateo.js', 'file.2.js', 'file.3.mateo.js']);

      runTests(dir, regex);

      assert.calledOnce(getAllFilesStub.withArgs(dir));
      assert.calledOnce(addFileStub.withArgs('path/1/file.1.mateo.js'));
      assert.calledOnce(addFileStub.withArgs('file.3.mateo.js'));
      assert.calledOnce(runStub);
      assert.callCount(addFileStub, 2);
    });

    it('uses by defould .test.js as regex and ./hjs as root', () => {
      getAllFilesStub.returns(['path/1/file.1.tefst.js', 'file.2.test.js', 'file.3.tesst.js']);

      runTests();

      assert.calledOnce(getAllFilesStub.withArgs('./_hjs'));
      assert.calledOnce(addFileStub.withArgs('file.2.test.js'));
      assert.callCount(addFileStub, 1);
      assert.calledOnce(runStub);
    });
  });
});

