describe('Plugins bps', function() {
  it("should format to an bps", function() {
    numerify.register('bps', numerifyBps)
    var test = [
      [0, '0 BPS', '0 BPS'],
      [0.0001, '0 BPS', '1 BPS'],
      [.0056, '0 BPS', '56 BPS'],
      [.25, '0BPS', '2500BPS'],
      [.000001, '0.00 BPS', '0.01 BPS']
    ]
    test.forEach(function (item) {
      expect(numerify(item[0], item[1])).toBe(item[2])
    })
  });
})
