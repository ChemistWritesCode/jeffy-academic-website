# Deploying to GitHub Pages

This guide will help you deploy your Hugo-based academic website to GitHub Pages.

## Setup GitHub Repository

1. Create a new GitHub repository named `username.github.io` where `username` is your GitHub username.

2. If you haven't already, initialize your local project as a Git repository:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   ```

3. Add your GitHub repository as a remote:
   ```bash
   git remote add origin https://github.com/username/username.github.io.git
   ```

## Option 1: Deploy Using GitHub Actions (Recommended)

This method automatically builds and deploys your site whenever you push changes to your repository.

1. Create a `.github/workflows` directory in your project:
   ```bash
   mkdir -p .github/workflows
   ```

2. Create a file named `hugo.yml` inside the workflows directory with the following content:
   ```yaml
   name: Deploy Hugo site to GitHub Pages

   on:
     push:
       branches:
         - main  # Set a branch to deploy from (usually main or master)

   jobs:
     deploy:
       runs-on: ubuntu-22.04
       steps:
         - uses: actions/checkout@v3
           with:
             submodules: true  # Fetch Hugo themes
             fetch-depth: 0    # Fetch all history for .GitInfo and .Lastmod

         - name: Setup Hugo
           uses: peaceiris/actions-hugo@v2
           with:
             hugo-version: 'latest'
             extended: true

         - name: Build
           run: hugo --minify

         - name: Deploy
           uses: peaceiris/actions-gh-pages@v3
           with:
             github_token: ${{ secrets.GITHUB_TOKEN }}
             publish_dir: ./public
   ```

3. Push your code to GitHub:
   ```bash
   git add .
   git commit -m "Add GitHub Actions workflow"
   git push -u origin main
   ```

4. Configure GitHub Pages:
   - Go to your repository on GitHub
   - Navigate to Settings > Pages
   - In the "Source" section, select "GitHub Actions" 

5. Wait for the GitHub Action to complete. Your site will be available at `https://username.github.io/`

## Option 2: Manual Deployment

If you prefer to build the site locally and push the generated files:

1. Make sure your `config.toml` has the correct `baseURL` (e.g., `baseURL = "https://username.github.io/"`).

2. Build your site:
   ```bash
   hugo
   ```

3. Create a branch named `gh-pages`:
   ```bash
   git checkout -b gh-pages
   ```

4. Move the contents of the `public` directory to the root:
   ```bash
   cp -r public/* .
   rm -rf public
   ```

5. Add, commit, and push the changes:
   ```bash
   git add .
   git commit -m "Deploy to GitHub Pages"
   git push -u origin gh-pages
   ```

6. Configure GitHub Pages:
   - Go to your repository on GitHub
   - Navigate to Settings > Pages
   - In the "Source" section, select "Deploy from a branch"
   - Select "gh-pages" branch and "/(root)" folder
   - Click "Save"

7. Your site will be available at `https://username.github.io/`

## Updating Your Site

### Using GitHub Actions

1. Make changes to your website locally
2. Commit and push to your main branch:
   ```bash
   git add .
   git commit -m "Update website content"
   git push
   ```
3. GitHub Actions will automatically build and deploy your site

### Manual Deployment

1. Make changes to your website locally
2. Build the updated site:
   ```bash
   hugo
   ```
3. Switch to the gh-pages branch:
   ```bash
   git checkout gh-pages
   ```
4. Update the content:
   ```bash
   cp -r public/* .
   rm -rf public
   ```
5. Commit and push the changes:
   ```bash
   git add .
   git commit -m "Update website content"
   git push
   ```

## Custom Domain (Optional)

If you want to use a custom domain for your GitHub Pages site:

1. Register a domain with a domain registrar

2. Add a file named `CNAME` in the `static` directory of your Hugo project with your domain name:
   ```
   yourdomain.com
   ```

3. Configure your DNS settings at your domain registrar:
   - For an apex domain (yourdomain.com), add A records pointing to GitHub's IP addresses:
     ```
     185.199.108.153
     185.199.109.153
     185.199.110.153
     185.199.111.153
     ```
   - For a subdomain (www.yourdomain.com), add a CNAME record pointing to `username.github.io`

4. In your GitHub repository, go to Settings > Pages and enter your custom domain in the "Custom domain" section.

5. Check "Enforce HTTPS" for secure access to your site.

After DNS propagation (which can take up to 48 hours), your site will be available at your custom domain.