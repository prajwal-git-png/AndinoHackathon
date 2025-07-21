# Mars Rover Navigation Game

A web-based simulation game where you control a rover navigating through different terrains while managing power resources.

## Game Overview

The game simulates a rover's movement on a customizable grid-based plateau. Players can control the rover using simple commands while managing power consumption across different terrain types.

### Features

- Customizable grid dimensions
- Multiple terrain types
- Power management system
- Interactive grid creation
- Command-based movement system

## Game Mechanics

### Grid and Terrain Types

The game uses a grid system with the following terrain types:
- Empty Space (' '): Basic terrain, costs 1 power unit to traverse
- Rocky ('R'): Difficult terrain, costs 2 power units to traverse
- Obstacle ('X'): Impassable terrain
- Charging Station ('C'): Provides +1 power unit when reached
- Anomaly ('A'): Special terrain, costs 1 power unit to traverse

### Rover Controls

The rover accepts the following commands:
- 'L': Turn left (costs 1 power unit)
- 'R': Turn right (costs 1 power unit)
- 'M': Move forward in current direction (power cost depends on terrain)
- 'P': Special action (costs 1 power unit)

### Direction System

The rover can face four directions:
- N (North)
- E (East)
- S (South)
- W (West)

### Power System

- Rover starts with a configurable maximum power level
- Power consumption varies by terrain type
- Charging stations can replenish power
- Mission fails if power reaches 0

## Game States

The game maintains the following state information:
- Grid dimensions (width × height)
- Rover's current position
- Rover's facing direction
- Current power level
- Maximum power capacity
- Game running status

## Interactive Features

1. **Grid Creation**
   - Click cells to cycle through terrain types
   - Customize grid dimensions
   - Set maximum power level

2. **Mission Control**
   - Input command sequence
   - Start/Reset mission
   - Real-time status updates

## Win/Lose Conditions

- **Success**: Complete all commands with power remaining
- **Failure**: Run out of power before completing commands

## Technical Implementation

The game is implemented using:
- HTML for structure
- CSS for styling and grid layout
- JavaScript for game logic and interactivity

Key JavaScript components:
- `gameState`: Manages game variables and status
- `createGrid()`: Initializes and renders the game grid
- `moveRover()`: Handles rover movement logic
- `rotateRover()`: Manages direction changes
- `updateUI()`: Refreshes game display
- `startGame()`: Processes command sequences

## Usage

1. Set grid dimensions and maximum power
2. Click grid cells to set terrain types
3. Enter command sequence (L, R, M, P)
4. Click Start to begin mission
5. Use Reset to start over

The game provides real-time feedback on:
- Rover position
- Current direction
- Power level
- Mission status 