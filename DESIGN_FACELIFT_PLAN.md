# 2026 Design Facelift Plan
## jfranciscosousa.com Website Redesign

---

## Executive Summary

This plan outlines a comprehensive design facelift for your personal website based on 2026 design principles. The redesign will modernize the visual language while maintaining the minimalist philosophy, improving typography, enhancing color systems, and introducing subtle interactions that feel natural and intentional.

**Key Principles:**
- **Intentional Minimalism**: Every design decision has purpose
- **Adaptive Typography**: Bold, expressive type as a hero element
- **Strategic Color**: Moving beyond single-accent to a richer, more expressive palette
- **Organic Spacing**: Softer, more natural rhythm over rigid grids
- **Subtle Depth**: Flat Design 3.0 with gentle elevation and responsiveness

---

## Research Foundation

### 2026 Design Trends Analysis

Based on current industry research, the following principles will guide the redesign:

**1. Modern Minimalism Evolution**
- Move from "empty" to "precise" - every pixel with intention
- Strategic whitespace that feels alive, not empty
- Asymmetric layouts for movement and visual interest
- Breaking away from rigid grid systems

**2. Typography as Hero**
- Large, bold typography as primary visual element
- Experimental spacing (letter-spacing, line-height) for character
- Mix of classic serifs with modern sans-serifs
- Typography-first hierarchy

**3. Color Psychology**
- Neo-mint and pastel tones for tech-forward feel
- Bold saturated accents (neon coral, electric blue, vibrant purple)
- Warm neutrals instead of pure grays
- Monochromatic exploration with single bold hues

**4. Flat Design 3.0**
- Subtle depth through shadow and layering
- No heavy gradients or skeuomorphism
- Clean geometry with soft edges
- Motion and responsiveness built-in

**5. Organic & Natural**
- Rounded corners and soft shapes
- Flowing transitions
- Natural spacing rhythms
- Reduced harsh contrasts

---

## Current State Analysis

### Existing Design System

**Colors:**
- Single accent: `#3275a5` (blue)
- Monochrome neutrals: grays from `#393939` to `#f4f4f4`
- Very limited palette

**Typography:**
- System fonts: Verdana (sans), Georgia (serif)
- Responsive sizing: 14px-20px via clamp
- No typographic hierarchy beyond HTML defaults
- No font weights or special features

**Spacing:**
- Standard Tailwind scale (0-96)
- Max-width constraints: 768px (content), 640px (articles)
- Minimal custom spacing

**Components:**
- Basic navigation with underline active states
- Simple footer with social links
- List-based content displays
- No cards, badges, or interactive elements

**Interactions:**
- Opacity hover (70%)
- Basic dark mode toggle
- Astro page transitions
- Minimal motion

### Strengths to Preserve
- Clean, minimal aesthetic
- Fast performance
- Excellent dark mode implementation
- Good content hierarchy
- Accessible focus states

### Areas for Enhancement
- Color system too limited
- Typography lacks personality
- No visual depth or layering
- Rigid grid layout
- Minimal interactive feedback
- Missing micro-interactions

---

## Design System Redesign

### 1. Color System Overhaul

**New Color Philosophy:**
Move from single-accent minimalism to an expressive yet intentional palette.

#### Primary Palette

**Light Mode:**
```css
/* Primary Brand Colors */
--primary-500: #0EA5E9;        /* Sky blue - main brand */
--primary-600: #0284C7;        /* Darker blue - hover states */
--primary-400: #38BDF8;        /* Lighter blue - subtle accents */

/* Accent Colors */
--accent-coral: #FF6B6B;       /* Coral - CTAs, important highlights */
--accent-mint: #4ECDC4;        /* Neo-mint - secondary actions */
--accent-purple: #9D4EDD;      /* Purple - special elements */

/* Neutral Palette (Warm) */
--neutral-50: #FAFAF9;         /* Softest background */
--neutral-100: #F5F5F4;        /* Background */
--neutral-200: #E7E5E4;        /* Borders, dividers */
--neutral-400: #A8A29E;        /* Muted text */
--neutral-600: #57534E;        /* Secondary text */
--neutral-800: #292524;        /* Primary text */
--neutral-900: #1C1917;        /* Headings */

/* Semantic Colors */
--success: #10B981;
--warning: #F59E0B;
--error: #EF4444;
```

