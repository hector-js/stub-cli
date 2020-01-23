'use strict';

import { expect } from 'chai';
import { headTemplate } from '../../../../src/utils/templates/resources/head.template';
import { headTestTemplate } from '../../../../src/utils/templates/tests/head.template';

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
      it('should return the resource scenario', () => {
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
      it('should return the resource scenario', () => {
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
  });

  describe('test', () => {
    describe('json', () => {
      it('should return a test template', () => {
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
      it('should return a test template', () => {
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
