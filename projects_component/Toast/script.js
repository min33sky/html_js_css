const notifications = document.querySelector('.notifications');
const buttons = document.querySelectorAll('.buttons .btn');

const toastDetails = {
  timer: 5000,
  success: {
    icon: 'fa-circle-check',
    text: 'Success: This is a success toast.',
  },
  error: {
    icon: 'fa-circle-xmark',
    text: 'Error: This is an error toast.',
  },
  warning: {
    icon: 'fa-triangle-exclamation',
    text: 'Warning: This is a warning toast.',
  },
  info: {
    icon: 'fa-circle-info',
    text: 'Info: This is an information toast.',
  },
};

/**
 * 토스트 생성
 * @param {String} id 버튼 id
 */
function createToast(id) {
  const { icon, text } = toastDetails[id];
  const toast = document.createElement('li');
  toast.className = `toast ${id}`;

  toast.innerHTML = `
    <div class="column">
      <i class="fa-solid ${icon}"></i>
      <span>${text}</span>
    </div>
    <i class="fa-solid fa-xmark" onclick="removeToast(this.parentElement)"></i>
  `;

  notifications.appendChild(toast);
  toast.timeoutId = setTimeout(() => removeToast(toast), toastDetails.timer);
}

/**
 * 토스트 제거
 * @param {*} toast 토스트 DOM
 */
function removeToast(toast) {
  toast.classList.add('hide');
  if (toast.timeoutId) clearTimeout(toast.timeoutId);
  setTimeout(() => toast.remove(), 500);
}

buttons.forEach((button) => {
  button.addEventListener('click', () => createToast(button.id));
});
