'use strict';

const { expect } = require('chai');
const { exec, cd } = require('shelljs');
const fs = require('fs');

describe('generate', () => {
  describe('get method', ()=>{
    const pathResource = '_hjs/resources/my-path-get.json';
    const pathTest = '_hjs/test/my-path-get.test.js';

    before(()=>{
      cd('example');
      exec('npm run hjs -- generate get my/path');
    });

    describe('resource', ()=>{
      it('creates the resource file', () => {
        expect(fs.existsSync(pathResource)).to.be.true;
      }).timeout(200000);

      it('contains get method', ()=>{
        const response = JSON.parse(fs.readFileSync(pathResource).toString());

        expect(response).to.deep.eq({
          _get: {
            '/my/path': [
              {
                _req: {},
                _res: {
                  _body: {
                    body: 'To be defined'
                  }
                },
                _description: 'Description to be defined'
              }
            ]
          }
        });
      });
    });

    describe('test', ()=>{
      it('creates the test file', () => {
        expect(fs.existsSync(pathTest)).to.be.true;
      }).timeout(200000);

      it('contains test method', ()=>{
        const response = fs.readFileSync(pathTest).toString();

        expect(response).to.eq(`'use strict';
    
var app = require('@hectorjs/stub-backend');
var chai = require('chai');
var request = require('supertest');
    
var expect = chai.expect;

describe('GET - my/path ', () => {
  it('should exist', (done) => {
    request(app)
      .get('/my/path')
      .end((err, res) => {
          expect(err).to.not.exist;
          expect(res.status).to.equal(200);
          expect(res.body).to.deep.equal({
            'body': 'To be defined'
          });
          done();
      });
  });
});`);
      });
    });
  });
});
