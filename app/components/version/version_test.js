'use strict';

describe('starterApp.version module', function() {
  beforeEach(module('starterApp.version'));

  describe('version service', function() {
    it('should return current version', inject(function(version) {
      expect(version).toEqual('0.1');
    }));
  });
});
