describe('Thousandth place', function() {
  it("1231 + '0,0' = '1,231'", function() {
    expect(numerify(1231, '0,0')).toBe('1,231')
  });
  it("10000 + '0,0.0000' = '10,000.0000'", function() {
    expect(numerify(10000, '0,0.0000')).toBe('10,000.0000')
  });
  it("10000.23 + '0,0' = '10,000'", function() {
    expect(numerify(10000.23, '0,0')).toBe('10,000')
  });
  it("10000.23 + '+0,0' = '+10,000'", function() {
    expect(numerify(10000.23, '+0,0')).toBe('+10,000')
  });
  it("-10000 + '0,0.0' = '-10,000.0'", function() {
    expect(numerify(-10000, '0,0.0')).toBe('-10,000.0')
  });
  it("10000.1234 + '0.000' = '10000.123'", function() {
    expect(numerify(10000.1234, '0.000')).toBe('10000.123')
  });
  it("100.1234 + '00000' = '00100'", function() {
    expect(numerify(100.1234, '00000')).toBe('00100')
  });
  it("1000.1234 + '000000,0' = '001,000'", function() {
    expect(numerify(1000.1234, '000000,0')).toBe('001,000')
  });
  it("10000.1234 + '0[.]00000' = '10000.12340'", function() {
    expect(numerify(10000.1234, '0[.]00000')).toBe('10000.12340')
  });
  it("-10000 + '(0,0.0000)' = '(10,000.0000)'", function() {
    expect(numerify(-10000, '(0,0.0000)')).toBe('(10,000.0000)')
  });
  it("-0.23 + '.00' = '-.23'", function() {
    expect(numerify(-0.23, '.00')).toBe('-.23')
  });
  it("-0.23 + '(.00)' = '(.23)'", function() {
    expect(numerify(-0.23, '(.00)')).toBe('(.23)')
  });
  it("0.23 + '0.00000' = '0.23000'", function() {
    expect(numerify(0.23, '0.00000')).toBe('0.23000')
  });
  it("0.23 + '0.0[0000]' = '0.23'", function() {
    expect(numerify(0.23, '0.0[0000]')).toBe('0.23')
  });
  it("0.00000000023 + '0.00000' = '0.00000'", function() {
    expect(numerify(0.00000000023, '0.00000')).toBe('0.00000')
  });
  it("0.00000000023 + '0.0[0000]' = '0.0'", function() {
    expect(numerify(0.00000000023, '0.0[0000]')).toBe('0.0')
  });
  it("0.23E-10 + '0.00000' = '0.00000'", function() {
    expect(numerify(0.23E-10, '0.00000')).toBe('0.00000')
  });
  it("0.23E-10 + '0.000000000000' = '0.000000000023'", function() {
    expect(numerify(0.23E-10, '0.000000000023')).toBe('0.000000000023')
  });
  it("0.23E30 + '0.0' = '2.3e29'", function() {
    expect(numerify(0.23E30, '0.0')).toBe('2.3e+29')
  });
  it("0.23e30 + '0.0' = '2.3e29'", function() {
    expect(numerify(0.23e30, '0.0')).toBe('2.3e+29')
  });
});

describe('Percent sign', function() {
  it("0.12 + '0%' = '12%'", function() {
    expect(numerify(0.12, '0%')).toBe('12%')
  });
  it("1 + '0%' = '100%'", function() {
    expect(numerify(1, '0%')).toBe('100%')
  });
  it("0.974878234 + '0.000%' = '97.488%'", function() {
    expect(numerify(0.974878234, '0.000%')).toBe('97.488%')
  });
  it("-0.43 + '0 %' = '-43 %'", function() {
    expect(numerify(-0.43, '0 %')).toBe('-43 %')
  });
  it("0.43 + '(0.000 %)' = '43.000 %'", function() {
    expect(numerify(0.43, '(0.000 %)')).toBe('43.000 %')
  });
});


describe('KMBT', function() {
  it("1231 + '0a' = '1k'", function() {
    expect(numerify(1231, '0a')).toBe('1k')
  });
  it("1230974 + '0.0a' = '1.2m'", function() {
    expect(numerify(1230974, '0.0a')).toBe('1.2m')
  });
  it("1460 + '0 a' = '1 k'", function() {
    expect(numerify(1460, '0 a')).toBe('1 k')
  });
  it("-104000 + '0a' = '-104k'", function() {
    expect(numerify(-104000, '0a')).toBe('-104k')
  });
});

describe('Mix', function() {
  it("1234 + '0,0%' = '123,400%'", function() {
    expect(numerify(1234, '0,0%')).toBe('123,400%')
  });
  it("1234 + '0,0.0a' = '1.2k'", function() {
    expect(numerify(1234, '0,0.0a')).toBe('1.2k')
  });
});
