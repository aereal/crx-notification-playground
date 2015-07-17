import notifications = require('./chrome-notifications');

document.addEventListener('DOMContentLoaded', () => {
  let messageEl = document.getElementById('action-message');

  document.body.addEventListener('click', (event) => {
    let targetNode = <Node>event.target;
    if (targetNode.nodeType != Node.ELEMENT_NODE) return;
    let targetEl = <HTMLElement>targetNode;
    if (targetEl.tagName.toLowerCase() != 'button') return;
    let btn = <HTMLButtonElement>targetEl;
    let templateType = btn.dataset['templateType'];
    let notice = notifications.optionsFor(templateType);
    notifications.create(notice)
      .then((nid) => {
        messageEl.classList.remove('failure');
        messageEl.classList.add('successful');
        messageEl.textContent = `notification ID: ${nid}`;
      });
  });
});
