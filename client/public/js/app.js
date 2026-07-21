let isMenuOpen = false;
const menu = document.getElementById("mobile-menu");
const toggleBtn = document.getElementById("menu-toggle");
const body = document.body;
const spans = toggleBtn.querySelectorAll("span");

function toggleMenu() {
	isMenuOpen = !isMenuOpen;

	if (isMenuOpen) {
		// Open Menu
		menu.classList.remove(
			"opacity-0",
			"pointer-events-none",
			"translate-y-[-10px]",
		);
		menu.classList.add("opacity-100", "translate-y-0");
		body.classList.add("overflow-hidden");

		// Animate to X
		spans[0].classList.add("rotate-45", "translate-y-2");
		spans[1].classList.add("opacity-0");
		spans[2].classList.add("-rotate-45", "-translate-y-2", "w-8");
	} else {
		// Close Menu
		menu.classList.add(
			"opacity-0",
			"pointer-events-none",
			"translate-y-[-10px]",
		);
		menu.classList.remove("opacity-100", "translate-y-0");
		body.classList.remove("overflow-hidden");

		// Reset to hamburger
		spans[0].classList.remove("rotate-45", "translate-y-2");
		spans[1].classList.remove("opacity-0");
		spans[2].classList.remove("-rotate-45", "-translate-y-2", "w-8");
	}
}

// Close on Escape key
document.addEventListener("keydown", (e) => {
	if (e.key === "Escape" && isMenuOpen) toggleMenu();
});

// Close on overlay click
menu.addEventListener("click", (e) => {
	if (e.target === menu) toggleMenu();
});

// Parallax Effect for Terminal
const terminal = document.getElementById("parallax-terminal");
if (
	terminal &&
	!window.matchMedia("(prefers-reduced-motion: reduce)").matches
) {
	document.addEventListener("mousemove", (e) => {
		const xAxis = (window.innerWidth / 2 - e.pageX) / 45;
		const yAxis = (window.innerHeight / 2 - e.pageY) / 45;
		terminal.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg) rotateZ(1deg)`;
	});
}

// Intersection Observer for Reveal on Scroll
const observerOptions = {
	threshold: 0.1,
	rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
	entries.forEach((entry) => {
		if (entry.isIntersecting) {
			entry.target.classList.add("active");
		}
	});
}, observerOptions);

document.querySelectorAll(".reveal").forEach((el) => {
	observer.observe(el);
});

// =========================================================================
// frontend/app.js
// =========================================================================
const API_BASE_URL = "http://localhost:5000/api";

// 1. Asynchronous Lifecycle Fetcher
document.addEventListener("DOMContentLoaded", async () => {
	try {
		// Fetch all components concurrently
		const [langRes, projRes, tutRes] = await Promise.all([
			fetch(`${API_BASE_URL}/languages`),
			fetch(`${API_BASE_URL}/projects`),
			fetch(`${API_BASE_URL}/tutorials`),
		]);

		// Parse responses to valid JSON array sets
		const languages = await langRes.json();
		const projects = await projRes.json();
		const tutorials = await tutRes.json();

		// Feed compiler structures with live data streams
		renderLanguages(languages);
		renderProjects(projects);
		renderTutorials(tutorials);
	} catch (error) {
		console.error("Critical API Link Error:", error);
		displayFallbackUIMessage();
	}
});

// Helper for handling offline/failed server requests gracefully
function displayFallbackUIMessage() {
	const targets = ["languages-grid", "projects-grid", "tutorials-grid"];
	targets.forEach((id) => {
		const el = document.getElementById(id);
		if (el)
			el.innerHTML = `<p class="text-error font-mono text-xs col-span-full">// Failed to connect with upstream server engine.</p>`;
	});
}

// =========================================================================
// 3. Components Compiler Engines (Keep your existing functions exactly as they are)
// =========================================================================
function renderLanguages(items) {
	const container = document.getElementById("languages-grid");
	if (!container) return;
	container.innerHTML = items
		.map(
			(lang) => `
        <div class="glass-panel p-6 rounded-xl flex items-center justify-center gap-3 border ${lang.borderColor}">
            <span class="material-icons-outlined ${lang.iconColor}">${lang.icon}</span>
            <div class="flex flex-col">
                <span class="font-label-caps text-label-caps tracking-wider">${lang.name}</span>
                <span class="text-[10px] text-outline tracking-tight font-mono mt-0.5">${lang.type}</span>
            </div>
        </div>
    `,
		)
		.join("");
}

function renderProjects(items) {
	const container = document.getElementById("projects-grid");
	if (!container) return;
	container.innerHTML = items
		.map(
			(proj) => `
        <div class="group cursor-pointer" onclick="window.location.href='${proj.link}'">
            <div class="relative aspect-video rounded-xl overflow-hidden mb-6 glass-panel">
                <img src="${proj.img}" alt="${proj.title}" class="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 transform group-hover:scale-105" />
                <div class="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-60"></div>
            </div>
            <div class="space-y-2">
                <div class="font-code-sm text-code-sm text-secondary tracking-widest font-bold uppercase">${proj.year} // ${proj.system}</div>
                <h3 class="font-headline-md text-headline-md text-white group-hover:text-primary transition-colors">${proj.title}</h3>
                <p class="font-body-md text-body-md text-on-surface-variant leading-relaxed">${proj.desc}</p>
                <div class="flex flex-wrap gap-2 pt-2">
                    ${proj.tags.map((tag) => `<span class="bg-surface-container-high text-xs px-2.5 py-1 rounded text-on-surface font-mono border border-white/5">${tag}</span>`).join("")}
                </div>
            </div>
        </div>
    `,
		)
		.join("");
}

function renderTutorials(items) {
	const container = document.getElementById("tutorials-grid");
	if (!container) return;
	container.innerHTML = items
		.map(
			(tut) => `
        <div class="glass-panel p-8 rounded-xl flex flex-col justify-between hover:border-primary/40 transition-all group duration-300">
            <div>
                <span class="text-xs font-mono font-semibold tracking-widest bg-primary/10 text-primary px-3 py-1 rounded-md border border-primary/10">${tut.category}</span>
                <h3 class="text-xl font-bold text-gray-100 mt-6 group-hover:text-secondary transition-colors cursor-pointer leading-snug">${tut.title}</h3>
                <p class="text-on-surface-variant text-sm mt-3 leading-relaxed font-body-md">${tut.excerpt}</p>
            </div>
            <div class="flex items-center justify-between mt-8 pt-4 border-t border-white/5">
                <span class="text-xs text-outline font-mono">${tut.readTime}</span>
                <span class="text-xs text-primary group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">Read Article <span class="material-icons-outlined text-xs">arrow_forward</span></span>
            </div>
        </div>
    `,
		)
		.join("");
}
