'use strict';

const { expect } = require('chai');
const { exec } = require('shelljs');
const fs = require('fs');

describe('config', () => {
  const dir = './example';

  after(()=>{
    fs.rmdirSync(dir, { recursive: true });
  });

  it('create project', () => {
    exec('npm run hjs -- new example --package-manager npm');

    expect(fs.existsSync(dir)).to.be.true;
  }).timeout(200000);

  describe('health endpoint by default', ()=>{
    describe('resource file', ()=>{
      let path;
      beforeEach(()=>{
        path = dir + '/_hjs/resources/health.json';
      });

      it('creates a file', ()=>{
        expect(fs.existsSync(path)).to.be.true;
      });

      it('adds the content', ()=>{
        const response = JSON.parse(fs.readFileSync(path).toString());

        expect(response).to.deep.eq({
          _get: {
            '/health': [
              {
                _req: {
                },
                _res: {
                  _body: {
                    STATUS: 'UP'
                  }
                }
              }
            ]
          }
        });
      });
    });

    describe('test file', ()=>{
      let path;
      beforeEach(()=>{
        path = dir + '/_hjs/test/health.test.js';
      });

      it('creates a file', ()=>{
        expect(fs.existsSync(path)).to.be.true;
      });

      it('adds the content', ()=>{
        const response = fs.readFileSync(path).toString();

        expect(response.includes('use strict')).to.be.true;
        expect(response.includes('var app = require(\'@hectorjs/stub-backend\');')).to.be.true;
        expect(response.includes('var chai = require(\'chai\');')).to.be.true;
        expect(response.includes('var request = require(\'supertest\');')).to.be.true;
        expect(response.includes('var expect = chai.expect;')).to.be.true;
        expect(response.includes('describe(\'GET - health \', () => {')).to.be.true;
        expect(response.includes('it(\'should exist\', (done) => {')).to.be.true;
        expect(response.includes('request(app)')).to.be.true;
        expect(response.includes('.get(\'/health\')')).to.be.true;
        expect(response.includes('.get(\'/health\')')).to.be.true;
        expect(response.includes('.end((err, res) => {')).to.be.true;
        expect(response.includes('expect(err).to.not.exist;')).to.be.true;
        expect(response.includes('expect(res.status).to.equal(200);')).to.be.true;
        expect(response.includes('expect(err).to.not.exist;')).to.be.true;
        expect(response.includes('expect(res.body).to.deep.equal({')).to.be.true;
        expect(response.includes('\'STATUS\': \'UP\'')).to.be.true;
        expect(response.includes('done();')).to.be.true;
      });
    });
  });

  it('generates package.json', () => {
    const packageDir = dir + '/package.json';
    expect(fs.existsSync(packageDir)).to.be.true;

    const response = JSON.parse(fs.readFileSync(packageDir).toString());

    expect(response).to.deep.equal({
      name: 'example',
      version: '1.0.0',
      description: 'example description',
      main: 'index.js',
      scripts: {
        'hjs': 'hjs',
        '_start': 'hjs start',
        '_test': 'hjs test',
        '_start-dev': 'hjs start --dev'
      },
      keywords: [],
      author: '',
      license: 'ISC',
      dependencies: {
        '@hectorjs/stub-backend': '^1.29.1'
      }
    });
  });
});
