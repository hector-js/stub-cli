'use strict';

import { expect } from 'chai';
import { patchTemplate } from '../../../../src/utils/templates/resources/patch.template';
import { patchTestTemplate } from '../../../../src/utils/templates/tests/patch.template';

describe('patch-template', () => {
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
      it('should add the resource scenatio', () => {
        const result = patchTemplate(args, ids);

        expect(result).to.equal(`{
  "_patch" : {
    "/any-path/{id}/data" : [
      {
        "_id": "idTBD",
        "_requestBody":{
          "dummy": "dummy"
        },
        "_headers" : [  ],
        "_cookies" : [  ],
        "_body" : { "dummyResponse": "dummyResponse" },
        
        "_description" : "Description to be defined" 
      }
    ]
  }
}`
        );
      });
    });

    describe('xml', () => {
      it('should add the resource scenatio', () => {
        args.xml = true;

        result = patchTemplate(args, ids);

        expect(result).to.equal(`{
  "_patch" : {
    "/any-path/{id}/data" : [
      {
        "_xml": true,
        "_id": "idTBD",
        "_requestBody": "<xml><tbd>Xml request to be defined</tbd></xml>",
        "_headers" : [  ],
        "_cookies" : [  ],
        "_body" : "<xml><tbd>Xml response to be defined</tbd></xml>",
        
        "_description" : "Description to be defined" 
      }
    ]
  }
}`
        );
      });
    });
  });

  describe('test', () => {
    beforeEach(() => {
      args = {
        cookies: 'sec',
        headers: 'authorization,clientId',
        _: ['', '', 'any-path/{id}/data']
      };
    });

    describe('json', () => {
      it('should return a test template', () => {
        result = patchTestTemplate(args, ids);

        expect(result).to.equal(`'use strict';
    
var app = require('../app');
var chai = require('chai');
var request = require('supertest');
    
var expect = chai.expect;

describe('PATCH - any-path/{id}/data ', () => {
  it('should exist', (done) => {
    request(app)
      .patch('/any-path/idTBD/data')
      .set({"authorization": "any value","clientId": "any value"})
      .set('Cookie', ["sec=anyValue"])
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
      it('should return a test template', () => {
        args.xml = true;

        result = patchTestTemplate(args, ids);

        expect(result).to.equal(`'use strict';
    
var app = require('../app');
var chai = require('chai');
var request = require('supertest');
    
var expect = chai.expect;

describe('PATCH - any-path/{id}/data ', () => {
  it('should exist', (done) => {
    request(app)
      .patch('/any-path/idTBD/data')
      .set({"authorization": "any value","clientId": "any value"})
      .set('Cookie', ["sec=anyValue"])
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
