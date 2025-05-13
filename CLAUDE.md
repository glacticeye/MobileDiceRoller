# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Mobile Dice Roller is a web application optimized for mobile devices that provides an interactive 3D dice rolling experience for tabletop RPG players. The application uses the `@3d-dice/dice-box-threejs` library to render 3D dice with physics simulation, along with various customization options for appearance and sound effects.

## Development Commands

```bash
# Run the application with a local development server
npm run dev

# Start the application with cache disabled
npm start
```

## Architecture

The application follows a simple client-side architecture:

1. **Core Functionality**:
   - Uses the 3D dice library via ES modules import
   - Handles dice selection, rolling, and displaying results
   - Provides visual feedback for critical hits/failures

2. **Settings System**:
   - Persists user preferences in localStorage
   - Configurable options for dice appearance, physics, and audio
   - Separated into tabs for better user experience

3. **UI Components**:
   - Mobile-optimized interface with touch controls
   - Responsive layout that adapts to different screen sizes
   - Visual feedback for dice selection and roll results

## Key Files

- `index.html`: Main application interface for selecting and rolling dice
- `settings.html`: Configuration page for dice appearance and physics
- `src/styles.css`: Shared styles for both pages
- `assets/`: Contains textures and sound effects for the 3D dice

## Code Structure

1. **DiceBox Initialization**: 
   - The 3D environment is set up in index.html using the DiceBox component
   - Physics properties like gravity and strength are configurable

2. **Event Handling**:
   - Dice selection buttons increment the count for specific dice types
   - Roll button triggers the physics simulation with the current selection
   - Clear button resets the current selection

3. **Settings Management**:
   - Settings are loaded from localStorage on initialization
   - Changes are persisted when the user saves settings
   - Default settings are provided as fallback

4. **Results Processing**:
   - Roll results are formatted and displayed to the user
   - Special visual effects for critical success/failure (natural 20s and 1s)

## Best Practices

When working on this codebase:

- Ensure mobile compatibility with proper touch event handling
- Maintain the existing visual style and responsive design
- Keep dice physics settings within reasonable ranges
- Ensure settings are properly saved to and loaded from localStorage
- Test any changes on both desktop and mobile devices