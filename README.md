<a id="readme-top"></a>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
        <li><a href="#project-structure">Project Structure</a></li>
      </ul>
    </li>
    <li><a href="#features">Features</a></li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>


<!-- ABOUT THE PROJECT -->
## About The Project
Dira is a lightweight e-commerce store paired with a POS dashboard.
It focuses on speed, clarity, and simple workflows.

Use it to:
- Browse and manage products
- View product variants and stock
- Add items to cart
- Process orders through a POS interface
- Track inventory changes

The goal is a clean system you can extend without friction.


### Built With
[![Vite][Vite-shield]](http://sass-lang.com/)
[![React][React-shiled]](https://reactjs.org/)
[![React Router][React_Router-shiled]](https://reactrouter.com/)
[![Formik][formik-shiled]](https://formik.org/)
[![ESLint][eslint-shiled]](https://eslint.org/)


### Project Structure
`src/`  
├─`assets/` — images and svgs  
├─`components/` — UI components grouped by feature  
├─`context/` — global context and state  
├─`features/` — app features  
├─`hooks/` — custom hooks  
├─`layout/` — component layouts  
├─`library/` — utility / helpers  
├─`pages/` — app pages  
├─`service/` — services for the backend  
├─`styles/` — SASS stylings (variables, utils, reset, theme)  
├─`App.jsx` — root app component  
└─`main.jsx` — entry point  

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Features
- Product listing with variants
- Product details view
- Cart system
- POS checkout flow
- Inventory tracking
- Attribute-based filtering

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- GETTING STARTED -->
## Getting Started
This is an example of how you may give instructions on setting up your project locally.
To get a local copy up and running follow these simple example steps.

### Prerequisites
This is an example of how to list things you need to use the software and how to install them.
* npm
  ```sh
  npm install npm@latest -g
  ```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Installation
_Below is an example of how you can instruct your audience on installing and setting up your app. This template doesn't rely on any external dependencies or services._

1. Get a free API Key at [https://example.com](https://example.com)
2. Clone the repo
   ```sh
   git clone https://github.com/Jose-Victorino/Dira-Ecommerce
   ```
3. Install NPM packages
   ```sh
   npm install
   ```
4. Enter your API in `config.js`
   ```js
   const API_KEY = 'ENTER YOUR API';
   ```
5. Change git remote url to avoid accidental pushes to base project
   ```sh
   git remote set-url origin github_username/repo_name
   git remote -v # confirm the changes
   ```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- ROADMAP -->
## Roadmap
- Pages
  - [x] Home
  - [x] Shop
  - [x] FAQ
  - [x] Contact us
  - [x] Policies
  - [x] Product Details
  - [ ] Auth Pages
  - [x] Cart
  - [ ] Checkout
  - [ ] Order Confirmation
  - [ ] Profile
  - [ ] Orders
- [ ] API Layer
- [ ] Auth Layer

<!-- CONTACT -->
## Contact
Jose Victorino - [Facebook](https://www.facebook.com/JoseVictorinoo) - josevictorino003@gmail.com

Project Link: [https://github.com/Jose-Victorino/Dira-Ecommerce](https://github.com/Jose-Victorino/Dira-Ecommerce)

<p align="right">(<a href="#readme-top">back to top</a>)</p>


<!-- MARKDOWN LINKS & IMAGES -->
[Vite-shield]: https://img.shields.io/badge/Vite-17003d?style=for-the-badge&logo=vite&logoColor=863BFF
[React-shiled]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React_Router-shiled]: https://img.shields.io/badge/React_Router-52050b?style=for-the-badge&logo=reactrouter&logoColor=fff
[formik-shiled]: https://img.shields.io/badge/Formik-e8eaed?style=for-the-badge&logo=formik&logoColor=172B4D
[eslint-shiled]: https://img.shields.io/badge/ESLint-101828?style=for-the-badge&logo=eslint&logoColor=4b32c3