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

// Load topics dynamically for unit1.html
if (window.location.pathname.includes("unit1.html")) {
  fetch("topics.json")
    .then((res) => res.json())
    .then((topics) => {
      const container = document.getElementById("topic-list");
      container.innerHTML = ""; // clear loading text

      const unitTopics = topics.filter(
        (topic) => topic.unit === "Medical Electronics"
      );

      if (unitTopics.length === 0) {
        container.innerHTML = "<p>No topics found.</p>";
        return;
      }

      unitTopics.forEach((topic) => {
        const card = document.createElement("div");
        card.className = "topic-card";
        card.innerHTML = `
          <h3>${topic.title}</h3>
          <iframe width="100%" height="215" src="${topic.video}" frameborder="0" allowfullscreen></iframe>
          <p><a href="${topic.notes}" target="_blank">Download Notes (PDF)</a></p>
        `;
        container.appendChild(card);
      });
    })
    .catch((err) => {
      console.error("Error loading topics:", err);
      document.getElementById("topic-list").innerHTML = `<p>Error loading topics.</p>`;
    });
}

