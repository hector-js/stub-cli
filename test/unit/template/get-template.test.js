'use strict';

import { expect } from 'chai';
import { getTemplate } from '../../../src/utils/templates/resources/get.template';

describe('get-template', () => {
  describe('resources', () => {
    let args;
    let ids

    beforeEach(() => {
      args = {
        _: ['', '', '/any-path/{id}/data']
      };
      ids = ['id'];
    });

    it('should add the method',()=>{
      const result = getTemplate(args, ids);

      expect(result).to.equal(`{
  "_get" : {
    "/any-path/{id}/data" : [
      {
        "_id": "idTBD",
        "_headers" : [  ],
        "_cookies" : [  ],
        "_body" : { "body": "To be defined" },
        
        "_description" : "Description to be defined" 
      }
    ]
  }
}`);
    });
  });
});
