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

// Simulated user role (you'll later replace with Firebase login role)
const userRole = 'trainer'; // change to 'student' to test student view

if (window.location.pathname.includes('dashboard.html')) {
  const roleEl = document.getElementById('user-role');
  const trainerSection = document.getElementById('trainer-section');
  const studentSection = document.getElementById('student-section');

  roleEl.textContent = `You are logged in as a ${userRole.toUpperCase()}.`;

  if (userRole === 'trainer') {
    trainerSection.style.display = 'flex';
  }
}

// Handle trainer upload (mocked)
document.getElementById('upload-form')?.addEventListener('submit', function(e) {
  e.preventDefault();
  const unit = document.getElementById('unit').value;
  const topic = document.getElementById('topic').value;
  const video = document.getElementById('video').value;
  const notes = document.getElementById('notes').value;

  alert(`Uploaded Topic:\nUnit: ${unit}\nTitle: ${topic}\nVideo: ${video}\nNotes: ${notes}\n(Simulation only)`);

  // Reset form
  this.reset();
});

document.getElementById('contact-form')?.addEventListener('submit', function(e) {
  e.preventDefault();
  alert("Thanks for reaching out! We'll get back to you soon.");
  this.reset();
});