**Dark Mode:**
```css
/* Primary Brand Colors (adjusted for dark) */
--primary-500: #38BDF8;
--primary-600: #0EA5E9;
--primary-400: #7DD3FC;

/* Accent Colors (brighter in dark) */
--accent-coral: #FF8787;
--accent-mint: #6FE7DD;
--accent-purple: #B57EDC;

/* Neutral Palette (Warm Dark) */
--neutral-50: #0C0A09;         /* Deepest background */
--neutral-100: #1C1917;        /* Background */
--neutral-200: #292524;        /* Borders, dividers */
--neutral-400: #78716C;        /* Muted text */
--neutral-600: #A8A29E;        /* Secondary text */
--neutral-800: #E7E5E4;        /* Primary text */
--neutral-900: #FAFAF9;        /* Headings */
```

**Usage Strategy:**
- Primary (sky blue): Links, interactive elements, brand presence
- Coral: CTAs, important highlights, "hire me" messaging
- Mint: Secondary actions, subtle accents, tags
- Purple: Special projects, featured content
- Neutrals: All text and backgrounds with warm undertone

### 2. Typography System

**Font Stack Strategy:**

Replace system fonts with modern, expressive typefaces that work across platforms:

```css
/* Display/Heading Font - Bold, Geometric */
--font-display: 'Inter', 'SF Pro Display', system-ui, sans-serif;
--font-display-weights: 600, 700, 800, 900;

/* Body Font - Readable, Modern */
--font-body: 'Inter', 'SF Pro Text', system-ui, sans-serif;
--font-body-weights: 400, 500, 600;

/* Mono Font - Code blocks */
--font-mono: 'JetBrains Mono', 'Fira Code', 'SF Mono', Consolas, monospace;

/* Optional: Serif for special content */
--font-serif: 'Newsreader', 'Charter', Georgia, serif;
```

**Type Scale (Fluid Typography):**

```css
/* Base */
--text-xs: clamp(0.75rem, 0.7rem + 0.25vw, 0.875rem);      /* 12-14px */
--text-sm: clamp(0.875rem, 0.825rem + 0.25vw, 1rem);       /* 14-16px */
--text-base: clamp(1rem, 0.95rem + 0.25vw, 1.125rem);      /* 16-18px */
--text-lg: clamp(1.125rem, 1.05rem + 0.375vw, 1.25rem);    /* 18-20px */
--text-xl: clamp(1.25rem, 1.15rem + 0.5vw, 1.5rem);        /* 20-24px */

/* Display */
--text-2xl: clamp(1.5rem, 1.3rem + 1vw, 2rem);             /* 24-32px */
--text-3xl: clamp(1.875rem, 1.5rem + 1.5vw, 2.5rem);       /* 30-40px */
--text-4xl: clamp(2.25rem, 1.75rem + 2vw, 3rem);           /* 36-48px */
--text-5xl: clamp(3rem, 2rem + 3vw, 4rem);                 /* 48-64px */
--text-6xl: clamp(3.75rem, 2.5rem + 4vw, 5rem);            /* 60-80px */
```

**Typographic Details:**

```css
/* Letter Spacing */
--tracking-tight: -0.025em;
--tracking-normal: 0em;
--tracking-wide: 0.025em;
--tracking-wider: 0.05em;

/* Line Height */
--leading-tight: 1.25;
--leading-snug: 1.375;
--leading-normal: 1.5;
--leading-relaxed: 1.625;
--leading-loose: 2;

/* Font Weight */
--weight-normal: 400;
--weight-medium: 500;
--weight-semibold: 600;
--weight-bold: 700;
--weight-extrabold: 800;
--weight-black: 900;
```

**Typography Usage:**
- H1: `text-5xl md:text-6xl`, `weight-black`, `tracking-tight`
- H2: `text-3xl md:text-4xl`, `weight-bold`, `tracking-tight`
- H3: `text-2xl md:text-3xl`, `weight-bold`
- Body: `text-base`, `weight-normal`, `leading-relaxed`
- Small: `text-sm`, `weight-medium`

### 3. Spacing System

**Fluid Spacing Scale:**

