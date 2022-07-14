const addition = require('./../../main/js/calculator')

test('sumar 1 + 2 es igual a 3', () => {
  expect(addition(1, 2)).toBe(3);
});

