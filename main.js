
let gameState = {
    width: 3,
    height: 3,
    maxPower: 5,
    power: 5,
    position: [0, 0],
    direction: 'N',
    plateau: [],
    isRunning: false
};


const directions = ['N', 'E', 'S', 'W'];
const terrainCosts = {
    ' ': 1,  
    'R': 2,  
    'X': 0, 
    'C': -1, 
    'A': 1   
};


function createGrid() {

    gameState.width = parseInt(document.getElementById('width').value);
    gameState.height = parseInt(document.getElementById('height').value);
    gameState.maxPower = parseInt(document.getElementById('max-power').value);
    gameState.power = gameState.maxPower;
    gameState.position = [0, 0];
    gameState.direction = 'N';
    gameState.isRunning = false;


    gameState.plateau = [];
    for (let i = 0; i < gameState.height; i++) {
        gameState.plateau.push(new Array(gameState.width).fill(' '));
    }


    const grid = document.getElementById('plateau-grid');
    grid.style.gridTemplateColumns = `repeat(${gameState.width}, 1fr)`;
    grid.innerHTML = '';


    for (let y = 0; y < gameState.height; y++) {
        for (let x = 0; x < gameState.width; x++) {
            const cell = document.createElement('div');
            cell.className = 'grid-cell empty';
            cell.setAttribute('data-x', x);
            cell.setAttribute('data-y', y);
            
     
            cell.addEventListener('click', () => {
                if (!gameState.isRunning) {
                    const terrainTypes = [' ', 'R', 'X', 'C', 'A'];
                    const currentTerrain = gameState.plateau[y][x];
                    const nextIndex = (terrainTypes.indexOf(currentTerrain) + 1) % terrainTypes.length;
                    const newTerrain = terrainTypes[nextIndex];
                    
                    gameState.plateau[y][x] = newTerrain;
                    cell.textContent = newTerrain;
                    cell.className = `grid-cell ${getTerrainClass(newTerrain)}`;
                }
            });

            grid.appendChild(cell);
        }
    }

    updateUI();
}


function getTerrainClass(terrain) {
    const classes = {
        ' ': 'empty',
        'R': 'rocky',
        'X': 'obstacle',
        'C': 'charging',
        'A': 'anomaly'
    };
    return classes[terrain] || 'empty';
}


function updateUI() {

    document.getElementById('position').textContent = `${gameState.position[0]}, ${gameState.position[1]}`;
    document.getElementById('direction').textContent = gameState.direction;
    document.getElementById('power').textContent = gameState.power;


    const rovers = document.querySelectorAll('.rover');
    rovers.forEach(rover => rover.remove());

    const cell = document.querySelector(
        `.grid-cell[data-x="${gameState.position[0]}"][data-y="${gameState.height - 1 - gameState.position[1]}"]`
    );
    
    if (cell) {
        const rover = document.createElement('div');
        rover.className = `rover ${gameState.direction}`;
        cell.appendChild(rover);
    }

    if (gameState.power <= 0) {
        document.getElementById('mission-status').textContent = 'Failed: No Power';
        document.getElementById('mission-status').style.color = 'red';
        return false;
    }
    return true;
}


function moveRover() {
    const [x, y] = gameState.position;
    let newX = x, newY = y;

    switch (gameState.direction) {
        case 'N': newY = Math.min(y + 1, gameState.height - 1); break;
        case 'S': newY = Math.max(y - 1, 0); break;
        case 'E': newX = Math.min(x + 1, gameState.width - 1); break;
        case 'W': newX = Math.max(x - 1, 0); break;
    }


    const terrain = gameState.plateau[gameState.height - 1 - newY][newX];
    if (terrain !== 'X') {
        gameState.position = [newX, newY];
        if (terrain === 'C') {
            gameState.power = Math.min(gameState.power + 1, gameState.maxPower);
        } else {
            gameState.power -= terrainCosts[terrain];
        }
    }
}


function rotateRover(command) {
    const currentIndex = directions.indexOf(gameState.direction);
    const newIndex = (currentIndex + (command === 'R' ? 1 : -1) + 4) % 4;
    gameState.direction = directions[newIndex];
    gameState.power--;
}


function startGame() {
    if (gameState.isRunning) return;
    
    const commands = document.getElementById('commands').value.toUpperCase();
    if (!commands.match(/^[LRMP]+$/)) {
        alert('Use only L, R, M, P commands');
        return;
    }

    gameState.isRunning = true;
    let commandIndex = 0;


    const commandInterval = setInterval(() => {
        if (commandIndex >= commands.length || !updateUI()) {
            clearInterval(commandInterval);
            gameState.isRunning = false;
            if (gameState.power > 0) {
                document.getElementById('mission-status').textContent = 'Success';
                document.getElementById('mission-status').style.color = 'green';
            }
            return;
        }

        
        const command = commands[commandIndex++];
        switch (command) {
            case 'L':
            case 'R':
                rotateRover(command);
                break;
            case 'M':
                moveRover();
                break;
            case 'P':
                gameState.power--;
                break;
        }
        updateUI();
    }, 500);
}


document.addEventListener('DOMContentLoaded', () => {
    createGrid();
    document.getElementById('start').addEventListener('click', startGame);
    document.getElementById('reset').addEventListener('click', createGrid);
    
  
    const inputs = ['width', 'height', 'max-power'];
    inputs.forEach(id => {
        document.getElementById(id).addEventListener('change', createGrid);
    });
}); 