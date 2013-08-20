/* globals chai, describe, inject, it */
'use strict';

var expect = chai.expect;

describe('empty', function() {
  it('should be empty', inject(function() {
    expect(1).to.equal(1);
  }));
});
