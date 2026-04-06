import van from "./van-1.6.0.min.js"

const {
    nav, div, a, section, img, h1, h2, h3, p,
    button, pre, code, svg, path,
    span, footer, i
} = van.tags

const ThemeToggle = () => {
    const theme = van.state(document.documentElement.getAttribute('data-theme') || 'light')
    
    const toggleTheme = () => {
        const newTheme = theme.val === 'light' ? 'dark' : 'light'
        theme.val = newTheme
        document.documentElement.setAttribute('data-theme', newTheme)
        localStorage.setItem('theme', newTheme)
    }
    
    return button({
        class: "theme-toggle",
        onclick: toggleTheme,
        "aria-label": "Toggle theme"
    },
        i({
            class: van.derive(() => theme.val === 'dark' ? 'bi bi-sun-fill' : 'bi bi-moon-fill')
        })
    )
}

const Navigation = () => {
    const menuOpen = van.state(false)
    
    return nav(
        div({ class: "container" },
            a({ href: "#", class: "logo-nav" },
                img({ src: "./images/ravelogo.png", alt: "Rave", loading: "eager" }),
                "Rave"
            ),
            div({ class: "nav-links" },
                a({ href: "#installation", class: "nav-link" }, "Installation"),
                a({ href: "https://github.com/Ttimofeyka/Rave", target: "_blank", class: "nav-link" }, "GitHub"),
                a({ href: "https://github.com/Ttimofeyka/Rave/tree/main/specifications", target: "_blank", class: "nav-link" }, "Docs"),
                a({ href: "#benchmarks", class: "nav-link" }, "Benchmarks"),
                ThemeToggle()
            ),
            button({
                class: "hamburger",
                onclick: () => menuOpen.val = !menuOpen.val
            }, "☰"),
            div({
                class: van.derive(() => menuOpen.val ? "nav-menu open" : "nav-menu")
            },
                a({ href: "#installation" }, "Installation"),
                a({ href: "https://github.com/Ttimofeyka/Rave", target: "_blank" }, "GitHub"),
                a({ href: "https://github.com/Ttimofeyka/Rave/tree/main/specifications", target: "_blank" }, "Docs"),
                a({ href: "#benchmarks" }, "Benchmarks"),
                ThemeToggle()
            )
        )
    )
}

const Hero = () => section({ class: "hero" },
    img({
        src: "./images/ravelogo.png",
        alt: "Rave Logo",
        class: "logo",
        loading: "eager"
    }),
    h1("Rave Programming Language"),
    p({ class: "tagline" }, "High-performance compiled language with modern syntax, LLVM backend, and manual memory management"),
    div({ class: "hero-buttons" },
        a({
            href: "https://github.com/Ttimofeyka/Rave",
            class: "btn btn-primary",
            target: "_blank"
        },
            svg({
                xmlns: "http://www.w3.org/2000/svg",
                width: "20",
                height: "20",
                viewBox: "0 0 24 24",
                fill: "currentColor"
            }, path({ d: "M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" })),
            "View on GitHub"
        ),
        a({
            href: "https://github.com/Ttimofeyka/Rave/tree/main/specifications",
            class: "btn btn-secondary",
            target: "_blank"
        },
            svg({
                xmlns: "http://www.w3.org/2000/svg",
                width: "20",
                height: "20",
                viewBox: "0 0 24 24",
                fill: "none",
                stroke: "currentColor",
                "stroke-width": "2"
            }, path({ d: "M4 19.5A2.5 2.5 0 0 1 6.5 17H20" }), path({ d: "M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" })),
            "Documentation"
        )
    )
)

const FeatureCard = (icon, title, description) => div({ class: "feature-card" },
    div({ class: "icon" }, icon),
    h3(title),
    p(description)
)

const StepCard = (step, index) => {
    return div({ class: "benchmark-card" },
        div({ class: "benchmark-header" },
            h3({ class: "benchmark-name" }, `Step ${index + 1}: ${step.label}`),
            step.tooltip ? div({ class: "tooltip-container" },
                span({ class: "tooltip-icon" }, "?"),
                div({ class: "tooltip-content" }, step.tooltip)
            ) : ""
        ),
        div({ class: "code-block" },
            pre(code(step.code))
        ),
        step.note ? p({ class: "note-text-small", style: "margin-top: 8px;" }, step.note) : ""
    )
}

