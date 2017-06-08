describe('test demo page', function() {

  browser.get('http://localhost:6006/#!/');

  it('check result is hide', function() {
    var $result = element(by.css('.demo-print'));
    expect($result.isDisplayed()).toBe(false);
  });

  it('check result is present', function() {
    var username = 'john doe';
    element(by.css('.input-username')).sendKeys(username);
    element(by.css('.button.button--primary')).click();

    browser.sleep(1 * 1000);

    var $result = element(by.css('.demo-print-result'));
    expect($result.getText()).toBe(username);
  });
});
