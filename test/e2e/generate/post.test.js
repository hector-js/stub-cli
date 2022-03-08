'use strict';

const { expect } = require('chai');
const { exec, cd } = require('shelljs');
const fs = require('fs');

describe('post method', ()=>{
  before(()=>{
    cd('example');
  });

  after(()=>{
    cd('..');
  });

  describe('basic', ()=>{
    const pathResource = '_hjs/resources/my-path-post.json';
    const pathTest = '_hjs/test/my-path-post.test.js';

    describe('resource', ()=>{
      it('contains post method', ()=>{
        exec('npm run hjs -- generate post my/path');

        expect(fs.existsSync(pathResource)).to.be.true;
        const response = JSON.parse(fs.readFileSync(pathResource).toString());
        expect(response).to.deep.eq({
          _post: {
            '/my/path': [
              {
                _req: {
                  _body: {
                    dummy: 'dummy'
                  }
                },
                _res: {
                  _body: {
                    dummyResponse: 'dummyResponse'
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
        exec('npm run hjs -- generate p my/path');

        expect(fs.existsSync(pathTest)).to.be.true;
        const actual = fs.readFileSync(pathTest).toString();

        expect(actual).to.eq(basicDataPost);
      }).timeout(200000);
    });
  });

  describe('edge cases', ()=>{
    const pathResource = '_hjs/resources/my-package/my-path-post.json';
    const pathTest = '_hjs/test/my-package/my-path-post.test.js';

    describe('resource', ()=>{
      it('contains get method', ()=>{
        exec('npm run hjs --'+
          ' generate p my/path '+
          '--package my-package '+
          '--description "My description for this method" '+
          '--headers "authorization,clientId" '+
          '--cookies "JSSESSION,TS123456" '+
          '--delay 1000 '+
          '--status 202');

        expect(fs.existsSync(pathResource)).to.be.true;
        const response = JSON.parse(fs.readFileSync(pathResource).toString());
        expect(response).to.deep.eq({
          _post: {
            '/my/path': [
              {
                _req: {
                  _body: {
                    dummy: 'dummy'
                  },
                  _headers: [
                    'authorization',
                    'clientId'
                  ],
                  _cookies: [
                    'JSSESSION',
                    'TS123456'
                  ]
                },
                _res: {
                  _status: 202,
                  _body: {
                    dummyResponse: 'dummyResponse'
                  },
                  _delay: 1000
                },
                _description: 'My description for this method'
              }
            ]
          }
        });
      }).timeout(200000);
    });

    describe('test', ()=>{
      it('contains test method', ()=>{
        exec('npm run hjs --'+
          ' generate p my/path '+
          '--package my-package '+
          '--description "My description for this method" '+
          '--headers "authorization,clientId" '+
          '--cookies "JSSESSION,TS123456" '+
          '--delay 1000 '+
          '--status 202');

        expect(fs.existsSync(pathTest)).to.be.true;
        const response = fs.readFileSync(pathTest).toString();
        expect(response).to.eq(edgeCasePost);
      }).timeout(200000);
    });
  });
});

const basicDataPost = `'use strict';
    
var app = require('@hectorjs/stub-backend');
var chai = require('chai');
var request = require('supertest');
    
var expect = chai.expect;

describe('POST - my/path ', () => {
  it('should exist', (done) => {
    request(app)
      .post('/my/path')
      .send({'dummy': 'dummy'})
      .end((err, res) => {
          expect(err).to.not.exist;
          expect(res.status).to.equal(200);
          expect(res.body).to.deep.equal({
            'dummyResponse': 'dummyResponse'
 
          });
          done();
      });
  });
});`;

const edgeCasePost = `'use strict';
    
var app = require('@hectorjs/stub-backend');
var chai = require('chai');
var request = require('supertest');
    
var expect = chai.expect;

describe('POST - my/path ', () => {
  it('should exist', (done) => {
    request(app)
      .post('/my/path')
      .set({"authorization": "any value","clientId": "any value"})
      .set('Cookie', ["JSSESSION=anyValue","TS123456=anyValue"])
      .send({'dummy': 'dummy'})
      .end((err, res) => {
          expect(err).to.not.exist;
          expect(res.status).to.equal(202);
          expect(res.body).to.deep.equal({
            'dummyResponse': 'dummyResponse'
 
          });
          done();
      });
  }).timeout(1500);
});`;
