'use strict';

import { expect } from 'chai';
import { postTemplate } from '../../../../src/utils/templates/resources/post.template';
import { postTestTemplate } from '../../../../src/utils/templates/tests/post.template';

describe('post-template', () => {
  describe('resources', () => {
    let args;
    let ids

    beforeEach(() => {
      args = {
        _: ['', '', '/any-path/{id}/data']
      };
      ids = ['id'];
    });

    it('should add the resource scenatio', () => {
      const result = postTemplate(args, ids);

      expect(result).to.equal(`{
  "_post" : {
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

  describe('test',()=>{
    let args;
    let ids

    beforeEach(() => {
      args = {
        _: ['', '', '/any-path/{id}/data']
      };
      ids = ['id'];
    });

    it('should return a test template',()=>{

      const result = postTestTemplate(args, ids);

      expect(result).to.equal(`'use strict';
    
var app = require('../app');
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
});
