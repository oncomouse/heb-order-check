var KEY = 'heb_order_check';
var PROMPT = 'Please enter the saved JSON file.';
window.extractList = function () {
  return Array.from(document.querySelectorAll('.order-history-item')).map(
    function (item) {
      return {
        name: item.querySelector('.order-history-item__name').innerText.split(/\n/)[0],
        quantity: parseInt(item.querySelector('.order-history-item__quantity').innerText.replace(/Qty: /, ''), 10)
      };
    }
  );
};
window.previousListExists = function () {
  return window.localStorage.getItem(KEY) !== null;
};
var currentOrder = window.extractList();
var previousOrder = window.previousListExists() ? JSON.parse(window.localStorage.getItem(KEY)) : JSON.parse(window.prompt(PROMPT, '[]'));
