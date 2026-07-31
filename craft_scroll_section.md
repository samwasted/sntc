# Extracted "Craft" Image Scroll Section

Here is the extracted code for the "Craft" image scroll section. You can easily copy and adapt this into your other projects.

Make sure you have **GSAP** and **ScrollTrigger** included in your destination project for the animations to work.

### 1. HTML
This is the structure of the section. The images are stacked on top of each other using the same grid position (`pos-2`).

```html
<!-- Ensure you wrap this inside your main layout/container -->
<section class="content content--padded content--full">
    <div class="grid grid--columns grid--spaced grid--single" data-grid-third>
        
        <!-- Stacked Images (Ensure paths match your project) -->
        <div class="grid__img pos-2" style="background-image:url(img/23.webp)"></div>
        <div class="grid__img pos-2" style="background-image:url(img/24.webp)"></div>
        <div class="grid__img pos-2" style="background-image:url(img/25.webp)"></div>
        <div class="grid__img pos-2" style="background-image:url(img/26.webp)"></div>
        <div class="grid__img pos-2" style="background-image:url(img/27.webp)"></div>
        
        <!-- Text Elements -->
        <div class="grid__item acenter pos-1">
            <h4 class="type-tiny">Craft</h4>
            <p>His craft reveals the quiet beauty in life’s fleeting moments.</p>
        </div>
        <div class="grid__item acenter pos-4">
            <h4 class="type-tiny">Perspective</h4>
            <p>His perspective finds depth in stillness, where the unseen speaks.</p>
        </div>

    </div>
</section>
```

### 2. CSS
Here are the essential styles extracted for this particular layout. I have substituted the CSS variables for standard values so it's ready to drop in.

```css
/* Container styles */
.content {
    position: relative;
    min-height: 100dvh;
    align-content: center;
}
.content--padded {
    padding: 1rem; /* Adjust padding as needed */
}
.content--full {
    display: grid;
    height: 100vh;
    place-items: center;
    grid-template-areas: 'main';
    grid-template-rows: 100%;
    grid-template-columns: 100%;
}

/* Grid styles */
.grid {
    grid-area: main;
    display: grid;
    width: 100%;
    height: 100%;
}
.grid--spaced {
    gap: 1rem; /* Adjust gap as needed */
}
.grid--columns {
    grid-template-columns: repeat(5, 1fr);
    grid-template-rows: repeat(2, min-content);
    align-content: center;
}
.grid--single {
    height: auto;
    justify-self: center;
}

/* Image styles */
.grid__img {
    background-size: cover;
    background-position: 50% 50%;
    pointer-events: none;
    will-change: transform;
    transform: translateZ(0.1px);
}
.grid--columns .grid__img {
    height: min-content;
    aspect-ratio: 2 / 3;
}

/* Grid Area Positioning */
.pos-1 { grid-area: 1 / 1; }
.pos-2 { grid-area: 1 / 3; } /* Stacks the images in the middle column */
.pos-4 { grid-area: 1 / 5; }

/* Text styling helpers */
.acenter {
    align-self: center;
}
.type-tiny {
    font-size: 11px;
    text-transform: uppercase;
    font-weight: 400;
}

/* Responsive adjustments */
@media (max-aspect-ratio: 16/9) {
    .grid {
        width: 100%; 
        height: auto; 
        aspect-ratio: 16/9;
    }
}
```

### 3. JavaScript (GSAP)
This script handles the scroll-triggered animation for the images and text. The `data-grid-third` attribute on the container is used to target the elements.

```javascript
// Ensure you have registered the ScrollTrigger plugin
// gsap.registerPlugin(ScrollTrigger);

const animateStackedScroll = () => {
    const grid = document.querySelector('[data-grid-third]');
    if (!grid) return; // Guard clause
    
    const gridImages = grid.querySelectorAll('.grid__img');

    gsap.timeline({
        defaults: {
            ease: 'power3'
        },
        scrollTrigger: {
            trigger: grid,
            start: 'center center',
            end: '+=200%',
            pin: grid.parentNode,
            scrub: 0.2,
        }
    })
    // 1. Drop down images with random rotation
    .from(gridImages, {
        stagger: 0.06,
        y: window.innerHeight,
        rotation: () => gsap.utils.random(-15, 15),
        transformOrigin: '50% 0%'
    })
    // 2. Dim the images behind the frontmost image
    .fromTo(gridImages, {
        filter: 'brightness(100%)'
    }, {
        ease: 'none',
        stagger: 0.06,
        filter: pos => pos < gridImages.length - 1 ? 'brightness(20%)' : 'brightness(100%)'
    }, 0)
    // 3. Animate text content in from the sides
    .from(grid.querySelectorAll('.grid__item'), {
        xPercent: pos => pos % 2 ? 100 : -100,
        autoAlpha: 0
    }, 0.06 * gridImages.length);
};

// Initialize the animation
animateStackedScroll();
```
