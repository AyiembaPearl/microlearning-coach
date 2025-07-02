// Simulate account creation and login (to be replaced with Firebase later)

document.getElementById('signup-form')?.addEventListener('submit', function(e) {
  e.preventDefault();
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const role = document.getElementById('role').value;

  alert(`Account created for ${name} as a ${role}. (This is a mock!)`);
  window.location.href = 'login.html';
});

document.getElementById('login-form')?.addEventListener('submit', function(e) {
  e.preventDefault();
  const email = document.getElementById('login-email').value;

  // This will be replaced by actual login logic later
  alert(`Logged in as ${email}. (Mock login)`);
  window.location.href = 'dashboard.html'; // coming in next sprint
});
