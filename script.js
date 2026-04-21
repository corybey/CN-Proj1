import { db } from "./firebase-config.js";
import {
  collection,
  addDoc,
  query,
  orderBy,
  limit,
  getDocs,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js";

const feedbackForm = document.getElementById("feedbackForm");
const feedbackList = document.getElementById("feedbackList");
const formStatus = document.getElementById("formStatus");
const refreshBtn = document.getElementById("refreshBtn");

const feedbackCollection = collection(db, "feedback");

function setStatus(message, type) {
  formStatus.textContent = message;
  formStatus.classList.remove("hidden", "success", "error");
  formStatus.classList.add(type);
}

function clearStatus() {
  formStatus.textContent = "";
  formStatus.classList.add("hidden");
  formStatus.classList.remove("success", "error");
}

function sanitizeText(value) {
  return DOMPurify.sanitize(value, {
    ALLOWED_TAGS: [],
    ALLOWED_ATTR: []
  }).trim();
}

function formatDate(timestamp) {
  if (!timestamp?.toDate) {
    return "Just now";
  }

  return timestamp.toDate().toLocaleString();
}

function createFeedbackCard(item) {
  const safeName = sanitizeText(item.name || "Anonymous");
  const safeTopic = sanitizeText(item.topic || "General");
  const safeMessage = sanitizeText(item.message || "");
  const safeDate = sanitizeText(formatDate(item.createdAt));

  return `
    <article class="feedback-card">
      <div class="feedback-header">
        <span class="feedback-name">${safeName}</span>
        <span class="badge">${safeTopic}</span>
      </div>
      <p class="feedback-message">${safeMessage}</p>
      <div class="feedback-date">Submitted: ${safeDate}</div>
    </article>
  `;
}

async function loadFeedback() {
  feedbackList.innerHTML = `<p class="muted">Loading submissions...</p>`;

  try {
    const feedbackQuery = query(
      feedbackCollection,
      orderBy("createdAt", "desc"),
      limit(8)
    );

    const snapshot = await getDocs(feedbackQuery);

    if (snapshot.empty) {
      feedbackList.innerHTML = `<p class="muted">No submissions yet. Be the first to add one.</p>`;
      return;
    }

    const entries = [];
    snapshot.forEach((doc) => {
      entries.push(doc.data());
    });

    feedbackList.innerHTML = entries.map(createFeedbackCard).join("");
  } catch (error) {
    console.error("Error loading feedback:", error);
    feedbackList.innerHTML = `
      <p class="muted">Unable to load submissions right now. Check Firestore configuration and rules.</p>
    `;
  }
}

feedbackForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  clearStatus();

  const formData = new FormData(feedbackForm);

  const name = sanitizeText(formData.get("name") || "");
  const topic = sanitizeText(formData.get("topic") || "");
  const message = sanitizeText(formData.get("message") || "");

  if (!name || !topic || !message) {
    setStatus("Please complete all fields before submitting.", "error");
    return;
  }

  if (name.length > 40 || message.length > 250) {
    setStatus("Your input is too long. Please shorten it and try again.", "error");
    return;
  }

  try {
    await addDoc(feedbackCollection, {
      name,
      topic,
      message,
      createdAt: serverTimestamp()
    });

    feedbackForm.reset();
    setStatus("Feedback submitted successfully.", "success");
    await loadFeedback();
  } catch (error) {
    console.error("Error saving feedback:", error);
    setStatus("There was a problem submitting your feedback.", "error");
  }
});

refreshBtn.addEventListener("click", loadFeedback);

window.addEventListener("DOMContentLoaded", loadFeedback);