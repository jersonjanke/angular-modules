describe('Home Page', function() {

  beforeAll(function() {
    browser.get(browser.baseUrl);
  });

  it('should land on Home Screen', function () {
    expect(browser.getCurrentUrl()).toEqual(browser.baseUrl);
  });

});