const DownloadReleaseSection = () => {
    const downloadPlatform = van.state("linux")
    
    const downloadInstructions = {
        linux: {
            title: "Linux",
            runCode: "./rave --version"
        },
        windows: {
            title: "Windows",
            runCode: "rave --version"
        }
    }
    
    return div({ class: "download-release" },
        div({ class: "container" },
            div({ class: "features-grid" },
                div({ class: "benchmark-card" },
                    h3({ class: "benchmark-name" }, "Step 1: Download Release"),
                    a({
                        href: "https://github.com/Ttimofeyka/Rave/releases/latest",
                        target: "_blank",
                        class: "btn btn-primary",
                        style: "margin-top: 12px; display: inline-flex;"
                    }, "Go to Releases Page"),
                    p({ class: "note-text", style: "margin-top: 12px;" },
                        "Download the appropriate archive for your platform"
                    )
                ),
                div({ class: "benchmark-card" },
                    h3({ class: "benchmark-name" }, "Step 2: Extract"),
                    p({ class: "note-text" }, "Unpack the downloaded archive to your desired location")
                ),
                div({ class: "benchmark-card" },
                    h3({ class: "benchmark-name" }, "Step 3: Run"),
                    div({ class: "code-block" },
                        pre(code(van.derive(() => downloadInstructions[downloadPlatform.val].runCode)))
                    )
                )
            ),
            div({ class: "example-tabs", style: "margin-top: 16px;" },
                ...Object.keys(downloadInstructions).map(key =>
                    button({
                        class: van.derive(() => downloadPlatform.val === key ? "tab-btn active" : "tab-btn"),
                        onclick: () => downloadPlatform.val = key
                    }, downloadInstructions[key].title)
                )
            ),
p({ class: "note-text", style: "margin-top: 24px;" },
                        "Requirement: C compiler (for linking)"
                    )
        )
    )
}

const InstallationSection = () => {
    const installMethod = van.state("build")
    const selectedPlatform = van.state("linux")
    
    const buildInstructions = {
        linux: {
            title: "Linux",
            steps: [
                {
                    label: "Clone Repository",
                    code: "git clone https://github.com/Ttimofeyka/Rave.git"
                },
                {
                    label: "Install Requirements",
                    code: "cd Rave && bash install.sh"
                },
                {
                    label: "Build Compiler",
                    code: "make -j4"
                },
                {
                    label: "Test Installation",
                    code: "./rave --version"
                }
            ]
        },
        windows: {
            title: "Windows",
            steps: [
                {
                    label: "Clone Repository",
                    code: "git clone https://github.com/Ttimofeyka/Rave.git"
                },
                {
                    label: "Install Requirements",
                    code: "cd Rave && install",
                    tooltip: "Requires Chocolatey for automatic installation. Manual alternative: Install LLVM, Make, C++ and C compilers."
                },
                {
                    label: "Build Compiler",
                    code: "make -j4"
                },
                {
                    label: "Test Installation",
                    code: "rave --version"
                }
            ]
        }
    }
    
    const BuildInstructionSteps = (platformKey) => div({
        class: van.derive(() => selectedPlatform.val === platformKey && installMethod.val === "build" ? "features-grid" : "features-grid hidden"),
        style: van.derive(() => selectedPlatform.val === platformKey && installMethod.val === "build" ? "" : "display: none;")
    },
        ...buildInstructions[platformKey].steps.map((step, index) => StepCard(step, index))
    )
    
    return section({ id: "installation" },
        div({ class: "container" },
            h2("Installation"),
            p({ class: "section-subtitle" }, "Get started with Rave in minutes. Choose your preferred method."),
            div({ class: "example-tabs install-method-tabs" },
                button({
                    class: van.derive(() => installMethod.val === "build" ? "tab-btn active" : "tab-btn"),
                    onclick: () => installMethod.val = "build"
                }, "Build from Source"),
                button({
                    class: van.derive(() => installMethod.val === "download" ? "tab-btn active" : "tab-btn"),
                    onclick: () => installMethod.val = "download"
                }, "Download Release")
            ),
            div({
                class: van.derive(() => installMethod.val === "build" ? "install-content" : "install-content hidden"),
                style: van.derive(() => installMethod.val === "build" ? "" : "display: none;")
            },
                div({ class: "example-tabs" },
                    ...Object.keys(buildInstructions).map(key =>
                        button({
                            class: van.derive(() => selectedPlatform.val === key ? "tab-btn active" : "tab-btn"),
                            onclick: () => selectedPlatform.val = key
                        }, buildInstructions[key].title)
                    )
                ),
                ...Object.keys(buildInstructions).map(key => BuildInstructionSteps(key)),
                p({ class: "note-text", style: "margin-top: 24px;" },
                    "Prerequisites: Git, LLVM, Make, C++ compiler"
                )
            ),
            div({
                class: van.derive(() => installMethod.val === "download" ? "install-content" : "install-content hidden"),
                style: van.derive(() => installMethod.val === "download" ? "" : "display: none;")
            },
                DownloadReleaseSection()
            )
        )
    )
}

