'use strict';

const { expect } = require('chai');
const { exec, cd } = require('shelljs');
const fs = require('fs');

describe('get method', ()=>{
  before(()=>{
    cd('example');
  });

  after(()=>{
    cd('..');
  });

  describe('basic', ()=>{
    const pathResource = '_hjs/resources/my-path-get.json';
    const pathTest = '_hjs/test/my-path-get.test.js';

    describe('resource', ()=>{
      it('contains get method', ()=>{
        exec('npm run hjs -- generate get my/path');

        expect(fs.existsSync(pathResource)).to.be.true;
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
      }).timeout(200000);
    });

    describe('test', ()=>{
      it('contains test method', ()=>{
        exec('npm run hjs -- generate get my/path');

        expect(fs.existsSync(pathTest)).to.be.true;
        const actual = fs.readFileSync(pathTest).toString();

        expect(actual).to.eq(basicDataGet);
      }).timeout(200000);
    });
  });

  describe('edge cases', ()=>{
    const pathResource = '_hjs/resources/my-package/my-path-get.json';
    const pathTest = '_hjs/test/my-package/my-path-get.test.js';

    describe('resource', ()=>{
      it('contains get method', ()=>{
        exec('npm run hjs --'+
          ' generate get my/path '+
          '--package my-package '+
          '--description "My description for this method" '+
          '--headers "authorization,clientId" '+
          '--cookies "JSSESSION,TS123456" '+
          '--delay 1000 '+
          '--status 202');

        expect(fs.existsSync(pathResource)).to.be.true;
        const response = JSON.parse(fs.readFileSync(pathResource).toString());
        expect(response).to.deep.eq({
          '_get': {
            '/my/path': [
              {
                '_req': {
                  '_headers': [
                    'authorization',
                    'clientId'
                  ],
                  '_cookies': [
                    'JSSESSION',
                    'TS123456'
                  ]
                },
                '_res': {
                  '_status': 202,
                  '_body': {
                    'body': 'To be defined'
                  },
                  '_delay': 1000
                },
                '_description': 'My description for this method'
              }
            ]
          }
        });
      }).timeout(200000);
    });

    describe('test', ()=>{
      it('contains test method', ()=>{
        exec('npm run hjs --'+
          ' generate get my/path '+
          '--package my-package '+
          '--description "My description for this method" '+
          '--headers "authorization,clientId" '+
          '--cookies "JSSESSION,TS123456" '+
          '--delay 1000 '+
          '--status 202');

        expect(fs.existsSync(pathTest)).to.be.true;
        const response = fs.readFileSync(pathTest).toString();
        expect(response).to.eq(edgeCaseGet);
      }).timeout(200000);
    });
  });
});

const basicDataGet = `'use strict';
    
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
});`;

const edgeCaseGet = `'use strict';
    
var app = require('@hectorjs/stub-backend');
var chai = require('chai');
var request = require('supertest');
    
var expect = chai.expect;

describe('GET - my/path ', () => {
  it('should exist', (done) => {
    request(app)
      .get('/my/path')
      .set({"authorization": "any value","clientId": "any value"})
      .set('Cookie', ["JSSESSION=anyValue","TS123456=anyValue"])
      .end((err, res) => {
          expect(err).to.not.exist;
          expect(res.status).to.equal(202);
          expect(res.body).to.deep.equal({
            'body': 'To be defined'
          });
          done();
      });
  }).timeout(1500);
});`;
