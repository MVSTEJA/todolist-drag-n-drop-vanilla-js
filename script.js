const dragStart = target => {
  target.classList.add('dragging');
};

const dragEnd = event => {
  console.log("dragEnd",event.currentTarget)
  event.currentTarget.classList.remove('dragging');
};

const dragEnter = event => {
  event.currentTarget.classList.add('drop');
};

const dragLeave = event => {
  event.currentTarget.classList.remove('drop');
};

const drag = event => {
  event.dataTransfer.setData('text/plain', event.currentTarget.dataset.id);
};

const drop = event => {
  Array.from(document.querySelectorAll('.column'))
       .forEach(column => column.classList.remove('drop'));

  event.currentTarget.appendChild(document.querySelector(`[data-id="${event.dataTransfer.getData('text/plain')}"]`));

  event.dataTransfer.clearData();
};

const allowDrop = event => {
  event.preventDefault();
  event.dataTransfer.dropEffect = "move"
};

Array.from(document.querySelectorAll('.column')).forEach(column => {
  column.addEventListener('dragenter', dragEnter);
  column.addEventListener('dragleave', dragLeave);
});

document.addEventListener('dragstart', e => {
  if (e.target.className.includes('card')) {
      dragStart(e.target);
      e.dataTransfer.effectAllowed = "move";
  }
})
