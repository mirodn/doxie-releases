// Download/buy buttons from config.js, and the little dog park.
// Every page loads this; only the home page has the Pro card and the park.
(() => {
  const config = window.DOXIE || {};

  // Download buttons lead to download.html (static links, so they work even
  // before this script runs); that page starts the download itself.
  document.querySelectorAll("[data-download-direct]").forEach((link) => {
    if (config.downloadURL) link.href = config.downloadURL;
  });
  if (document.body.classList.contains("starts-download") && config.downloadURL) {
    // A moment later, so the page is on screen before the browser's download UI.
    setTimeout(() => { window.location.href = config.downloadURL; }, 600);
  }
  if (config.notarized) {
    document.querySelectorAll("[data-unless-notarized]").forEach((el) => el.remove());
  }

  // Feedback links: the short form, or an email until there is one.
  document.querySelectorAll("[data-feedback]").forEach((link) => {
    link.href = config.feedbackURL || "mailto:hello@doxie.ch?subject=doxie%20feedback";
  });

  document.querySelectorAll("[data-buy]").forEach((buy) => {
    if (config.checkoutURL) {
      buy.href = config.checkoutURL;
    } else {
      buy.textContent = "Coming soon";
      buy.setAttribute("aria-disabled", "true");
    }
  });
  const price = document.getElementById("pro-price");
  if (price && config.price) {
    price.textContent = config.price;
    price.hidden = false;
  }

  // The park, on the same grid as the app's: 320×110 park pixels, dogs drawn
  // with half-size pixels from the app's own sprite sheets (sprites.js).
  const park = document.getElementById("park");
  const bubble = document.getElementById("park-bubble");
  const SPRITES = window.DOXIE_SPRITES;
  if (!park || !SPRITES) return;

  const W = 320, H = 110, HORIZON = 39;
  const AREA = { minX: 14, maxX: W - 14, minY: HORIZON + 12, maxY: H - 3 };
  // The meadow's pond (center, radii) plus room for a dog; dogs walk around it.
  const POND = { x: 176, y: 51, rx: 14.5 + 9, ry: 3.5 + 3 };
  const NOTES = [
    "Call the vet about the checkup #home",
    "Book flights to Lisbon #travel",
    "Q4 plan: first draft #work",
    "Idea: a pixel calendar #idea",
    "Groceries: oats, coffee, apples #home",
    "Read 'The Hobbit' again #books",
    "Howdy! Line-dancing class on Friday",
    "Birthday gift for Mia",
  ];
  const TOTAL = Object.values(SPRITES.frames).reduce((n, [, count]) => n + count, 0);
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const rand = (min, max) => min + Math.random() * (max - min);
  const inPond = (x, y) => ((x - POND.x) / POND.rx) ** 2 + ((y - POND.y) / POND.ry) ** 2 < 1;

  const dogs = NOTES.map((title, i) => {
    const look = SPRITES.looks[i % SPRITES.looks.length];
    const el = document.createElement("div");
    el.className = "dog";
    el.setAttribute("aria-label", title);
    el.style.width = (look.w / 2 / W) * 100 + "%";
    el.style.aspectRatio = `${look.w} / ${look.h}`;
    el.style.backgroundImage = `url("assets/img/${look.sheet}?v=4")`;
    el.style.backgroundSize = `${TOTAL * 100}% 100%`;
    park.appendChild(el);
    let x, y;
    do { x = rand(AREA.minX, AREA.maxX); y = rand(AREA.minY, AREA.maxY); } while (inPond(x, y));
    const dog = { el, title, look, x, y, right: Math.random() < 0.5, state: "idle", since: 0, until: rand(1, 4), target: null, heart: null };
    el.addEventListener("mouseenter", () => pet(dog));
    el.addEventListener("click", () => pet(dog));
    el.addEventListener("mouseleave", () => { bubble.hidden = true; });
    return dog;
  });

  let clock = 0;

  function setState(dog, state, duration) {
    dog.state = state;
    dog.since = clock;
    dog.until = clock + duration;
  }

  function pet(dog) {
    dog.target = null;
    setState(dog, "happy", 1.6);
    if (!dog.heart) {
      dog.heart = document.createElement("div");
      dog.heart.className = "heart";
      park.appendChild(dog.heart);
    }
    dog.heartUntil = clock + 1.6;
    bubble.textContent = dog.title;
    bubble.hidden = false;
    place(dog);
  }

  // What a dog does next once it's done: mostly wander, sometimes rest.
  function next(dog) {
    const roll = Math.random();
    if (roll < 0.5) {
      const run = Math.random() < 0.18;
      let x, y, tries = 0;
      do {
        x = Math.min(Math.max(dog.x + rand(-70, 70) * (run ? 2 : 1), AREA.minX), AREA.maxX);
        y = Math.min(Math.max(dog.y + rand(-10, 10), AREA.minY), AREA.maxY);
      } while (inPond(x, y) && ++tries < 10);
      if (tries >= 10) return setState(dog, "idle", rand(1, 3));
      dog.target = { x, y, speed: run ? 26 : 9 };
      setState(dog, run ? "run" : "walk", 99);
    } else if (roll < 0.65) setState(dog, "sit", rand(3, 6));
    else if (roll < 0.77) setState(dog, "sniff", rand(2, 4));
    else if (roll < 0.85) setState(dog, "dig", rand(1.5, 3));
    else if (roll < 0.93) setState(dog, "sleep", rand(8, 14));
    else setState(dog, "idle", rand(1.5, 4));
  }

  function step(dt) {
    clock += dt;
    for (const dog of dogs) {
      if (dog.target) {
        const dx = dog.target.x - dog.x, dy = dog.target.y - dog.y;
        const distance = Math.hypot(dx, dy), travel = dog.target.speed * dt;
        if (Math.abs(dx) > 0.5) dog.right = dx > 0;
        // Step around the pond rather than through it.
        const nx = dog.x + (dx / distance) * travel, ny = dog.y + (dy / distance) * travel;
        if (distance <= travel) {
          dog.x = dog.target.x; dog.y = dog.target.y; dog.target = null;
          setState(dog, "idle", rand(0.8, 2.5));
        } else if (inPond(nx, ny)) {
          dog.target = null;
          setState(dog, "idle", rand(0.5, 1.5));
        } else {
          dog.x = nx; dog.y = ny;
        }
      } else if (clock >= dog.until) {
        next(dog);
      } else if (dog.state === "idle" && Math.random() < dt * 0.15) {
        dog.right = !dog.right;  // looking around
      }
      if (dog.heart && clock > dog.heartUntil) { dog.heart.remove(); dog.heart = null; }
      place(dog);
    }
  }

  // Frame of the dog's animation, timed like the app's.
  function frame(dog) {
    const t = clock - dog.since;
    let [first, count] = SPRITES.frames[dog.state];
    let fps = { idle: 3, walk: 8, run: 12, sit: 1, sniff: 4, sleep: 1, happy: 8, dig: 6 }[dog.state] || 4;
    if (dog.state === "idle" && Math.floor(clock * 3 + dog.x) % 23 === 0) {
      [first, count] = SPRITES.frames.blink;  // a blink now and then
    }
    return first + (Math.floor(t * fps) % count);
  }

  function place(dog) {
    const { w, h, headX, headTop } = dog.look;
    // Feet at (x, y): the sprite's bottom center, in park pixels.
    const left = Math.round((dog.x - w / 4) * 2) / 2, top = Math.round((dog.y - h / 2) * 2) / 2;
    const s = dog.el.style;
    s.left = (left / W) * 100 + "%";
    s.top = (top / H) * 100 + "%";
    s.zIndex = Math.round(dog.y);
    s.backgroundPositionX = (frame(dog) / (TOTAL - 1)) * 100 + "%";
    // The art faces left; flip it to face right.
    dog.el.classList.toggle("right", dog.right);
    if (dog.heart) {
      const head = left + (dog.right ? w - headX : headX) / 2;
      const bob = Math.floor(clock * 4) % 2;
      dog.heart.style.left = ((head - 2) / W) * 100 + "%";
      dog.heart.style.top = ((top + headTop / 2 - 6 - bob) / H) * 100 + "%";
      dog.heart.style.zIndex = 200;
    }
    if (!bubble.hidden && bubble.textContent === dog.title) {
      bubble.style.left = ((left + w / 4) / W) * 100 + "%";
      bubble.style.top = ((top + headTop / 2 - 7) / H) * 100 + "%";
    }
  }

  dogs.forEach(place);
  if (reduceMotion) return;

  // 10 frames a second, like the app, and only while the park is on screen.
  let visible = false, last = performance.now();
  new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; last = performance.now(); }).observe(park);
  setInterval(() => {
    const now = performance.now();
    if (visible && !document.hidden) step(Math.min((now - last) / 1000, 0.25));
    last = now;
  }, 100);
})();