```css
/* Micro Spacing */
--space-1: clamp(0.25rem, 0.23rem + 0.1vw, 0.3rem);        /* 4-5px */
--space-2: clamp(0.5rem, 0.46rem + 0.2vw, 0.625rem);       /* 8-10px */
--space-3: clamp(0.75rem, 0.69rem + 0.3vw, 0.938rem);      /* 12-15px */
--space-4: clamp(1rem, 0.92rem + 0.4vw, 1.25rem);          /* 16-20px */

/* Standard Spacing */
--space-5: clamp(1.25rem, 1.15rem + 0.5vw, 1.563rem);      /* 20-25px */
--space-6: clamp(1.5rem, 1.38rem + 0.6vw, 1.875rem);       /* 24-30px */
--space-8: clamp(2rem, 1.84rem + 0.8vw, 2.5rem);           /* 32-40px */

/* Macro Spacing */
--space-10: clamp(2.5rem, 2.3rem + 1vw, 3.125rem);         /* 40-50px */
--space-12: clamp(3rem, 2.76rem + 1.2vw, 3.75rem);         /* 48-60px */
--space-16: clamp(4rem, 3.68rem + 1.6vw, 5rem);            /* 64-80px */
--space-20: clamp(5rem, 4.6rem + 2vw, 6.25rem);            /* 80-100px */
--space-24: clamp(6rem, 5.52rem + 2.4vw, 7.5rem);          /* 96-120px */
```

**Container Widths:**
```css
--container-sm: 640px;
--container-md: 768px;
--container-lg: 1024px;
--container-xl: 1280px;
--container-content: 720px;   /* Optimal reading width */
```

### 4. Border Radius System

Softer, more organic shapes:

```css
--radius-sm: 0.375rem;    /* 6px */
--radius-md: 0.5rem;      /* 8px */
--radius-lg: 0.75rem;     /* 12px */
--radius-xl: 1rem;        /* 16px */
--radius-2xl: 1.5rem;     /* 24px */
--radius-full: 9999px;    /* Pills/circles */
```

### 5. Shadow System (Subtle Depth)

Flat Design 3.0 shadows - barely perceptible:

```css
/* Light Mode */
--shadow-xs: 0 1px 2px 0 rgb(0 0 0 / 0.05);
--shadow-sm: 0 1px 3px 0 rgb(0 0 0 / 0.08), 0 1px 2px -1px rgb(0 0 0 / 0.08);
--shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.08), 0 2px 4px -2px rgb(0 0 0 / 0.08);
--shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.08), 0 4px 6px -4px rgb(0 0 0 / 0.08);

/* Dark Mode - even more subtle */
--shadow-xs-dark: 0 1px 2px 0 rgb(0 0 0 / 0.3);
--shadow-sm-dark: 0 1px 3px 0 rgb(0 0 0 / 0.4), 0 1px 2px -1px rgb(0 0 0 / 0.4);
--shadow-md-dark: 0 4px 6px -1px rgb(0 0 0 / 0.5), 0 2px 4px -2px rgb(0 0 0 / 0.5);
--shadow-lg-dark: 0 10px 15px -3px rgb(0 0 0 / 0.6), 0 4px 6px -4px rgb(0 0 0 / 0.6);
```

### 6. Animation & Transitions

Natural, organic motion:

```css
/* Timing Functions */
--ease-in: cubic-bezier(0.4, 0, 1, 1);
--ease-out: cubic-bezier(0, 0, 0.2, 1);
--ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);
--ease-spring: cubic-bezier(0.34, 1.56, 0.64, 1);  /* Bouncy */
--ease-smooth: cubic-bezier(0.65, 0, 0.35, 1);      /* Smooth */

/* Durations */
--duration-fast: 150ms;
--duration-normal: 250ms;
--duration-slow: 350ms;
--duration-slower: 500ms;

/* Common Transitions */
--transition-colors: color var(--duration-normal) var(--ease-smooth),
                     background-color var(--duration-normal) var(--ease-smooth),
                     border-color var(--duration-normal) var(--ease-smooth);

--transition-transform: transform var(--duration-normal) var(--ease-smooth);
--transition-all: all var(--duration-normal) var(--ease-smooth);
```

---

