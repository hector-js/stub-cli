'use strict';

import { expect } from 'chai';
import { postTemplate } from '../../../../src/utils/templates/resources/post.template';
import { postTestTemplate } from '../../../../src/utils/templates/tests/post.template';

describe('post-template', () => {
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
        result = postTemplate(args, ids);

        expect(result).to.equal(`{
  "_post" : {
    "/any-path/{id}/data" : [
      {
        "_req": {
          "_id": "idTBD",
          "_body":{
            "dummy": "dummy"
          }
        },
        "_res": {
          "_body" : { "dummyResponse": "dummyResponse" }
        },
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

        result = postTemplate(args, ids);

        expect(result).to.equal(`{
  "_post" : {
    "/any-path/{id}/data" : [
      {
        "_req": {
          "_id": "idTBD",
          "_body": "<xml><tbd>Xml request to be defined</tbd></xml>"
        },
        "_res": {
          "_xml": true,
          "_body" : "<xml><tbd>Xml response to be defined</tbd></xml>"
        },
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
    describe('json', () => {
      it('should return a test template', () => {
        result = postTestTemplate(args, ids);

        expect(result).to.equal(`'use strict';
    
var app = require('@hectorjs/stub-backend');
var chai = require('chai');
var request = require('supertest');
    
var expect = chai.expect;

describe('POST - /any-path/{id}/data ', () => {
  it('should exist', (done) => {
    request(app)
      .post('/any-path/idTBD/data')
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

        result = postTestTemplate(args, ids);

        expect(result).to.equal(`'use strict';
    
var app = require('@hectorjs/stub-backend');
var chai = require('chai');
var request = require('supertest');
    
var expect = chai.expect;

describe('POST - /any-path/{id}/data ', () => {
  it('should exist', (done) => {
    request(app)
      .post('/any-path/idTBD/data')
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
