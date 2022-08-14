const { getAllFiles } = require('./file-utils.cli');
const Mocha = require('mocha');

const runTests = (dir, fileReg) => {
  const testDir = dir || './_hjs';
  const mocha = new Mocha();
  const regex = new RegExp(fileReg || '.test.js');

  getAllFiles(testDir)
      .filter((fileName) => regex.test(fileName))
      .forEach((file)=> mocha.addFile(file));

  mocha.run((failures)=> {
    process.exitCode = failures ? 1 : 0;
  });
};

module.exports = {
  runTests
};


