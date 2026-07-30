function switchTab(mode) {
	const loginTab = document.getElementById("tab-login");
	const signupTab = document.getElementById("tab-signup");
	const loginForm = document.getElementById("form-login");
	const signupForm = document.getElementById("form-signup");
	const terminalLog = document.getElementById("dynamic-log");

	if (mode === "login") {
		loginTab.classList.add("text-primary", "border-primary");
		loginTab.classList.remove("text-outline");
		signupTab.classList.add("text-outline");
		signupTab.classList.remove("text-primary", "border-primary");
		loginForm.classList.remove("hidden");
		signupForm.classList.add("hidden");

		addTerminalLog("Switching to login flow...");
		addTerminalLog("Loading security credentials database...");
	} else {
		signupTab.classList.add("text-primary", "border-primary");
		signupTab.classList.remove("text-outline");
		loginTab.classList.add("text-outline");
		loginTab.classList.remove("text-primary", "border-primary");
		signupForm.classList.remove("hidden");
		loginForm.classList.add("hidden");

		addTerminalLog("Initializing new user sequence...");
		addTerminalLog("Preparing tech-stack configuration hooks...");
	}
}

function addTerminalLog(text) {
	const log = document.getElementById("dynamic-log");
	const p = document.createElement("p");
	p.className = "text-outline-variant opacity-80 animate-pulse";
	p.innerHTML = `<span class="text-secondary-fixed-dim">→</span> ${text}`;
	log.appendChild(p);

	// Scroll to bottom
	const container = document.getElementById("terminal-content");
	container.scrollTop = container.scrollHeight;

	setTimeout(() => p.classList.remove("animate-pulse"), 1000);
}

// Simulating some dynamic terminal noise
setInterval(() => {
	const lines = [
		"Ping: 24ms to master.node",
		"Buffer health: 99.8%",
		"Entropy pool: refreshing...",
		"Waiting for input signature...",
	];
	const randomLine = lines[Math.floor(Math.random() * lines.length)];
	const log = document.getElementById("dynamic-log");
	if (log.children.length > 15) log.innerHTML = "";
	addTerminalLog(randomLine);
}, 8000);

document.addEventListener("DOMContentLoaded", () => {
	const tabLogin = document.getElementById("tab-login");
	const tabSignup = document.getElementById("tab-signup");
	const formLogin = document.getElementById("form-login");
	const formSignup = document.getElementById("form-signup");
	const dynamicLog = document.getElementById("dynamic-log");

	// --- UTILS ---

	// Helper to print to the terminal side panel
	function logToTerminal(message, type = "text-secondary") {
		const p = document.createElement("p");
		p.className = type;
		p.textContent = message;
		// Insert before the cursor
		dynamicLog.insertBefore(p, dynamicLog.lastElementChild);
		// Auto scroll to bottom
		const container = document.getElementById("terminal-content");
		container.scrollTop = container.scrollHeight;
	}

	// --- TAB SWITCHING ---

	window.switchTab = (tab) => {
		if (tab === "login") {
			// Update visual tabs
			tabLogin.classList.add("text-primary", "border-b-2", "border-primary");
			tabLogin.classList.remove("text-outline");

			tabSignup.classList.remove(
				"text-primary",
				"border-b-2",
				"border-primary",
			);
			tabSignup.classList.add("text-outline");

			// Show/Hide Forms
			formLogin.classList.remove("hidden");
			formSignup.classList.add("hidden");
		} else {
			// Update visual tabs
			tabSignup.classList.add("text-primary", "border-b-2", "border-primary");
			tabSignup.classList.remove("text-outline");

			tabLogin.classList.remove("text-primary", "border-b-2", "border-primary");
			tabLogin.classList.add("text-outline");

			// Show/Hide Forms
			formLogin.classList.add("hidden");
			formSignup.classList.remove("hidden");
		}
	};

	// --- API HANDLERS ---

	// Handle Login
	formLogin.addEventListener("submit", async (e) => {
		e.preventDefault();

		const emailInput = formLogin.querySelector('input[type="email"]');
		const passInput = formLogin.querySelector('input[type="password"]');
		const btn = formLogin.querySelector("button");

		const email = emailInput.value;
		const password = passInput.value;

		if (!email || !password) return;

		// UI Loading State
		btn.innerHTML = "ESTABLISHING UPLINK...";
		btn.disabled = true;
		logToTerminal(`> Attempting handshake for ${email}...`, "text-outline");

		try {
			const res = await fetch("/api/login", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ email, password }),
			});

			const data = await res.json();

			if (data.success) {
				logToTerminal(`[OK] SESSION ACTIVE`, "text-secondary");
				logToTerminal(
					`[INFO] Welcome back, ${data.user.alias}`,
					"text-primary",
				);
				logToTerminal(`> Redirecting to dashboard...`, "text-outline");

				// Mock redirect delay
				setTimeout(() => {
					alert(
						`Welcome back, ${data.user.alias}! (This would redirect you to the dashboard)`,
					);
					btn.innerHTML = "CONNECT TO HUB";
					btn.disabled = false;
				}, 1500);
			} else {
				logToTerminal(`[ERROR] ${data.message}`, "text-error"); // Assuming .text-error exists or using inline style for red
				btn.innerHTML = "CONNECT TO HUB";
				btn.disabled = false;
			}
		} catch (err) {
			logToTerminal(`[FATAL] Network Unreachable`, "error");
			btn.innerHTML = "CONNECT TO HUB";
			btn.disabled = false;
		}
	});

	// Handle Signup
	formSignup.addEventListener("submit", async (e) => {
		e.preventDefault();

		const inputs = formSignup.querySelectorAll("input");
		const alias = inputs[0].value; // Alias input
		const email = inputs[1].value; // Email input
		const password = inputs[2].value; // Password input

		// Get selected stacks
		const stackBtns = formSignup.querySelectorAll(".bg-secondary\\/5"); // Select active buttons
		const stack = Array.from(stackBtns).map((btn) => btn.textContent.trim());

		const btn = formSignup.querySelector("button");

		if (!email || !password || !alias) return;

		btn.innerHTML = "INITIALIZING UPLINK...";
		btn.disabled = true;
		logToTerminal(`> Registering new identity: ${alias}...`, "text-outline");

		try {
			const res = await fetch("/api/signup", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ alias, email, password, stack }),
			});

			const data = await res.json();

			if (data.success) {
				logToTerminal(`[OK] USER CREATED`, "text-secondary");
				logToTerminal(`[INFO] Uplink authorized.`, "text-primary");

				setTimeout(() => {
					alert("Registration Successful! Please Login.");
					switchTab("login");
					btn.innerHTML = "INITIALIZE UPLINK";
					btn.disabled = false;
				}, 1000);
			} else {
				logToTerminal(`[ERROR] ${data.message}`, "error");
				btn.innerHTML = "INITIALIZE UPLINK";
				btn.disabled = false;
			}
		} catch (err) {
			logToTerminal(`[FATAL] System Failure`, "error");
			btn.innerHTML = "INITIALIZE UPLINK";
			btn.disabled = false;
		}
	});
});
