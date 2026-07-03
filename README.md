# Deploy this site to GitHub Pages

This repository contains a static site (index.html, script.js, style.css).

Quick steps to publish:

1. Create a GitHub repo and add this project, or push to an existing repo.

2. Push the `main` branch to GitHub (the workflow runs on pushes to `main`):

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin git@github.com:USERNAME/REPO.git  # or use HTTPS
git push -u origin main
```

3. After the push, GitHub Actions will run and the site will be deployed to the `gh-pages` branch.

4. If the site doesn't appear automatically, open your repository Settings → Pages and set the Source to the `gh-pages` branch (root).

Notes:
- The workflow uses `peaceiris/actions-gh-pages` and the built-in `GITHUB_TOKEN` to publish files.
- No build step is required for plain static files.
