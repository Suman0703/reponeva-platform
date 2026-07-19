const columns = [
  { title: "Product", links: ["Explore", "AI Search", "Categories", "Pricing"] },
  { title: "Company", links: ["About", "Blog", "Careers", "Contact"] },
  { title: "Resources", links: ["Docs", "API", "Community", "Support"] },
];

export default function Footer() {
  return (
    <footer className="border-t border-border-c bg-bg py-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-10">
          <div>
            <span className="font-display font-bold text-lg text-text">
              RepoNeva
            </span>
            <p className="text-muted text-sm mt-3 max-w-xs">
              Discover. Contribute. Grow.
            </p>
          </div>

          {columns.map(function (col) {
            return (
              <div key={col.title}>
                <h4 className="text-text text-sm font-medium mb-4">
                  {col.title}
                </h4>
                <ul className="space-y-2">
                  {col.links.map(function (link) {
                    return (
                      <li key={link}>
                        <a
                          href="#"
                          className="text-muted text-sm hover:text-text transition-colors"
                        >
                          {link}
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </div>
            );
          })}
        </div>

        <div className="border-t border-border-c mt-12 pt-6 text-center text-muted text-sm">
          © {new Date().getFullYear()} RepoNeva. All rights reserved.
        </div>
      </div>
    </footer>
  );
}