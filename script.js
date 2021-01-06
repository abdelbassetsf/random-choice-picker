const textarea = document.getElementById('textarea');
const tagsEL = document.getElementById('tags');

textarea.focus();

function createTags(input) {
  const tags = input
    .split(',')
    .filter(tag => tag.trim() !== '')
    .map(tag => tag.trim());
  tagsEL.innerHTML = '';

  tags.forEach(tag => {
    if (tag.length > 52) {
      const alert = document.createElement('span');
      alert.classList.add('alert');
      alert.innerText =
        'You have exceeded the allowed characters limit of the tag';
      if (!document.querySelector('.alert')) {
        textarea.insertAdjacentElement('afterend', alert);

        setTimeout(() => {
          alert.remove();
        }, 3000);
      }
    }
    const span = document.createElement('span');
    span.classList.add('tag');
    span.innerText = tag;
    tagsEL.append(span);
  });
}

function pickRandomTag() {
  const tags = document.querySelectorAll('.tag');
  return tags[Math.floor(Math.random() * tags.length)];
}

function highlightTag(tag) {
  tag.classList.add('highlight');
}

function unHighlightTag(tag) {
  tag.classList.remove('highlight');
}

function randomSelect() {
  const times = 30;

  const interval = setInterval(() => {
    const randomTag = pickRandomTag();
    highlightTag(randomTag);
    setTimeout(() => {
      unHighlightTag(randomTag);
    }, 100);
  }, 100);

  setTimeout(() => {
    clearInterval(interval);
    setTimeout(() => {
      const randomTag = pickRandomTag();
      highlightTag(randomTag);
    }, 100);
  }, times * 100);
}

textarea.addEventListener('keyup', e => {
  createTags(e.target.value);

  if (e.key === 'Enter' && e.target.value) {
    setTimeout(() => {
      e.target.value = '';
    }, 10);
    randomSelect();
  } else if (e.key === 'Enter' && !e.target.value) {
    return;
  }
});