## Component Redesigns

### 1. Navigation Bar

**Current:** Simple text links with underline on active state

**2026 Redesign:**
- **Layout:** Sticky navigation with backdrop blur effect
- **Typography:** Larger, bolder links with generous spacing
- **Active State:** Pill-shaped background with primary color
- **Hover:** Subtle scale + color shift
- **Mobile:** Full-screen overlay menu with large typography
- **Theme Toggle:** Animated sun/moon with smooth transition

**Key Changes:**
```astro
<!-- Sticky with blur backdrop -->
<nav class="sticky top-0 z-50 backdrop-blur-lg bg-neutral-50/80 dark:bg-neutral-900/80 border-b border-neutral-200 dark:border-neutral-800">

  <!-- Logo with accent -->
  <a class="text-2xl md:text-3xl font-bold tracking-tight">
    Francisco Sousa
    <span class="inline-block text-accent-mint">_</span>
  </a>

  <!-- Desktop Links -->
  <ul class="space-x-6 text-lg font-medium">
    <li class="active-pill">  <!-- Rounded pill background -->
      <a>home</a>
    </li>
  </ul>

  <!-- Enhanced Theme Toggle -->
  <button class="theme-toggle-enhanced">
    <!-- Animated icon swap with rotation -->
  </button>
</nav>
```

### 2. Hero Section (Homepage)

**Current:** Simple markdown paragraph

**2026 Redesign:**
- **Large Display Typography:** Name as massive heading (text-6xl)
- **Gradient Text:** Subtle gradient on name
- **Animated Cursor:** Enhanced with trail effect
- **Asymmetric Layout:** Break from center alignment
- **CTA Buttons:** Prominent coral-colored action buttons
- **Status Badge:** "Available for projects" with pulse

**Proposed Structure:**
```astro
<section class="min-h-[80vh] flex items-center py-20">
  <div class="space-y-8 max-w-4xl">
    <!-- Large Name Display -->
    <h1 class="text-6xl md:text-7xl font-black tracking-tight">
      <span class="bg-gradient-to-r from-primary-500 to-accent-purple bg-clip-text text-transparent">
        Francisco Sousa
      </span>
      <span class="cursor-enhanced">_</span>
    </h1>

    <!-- Subtitle with larger type -->
    <p class="text-2xl md:text-3xl text-neutral-600 dark:text-neutral-400 max-w-2xl leading-snug">
      Software engineer building beautiful web experiences
    </p>

    <!-- Status Badge -->
    <div class="flex items-center space-x-3">
      <span class="pulse-dot"></span>
      <span class="text-sm font-medium text-neutral-600">Available for freelance</span>
    </div>

    <!-- CTA Buttons -->
    <div class="flex flex-wrap gap-4">
      <a class="btn-primary-large">View Projects</a>
      <a class="btn-secondary-large">Read Blog</a>
      <a class="btn-accent">Hire Me</a>
    </div>
  </div>
</section>
```

### 3. Blog List

**Current:** Simple list with borders

**2026 Redesign:**
- **Card Design:** Subtle elevated cards with hover effect
- **Gradient Borders:** Accent-colored top border on each card
- **Enhanced Metadata:** Tags, reading time with icons
- **Hover Interaction:** Lift effect with shadow
- **Featured Posts:** Larger card with accent background for recent/featured
- **Category Pills:** Rounded tags with colors

**Card Component:**
```astro
<article class="blog-card group">
  <!-- Gradient accent border -->
  <div class="h-1 bg-gradient-to-r from-primary-500 to-accent-mint rounded-t-xl"></div>

  <div class="p-6 md:p-8 space-y-4">
    <!-- Date & Reading Time -->
    <div class="flex items-center space-x-4 text-sm text-neutral-500">
      <span class="flex items-center">
        <CalendarIcon /> {date}
      </span>
      <span class="flex items-center">
        <ClockIcon /> {readingTime}
      </span>
    </div>

    <!-- Title with hover effect -->
    <h2 class="text-2xl md:text-3xl font-bold group-hover:text-primary-500 transition-colors">
      <a>{title}</a>
    </h2>

    <!-- Description -->
    <p class="text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed">
      {description}
    </p>

    <!-- Tags -->
    <div class="flex flex-wrap gap-2">
      {tags.map(tag => (
        <span class="tag-pill">{tag}</span>
      ))}
    </div>
  </div>
</article>
```

