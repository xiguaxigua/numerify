describe('Options setting', function() {
  it("should set and reset right", function() {
    numerify.setOptions({
      nullFormat: 'N/A'
    })
    expect(numerify(null, '0,0.0[0]')).toBe('N/A')
    numerify.reset()
    expect(numerify(null, '0,0.0[0]')).toBe('0.0')
  });
})
