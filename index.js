/* global _, localStorage, prompt, alert */
(function () {
  var newScript = document.createElement('script');
  newScript.setAttribute('type', 'text/javascript');
  newScript.setAttribute('src', 'https://cdn.jsdelivr.net/gh/oncomouse/heb-order-check@master/lodash.custom.min.js');
  newScript.addEventListener('load', function () {
    var KEY = 'heb_order_check';
    var PROMPT = 'Please enter the saved JSON file or Click OK to continue.';
    var copyToClipboard = function (str) {
      var el = document.createElement('textarea');
      el.value = str;
      document.body.appendChild(el);
      el.select();
      document.execCommand('copy');
      document.body.removeChild(el);
    };
    var extractList = function () {
      return Array.from(document.querySelectorAll('.order-history-item')).map(
        function (item) {
          return {
            name: item.querySelector('.order-history-item__name').innerText.split(/\n/)[0],
            quantity: parseInt(item.querySelector('.order-history-item__quantity').innerText.replace(/Qty: /, ''), 10)
          };
        }
      );
    };
    var previousListExists = function (dataStore, id) {
      if (dataStore === null) {
        return false;
      }
      return Object.prototype.hasOwnProperty.call(dataStore, id);
    };
    var id = document.querySelector('.order-details__order-number').innerText.replace('Order #', '');
    var currentOrder = extractList();
    var orderHistory = JSON.parse(localStorage.getItem(KEY));
    var previousOrder = previousListExists(orderHistory, id) ? orderHistory[id] : JSON.parse(prompt(PROMPT, '[]'));
    var additions = _.differenceWith(currentOrder, previousOrder, _.isEqual);
    var deletions = _.differenceWith(previousOrder, currentOrder, _.isEqual);
    var outputDiv = document.createElement('DIV');
    outputDiv.style.position = 'absolute';
    outputDiv.style.padding = '0.5%';
    outputDiv.style.left = '15px';
    outputDiv.style.right = '15px';
    outputDiv.style.top = '15px';
    outputDiv.style.bottom = '15px';
    outputDiv.style.backgroundColor = 'rgba(0,0,0,0.7)';
    outputDiv.style.color = 'white';
    outputDiv.style.zIndex = 1000000;
    outputDiv.style.position = 'fixed';
    outputDiv.style.overflow = 'scroll';
    var listify = function (xs) {
      return xs.map(function (x) { return '<li><strong>' + x.quantity + '</strong> of <strong>' + x.name + '</strong></li>'; });
    };
    outputDiv.innerHTML = '<p>Here are the additions:</p><ul>' + listify(additions).join('') + '</ul><p>Here are the deletions:</p><ul>' + listify(deletions).join('') + '</ul><p><button id="save">Save This Order?</button></p><p><button id="close">Close</button></p><p><button id="reset">Reset Stored Data</button></p>';
    document.getElementsByTagName('body')[0].appendChild(outputDiv);
    document.querySelector('#save').addEventListener('click', function () {
      copyToClipboard(JSON.stringify(currentOrder));
      var newObject = {};
      newObject[id] = currentOrder;
      localStorage.setItem(
        KEY,
        JSON.stringify(orderHistory === null ? newObject : Object.assign({}, orderHistory, newObject))
      );
      alert('The new order state has been saved on this browser and copied to the clipboard, if you wish to save a local copy.');
    });
    document.querySelector('#reset').addEventListener('click', function () {
      localStorage.setItem(KEY, null);
    });
    document.querySelector('#close').addEventListener('click', function () {
      outputDiv.parentElement.removeChild(outputDiv);
    });
  }, false);
  document.body.appendChild(newScript);
})();
