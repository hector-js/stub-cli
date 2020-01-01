'use strict';

import { expect } from 'chai';
import { getTemplate } from '../../../../src/utils/templates/resources/get.template';
import { getTestTemplate } from '../../../../src/utils/templates/tests/get.template';

describe('get-template', () => {
  describe('resources', () => {
    let args;
    let ids;
    let result;

    beforeEach(() => {
      args = {
        description: 'customDescription',
        status: 404,
        _: ['', '', '/any-path/{id}/data']
      };
      ids = ['id'];
    });

    describe('json', () => {
      it('should return the resource scenario', () => {
        result = getTemplate(args, ids);

        expect(result).to.equal(`{
  "_get" : {
    "/any-path/{id}/data" : [
      {
        "_id": "idTBD",
        "_headers" : [  ],
        "_cookies" : [  ],
        "_body" : { "body": "To be defined" },
        "_status": 404,
        "_description" : "customDescription" 
      }
    ]
  }
}`
        );
      });
    });

    describe('xml', () => {
      it('should return the resource scenario', () => {
        args.xml = true;

        result = getTemplate(args, ids);

        expect(result).to.equal(`{
  "_get" : {
    "/any-path/{id}/data" : [
      {
        "_xml": true,
        "_id": "idTBD",
        "_headers" : [  ],
        "_cookies" : [  ],
        "_body" : "<xml><tbd>Xml response to be defined</tbd></xml>",
        "_status": 404,
        "_description" : "customDescription" 
      }
    ]
  }
}`
        );
      });
    });
  });

  describe('test', () => {
    let args;
    let ids;

    beforeEach(() => {
      args = {
        status: 404,
        _: ['', '', '/any-path/{id}/data'],
        path: 'cases/hey'
      };
      ids = ['id'];
    });

    it('should return a test template', () => {
      const result = getTestTemplate(args, ids);

      expect(result).to.equal(`'use strict';
    
var app = require('../../../app');
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
            'body' : 'To be defined'
          });
          done();
      });
  });
});`
      );
    });
  });
});
