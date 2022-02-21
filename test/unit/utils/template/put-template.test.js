'use strict';

const { expect } = require('chai');
const { putTemplate } = require('../../../../src/utils/templates/resources/put.template');
const { putTestTemplate } = require('../../../../src/utils/templates/tests/put.template');

describe('put-template', () => {
  let args;
  let ids;
  let result;

  beforeEach(() => {
    args = {
      _: ['', '', '/any-path/{id}/data']
    };
    ids = ['id'];
  });

  describe('resources', () => {
    describe('json', () => {
      it('adds the resource scenario', () => {
        const result = putTemplate(args, ids);

        expect(JSON.parse(result)).to.deep.equal({
          _put: {
            '/any-path/{id}/data': [
              {
                _req: {
                  _id: 'idTBD',
                  _body: {
                    dummy: 'dummy'
                  }
                },
                _res: {
                  _body: { dummyResponse: 'dummyResponse' }
                },
                _description: 'Description to be defined'
              }
            ]
          }
        });
      });
    });

    describe('xml', () => {
      it('adds the resource scenatio', () => {
        args.xml = true;

        result = putTemplate(args, ids);

        expect(JSON.parse(result)).to.deep.equal({
          _put: {
            '/any-path/{id}/data': [
              {
                _req: {
                  _id: 'idTBD',
                  _body: '<xml><tbd>Xml request to be defined</tbd></xml>'
                },
                _res: {
                  _xml: true,
                  _body: '<xml><tbd>Xml response to be defined</tbd></xml>'
                },
                _description: 'Description to be defined'
              }
            ]
          }
        });
      });
    });

    describe('delay', ()=>{
      it('sets delay', () => {
        args.delay = 10;

        const result = putTemplate(args, ids);

        expect(JSON.parse(result)).to.deep.equal({
          _put: {
            '/any-path/{id}/data': [
              {
                _req: {
                  _id: 'idTBD',
                  _body: {
                    dummy: 'dummy'
                  }
                },
                _res: {
                  _delay: 10,
                  _body: { dummyResponse: 'dummyResponse' }
                },
                _description: 'Description to be defined'
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
        const result = putTestTemplate(args, ids);

        expect(result).to.equal(`'use strict';
    
var app = require('@hectorjs/stub-backend');
var chai = require('chai');
var request = require('supertest');
    
var expect = chai.expect;

describe('PUT - /any-path/{id}/data ', () => {
  it('should exist', (done) => {
    request(app)
      .put('/any-path/idTBD/data')
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
});`
        );
      });
    });

    describe('xml', () => {
      it('returns a test template', () => {
        args.xml = true,

        result = putTestTemplate(args, ids);

        expect(result).to.equal(`'use strict';
    
var app = require('@hectorjs/stub-backend');
var chai = require('chai');
var request = require('supertest');
    
var expect = chai.expect;

describe('PUT - /any-path/{id}/data ', () => {
  it('should exist', (done) => {
    request(app)
      .put('/any-path/idTBD/data')
      .set('Accept', 'text/xml; charset=utf-8')
      .type('application/xml')
      .send('<xml><tbd>Xml request to be defined</tbd></xml>')
      .end((err, res) => {
          expect(err).to.not.exist;
          expect(res.status).to.equal(200);
          expect(res.get('Content-Type')).to.equal('text/xml; charset=utf-8');
          expect(res.text).to.equal('<xml><tbd>Xml response to be defined</tbd></xml>');
          done();
      });
  });
});`
        );
      });
    });
  });
});
