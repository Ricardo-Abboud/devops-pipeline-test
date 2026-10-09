const test = require('node:test');
const assert = require('node:assert/strict');

test('Intentional CI failure', () => {
    assert.equal(1, 2);
});
