Array.from(document.querySelectorAll('.order-history-item')).map(
  function (item) {
    console.log(item.querySelector('.order-history-item__name').innerText.split(/\n/)[0] + ' ' + parseInt(item.querySelector('.order-history-item__quantity').innerText.replace(/Qty: /, ''), 10));
  }
);