### 4. Projects Section

**Current:** Simple list with GitHub links

**2026 Redesign:**
- **Grid Layout:** 2-column grid on desktop, asymmetric sizing for featured
- **Project Cards:** Rich cards with project screenshots/icons
- **Tech Stack Badges:** Colorful, rounded badges for technologies
- **Live Demo Buttons:** Primary CTAs with external link icon
- **GitHub Stats:** Stars, forks displayed with icons
- **Hover Effect:** Card lift + background color shift

### 5. Footer

**Current:** Simple centered links

**2026 Redesign:**
- **Multi-column Layout:** Links grouped by category
- **Social Icons:** Larger, colorful hover states
- **Newsletter CTA:** Optional "Stay updated" section
- **Gradient Divider:** Top border with gradient
- **Micro-interaction:** Icons scale/bounce on hover

---

## Page-Specific Enhancements

### Homepage
1. **Hero Section:** Large display type, CTA buttons, status badge
2. **Quick Links Grid:** Card-based navigation to main sections
3. **Latest Posts Preview:** 3 most recent blog posts
4. **Skills Showcase:** Tech stack with animated icons (optional)

### About Page
1. **Professional Photo:** Rounded image with gradient border
2. **Timeline Component:** Work history in vertical timeline
3. **Tech Stack Grid:** Icons with labels, hover interactions
4. **Contact CTA:** Prominent "Hire me" section

### Blog Listing
1. **Featured Post:** Hero card for most recent/featured
2. **Grid Layout:** 2-column cards with hover effects
3. **Category Filter:** Pill-based filter buttons
4. **Search:** Simple text search input

### Blog Post
1. **Hero Header:** Large title, metadata, cover image (optional)
2. **Enhanced Prose:** Better typography, code highlighting
3. **Table of Contents:** Sticky sidebar TOC (optional)
4. **Share Buttons:** Social sharing at top/bottom
5. **Related Posts:** Card carousel at bottom

### Projects Page
1. **Featured Project:** Large hero card
2. **Project Grid:** 2-column asymmetric layout
3. **Filter by Tech:** Tech stack filter pills
4. **Stats Display:** GitHub stats integration

### Books Page
1. **Grid Layout:** Book cover images in grid
2. **Rating Display:** Star ratings with colors
3. **Reading Status:** "Currently Reading" vs "Read"
4. **Goodreads Link:** External link buttons

---

## Micro-Interactions & Animations

### 1. Hover States
- **Links:** Underline slide-in from left (not instant)
- **Buttons:** Subtle lift (translateY(-2px)) + shadow increase
- **Cards:** Lift effect + border color shift
- **Icons:** Scale + rotate on hover

### 2. Page Transitions
- **Enter:** Fade + slide up (20px)
- **Exit:** Fade only
- **Duration:** 300ms with ease-smooth

### 3. Scroll Animations
- **Parallax:** Subtle background movement (optional, minimal)
- **Fade-in on Scroll:** Elements fade in as they enter viewport
- **Progress Bar:** Reading progress bar at top of blog posts

### 4. Loading States
- **Skeleton Screens:** For blog posts, projects
- **Spinner:** Simple animated circle for async operations
- **Image Lazy Load:** Blur-up effect

### 5. Interactive Feedback
- **Button Click:** Quick scale down (0.98) on active
- **Form Focus:** Border color + shadow change
- **Success/Error:** Toast notifications with slide-in
- **Copy Buttons:** Code blocks with copy-to-clipboard

---

## Implementation Strategy

### Phase 1: Foundation (Design Tokens)
**Files to update:**
1. `src/styles/index.css` - New CSS variables
2. `tailwind.config.cjs` - Extended theme configuration

**Tasks:**
- [ ] Define new color palette CSS variables
- [ ] Create typography scale variables
- [ ] Add spacing system variables
- [ ] Define shadow system
- [ ] Add animation/transition variables
- [ ] Update Tailwind config to reference new tokens
- [ ] Test dark mode with new colors

