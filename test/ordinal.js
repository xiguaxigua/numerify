describe('Plugins ordinal', function() {
  it("should format to an ordinal", function() {
    numerify.register('ordinal', numerifyOrdinal)
    var test = [
      [1, '0o', '1st'],
      [52, '0 o', '52 nd'],
      [23, '0o', '23rd'],
      [100, '0o', '100th'],
      [1234, '0,0o', '1,234th']
    ]
    test.forEach(function (item) {
      expect(numerify(item[0], item[1])).toBe(item[2])
    })
  });
})
