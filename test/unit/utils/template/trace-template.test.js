'use strict';

import { expect } from 'chai';
import { traceTemplate } from '../../../../src/utils/templates/resources/trace.template';
import { traceTestTemplate } from '../../../../src/utils/templates/tests/trace.template';

describe('trace-template', () => {
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
      it('should add the resource scenario', () => {
        result = traceTemplate(args, ids);

        expect(JSON.parse(result)).to.deep.equal({
          _trace: {
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
      it('should add the resource scenatio', () => {
        args.xml = true;

        result = traceTemplate(args, ids);

        expect(JSON.parse(result)).to.deep.equal({
          _trace: {
            '/any-path/{id}/data': [
              {
                _req: {
                  _id: 'idTBD'
                },
                _res: {
                  '_xml': true
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
        result = traceTemplate(args, ids);

        expect(JSON.parse(result)).to.deep.equal({
          _trace: {
            '/any-path/{id}/data': [
              {
                _req: {
                  _id: 'idTBD'
                },
                _res: {
                  _delay: 10
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
      it('should return a test template', () => {
        result = traceTestTemplate(args, ids);

        expect(result).to.equal(`'use strict';
    
var app = require('@hectorjs/stub-backend');
var chai = require('chai');
var request = require('supertest');
    
var expect = chai.expect;

describe('TRACE - /any-path/{id}/data ', () => {
  it('should exist', (done) => {
    request(app)
      .trace('/any-path/idTBD/data')
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
      it('should return a test template', () => {
        args.xml = true;

        result = traceTestTemplate(args, ids);

        expect(result).to.equal(`'use strict';
    
var app = require('@hectorjs/stub-backend');
var chai = require('chai');
var request = require('supertest');
    
var expect = chai.expect;

describe('TRACE - /any-path/{id}/data ', () => {
  it('should exist', (done) => {
    request(app)
      .trace('/any-path/idTBD/data')
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
