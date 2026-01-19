import van from "./van-1.6.0.min.js"

const { 
    nav, div, a, section, img, h1, h2, h3, p, 
    button, pre, code, select, option, svg, path 
} = van.tags

// Navigation Component
const Navigation = () => nav(
    div({ class: "container" },
        a({ href: "https://github.com/Ttimofeyka/Rave", target: "_blank" }, "GitHub"),
        a({ href: "https://github.com/Ttimofeyka/Rave/tree/main/specifications", target: "_blank" }, "Documentation"),
        a({ href: "https://discord.gg/rJDKMuZ2T8", target: "_blank" }, "Community")
    )
)

// Hero Component
const Hero = () => section({ class: "hero" },
    img({ 
        src: "./images/ravelogo.png", 
        alt: "Rave Logo", 
        class: "logo" 
    }),
    div({ class: "container" },
        h1("Rave Programming Language"),
        p({ class: "additional-info" }, "High-performance multipurpose programming language combining power with simplicity"),
        a({ 
            href: "https://github.com/Ttimofeyka/Rave", 
            class: "btn", 
            target: "_blank" 
        },
            svg({ 
                xmlns: "http://www.w3.org/2000/svg", 
                width: "20", 
                height: "20", 
                viewBox: "0 0 24 24", 
                fill: "none", 
                stroke: "currentColor", 
                "stroke-width": "2", 
                "stroke-linecap": "round", 
                "stroke-linejoin": "round",
                class: "feather feather-github"
            }, path({ d: "M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" })),
            "View on GitHub"
        )
    )
)

// Feature Card Component
const FeatureCard = (emoji, title, description) => div({ class: "feature-card" },
    h3(emoji, " ", title),
    p(description)
)

// Features Section Component
const FeaturesSection = (title, features) => section({ id: "features" },
    div({ class: "container" },
        h2(title),
        div({ class: "features-grid" },
            ...features.map(f => FeatureCard(f.emoji, f.title, f.description))
        )
    )
)

// Why Choose Rave Section
const WhyChooseSection = () => FeaturesSection("Why Choose Rave?", [
    { emoji: "🚀", title: "High Efficiency", description: "Fast compilation combined with fast inference of output programs" },
    { emoji: "🔧", title: "Cross-Platform", description: "Target Windows, Linux, macOS, and embedded systems with single codebase" },
    { emoji: "⚙️", title: "LLVM Backend", description: "Advanced optimizations powered by LLVM for maximum performance" }
])

// Code Example Component
const CodeExample = (id, codeContent, selectedExample) => div({ 
    id: id, 
    class: van.derive(() => {
        const idWithoutExample = id.replace('-example', '')
        return selectedExample.val === idWithoutExample ? "code-example active" : "code-example"
    })
},
    pre({ class: "code-block" },
        code({ 
            innerHTML: codeContent 
        })
    )
)

// Example Section Component
const ExampleSection = () => {
    const selectedExample = van.state("hello")

    const examples = {
        hello: `<a style="color: #ff5931;">import</a> &lt;std/io>
<a style="color: #6e6eff;">void</a> main => std::println(<a style="color: #d37e26;">"Hello, world!"</a>);`,
        io: `<a style="color: #ff5931;">import</a> &lt;std/io>

<a style="color: #6e6eff;">void</a> main {
    std::file foo = std::file(<a style="color: #d37e26;">"test.txt"</a>);
    <a style="color: #ff5931;">defer</a> ~foo;

    foo.open(<a style="color: #d37e26;">"w"</a>);
        std::fprintln(&foo, <a style="color: #d37e26;">"Rave"</a>);
    foo.close();

    <a style="color: #6e6eff;">char</a>[4] buffer;

    foo.open(<a style="color: #d37e26;">"r"</a>);
        foo.read(&buffer, 4);
    foo.close();

    std::println(buffer[0], buffer[1], buffer[2], buffer[3]);
}`,
        array: `<a style="color: #ff5931;">import</a> &lt;std/io> &lt;std/json>

<a style="color: #6e6eff;">void</a> main {
    <a style="color: #6e6eff;">auto</a> json = std::json::parse(<a style="color: #d37e26;">"{\\\"name\\\": \\\"Alex\\\"}"</a>);
    <a style="color: #ff5931;">defer</a> ~json;

    std::println(json.get(<a style="color: #d37e26;">"name"</a>).as<<a style="color: #6e6eff;">char*</a>>());
}`
    }

    return section({ id: "example" },
        div({ class: "container" },
            h2("Getting Started"),
            div({ class: "additional-info" },
                p("Select an example:"),
                select({ 
                    id: "example-select", 
                    class: "example-select",
                    oninput: (e) => selectedExample.val = e.target.value
                },
                    option({ value: "hello" }, "Hello, world!"),
                    option({ value: "io" }, "Working with files"),
                    option({ value: "array" }, "JSON")
                ),
                div({ id: "example-code-container" },
                    CodeExample("hello-example", examples.hello, selectedExample),
                    CodeExample("io-example", examples.io, selectedExample),
                    CodeExample("array-example", examples.array, selectedExample)
                )
            )
        )
    )
}

// Key Features Section
const KeyFeaturesSection = () => section({ id: "features" },
    div({ class: "container" },
        h2("Key Features"),
        div({ class: "additional-info" },
            div({ class: "features-grid" },
                FeatureCard("🔧", "Manual Memory Management", "Full control over memory management allows to optimize your tasks the way you can"),
                FeatureCard("🧩", "Modern Syntax", "Modern operator overloading and type inference with C-like familiarity"),
                FeatureCard("🎯", "Simplicity", "Minimal language complexity with focus on explicit yet comfortable control"),
                FeatureCard("🤝", "Open Source", "You can contribute to Rave, whether through sponsorship or development assistance")
            )
        )
    )
)

// License Footer Component
const LicenseFooter = () => div({ class: "license" },
    div({ class: "container" },
        "Released under ", a({ href: "http://mozilla.org/MPL/2.0/", target: "_blank" }, "Mozilla Public License 2.0")
    )
)

// Main App Component
const App = () => div(
    Navigation(),
    Hero(),
    WhyChooseSection(),
    ExampleSection(),
    KeyFeaturesSection(),
    LicenseFooter()
)

// Mount the app
van.add(document.body, App())

// Side Effects
setTimeout(() => {
    // Prevent browser from restoring scroll position
    if('scrollRestoration' in history) history.scrollRestoration = 'manual'

    // Immediately set scroll to top when page loads
    window.scrollTo(0, 0)

    // Enhanced intersection observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if(entry.isIntersecting) {
                entry.target.classList.add('visible')
            }
        })
    }, { threshold: 0.15 })

    document.querySelectorAll('section').forEach(section => { observer.observe(section) })

    // Smooth scroll with offset
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault()
            const target = document.querySelector(this.getAttribute('href'))
            const offset = 80
            const position = target.getBoundingClientRect().top + window.pageYOffset - offset

            window.scrollTo({
                top: position,
                behavior: 'smooth'
            })
        })
    })
}, 0)
