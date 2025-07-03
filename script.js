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
          <p>
          <label>
            <input type="checkbox" class="completion-checkbox" data-title="${topic.title}">
            Mark as Completed ✅
          </label>
        </p>
        `;
        const completionKey = `completed_${topic.title.replace(/\s+/g, "_")}`;
        const checkbox = card.querySelector(".completion-checkbox");

        // Load saved state
        if (localStorage.getItem(completionKey) === "true") {
          checkbox.checked = true;
        }

        // Save state when toggled
        checkbox.addEventListener("change", () => {
          localStorage.setItem(completionKey, checkbox.checked);
        });

        // Add Quiz if available
        if (Array.isArray(topic.quiz)) {
      // Multiple question quiz
      const quizDiv = document.createElement("div");
      quizDiv.className = "quiz";
      quizDiv.innerHTML = `<h4>Quiz</h4>`;
      
      let score = 0;

      topic.quiz.forEach((q, qIndex) => {
        const questionBlock = document.createElement("div");
        questionBlock.className = "question-block";
        questionBlock.innerHTML = `<p><strong>Q${qIndex + 1}:</strong> ${q.question}</p>`;

        q.options.forEach((opt, index) => {
          const btn = document.createElement("button");
          btn.textContent = opt;
          btn.onclick = () => {
            if (index === q.answer) {
              btn.style.backgroundColor = "lightgreen";
              btn.textContent += " ✅ Correct!";
              score++;
            } else {
              btn.style.backgroundColor = "#f88";
              btn.textContent += " ❌ Incorrect";
            }

        // Disable all buttons for this question
        questionBlock.querySelectorAll("button").forEach(b => b.disabled = true);

        // Check if all questions are answered
        const totalAnswered = quizDiv.querySelectorAll("button:disabled").length;
        if (totalAnswered === topic.quiz.length * q.options.length) {
          const scoreBox = document.createElement("p");
          scoreBox.innerHTML = `🎯 You got <strong>${score}</strong> out of <strong>${topic.quiz.length}</strong> correct.`;
          scoreBox.style.marginTop = "10px";
          quizDiv.appendChild(scoreBox);
        }
                };
                questionBlock.appendChild(btn);
                questionBlock.appendChild(document.createElement("br"));
              });

              quizDiv.appendChild(questionBlock);
            });

            card.appendChild(quizDiv);

          } else if (topic.quiz) {
            // Old single-question format
            const quizDiv = document.createElement("div");
            quizDiv.className = "quiz";
            quizDiv.innerHTML = `<p><strong>Quiz:</strong> ${topic.quiz.question}</p>`;

            topic.quiz.options.forEach((opt, index) => {
              const btn = document.createElement("button");
              btn.textContent = opt;
              btn.onclick = () => {
                if (index === topic.quiz.answer) {
                  btn.style.backgroundColor = "lightgreen";
                  btn.textContent += " ✅ Correct!";
                } else {
                  btn.style.backgroundColor = "#f88";
                  btn.textContent += " ❌ Try again.";
                }
                quizDiv.querySelectorAll("button").forEach((b) => (b.disabled = true));
              };
              quizDiv.appendChild(btn);
              quizDiv.appendChild(document.createElement("br"));
            });

            card.appendChild(quizDiv);
          }


         const driveStorageKey = `drive_links_${topic.title.replace(/\s+/g, "_")}`;
         let driveLinks = JSON.parse(localStorage.getItem(driveStorageKey)) || [];

         const driveLinkInput = document.getElementById("driveLinkInput");
         const saveDriveLinkBtn = document.getElementById("saveDriveLinkBtn");
         const driveLinkStatus = document.getElementById("driveLinkStatus");
         const driveLinksList = document.getElementById("driveLinksList");

         function renderDriveLinks() {
            driveLinksList.innerHTML = "";
            driveLinks.forEach((link, index) => {
              const li = document.createElement("li");
              li.innerHTML = `<a href="${link}" target="_blank">Resource ${index + 1}</a>`;
              driveLinksList.appendChild(li);
            });
          }

          saveDriveLinkBtn.onclick = () => {
            const link = driveLinkInput.value.trim();
            if (!link) return;
            driveLinks.push(link);
            localStorage.setItem(driveStorageKey, JSON.stringify(driveLinks));
            driveLinkInput.value = "";
            driveLinkStatus.textContent = "✅ Link saved!";
            renderDriveLinks();
          };

          renderDriveLinks();


         // 🧑‍🤝‍🧑 Add Peer Review Area
         const discussion = document.createElement("div");
         discussion.className = "discussion";
         discussion.innerHTML = `
         <h4>Peer Review Area</h4>
         <div class="comment-list"></div>
         <textarea rows="3" placeholder="Share your thoughts..." class="comment-input"></textarea><br>
         <button class="post-comment">Post Comment</button>
         `;

         const commentList = discussion.querySelector(".comment-list");
         const input = discussion.querySelector(".comment-input");
         const postBtn = discussion.querySelector(".post-comment");

        // Store all comments for this topic in memory
        const storageKey = `comments_${topic.title.replace(/\s+/g, "_")}`;
        let comments = JSON.parse(localStorage.getItem(storageKey)) || [];


        postBtn.onclick = () => {
          const text = input.value.trim();
          if (!text) return;
          const comment = { text, replies: [] };
          comments.push(comment);
          localStorage.setItem(storageKey, JSON.stringify(comments));
          input.value = "";
          renderComments();
        };

        function renderComments() {
        commentList.innerHTML = "";
        comments.forEach((comment, idx) => {
            const commentBox = document.createElement("div");
            commentBox.className = "comment-box";
            commentBox.innerHTML = `
            <p>${comment.text}</p>
            <a href="mailto:dorothyayiemba@gmail.com?subject=Consultation Request&body=${encodeURIComponent(comment.text)}" target="_blank">📧 Consult Trainer</a>
            <div class="reply-section">
                <input type="text" placeholder="Reply..." class="reply-input"/>
                <button class="reply-btn">Reply</button>
            </div>
            <div class="replies">
                ${comment.replies.map(reply => `<p class="reply">↳ ${reply}</p>`).join("")}
            </div>
            `;

            // Reply button logic
            const replyInput = commentBox.querySelector(".reply-input");
            const replyBtn = commentBox.querySelector(".reply-btn");
            replyBtn.onclick = () => {
              const replyText = replyInput.value.trim();
              if (!replyText) return;
              comment.replies.push(replyText);
              localStorage.setItem(storageKey, JSON.stringify(comments));
              renderComments();// re-render to show the reply
            };

            commentList.appendChild(commentBox);
        });
        }

        // Add the discussion to the topic card
        card.appendChild(discussion);

        // Finally, add card to the page
        container.appendChild(card);
      });
    })
    .catch((err) => {
      console.error("Error loading topics:", err);
      document.getElementById("topic-list").innerHTML = `<p>Error loading topics.</p>`;
    });
}

// 🌙 Theme toggle
document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.getElementById("theme-toggle");
  const body = document.body;

  // Load theme from local storage
  if (localStorage.getItem("theme") === "dark") {
    body.classList.add("dark-mode");
    toggle.textContent = "☀️";
  }

  toggle?.addEventListener("click", () => {
    body.classList.toggle("dark-mode");
    const isDark = body.classList.contains("dark-mode");
    toggle.textContent = isDark ? "☀️" : "🌙";
    localStorage.setItem("theme", isDark ? "dark" : "light");
  });
});

const logoutBtn = document.getElementById("logoutBtn");
if (logoutBtn) {
  logoutBtn.addEventListener("click", () => {
    // Clear user login info
    localStorage.removeItem("userEmail");

    // Optionally clear other stored data if needed:
    // localStorage.clear();

    // Redirect to login page
    window.location.href = "login.html";
  });
}