const WhyChooseSection = () => section({ id: "features" },
    div({ class: "container" },
        h2("Why Choose Rave?"),
        p({ class: "section-subtitle" }, "A modern programming language designed for performance, simplicity, and cross-platform development"),
        div({ class: "features-grid" },
            FeatureCard(i({ class: "bi bi-lightning-charge-fill" }), "Blazing Fast", "Fast compilation times with LLVM-powered optimizations for maximum runtime performance"),
            FeatureCard(i({ class: "bi bi-globe2" }), "Cross-Platform", "Compile for Windows, Linux, macOS, and embedded systems from a single codebase"),
            FeatureCard(i({ class: "bi bi-tools" }), "LLVM Backend", "Industry-standard compiler infrastructure enabling advanced optimizations and multiple targets"),
            FeatureCard(i({ class: "bi bi-cpu-fill" }), "Manual Memory", "Full control over memory allocation with defer statements for safe cleanup"),
            FeatureCard(i({ class: "bi bi-stars" }), "Modern Syntax", "Clean, expressive syntax with type inference, operator overloading, and familiar C-like constructs"),
            FeatureCard(i({ class: "bi bi-unlock-fill" }), "Open Source", "MPL 2.0 licensed - contribute, modify, and use freely for any project")
        )
    )
)

const CodeExample = (id, codeContent, selectedExample) => div({
    id: id,
    class: van.derive(() => {
        const idWithoutExample = id.replace('-example', '')
        return selectedExample.val === idWithoutExample ? "code-example active" : "code-example"
    })
},
    pre({ class: "code-block" },
        code({ innerHTML: codeContent })
    )
)

