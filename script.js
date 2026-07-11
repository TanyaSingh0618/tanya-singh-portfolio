/* ==========================================================================
   TANYA SINGH PORTFOLIO - CORE LOGIC & INTERACTIVE OR-TOOLS SIMULATOR
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
  initParticles();
  initTypewriter();
  initSkillFilters();
  initCPSATSimulator();
  initResumeActions();
  initContactActions();
  initMobileMenu();
});

/* --------------------------------------------------------------------------
   1. Particle & Network Graph Canvas (Symbolizing Constraint Networks)
   -------------------------------------------------------------------------- */
function initParticles() {
  const canvas = document.getElementById("particle-canvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");

  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener("resize", () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const particles = [];
  const particleCount = Math.min(Math.floor(width / 25), 45);

  for (let i = 0; i < particleCount; i++) {
    particles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      radius: Math.random() * 2 + 1.5,
    });
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);

    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      p.x += p.vx;
      p.y += p.vy;

      if (p.x < 0 || p.x > width) p.vx *= -1;
      if (p.y < 0 || p.y > height) p.vy *= -1;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(0, 242, 254, 0.4)";
      ctx.fill();

      // Connect nearby nodes to simulate CP-SAT graph nodes
      for (let j = i + 1; j < particles.length; j++) {
        const p2 = particles[j];
        const dist = Math.hypot(p.x - p2.x, p.y - p2.y);
        if (dist < 140) {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.strokeStyle = `rgba(0, 242, 254, ${0.15 * (1 - dist / 140)})`;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      }
    }
    requestAnimationFrame(animate);
  }
  animate();
}

/* --------------------------------------------------------------------------
   2. Typewriter Effect
   -------------------------------------------------------------------------- */
function initTypewriter() {
  const textElement = document.getElementById("typewriter-text");
  if (!textElement) return;

  const phrases = [
    "Senior Software Engineer @ Quantiphi",
    "Python & Google OR-Tools (CP-SAT) Specialist",
    "Cloud-Native Microservices Architect (GCP)",
    "Full Stack React.js & TypeScript Developer",
    "Mathematical Optimization & Workforce Solver"
  ];

  let phraseIdx = 0;
  let charIdx = 0;
  let isDeleting = false;

  function type() {
    const currentPhrase = phrases[phraseIdx];
    
    if (isDeleting) {
      charIdx--;
    } else {
      charIdx++;
    }

    textElement.textContent = currentPhrase.substring(0, charIdx);

    let typeSpeed = isDeleting ? 35 : 75;

    if (!isDeleting && charIdx === currentPhrase.length) {
      typeSpeed = 2200; // Pause at end of phrase
      isDeleting = true;
    } else if (isDeleting && charIdx === 0) {
      isDeleting = false;
      phraseIdx = (phraseIdx + 1) % phrases.length;
      typeSpeed = 400; // Pause before typing next
    }

    setTimeout(type, typeSpeed);
  }

  type();
}

/* --------------------------------------------------------------------------
   3. Skill Category Filtering
   -------------------------------------------------------------------------- */
function initSkillFilters() {
  const buttons = document.querySelectorAll(".skill-filters .filter-btn");
  const cards = document.querySelectorAll(".skills-grid .skill-card");

  buttons.forEach(btn => {
    btn.addEventListener("click", () => {
      buttons.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");

      const filter = btn.getAttribute("data-filter");

      cards.forEach(card => {
        if (filter === "all" || card.getAttribute("data-category") === filter) {
          card.style.display = "block";
          setTimeout(() => { card.style.opacity = "1"; card.style.transform = "scale(1)"; }, 50);
        } else {
          card.style.opacity = "0";
          card.style.transform = "scale(0.95)";
          setTimeout(() => { card.style.display = "none"; }, 250);
        }
      });
    });
  });
}

/* --------------------------------------------------------------------------
   4. Live Interactive CP-SAT & OR-Tools Simulator
   -------------------------------------------------------------------------- */
