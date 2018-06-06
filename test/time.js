describe('Plugins time', function() {
  it("should format to an time", function() {
    numerify.register('time', numerifyTime)
    var test = [
      [0, '00:00:00', '0:00:00'],
      [null, '00:00:00', '0:00:00'],
      [25, '00:00:00', '0:00:25'],
      [238, '00:00:00', '0:03:58'],
      [63846, '00:00:00', '17:44:06']
    ]
    test.forEach(function (item) {
      expect(numerify(item[0], item[1])).toBe(item[2])
    })
  });
})