const ExampleSection = () => {
    const selectedExample = van.state("hello")
    
    const examples = {
        hello: `<span class="code-keyword">import</span> <span class="code-operator">&lt;</span>std/io<span class="code-operator">&gt;</span>

<span class="code-type">void</span> main => std::println(<span class="code-string">"Hello, world!"</span>);`,
        http: `<span class="code-keyword">import</span> <span class="code-operator">&lt;</span>std/io<span class="code-operator">&gt;</span> <span class="code-operator">&lt;</span>std/http<span class="code-operator">&gt;</span>

<span class="code-type">void</span> main {
    std::http::Server server = std::http::Server();
    int openStatus = server.open(<span class="code-string">"127.0.0.1"</span>, <span class="code-number">80</span>);

    <span class="code-keyword">while</span> (<span class="code-keyword">true</span>) {
        std::http::Connection conn = server.accept();
        <span class="code-keyword">defer</span> ~conn;

        std::http::Request req = conn.readRequest();
        <span class="code-keyword">if</span> (req.url == <span class="code-string">"/"</span>) {
            std::http::Response res = std::http::Response();
            res.status = <span class="code-number">200</span>;
            res.body = <span class="code-string">"Hello from Rave!"</span>;
            conn.sendResponse(res);
        }
    }
}`,
        thread: `<span class="code-keyword">import</span> <span class="code-operator">&lt;</span>std/io<span class="code-operator">&gt;</span> <span class="code-operator">&lt;</span>std/thread<span class="code-operator">&gt;</span>

<span class="code-type">void</span> main {
    std::thread thr = std::thread();
    thr.run(<span class="code-type">int</span>(<span class="code-type">char*</span> arg) {
        std::println(<span class="code-string">"Hello from thread!"</span>);
    }, <span class="code-keyword">null</span>);
    thr.join();
}`,
        simd: `<span class="code-keyword">import</span> <span class="code-operator">&lt;</span>std/io<span class="code-operator">&gt;</span>

<span class="code-type">void</span> main {
    <span class="code-type">float4</span> a;
    <span class="code-type">float</span>[] b = [<span class="code-number">2f</span>, <span class="code-number">4f</span>, <span class="code-number">8f</span>, <span class="code-number">16f</span>];

    a = <span class="code-keyword">@vLoad</span>(<span class="code-type">float4</span>, &b);

    <span class="code-comment">// Multiply all elements</span>
    a = a * a;

    <span class="code-comment">// Output: [4, 16, 64, 256]</span>
    std::println(a[<span class="code-number">0</span>], a[<span class="code-number">1</span>], a[<span class="code-number">2</span>], a[<span class="code-number">3</span>]);
}`,
        defer: `<span class="code-keyword">import</span> <span class="code-operator">&lt;</span>std/io<span class="code-operator">&gt;</span>

<span class="code-type">void</span> main {
    std::file foo = std::file(<span class="code-string">"test.txt"</span>);
    <span class="code-keyword">defer</span> ~foo;  <span class="code-comment">// Automatic cleanup</span>

    foo.open(<span class="code-string">"w"</span>);
    std::fprintln(&foo, <span class="code-string">"Rave"</span>);
    foo.close();

    <span class="code-type">char</span>[<span class="code-number">4</span>] buffer;

    foo.open(<span class="code-string">"r"</span>);
    foo.read(&buffer, <span class="code-number">4</span>);
    foo.close();

    std::println(buffer[<span class="code-number">0</span>], buffer[<span class="code-number">1</span>]);
}`
    }
    
    const exampleNames = {
        hello: "Hello World",
        http: "HTTP Server",
        thread: "Multithreading",
        simd: "SIMD Operations",
        defer: "File I/O"
    }
    
    return section({ id: "example", class: "code-section" },
        div({ class: "container" },
            h2("Getting Started"),
            p({ class: "section-subtitle" }, "Explore Rave's syntax with these practical examples"),
            div({ class: "example-tabs" },
                ...Object.keys(examples).map(key =>
                    button({
                        class: van.derive(() => selectedExample.val === key ? "tab-btn active" : "tab-btn"),
                        onclick: () => selectedExample.val = key
                    }, exampleNames[key])
                )
            ),
            div({ class: "code-container" },
                ...Object.keys(examples).map(key =>
                    CodeExample(`${key}-example`, examples[key], selectedExample)
                )
            )
        )
    )
}

const BenchmarkBar = (label, value, minTime, maxTime, colorClass, isWinner) => {
    const range = maxTime - minTime
    const percentage = range > 0 ? 15 + ((value - minTime) / range) * 85 : 50
    
    return div({ class: "benchmark-item" },
        div({ class: "benchmark-label" },
            span(
                label,
                isWinner ? span({ class: "benchmark-winner" }, " ⚡") : ""
            ),
            span(`${value}s`)
        ),
        div({ class: "progress-bar" },
            div({
                class: `progress-fill ${colorClass}`,
                "data-width": percentage,
                style: "width: 0%"
            })
        )
    )
}

const BenchmarkCard = (name, badgeText, raveTime, gccTime, clangTime) => {
    const maxTime = Math.max(raveTime, gccTime, clangTime)
    const minTime = Math.min(raveTime, gccTime, clangTime)
    
    return div({ class: "benchmark-card" },
        div({ class: "benchmark-header" },
            h3({ class: "benchmark-name" }, name),
            span({ class: "benchmark-badge" }, badgeText)
        ),
        div({ class: "benchmark-bars" },
            BenchmarkBar("Rave", raveTime, minTime, maxTime, "progress-rave", raveTime === minTime),
            BenchmarkBar("GCC", gccTime, minTime, maxTime, "progress-gcc", gccTime === minTime),
            BenchmarkBar("Clang", clangTime, minTime, maxTime, "progress-clang", clangTime === minTime)
        )
    )
}

const BenchmarksSection = () => section({ id: "benchmarks" },
    div({ class: "container" },
        h2("Performance Benchmarks"),
        p({ class: "section-subtitle" }, "Rave competes with C compilers - powered by LLVM optimizations"),
        div({ class: "features-grid" },
            BenchmarkCard("N-Queen", "Algorithm", 2.78, 2.97, 2.74),
            BenchmarkCard("Dirichlet", "Mathematics", 1.10, 1.28, 1.19),
            BenchmarkCard("Mandelbrot", "Graphics", 9.04, 9.27, 8.53)
        ),
        p({ class: "section-subtitle", style: "margin-top: 40px; font-size: 14px;" },
            "Tested on Fedora 43, i5-12400f, 32GB DDR4 3200MHz | LLVM 18, GCC 14"
        )
    )
)

