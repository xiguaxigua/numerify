describe('Round function', function() {
  it("should set round right", function() {
    expect(numerify(112.4, '0,0')).toBe('112')
    expect(numerify(112.5, '0,0')).toBe('113')
    expect(numerify(112.5, '0,0', Math.floor)).toBe('112')
    expect(numerify(112.4, '0,0', Math.ceil)).toBe('113')
  });
})
