'use strict';

const { expect } = require('chai');
const { getTemplate } = require('../../../../src/utils/templates/resources/get.template');
const { getTestTemplate } = require('../../../../src/utils/templates/tests/get.template');

describe('get-template', () => {
  let args;
  let ids;
  let result;

  beforeEach(() => {
    args = {
      status: 404,
      _: ['', '', '/any-path/{id}/data'],
      path: 'cases/hey'
    };
    ids = ['id'];
  });

  describe('resources', () => {
    beforeEach(() => args.description = 'customDescription');

    describe('json', () => {
      it('returns the resource scenario', () => {
        result = getTemplate(args, ids);

        expect(JSON.parse(result)).to.deep.equal({
          _get: {
            '/any-path/{id}/data': [
              {
                _req: {
                  _id: 'idTBD'
                },
                _res: {
                  _status: 404,
                  _body: {
                    body: 'To be defined'
                  }
                },
                _description: 'customDescription'
              }
            ]
          }
        });
      });
    });

    describe('xml', () => {
      it('should return the resource scenario', () => {
        args.xml = true;

        result = getTemplate(args, ids);

        expect(JSON.parse(result)).to.deep.equal({
          _get: {
            '/any-path/{id}/data': [
              {
                _req: {
                  _id: 'idTBD'
                },
                _res: {
                  _xml: true,
                  _status: 404,
                  _body: '<xml><tbd>Xml response to be defined</tbd></xml>'
                },
                _description: 'customDescription'
              }
            ]
          }
        });
      });
    });

    describe('delay', ()=>{
      it('sets delay field', () => {
        args.delay = 1000;

        result = getTemplate(args, ids);

        expect(JSON.parse(result)).to.deep.equal({
          _get: {
            '/any-path/{id}/data': [
              {
                _req: {
                  _id: 'idTBD'
                },
                _res: {
                  _status: 404,
                  _delay: 1000,
                  _body: {
                    body: 'To be defined'
                  }
                },
                _description: 'customDescription'
              }
            ]
          }
        });
      });
    });
  });

  describe('test', () => {
    describe('json', () => {
      it('returns a test template', () => {
        result = getTestTemplate(args, ids);

        expect(result).to.equal(`'use strict';
    
var app = require('@hectorjs/stub-backend');
var chai = require('chai');
var request = require('supertest');
    
var expect = chai.expect;

describe('GET - /any-path/{id}/data ', () => {
  it('should exist', (done) => {
    request(app)
      .get('/any-path/idTBD/data')
      .end((err, res) => {
          expect(err).to.not.exist;
          expect(res.status).to.equal(404);
          expect(res.body).to.deep.equal({
            'body': 'To be defined'
          });
          done();
      });
  });
});`
        );
      });
    });

    describe('xml', () => {
      it('returns a test template', () => {
        args.xml = true;

        result = getTestTemplate(args, ids);

        expect(result).to.equal(`'use strict';
    
var app = require('@hectorjs/stub-backend');
var chai = require('chai');
var request = require('supertest');
    
var expect = chai.expect;

describe('GET - /any-path/{id}/data ', () => {
  it('should exist', (done) => {
    request(app)
      .get('/any-path/idTBD/data')
      .end((err, res) => {
          expect(err).to.not.exist;
          expect(res.status).to.equal(404);
          expect(res.get('Content-Type')).to.equal('text/xml; charset=utf-8');
          expect(res.text).to.equal('<xml><tbd>Xml response to be defined</tbd></xml>');
          done();
      });
  });
});`
        );
      });
    });

    describe('delay', ()=>{
      it('sets timeout', () => {
        args.delay = 100;

        result = getTestTemplate(args, ids);

        expect(result).to.equal(`'use strict';
    
var app = require('@hectorjs/stub-backend');
var chai = require('chai');
var request = require('supertest');
    
var expect = chai.expect;

describe('GET - /any-path/{id}/data ', () => {
  it('should exist', (done) => {
    request(app)
      .get('/any-path/idTBD/data')
      .end((err, res) => {
          expect(err).to.not.exist;
          expect(res.status).to.equal(404);
          expect(res.body).to.deep.equal({
            'body': 'To be defined'
          });
          done();
      });
  }).timeout(600);
});`
        );
      });
    });
  });
});