const StatsSection = () => section({ id: "stats" },
    div({ class: "container" },
        h2("Project Stats"),
        div({ class: "stats-grid" },
            div({ class: "stat-card" },
                div({ class: "stat-number" }, "100%"),
                p({ class: "stat-label" }, "Open Source")
            ),
            div({ class: "stat-card" },
                div({ class: "stat-number" }, "LLVM"),
                p({ class: "stat-label" }, "Backend")
            ),
            div({ class: "stat-card" },
                div({ class: "stat-number" }, "4+"),
                p({ class: "stat-label" }, "Target Platforms")
            ),
            div({ class: "stat-card" },
                div({ class: "stat-number" }, "MPL 2.0"),
                p({ class: "stat-label" }, "License")
            )
        )
    )
)

const FeaturesListSection = () => section({ id: "features-list" },
    div({ class: "container" },
        h2("Language Features"),
        div({ class: "features-list" },
            div({ class: "feature-item" },
                div({ class: "check" }, i({ class: "bi bi-check-lg" })),
                p("Static typing with type inference")
            ),
            div({ class: "feature-item" },
                div({ class: "check" }, i({ class: "bi bi-check-lg" })),
                p("Operator overloading")
            ),
            div({ class: "feature-item" },
                div({ class: "check" }, i({ class: "bi bi-check-lg" })),
                p("SIMD Vector operations")
            ),
            div({ class: "feature-item" },
                div({ class: "check" }, i({ class: "bi bi-check-lg" })),
                p("Built-in JSON parsing")
            ),
            div({ class: "feature-item" },
                div({ class: "check" }, i({ class: "bi bi-check-lg" })),
                p("HTTP client/server support")
            ),
            div({ class: "feature-item" },
                div({ class: "check" }, i({ class: "bi bi-check-lg" })),
                p("Multithreading support")
            ),
            div({ class: "feature-item" },
                div({ class: "check" }, i({ class: "bi bi-check-lg" })),
                p("Cross-compilation")
            ),
            div({ class: "feature-item" },
                div({ class: "check" }, i({ class: "bi bi-check-lg" })),
                p("defer statement for cleanup")
            )
        )
    )
)

const Footer = () => footer({ class: "footer" },
    div({ class: "container" },
        div({ class: "footer-links" },
            a({ href: "https://github.com/Ttimofeyka/Rave", target: "_blank" }, "GitHub"),
            a({ href: "https://github.com/Ttimofeyka/Rave/releases", target: "_blank" }, "Releases"),
            a({ href: "https://github.com/Ttimofeyka/Rave/tree/main/specifications", target: "_blank" }, "Documentation"),
            a({ href: "https://discord.gg/AfEtyArvsM", target: "_blank" }, "Discord"),
            a({ href: "https://ravelang.xyz", target: "_blank" }, "Website")
        ),
        p({ class: "footer-copy" },
            "Released under ",
            a({ href: "http://mozilla.org/MPL/2.0/", target: "_blank", style: "text-decoration: underline;" }, "Mozilla Public License 2.0")
        )
    )
)

const App = () => div(
    Navigation(),
    Hero(),
    InstallationSection(),
    WhyChooseSection(),
    ExampleSection(),
    BenchmarksSection(),
    StatsSection(),
    FeaturesListSection(),
    Footer()
)

van.add(document.body, App())

setTimeout(() => {
    window.scrollTo(0, 0)
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if(entry.isIntersecting) {
                entry.target.classList.add('visible')
                
                const progressBars = entry.target.querySelectorAll('.progress-fill')
                progressBars.forEach((bar, index) => {
                    setTimeout(() => {
                        const targetWidth = bar.getAttribute('data-width')
                        if (targetWidth) {
                            bar.style.width = `${targetWidth}%`
                        }
                    }, index * 100)
                })
            }
        })
    }, { threshold: 0.15 })
    
    document.querySelectorAll('section').forEach(section => { observer.observe(section) })
    
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault()
            const target = document.querySelector(this.getAttribute('href'))
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' })
            }
            
            const navMenu = document.querySelector('.nav-menu')
            if (navMenu && navMenu.classList.contains('open')) {
                navMenu.classList.remove('open')
            }
        })
    })
}, 0)