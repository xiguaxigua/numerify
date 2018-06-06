describe('Plugins exponential', function() {
  it("should format to an exponential", function() {
    numerify.register('exponential', numerifyExponential)
    var test = [
      [0, '0e+0', '0e+0'],
      [null, '0e+0', '0e+0'],
      [1, '0e+0', '1e+0'],
      [77.1234, '0.0e+0', '7.7e+1'],
      [0.000000771234, '0.0e-0', '7.7e-7'],
      [-0.000000771234, '0.00e-0', '-7.71e-7'],
      [77.1234, '0.000e+0', '7.712e+1'],
      [-1000830298, '0.0[000]e+0', '-1.0008e+9']
    ]
    test.forEach(function (item) {
      expect(numerify(item[0], item[1])).toBe(item[2])
    })
  });
})