### Phase 2: Typography Enhancement
**Files to update:**
1. `src/styles/index.css` - Font imports and base styles
2. `tailwind.config.cjs` - Font family extensions

**Tasks:**
- [ ] Choose and import web fonts (Inter recommended)
- [ ] Set up font-face declarations
- [ ] Update font family stack in Tailwind
- [ ] Create utility classes for font weights
- [ ] Test typography scale across all pages
- [ ] Ensure FOUT/FOIT handling

### Phase 3: Component Redesigns
**Files to update:**
1. `src/components/Navbar.astro`
2. `src/components/Footer.astro`
3. `src/components/Blog.astro`
4. `src/components/Projects.astro`
5. `src/components/Books.astro`

**Tasks:**
- [ ] Redesign Navbar with new styles
- [ ] Create button components (primary, secondary, accent)
- [ ] Redesign blog cards with hover effects
- [ ] Create project cards with screenshots
- [ ] Update footer with new layout
- [ ] Add icon components for common icons
- [ ] Create tag/badge components

### Phase 4: Page Layouts
**Files to update:**
1. `src/pages/index.md` → `src/pages/index.astro` (convert to Astro component)
2. `src/pages/about.md` → Update or convert
3. `src/pages/blog.mdx`
4. `src/pages/projects.mdx`
5. `src/layouts/BaseLayout.astro`
6. `src/layouts/DefaultLayout.astro`
7. `src/layouts/MarkdownLayout.astro`

**Tasks:**
- [ ] Create new homepage hero section
- [ ] Add CTA buttons and status badge
- [ ] Update about page layout
- [ ] Enhance blog listing layout
- [ ] Improve blog post layout
- [ ] Update project page grid
- [ ] Enhance base layout with new meta styles

### Phase 5: Interactions & Animations
**Files to create/update:**
1. `src/components/AnimatedElements.astro` (new)
2. `src/scripts/animations.ts` (new)
3. `src/styles/animations.css` (new)

**Tasks:**
- [ ] Add hover interactions to links and buttons
- [ ] Implement page transition animations
- [ ] Add scroll-triggered fade-ins
- [ ] Create loading skeleton components
- [ ] Add toast notification system
- [ ] Implement copy-to-clipboard for code blocks
- [ ] Add reading progress bar to blog posts

### Phase 6: Polish & Optimization
**Files to update:**
1. Various component files
2. `src/styles/index.css`

**Tasks:**
- [ ] Accessibility audit (contrast ratios, ARIA labels)
- [ ] Performance audit (lighthouse scores)
- [ ] Cross-browser testing
- [ ] Mobile responsiveness testing
- [ ] Dark mode refinement
- [ ] SEO meta tag updates
- [ ] Image optimization
- [ ] Animation performance optimization

---

## Technical Considerations

### 1. Font Loading Strategy
**Recommendation:** Use `font-display: swap` with fallback fonts
- Self-host fonts for performance
- Subset fonts to include only needed characters
- Use variable fonts where possible (Inter Variable)

### 2. Color Accessibility
**Requirements:**
- Maintain WCAG AA contrast ratios (4.5:1 for text)
- Test all color combinations in light and dark modes
- Ensure links are distinguishable from body text

### 3. Performance Budget
**Targets:**
- First Contentful Paint: < 1.5s
- Largest Contentful Paint: < 2.5s
- Total Bundle Size: < 150KB (excluding images)
- Lighthouse Score: > 95

### 4. Browser Support
**Minimum Support:**
- Last 2 versions of Chrome, Firefox, Safari, Edge
- iOS Safari 14+
- Android Chrome 90+

### 5. Animation Performance
- Use `transform` and `opacity` for animations (GPU accelerated)
- Avoid animating `width`, `height`, `top`, `left`
- Use `will-change` sparingly
- Respect `prefers-reduced-motion`

---

## Open Questions & Decisions Needed

### 1. Font Choice
**Options:**
- **Inter** (Modern, geometric, excellent web rendering)
- **Plus Jakarta Sans** (Friendly, rounded, trendy)
- **Satoshi** (Stylish, unique, designer favorite)
- **System Fonts Only** (Zero overhead, fast)

**Question:** Which font personality best represents your brand?

