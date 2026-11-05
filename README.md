# Tastes of Africa

A multi-page website celebrating the culinary heritage of the African continent, built with semantic HTML5, modular SCSS, and vanilla JavaScript.

## Overview

**Tastes of Africa** covers West, North, East, Central, and Southern African cuisines with:

- **10 pages**: 5 main pages + 5 individual recipe pages
- **Interactive features**: Recipe filtering, favorites, ingredient scaling, dark/light mode, form validation, mobile navigation
- **Pan-African design**: Red, gold, green, and black palette with kente-inspired accents
- **Responsive design**: Layouts for phone, tablet, and desktop widths
- **Accessibility**: Semantic landmarks, labelled forms, and keyboard-reachable controls

## Quick Start

### Prerequisites

- Node.js (v14 or higher)
- npm (comes with Node.js)

### Installation

```bash
# Clone the repository
git clone https://github.com/benjaminketteytagoe-alu/taste_of_africa_website_project.git
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
```

Open the site at `http://localhost:8000`. YouTube embeds show "Error 153" when a page is opened directly from disk (`file://`), and one video reports as unavailable on `127.0.0.1`, which is the default address for VS Code Live Server.

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
│   ├── animations/
│   │   └── _keyframes.scss
│   └── themes/
│       └── _dark.scss
├── css/
│   ├── styles.css              
│   └── styles.css.map          
├── js/
│   └── script.js               
├── assets/                     # Dish photos and logo
├── package.json                
└── README.md                   
```

### Typography

- **Display**: Syne (bold, expressive, culturally resonant)
- **Body**: Plus Jakarta Sans (crisp, highly legible)
- **Accent**: Playfair Display (editorial accents for quotes)

### Responsive Breakpoints

- **Mobile** (up to 480px): Single-column grids
- **Tablet** (481px to 768px): Two-column grids
- **Below 1024px**: Hamburger menu and slide-in drawer
- **Desktop** (1024px and wider): Full navigation and multi-column grids

## Features

### Interactive Recipe Filtering

Filter recipes by region on `recipes.html`:

- **Filter options**: All, West Africa, North Africa, East Africa, Southern Africa, Central Africa
- **Method**: A loop adds or removes a `.hidden` class using each card's `data-region` attribute
- **Active state**: Gold background on the active filter button

### Favorites with LocalStorage

Save recipes across browser sessions:

- **Heart button**: Toggles a recipe on any card or recipe page
- **Persistence**: Stored in `localStorage` under the key `tastes_of_africa_favorites`
- **Live counter**: The header badge shows the total
- **Pulse animation**: The heart scales and rotates on click

### Ingredient Scaling

Each recipe page has a servings control (1 to 24):

- **Quantities**: Each amount is stored in a `data-qty` attribute and rounded to the nearest eighth
- **Whole items**: Eggs, cans, and similar items stay as whole numbers
- **Units**: Words change with the amount, such as "1 cup" and "2 cups"

### Dark/Light Mode

A toggle in the header switches the theme on every page:

- **Persistence**: Stored in `localStorage` under the key `tastes_of_africa_theme`
- **Default**: Follows the device setting until a choice is saved
- **No flash**: A small script in `<head>` applies the theme before the page is drawn

### Contact Form Validation

Client-side validation on `contact.html`:

- **Required fields**: Name, email, country, subject, and message
- **Message**: Must be more than 20 characters, with a live character counter
- **Errors**: A message appears under each invalid field
- **Confirmation**: The form is replaced by a thank-you message using the visitor's name

### Mobile Navigation

Hamburger menu below 1024px:

- **Slide-in drawer**: Opens from the right
- **Closing**: Hamburger button, backdrop, Escape key, or any drawer link
- **ARIA**: `aria-expanded` reflects the drawer state

### Newsletter Signup

Footer form with email validation and a confirmation message that fades after 5 seconds.

### Image Slideshows

The home hero and About gallery change every 4 seconds and pause on hover.

## Pages

### Home Page (`index.html`)

- Hero section with background slideshow, calls to action, and embedded YouTube video
- African cuisine gallery
- Signature dishes (5 cards) and explore-by-region cards (4 cards)
- Latest food trends articles
- Key ingredients and cultural influences highlighted with `<mark>`

### Recipes Catalog (`recipes.html`)

- Regional filter bar
- 5 recipe cards with photo, time and difficulty badges, favorite button, and recipe link

### Recipe Pages (`recipes/*.html`)

- Breadcrumb navigation
- Cultural history
- Expandable cooking steps (`<details>` and `<summary>`)
- Ingredients with servings control, plus equipment list
- Nutritional facts table
- Embedded YouTube video
- Map of the country of origin

### Culinary Regions (`regions.html`)

- 4 culinary regions on one page: West Africa, North Africa & The Maghreb, East Africa & The Horn, Southern & Central Africa
- Key ingredients highlighted with `<mark>`
- Links to recipes and an embedded YouTube video for each region

### About Us (`about.html`)

- Mission statement and history timeline
- Google Map of Jemaa el-Fnaa, Marrakech
- Image gallery and African food videos

### Contact (`contact.html`)

- Labelled contact form with validation
- Country suggestions using `<datalist>`
- Live character counter and personalized confirmation

## Accessibility

- **Semantic HTML5**: Landmark elements and an ordered heading structure
- **Form labels**: Every form control has an associated `<label>`
- **Keyboard support**: Visible focus styles, and Escape closes the mobile drawer
- **ARIA**: `aria-invalid` on form errors and `aria-pressed` on toggle buttons
- **Iframe titles**: YouTube and Google Maps iframes have descriptive `title` attributes

Pages were checked with axe-core in Chrome in both themes. Automated tools catch only some accessibility issues, so this is not a claim of full WCAG conformance.

## Known Limitations

- Forms run in the browser only, so no messages or signups are sent or stored
- Only the Jollof Rice page has a video of its own recipe; the other recipe pages show related dishes, labelled as such
- Social, Privacy Policy, and Terms of Service links are placeholders
- Nutritional values and cooking times are estimates
- `npm run build:css` prints Sass deprecation warnings for `@import`

## Technologies

- **HTML5**: Semantic markup
- **SCSS (Sass)**: Variables, mixins, functions, and nesting, organized into partials
- **JavaScript (ES6+)**: Vanilla JS with DOM manipulation and the LocalStorage API
- **Google Fonts**: Syne, Plus Jakarta Sans, Playfair Display
- **Sass compiler**: npm-based build
