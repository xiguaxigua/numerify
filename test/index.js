describe('Thousandth place', function() {
  it('simple thousand', function() {
    expect(numerify(1231).format(0,0)).toBe('1,231')
  });
});

describe('Percent sign', function() {
  it('simple percent', function() {
    expect(numerify(0.12).format('0%')).toBe('12%')
  });
});


describe('KMBT', function() {
  it('simple kmbt', function() {
    expect(numerify(1231).format('0a')).toBe('1k')
  });
});

describe('Mix', function() {
  it('thousand and percent', function() {
    expect(numerify(1234).format('0,0%')).toBe('123,400%')
  });
});
