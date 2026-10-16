// InternBench Application Logic
const internshipsData = [
  {
    id: 1,
    title: "Frontend AI Engineer Intern",
    company: "NeuroTech Labs",
    location: "Remote",
    type: "remote",
    category: "frontend",
    stipend: "$1,800",
    duration: "3 Months",
    applicants: 42,
    scoreReq: "85% Bench Score",
    tags: ["React", "TypeScript", "Tailwind", "Next.js"],
    logoBg: "linear-gradient(135deg, #6366f1, #a855f7)",
    description: "Build cutting-edge user interfaces for our real-time generative AI analytics dashboard."
  },
  {
    id: 2,
    title: "Backend Cloud Systems Intern",
    company: "Apex Scale Systems",
    location: "San Francisco, CA",
    type: "hybrid",
    category: "backend",
    stipend: "$2,200",
    duration: "6 Months",
    applicants: 68,
    scoreReq: "90% Bench Score",
    tags: ["Go", "Kubernetes", "PostgreSQL", "gRPC"],
    logoBg: "linear-gradient(135deg, #06b6d4, #3b82f6)",
    description: "Optimize high-throughput microservices handling billions of events monthly."
  },
  {
    id: 3,
    title: "Machine Learning Research Intern",
    company: "Synthetix AI",
    location: "New York, NY",
    type: "onsite",
    category: "ai",
    stipend: "$2,500",
    duration: "4 Months",
    applicants: 114,
    scoreReq: "92% Bench Score",
    tags: ["PyTorch", "Transformers", "Python", "CUDA"],
    logoBg: "linear-gradient(135deg, #ec4899, #8b5cf6)",
    description: "Conduct novel research on lightweight model distillation and multimodal alignment."
  },
  {
    id: 4,
    title: "UI/UX Product Design Intern",
    company: "Flowstate Studio",
    location: "Remote",
    type: "remote",
    category: "design",
    stipend: "$1,500",
    duration: "3 Months",
    applicants: 35,
    scoreReq: "80% Bench Score",
    tags: ["Figma", "Design Systems", "Prototyping", "UX"],
    logoBg: "linear-gradient(135deg, #f59e0b, #ef4444)",
    description: "Design intuitive interfaces, interactive design tokens, and user journey flows."
  },
  {
    id: 5,
    title: "Full Stack Web3 Intern",
    company: "ChainPulse",
    location: "Austin, TX",
    type: "hybrid",
    category: "frontend",
    stipend: "$2,000",
    duration: "6 Months",
    applicants: 54,
    scoreReq: "88% Bench Score",
    tags: ["Solidity", "Ethers.js", "React", "Node.js"],
    logoBg: "linear-gradient(135deg, #10b981, #059669)",
    description: "Develop decentralized finance consumer apps with clean and seamless user experiences."
  },
  {
    id: 6,
    title: "Data Platform Engineer Intern",
    company: "DataVibe Analytics",
    location: "Remote",
    type: "remote",
    category: "data",
    stipend: "$1,700",
    duration: "3 Months",
    applicants: 29,
    scoreReq: "82% Bench Score",
    tags: ["Python", "Spark", "Snowflake", "SQL"],
    logoBg: "linear-gradient(135deg, #8b5cf6, #ec4899)",
    description: "Architect ETL pipelines and build benchmark test runners for data warehouse validation."
  }
];

let currentFilter = 'all';
let searchQuery = '';
let locationFilter = 'all';

// Render Internships
function renderInternships() {
  const container = document.getElementById('internshipsGrid');
  if (!container) return;

  const filtered = internshipsData.filter(item => {
    const matchesCategory = currentFilter === 'all' || item.category === currentFilter;
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesLocation = locationFilter === 'all' || item.type === locationFilter;
    return matchesCategory && matchesSearch && matchesLocation;
  });

  if (filtered.length === 0) {
    container.innerHTML = `
      <div style="grid-column: 1/-1; text-align: center; padding: 60px 20px;">
        <h3 style="font-size: 1.4rem; margin-bottom: 8px;">No matching internships found</h3>
        <p style="color: var(--text-secondary);">Try adjusting your search criteria or resetting filters.</p>
      </div>
    `;
    return;
  }

  container.innerHTML = filtered.map(item => `
    <article class="intern-card" data-id="${item.id}">
      <div class="card-top">
        <div class="company-info">
          <div class="company-logo" style="background: ${item.logoBg};">
            ${item.company.charAt(0)}
          </div>
          <div class="company-meta">
            <h4>${item.title}</h4>
            <span>${item.company}</span>
          </div>
        </div>
        <span class="card-badge badge-${item.type}">
          ${item.type.charAt(0).toUpperCase() + item.type.slice(1)}
        </span>
      </div>
      
      <p style="font-size: 0.9rem; color: var(--text-secondary); margin-bottom: 14px;">
        ${item.description}
      </p>

      <div class="card-details">
        <span>📍 ${item.location}</span>
        <span>⏱️ ${item.duration}</span>
        <span>🎯 ${item.scoreReq}</span>
      </div>

      <div class="tag-list">
        ${item.tags.map(t => `<span class="tag">${t}</span>`).join('')}
      </div>

      <div class="card-footer">
        <div class="stipend">
          ${item.stipend}<span>/mo</span>
        </div>
        <button class="btn btn-primary btn-sm" onclick="openApplyModal('${item.id}', '${item.title}', '${item.company}')">
          Apply Now
        </button>
      </div>
    </article>
  `).join('');
}

// Modal handling
function openApplyModal(id, title, company) {
  const modal = document.getElementById('applyModal');
  const roleInput = document.getElementById('modalRoleTitle');
  if (roleInput) roleInput.value = `${title} at ${company}`;
  if (modal) modal.classList.add('active');
}

function closeApplyModal() {
  const modal = document.getElementById('applyModal');
  if (modal) modal.classList.remove('active');
}

function showToast(message) {
  const toastContainer = document.getElementById('toastContainer');
  if (!toastContainer) return;

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `<span>✅</span> <div>${message}</div>`;
  toastContainer.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}

// Setup Event Listeners
document.addEventListener('DOMContentLoaded', () => {
  renderInternships();

  // Search input
  const searchInput = document.getElementById('searchInput');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value;
      renderInternships();
    });
  }

  // Location filter dropdown
  const locSelect = document.getElementById('locationSelect');
  if (locSelect) {
    locSelect.addEventListener('change', (e) => {
      locationFilter = e.target.value;
      renderInternships();
    });
  }

  // Filter tabs
  const filterButtons = document.querySelectorAll('.filter-btn');
  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentFilter = btn.getAttribute('data-filter') || 'all';
      renderInternships();
    });
  });

  // Application form submit
  const applyForm = document.getElementById('applyForm');
  if (applyForm) {
    applyForm.addEventListener('submit', (e) => {
      e.preventDefault();
      closeApplyModal();
      showToast('Application successfully submitted to InternBench!');
      applyForm.reset();
    });
  }
});
