// Import the styles
// import "./styles.css";

// Import the dice box library
import DiceBox from "https://unpkg.com/@3d-dice/dice-box-threejs@0.0.12/dist/dice-box-threejs.es.js";

// Initialize the 3D dice box
const Box = new DiceBox("#dice-box", {
  assetPath: "./",
  framerate: (1/60),
  sounds: true,
  volume: 100,
  color_spotlight: 0xefdfd5,
  shadows: true,
  theme_surface: "green-felt",
  sound_dieMaterial: 'plastic',
  //  theme_customColorset: {
  //  background: "#00ffcb",
  //  foreground: "#00ffcb",
  //  texture: "ice", // marble | ice
  //  material: "wood" // metal | glass | plastic | wood
  // },
  theme_colorset: "radiant", // see available colorsets in https://github.com/3d-dice/dice-box-threejs/blob/main/src/const/colorsets.js
  theme_texture: "marble", // see available textures in https://github.com/3d-dice/dice-box-threejs/blob/main/src/const/texturelist.js
  //  theme_material: "perfectmetal", // "none" | "metal" | "wood" | "glass" | "plastic"
  gravity_multiplier: 200,
  light_intensity: 1,
  baseScale: 100,
  strength: 1.5, // toss strength of dice
  onRollComplete: () => {},
  onAddDiceComplete: () => {
  },
  onRemoveDiceComplete: () => {
  }
});

// Variables to store DOM elements
let rollResult;
let rollDetails;

// Initialize the box when the page loads
document.addEventListener('DOMContentLoaded', () => {
  console.log("DOM loaded, initializing dice box...");
  
  rollResult = document.getElementById("roll-result");
  rollDetails = document.getElementById("roll-details");
  
  Box.initialize().then(() => {
    rollDetails.textContent = "Ready to roll";
    console.log("Dice box initialized");
  }).catch(error => {
    console.error("Error initializing dice box:", error);
    rollDetails.textContent = "Error loading dice";
  });
  
  // Set up event listeners
  setupEventListeners();
});

// Function to set up event listeners
function setupEventListeners() {
  // Basic dice roll buttons
  document.getElementById("roll-d4").addEventListener("click", () => {
    rollDice("1d4");
  });
  
  document.getElementById("roll-d6").addEventListener("click", () => {
    rollDice("1d6");
  });
  
  document.getElementById("roll-d8").addEventListener("click", () => {
    rollDice("1d8");
  });
  
  document.getElementById("roll-d10").addEventListener("click", () => {
    rollDice("1d10");
  });
  
  document.getElementById("roll-d12").addEventListener("click", () => {
    rollDice("1d12");
  });
  
  document.getElementById("roll-d20").addEventListener("click", () => {
    rollDice("1d20");
  });
  
  document.getElementById("roll-d100").addEventListener("click", () => {
    rollDice("1d10+1d100");
  });
  
  console.log("Event listeners set up");
}

// Function to roll dice
function rollDice(notation) {
  // Check if box is initialized
  if (!Box) {
    console.error("Dice box not initialized");
    return;
  }
  
  // Get DOM elements if not already set
  if (!rollResult) rollResult = document.getElementById("roll-result");
  if (!rollDetails) rollDetails = document.getElementById("roll-details");
  
  // Update display while rolling
  rollResult.textContent = "Rolling...";
  rollDetails.textContent = notation;
  
  console.log("Rolling dice:", notation);
  
  // Roll the dice
  Box.roll(notation).then(results => {
    console.log("Roll results:", results);
    
    // Process and display results
    const total = results.total;
    let breakdown = '';
    
    if (results.rolls && results.rolls.length > 0) {
      breakdown = results.rolls.map(roll => {
        return `${roll.dice}: [${roll.values.join(', ')}]`;
      }).join(' + ');
      
      if (results.modifier) {
        const modSign = results.modifier >= 0 ? '+' : '';
        breakdown += ` ${modSign}${results.modifier}`;
      }
    }
    
    // Update display with results
    rollResult.textContent = total;
    rollDetails.textContent = breakdown || notation;
    
  }).catch(error => {
    console.error("Error rolling dice:", error);
    rollResult.textContent = "Error";
    rollDetails.textContent = "Error rolling dice";
  });
}