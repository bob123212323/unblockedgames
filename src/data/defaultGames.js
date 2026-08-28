export const DEFAULT_GAMES = [
  {
    id: "2048",
    title: "2048 Classic",
    category: "Puzzle",
    description: "Slide matching number tiles together to reach the legendary 2048 tile in this iconic brain-teaser.",
    iframeUrl: "games/2048.html",
    thumbnail: "🔢",
    author: "Gabriele Cirulli",
    rating: 4.9,
    plays: 14200,
    controls: {
      "Arrow Keys / WASD": "Slide Tiles",
      "Touch Swipe": "Mobile Slide"
    },
    tags: ["Numbers", "Puzzle", "Logic", "Addictive"],
    featured: true
  },
  {
    id: "slope-runner",
    title: "Slope 3D Neon",
    category: "Action",
    description: "High-speed 3D neon downhill ball runner. Steer through obstacles without flying off the edge.",
    iframeUrl: "games/slope-runner.html",
    thumbnail: "🌐",
    author: "Y8 Games",
    rating: 4.8,
    plays: 28400,
    controls: {
      "Left / Right or A / D": "Steer Ball",
      "Mouse / Touch": "Steer Direction"
    },
    tags: ["3D", "Speed", "Reflexes", "Endless"],
    featured: true
  },
  {
    id: "tetris",
    title: "Tetris Retro",
    category: "Retro",
    description: "Classic brick-stacking arcade puzzle. Clear lines, manage rising blocks, and score high combos.",
    iframeUrl: "games/tetris.html",
    thumbnail: "🧱",
    author: "Alexey Pajitnov",
    rating: 4.9,
    plays: 31200,
    controls: {
      "Arrow Left / Right": "Move Piece",
      "Arrow Up": "Rotate",
      "Arrow Down": "Soft Drop",
      "Spacebar": "Hard Drop"
    },
    tags: ["Classic", "Puzzle", "Retro", "Blocks"],
    featured: true
  },
  {
    id: "flappy-bird",
    title: "Flappy Bird",
    category: "Arcade",
    description: "Tap your wings and navigate between green pipes in the viral unforgiving arcade classic.",
    iframeUrl: "games/flappy-bird.html",
    thumbnail: "🐤",
    author: "Dong Nguyen",
    rating: 4.7,
    plays: 22100,
    controls: {
      "Space / Click / Tap": "Flap Wings",
      "Arrow Up / W": "Flap"
    },
    tags: ["Arcade", "One-Button", "Skill", "Casual"],
    featured: true
  },
  {
    id: "snake",
    title: "Snake Classic",
    category: "Retro",
    description: "Guide the hungry snake to munch glowing apples and grow as long as possible without biting yourself.",
    iframeUrl: "games/snake.html",
    thumbnail: "🐍",
    author: "Nokia Classic",
    rating: 4.8,
    plays: 19500,
    controls: {
      "Arrow Keys / WASD": "Change Direction",
      "D-Pad": "Mobile Controls"
    },
    tags: ["Classic", "Retro", "Nokia", "Arcade"],
    featured: false
  },
  {
    id: "dino-runner",
    title: "T-Rex Dino Runner",
    category: "Action",
    description: "Jump over cacti and dodge pterodactyls in the beloved offline browser runner.",
    iframeUrl: "games/dino-runner.html",
    thumbnail: "🦖",
    author: "Chromium Team",
    rating: 4.9,
    plays: 45000,
    controls: {
      "Space / Arrow Up": "Jump",
      "Arrow Down": "Duck",
      "Touch Tap": "Jump"
    },
    tags: ["Runner", "Dino", "Pixel", "Offline"],
    featured: true
  },
  {
    id: "cookie-clicker",
    title: "Cookie Clicker",
    category: "Casual",
    description: "Bake billions of delicious cookies, hire grandmas, construct factories, and rule the confectionery world.",
    iframeUrl: "games/cookie-clicker.html",
    thumbnail: "🍪",
    author: "Orteil",
    rating: 4.9,
    plays: 39000,
    controls: {
      "Left Click": "Bake Cookie & Buy Upgrades"
    },
    tags: ["Idle", "Clicker", "Tycoon", "Addictive"],
    featured: true
  },
  {
    id: "space-invaders",
    title: "Space Invaders",
    category: "Arcade",
    description: "Protect planet Earth from descending waves of alien spacecraft in this legendary shoot 'em up.",
    iframeUrl: "games/space-invaders.html",
    thumbnail: "👾",
    author: "Tomohiro Nishikado",
    rating: 4.7,
    plays: 12800,
    controls: {
      "Arrow Left / Right": "Move Cannon",
      "Spacebar": "Fire Laser"
    },
    tags: ["Shooter", "Retro", "Space", "Arcade"],
    featured: false
  },
  {
    id: "breakout",
    title: "Brick Breakout",
    category: "Arcade",
    description: "Smash color bricks with your ball and paddle before you run out of lives.",
    iframeUrl: "games/breakout.html",
    thumbnail: "🧱",
    author: "Atari",
    rating: 4.6,
    plays: 9800,
    controls: {
      "Mouse / Touch": "Move Paddle",
      "Arrow Keys": "Move Paddle"
    },
    tags: ["Arcade", "Breakout", "Physics", "Bricks"],
    featured: false
  },
  {
    id: "pacman",
    title: "Pac-Maze",
    category: "Retro",
    description: "Chomp pellets and fruit while evading colorful ghosts in the neon maze.",
    iframeUrl: "games/pacman.html",
    thumbnail: "🟡",
    author: "Namco",
    rating: 4.8,
    plays: 26700,
    controls: {
      "Arrow Keys / WASD": "Steer Pac-Man"
    },
    tags: ["Maze", "Retro", "Arcade", "80s"],
    featured: true
  },
  {
    id: "minesweeper",
    title: "Minesweeper",
    category: "Puzzle",
    description: "Deduce hidden bomb locations with numbers and flags in this timeless logic puzzle.",
    iframeUrl: "games/minesweeper.html",
    thumbnail: "💣",
    author: "Robert Donner",
    rating: 4.7,
    plays: 15400,
    controls: {
      "Left Click": "Reveal Square",
      "Right Click / Long Press": "Place Flag 🚩"
    },
    tags: ["Puzzle", "Logic", "Strategy", "Classic"],
    featured: false
  },
  {
    id: "stack-tower",
    title: "Stack Tower 3D",
    category: "Casual",
    description: "Time your clicks perfectly to build the tallest color gradient tower in the sky.",
    iframeUrl: "games/stack-tower.html",
    thumbnail: "🗼",
    author: "Ketchapp",
    rating: 4.8,
    plays: 18200,
    controls: {
      "Space / Click / Tap": "Drop & Trim Block"
    },
    tags: ["Tower", "Timing", "Casual", "Satisfying"],
    featured: false
  },
  {
    id: "wordle",
    title: "Wordle Unlimited",
    category: "Puzzle",
    description: "Guess the mystery 5-letter word in 6 tries with color feedback tiles.",
    iframeUrl: "games/wordle.html",
    thumbnail: "🔤",
    author: "Josh Wardle",
    rating: 4.9,
    plays: 34000,
    controls: {
      "Keyboard / On-screen Keys": "Type Letter",
      "Enter": "Submit Guess",
      "Backspace": "Delete Letter"
    },
    tags: ["Word", "Vocabulary", "Daily", "Brain"],
    featured: true
  },
  {
    id: "connect4",
    title: "Connect Four",
    category: "Strategy",
    description: "Drop discs and connect 4 in a row vertically, horizontally, or diagonally vs smart CPU or friend.",
    iframeUrl: "games/connect4.html",
    thumbnail: "🔴",
    author: "Milton Bradley",
    rating: 4.7,
    plays: 11300,
    controls: {
      "Click Column": "Drop Disc",
      "Toggle Button": "Switch CPU / 2-Player"
    },
    tags: ["Board Game", "Strategy", "2 Player", "Turn-Based"],
    featured: false
  },
  {
    id: "typing-racer",
    title: "Speed Typer",
    category: "Casual",
    description: "Test and train your keyboard words-per-minute and accuracy with real-time feedback.",
    iframeUrl: "games/typing-racer.html",
    thumbnail: "🏎️",
    author: "Typing Academy",
    rating: 4.6,
    plays: 14700,
    controls: {
      "Keyboard Typing": "Type highlighted characters"
    },
    tags: ["Typing", "Educational", "School", "WPM"],
    featured: false
  },
  {
    id: "pong",
    title: "Pong Classic",
    category: "Retro",
    description: "The grandfather of video games. Play table tennis against the AI or a friend beside you.",
    iframeUrl: "games/pong.html",
    thumbnail: "🏓",
    author: "Allan Alcorn",
    rating: 4.5,
    plays: 8700,
    controls: {
      "W / S or Mouse": "P1 Paddle",
      "Arrow Up / Down": "P2 Paddle (2P mode)"
    },
    tags: ["Retro", "2 Player", "Pong", "Classic"],
    featured: false
  },
  {
    id: "asteroids",
    title: "Asteroids",
    category: "Arcade",
    description: "Thrust through deep space, shoot drifting space rocks, and navigate hyperspace vector graphics.",
    iframeUrl: "games/asteroids.html",
    thumbnail: "☄️",
    author: "Lyle Rains",
    rating: 4.6,
    plays: 9100,
    controls: {
      "Arrow Up / W": "Thrust",
      "Arrow Left / Right": "Rotate Ship",
      "Spacebar": "Shoot Laser"
    },
    tags: ["Arcade", "Vector", "Space", "Classic"],
    featured: false
  }
];
