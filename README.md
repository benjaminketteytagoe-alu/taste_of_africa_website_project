# Tastes of Africa

A complete, production-grade, multi-page website celebrating the rich culinary heritage of the African continent. Built with semantic HTML5, modular SCSS (7-1 Architecture), and vanilla JavaScript.

## Overview

**Tastes of Africa** covers West, North, East, Central, and Southern African cuisines with:

- **10 pages**: 5 main pages + 5 individual recipe detail pages
- **Interactive features**: Recipe filtering, favorites with LocalStorage, form validation, mobile navigation
- **Pan-African design**: Red, Gold, Green, Black color palette with authentic African geometric motifs
- **Responsive design**: Mobile → Tablet → Desktop → Wide breakpoints
- **Accessibility**: WCAG 2.1 AA compliance with semantic HTML5 landmarks

## Quick Start

### Prerequisites

- Node.js (v14 or higher)
- npm (comes with Node.js)

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd taste_of_africa_website_project

# Install dependencies
npm install
```

### Compiling SCSS

```bash
# One-time build (compressed output with source map)
npm run build:css

# Watch mode (auto-recompile on changes)
npm run watch:css
```

The compiled CSS output is `css/styles.css`, linked in all HTML pages.

### Running the Site

Open `index.html` in your browser:

```bash
# Using Python
python3 -m http.server 8000

# Using Node.js
npx serve .

# Or simply open the file directly
open index.html
```

## Project Structure

```
taste_of_africa_website_project/
├── index.html                  
├── recipes.html                
├── regions.html                
├── about.html                  
├── contact.html                
├── recipes/                    
│   ├── jollof-rice.html        
│   ├── tagine.html             
│   ├── injera.html             
│   ├── bunny-chow.html         
│   └── isombe.html             
├── scss/                       
│   ├── main.scss               
│   ├── abstracts/
│   │   ├── _variables.scss     
│   │   ├── _functions.scss     
│   │   └── _mixins.scss        
│   ├── base/
│   │   ├── _reset.scss         
│   │   └── _typography.scss    
│   ├── components/
│   │   ├── _buttons.scss       
│   │   ├── _cards.scss         
│   │   ├── _forms.scss         
│   │   ├── _tables.scss        
│   │   ├── _badges.scss        
│   │   └── _details.scss       
│   ├── layout/
│   │   ├── _header.scss        
│   │   ├── _navigation.scss    
│   │   ├── _hero.scss          
│   │   ├── _grid.scss          
│   │   └── _footer.scss        
│   ├── pages/
│   │   ├── _home.scss          
│   │   ├── _recipes.scss       
│   │   ├── _regions.scss       
│   │   ├── _about.scss         
│   │   └── _contact.scss       
│   └── animations/
│       └── _keyframes.scss     
├── css/
│   ├── styles.css              
│   └── styles.css.map          
├── js/
│   └── script.js               
├── assets/
│   └── placeholders/           
├── package.json                
└── README.md                   
```

### Typography

- **Display**: Syne (bold, expressive, culturally resonant)
- **Body**: Plus Jakarta Sans (crisp, highly legible)
- **Accent**: Playfair Display (editorial accents for quotes)

### Responsive Breakpoints

- **Mobile**: 480px (single column, stacked navigation)
- **Tablet**: 768px (2-column grids, optimized spacing)
- **Desktop**: 1024px (3-to-4 column recipe grids, sticky navigation)
- **Wide**: 1280px (balanced layout, maximum content width)

## Features

### Feature A: Interactive Recipe Filtering

Filter recipes by region on the `recipes.html` page:

- **Filter options**: All, West Africa, North Africa, East Africa, Southern Africa, Central Africa
- **Animated transitions**: Smooth fade/scale animations when filtering
- **Active state**: Gold background on the active filter button

### Feature B: Favorites with LocalStorage

Persist favorite recipes across browser sessions:

- **Heart button**: Click to toggle favorites on any recipe card
- **Persistence**: Stored in `localStorage` under key `tastes_of_africa_favorites`
- **Live counter**: Header badge shows total favorites count
- **Pulse animation**: Heart scales and rotates on click

### Feature C: Contact Form Validation

Full client-side validation on `contact.html`:

- **Name**: Required, non-empty
- **Email**: Required, valid email format
- **Country**: Required, with African countries datalist
- **Subject**: Required, select from dropdown
- **Message**: Required, minimum 21 characters
- **Live character counter**: Shows current count vs minimum
- **Error states**: Red borders and `aria-invalid` attributes
- **Confirmation**: Personalized thank-you message with user's name

### Feature D: Mobile Navigation

Responsive hamburger menu for mobile devices:

- **Slide-in drawer**: Smooth animation from the right
- **ARIA attributes**: `aria-expanded` toggled for accessibility
- **Auto-close**: Drawer closes when a link is clicked

### Feature E: Newsletter Subscription

Footer newsletter form with email validation:

- **Email validation**: Regex-based format checking
- **Success tooltip**: "Welcome to our culinary community!"
- **Auto-dismiss**: Message fades after 5 seconds

## Pages

### Home Page (`index.html`)

- Hero section with CTA buttons and embedded YouTube video
- Featured dishes grid (4 signature dishes)
- Explore by culinary region section (3 preview cards)
- Latest food trends articles with `<mark>` highlights
- Footer with newsletter signup

### Recipes Catalog (`recipes.html`)

- Interactive regional filter bar
- Recipe grid with 5+ cards
- Each card includes: SVG placeholder, time/difficulty badges, favorite button, detail link

### Recipe Detail Pages (`recipes/*.html`)

- Breadcrumb navigation
- Cultural history and significance
- Expandable cooking steps (`<details>/<summary>`)
- Ingredients and equipment lists
- Nutritional facts table
- Embedded tutorial video
- Country of origin map (Google Maps iframe)

### Regions Showcase (`regions.html`)

- 4 in-depth culinary zones: West Africa, North Africa/Maghreb, East Africa & Horn, Southern & Central Africa
- Cultural history and climate influence narratives
- Key spices highlighted with `<mark>` tags
- Embedded educational YouTube videos

### About Us (`about.html`)

- Mission statement
- Historical timeline narrative
- Interactive Google Maps iframe (Makola Market or Jemaa el-Fnaa)

### Contact (`contact.html`)

- Accessible contact form with full validation
- Country datalist with African nations
- Live character counter
- Personalized confirmation message

## Accessibility

- **WCAG 2.1 AA** compliance
- **Contrast ratios**: All text exceeds 4.5:1 against backgrounds
- **Semantic HTML5**: Proper landmark tags (`<header>`, `<nav>`, `<main>`, `<article>`, `<section>`, `<footer>`)
- **Form labels**: All form controls have associated `<label>` elements
- **ARIA attributes**: `aria-label` on all interactive elements, `aria-invalid` on form errors
- **Iframe titles**: All YouTube and Google Maps iframes have descriptive `title` attributes


## Technologies

- **HTML5**: Semantic markup with proper landmark tags
- **SCSS (Sass)**: 7-1 architecture pattern with variables, mixins, functions, nesting
- **JavaScript (ES6+)**: Vanilla JS with DOM manipulation and LocalStorage API
- **Google Fonts**: Syne, Plus Jakarta Sans, Playfair Display
- **Sass Compiler**: npm-based build system

