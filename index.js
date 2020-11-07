Array.from(document.querySelectorAll('.order-history-item')).map(
  function (item) {
    return {
      name: item.querySelector('.order-history-item__name').innerText.split(/\n/)[0],
      quantity: parseInt(item.querySelector('.order-history-item__quantity').innerText.replace(/Qty: /, ''), 10)
    };
  }
);