### 2. Color Palette Direction
**Options:**
- **Option A:** Sky blue primary + coral accents (energetic, modern)
- **Option B:** Deep purple primary + mint accents (sophisticated, creative)
- **Option C:** Monochromatic blue with intensity variations (minimal, professional)

**Question:** Which color direction feels most "you"?

### 3. Homepage Layout
**Options:**
- **Option A:** Large hero with immediate CTAs (conversion-focused)
- **Option B:** Asymmetric layout with featured project showcase
- **Option C:** Minimal centered text with scroll reveal (artistic)

**Question:** What's the primary goal of your homepage?

### 4. Blog Post Enhancements
**Optional Features:**
- Table of contents sidebar?
- Estimated reading progress bar?
- Social share buttons?
- Comment system integration?
- Related posts carousel?

**Question:** Which features would add most value for your readers?

### 5. Animation Intensity
**Options:**
- **Minimal:** Only hover states and page transitions
- **Moderate:** Add scroll reveals and micro-interactions
- **Rich:** Full animation suite with parallax and complex interactions

**Question:** What level of motion feels right for your brand?

### 6. Code Block Theme
**Options:**
- Keep Dracula theme (current)
- Switch to GitHub Dark/Light (matches site theme)
- Use Nord theme (softer, modern)
- Use One Dark Pro (VSCode popular)

**Question:** Any preference on code syntax highlighting?

---

## Design References & Inspiration

Based on 2026 trends research, these sites exemplify the principles:

1. **Modern Minimalism:** Linear.app, Vercel.com
2. **Typography-first:** Stripe.com blog, Medium.com
3. **Color & Vibrancy:** Framer.com, Raycast.com
4. **Micro-interactions:** Railway.app, Supabase.com
5. **Personal sites:** leerob.io, rauchg.com, mxstbr.com

---

## Success Metrics

How we'll measure the success of this redesign:

1. **Visual Impact:** Subjective improvement in modern aesthetic
2. **Performance:** Lighthouse scores maintain or improve (>95)
3. **Accessibility:** WCAG AA compliance on all pages
4. **Engagement:** Time on site, page views (track before/after)
5. **Conversion:** Contact form submissions, project inquiries
6. **Technical:** Zero regressions in functionality

---

## Timeline Estimate

**Note:** No specific dates, just sequential phases

1. **Phase 1 - Foundation:** Design tokens setup
2. **Phase 2 - Typography:** Font implementation
3. **Phase 3 - Components:** Individual component redesigns
4. **Phase 4 - Layouts:** Page layout updates
5. **Phase 5 - Interactions:** Animations and micro-interactions
6. **Phase 6 - Polish:** Final refinements and testing

Each phase can be reviewed and approved before moving to the next.

---

## Sources & Research

This plan is informed by current 2026 design trend research:

**Minimalist Design Trends:**
- [Top 10 Minimalist Web Design Trends For 2026](https://www.digitalsilk.com/digital-trends/minimalist-web-design-trends/)
- [Web Design Trends to Expect in 2026](https://elementor.com/blog/web-design-trends-2026/)
- [The 11 Biggest Web Design Trends of 2026](https://www.wix.com/blog/web-design-trends)
- [Design Trends to Leave Behind — and What's Next for Web in 2026](https://www.thehoopstudio.com/resources/insights/design-trends-to-leave-behind-and-whats-next-for-web-in-2026)

**Color & Typography Trends:**
- [Color and Typography Trends in 2026: A Graphic Designer's Guide](https://zeenesia.com/2025/11/23/color-and-typography-trends-in-2026-a-graphic-designers-guide/)
- [Fontfabric: Top 10 Design & Typography Trends for 2026](https://www.fontfabric.com/blog/10-design-trends-shaping-the-visual-typographic-landscape-in-2026/)
- [UI trends you will likely see in 2026](https://www.lummi.ai/blog/ui-trends-2026)
- ['Imperfect by Design': The visual design trends set to define 2026](https://www.canva.com/newsroom/news/design-trends-2026/)

---

## Next Steps

1. **Review this plan** and provide feedback on direction
2. **Answer open questions** above to finalize decisions
3. **Approve plan** to begin implementation
4. **Phase-by-phase execution** with reviews between each phase

This approach ensures we maintain control and can adjust as we see the design come to life.