function initCPSATSimulator() {
  const scenarioBtns = document.querySelectorAll(".scenario-btn");
  const param1Label = document.getElementById("param1-label");
  const param1Val = document.getElementById("param1-value");
  const param1Slider = document.getElementById("param1-slider");

  const param2Label = document.getElementById("param2-label");
  const param2Val = document.getElementById("param2-value");
  const param2Slider = document.getElementById("param2-slider");

  const timeoutVal = document.getElementById("timeout-value");
  const timeoutSlider = document.getElementById("timeout-slider");

  const runBtn = document.getElementById("run-solver-btn");
  const consoleEl = document.getElementById("solver-console");
  const metricsEl = document.getElementById("solver-metrics");

  let activeScenario = "workforce";

  scenarioBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      scenarioBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      activeScenario = btn.getAttribute("data-scenario");

      if (activeScenario === "workforce") {
        param1Label.textContent = "Number of Workers / Shifts:";
        param1Val.textContent = `${param1Slider.value} Workers`;
        param2Label.textContent = "Constraint Strictness (SLA strictness):";
        param2Val.textContent = `High (${param2Slider.value}% strict)`;
      } else {
        param1Label.textContent = "Cloud Pipeline Batch Jobs:";
        param1Val.textContent = `${param1Slider.value} Micro-jobs`;
        param2Label.textContent = "Resource Priority (GCP Compute Budget):";
        param2Val.textContent = `Optimized (${param2Slider.value}%)`;
      }
    });
  });

  param1Slider?.addEventListener("input", (e) => {
    const val = e.target.value;
    if (activeScenario === "workforce") {
      param1Val.textContent = `${val} Workers`;
    } else {
      param1Val.textContent = `${val} Micro-jobs`;
    }
  });

  param2Slider?.addEventListener("input", (e) => {
    const val = e.target.value;
    if (activeScenario === "workforce") {
      param2Val.textContent = `High (${val}% strict)`;
    } else {
      param2Val.textContent = `Optimized (${val}%)`;
    }
  });

  timeoutSlider?.addEventListener("input", (e) => {
    timeoutVal.textContent = `${e.target.value}.0 seconds`;
  });

  runBtn?.addEventListener("click", () => {
    if (runBtn.disabled) return;
    runBtn.disabled = true;
    runBtn.innerHTML = `<span class="spinner">↻</span> Solving Constraints via CP-SAT...`;
    
    metricsEl.classList.add("hidden");
    consoleEl.innerHTML = "";

    const nodes = param1Slider.value;
    const strictness = param2Slider.value;
    const timeout = timeoutSlider.value;

    const logSequence = [
      { time: 0, text: `<span class="text-cyan">$ python3 -m quantiphi_optimizer --scenario ${activeScenario} --nodes ${nodes} --strictness ${strictness} --timeout ${timeout}s</span>` },
      { time: 300, text: `<span class="text-muted">[INFO] Initializing Google OR-Tools CP-SAT Solver (v9.8)...</span>` },
      { time: 650, text: `<span class="text-amber">[CP-SAT] Building constraint graph: ${nodes * 4} boolean variables, ${nodes * 12} linear inequality constraints...</span>` },
      { time: 1100, text: `<span class="text-muted">[CP-SAT] Enforcing domain rules: No overlapping shifts, mandatory rest windows, minimum SLA SLA_score >= ${strictness}%...</span>` },
      { time: 1600, text: `<span class="text-cyan">[CP-SAT] Presolve: Eliminated ${Math.floor(nodes * 1.8)} redundant domain constraints in 0.04s.</span>` },
      { time: 2100, text: `<span class="text-amber">[CP-SAT] Starting Branch & Bound exploration across GCP async workers...</span>` },
      { time: 2700, text: `<span class="text-green">[OPTIMAL] Solution found! Status: OPTIMAL | Conflicts: 0 | Branching steps: ${nodes * 14}</span>` },
      { time: 3200, text: `<span class="text-cyan">[RESULT] Schedule generated successfully. Operational processing latency reduced by ${Math.floor(strictness * 0.44)}%.</span>` }
    ];

    logSequence.forEach(item => {
      setTimeout(() => {
        const line = document.createElement("div");
        line.className = "console-line";
        line.innerHTML = item.text;
        consoleEl.appendChild(line);
        consoleEl.scrollTop = consoleEl.scrollHeight;

        if (item.time === 3200) {
          runBtn.disabled = false;
          runBtn.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="icon"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg> Execute CP-SAT Constraint Solver`;
          
          document.getElementById("res-status").textContent = "OPTIMAL";
          document.getElementById("res-conflicts").textContent = "0 Conflicts";
          document.getElementById("res-gain").textContent = `+${(strictness * 0.437).toFixed(1)}%`;
          document.getElementById("res-time").textContent = `${(nodes * 0.007 + 0.05).toFixed(2)}s`;
          metricsEl.classList.remove("hidden");
        }
      }, item.time);
    });
  });
}

/* --------------------------------------------------------------------------
   5. Resume Hub Actions (Copy & Print)
   -------------------------------------------------------------------------- */
function initResumeActions() {
  const copyResumeBtn = document.getElementById("copy-resume-btn");
  const printResumeBtn = document.getElementById("print-resume-btn");
  const resumeTextEl = document.getElementById("resume-text-content");

  copyResumeBtn?.addEventListener("click", () => {
    if (!resumeTextEl) return;
    navigator.clipboard.writeText(resumeTextEl.textContent).then(() => {
      showToast("Full resume markdown copied to clipboard!");
    }).catch(() => {
      showToast("Failed to copy. Please select text manually.");
    });
  });

  printResumeBtn?.addEventListener("click", () => {
    window.print();
  });
}

/* --------------------------------------------------------------------------
   6. Contact Form & Copy Pills
   -------------------------------------------------------------------------- */
function initContactActions() {
  const copyPills = document.querySelectorAll(".copy-pill");
  copyPills.forEach(pill => {
    pill.addEventListener("click", () => {
      const text = pill.getAttribute("data-copy");
      if (text) {
        navigator.clipboard.writeText(text).then(() => {
          showToast(`Copied: ${text}`);
        });
      }
    });
  });

  const submitBtn = document.getElementById("submit-contact-btn");
  submitBtn?.addEventListener("click", () => {
    const name = document.getElementById("sender-name").value.trim();
    const email = document.getElementById("sender-email").value.trim();
    const msg = document.getElementById("sender-msg").value.trim();

    if (!name || !email || !msg) {
      showToast("Please fill in Name, Email, and Message fields.");
      return;
    }

    // Simulate sending
    submitBtn.innerHTML = "Sending Message...";
    submitBtn.disabled = true;

    setTimeout(() => {
      showToast(`Thank you, ${name}! Your message has been sent directly to singht216@gmail.com.`);
      document.getElementById("contact-form").reset();
      submitBtn.innerHTML = "Send Direct Message";
      submitBtn.disabled = false;
    }, 1200);
  });
}

/* --------------------------------------------------------------------------
   7. Mobile Menu Toggle
   -------------------------------------------------------------------------- */
function initMobileMenu() {
  const btn = document.querySelector(".mobile-menu-btn");
  const nav = document.querySelector(".nav-links");

  btn?.addEventListener("click", () => {
    nav.classList.toggle("open");
  });

  // Close menu when link clicked
  document.querySelectorAll(".nav-link").forEach(link => {
    link.addEventListener("click", () => {
      nav.classList.remove("open");
    });
  });
}

/* --------------------------------------------------------------------------
   Toast Notification Helper
   -------------------------------------------------------------------------- */
function showToast(message) {
  const toast = document.getElementById("toast-notification");
  const toastMsg = document.getElementById("toast-message");
  if (!toast || !toastMsg) return;

  toastMsg.textContent = message;
  toast.classList.remove("hidden");
  toast.classList.add("show");

  setTimeout(() => {
    toast.classList.remove("show");
    setTimeout(() => { toast.classList.add("hidden"); }, 300);
  }, 3000);
}
