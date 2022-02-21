'use strict';

const { expect } = require('chai');
const { headTemplate } = require('../../../../src/utils/templates/resources/head.template');
const { headTestTemplate } = require('../../../../src/utils/templates/tests/head.template');

describe('head-template', () => {
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
      it('returns the resource scenario', () => {
        result = headTemplate(args, ids);

        expect(JSON.parse(result)).to.deep.equal({
          _head: {
            '/any-path/{id}/data': [
              {
                _req: {
                  _id: 'idTBD'
                },
                _res: {
                },
                _description: 'Description to be defined'
              }
            ]
          }
        });
      });
    });

    describe('xml', () => {
      it('returns the resource scenario', () => {
        args.xml = true;

        result = headTemplate(args, ids);

        expect(JSON.parse(result)).to.deep.equal({
          _head: {
            '/any-path/{id}/data': [
              {
                _req: {
                  _id: 'idTBD'
                },
                _res: {
                  _xml: true
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
        args.delay = 100;

        result = headTemplate(args, ids);

        expect(JSON.parse(result)).to.deep.equal({
          _head: {
            '/any-path/{id}/data': [
              {
                _req: {
                  _id: 'idTBD'
                },
                _res: {
                  _delay: 100
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
        result = headTestTemplate(args, ids);

        expect(result).to.equal(`'use strict';
    
var app = require('@hectorjs/stub-backend');
var chai = require('chai');
var request = require('supertest');
    
var expect = chai.expect;

describe('HEAD - /any-path/{id}/data ', () => {
  it('should exist', (done) => {
    request(app)
      .head('/any-path/idTBD/data')
      .end((err, res) => {
          expect(err).to.not.exist;
          expect(res.status).to.equal(200);
          expect(res.body).to.be.empty;
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

        result = headTestTemplate(args, ids);

        expect(result).to.equal(`'use strict';
    
var app = require('@hectorjs/stub-backend');
var chai = require('chai');
var request = require('supertest');
    
var expect = chai.expect;

describe('HEAD - /any-path/{id}/data ', () => {
  it('should exist', (done) => {
    request(app)
      .head('/any-path/idTBD/data')
      .end((err, res) => {
          expect(err).to.not.exist;
          expect(res.status).to.equal(200);
          expect(res.body).to.be.empty;
          done();
      });
  });
});`
        );
      });
    });
  });
});
