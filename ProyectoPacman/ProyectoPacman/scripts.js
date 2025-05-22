document.addEventListener('DOMContentLoaded', () => {
    const grid = document.querySelector('.grid');
    const cells = Array.from(grid.querySelectorAll('div'));
    const width = 10;
    let pacmanIndex = 11;
    let pacmanRotation = 0; // variable global para ángulo


    // Variables de Puntaje y Vida

    let score = 0;
    let lives = 3;
    const scoreDisplay = document.getElementById('score');
    const livesDisplay = document.getElementById('lives');

    // CLASS DE FANTASMA

    class Ghost {
        constructor(name, startIndex, className, speed = 500) {
            this.name = name;
            this.currentIndex = startIndex;
            this.className = className;
            this.speed = speed;
            this.timerId = null;
            this.directions = [-1, 1, -width, width];
        }



        draw() {
            cells[this.currentIndex].classList.add('ghost', this.className);
        }

        erase() {
            cells[this.currentIndex].classList.remove('ghost', this.className);
        }

        move() {
            const moveGhost = () => {
                const direction = this.directions[Math.floor(Math.random() * this.directions.length)];
                const nextIndex = this.currentIndex + direction;

                if (
                    !cells[nextIndex].classList.contains('wall') &&
                    !cells[nextIndex].classList.contains('ghost')
                ) {
                    this.erase();
                    this.currentIndex = nextIndex;
                    this.draw();
                } else {
                    moveGhost(); // Intenta moverse de nuevo si choca
                }
            };

            this.timerId = setInterval(moveGhost, this.speed);
        }

    }

    // CREAR FANTASMAS 

    const blinky = new Ghost('blinky', 32, 'red', 500);
    const pinky = new Ghost('pinky', 37, 'pink', 700);
    const greenky = new Ghost('greenky', 38, 'green', 600);
    const ghosts = [blinky, pinky, greenky];

    ghosts.forEach(ghost => {
        ghost.draw();
        ghost.move();
    });

    // Dibujar Pac-Man
    function drawPacMan() {
        cells.forEach(cell => cell.classList.remove('pacman'));
        cells[pacmanIndex].classList.add('pacman');
    }

    drawPacMan();

    //Movimiento Del Teclado
    document.addEventListener('keydown', (e) => {
        cells[pacmanIndex].classList.remove('pacman');

        switch (e.key) {
            case 'ArrowLeft':
                if (pacmanIndex % width !== 0 && !cells[pacmanIndex - 1].classList.contains('wall')) {
                    pacmanIndex -= 1;
                }
                break;
            case 'ArrowRight':
                if (pacmanIndex % width < width - 1 && !cells[pacmanIndex + 1].classList.contains('wall')) {
                    pacmanIndex += 1;
                }
                break;
            case 'ArrowUp':
                if (pacmanIndex - width >= 0 && !cells[pacmanIndex - width].classList.contains('wall')) {
                    pacmanIndex -= width;
                }
                break;
            case 'ArrowDown':
                if (pacmanIndex + width < cells.length && !cells[pacmanIndex + width].classList.contains('wall')) {
                    pacmanIndex += width;
                }
                break;
        }

        drawPacMan();

        checkCollision();

        // Comer punto
        if (cells[pacmanIndex].classList.contains('dot')) {
            cells[pacmanIndex].classList.remove('dot');
            score += 5;
            scoreDisplay.textContent = score;
        }

        // Sistema de Colision

        function checkCollision() {
            if (cells[pacmanIndex].classList.contains('ghost')) {
                lives--;
                livesDisplay.textContent = lives;
                if (lives === 0) {
                    alert('¡Perdiste! Juego reiniciado.');
                    location.reload();
                } else {
                    alert(`Te atraparon. Vidas restantes: ${lives}`);
                    pacmanIndex = 11;
                    drawPacMan();
                }
            }
        }

        // Rotar Packman

        function rotatePacman(direction) {
            let angle = 0;
            switch (direction) {
                case 'ArrowUp': angle = -90; break;
                case 'ArrowDown': angle = 90; break;
                case 'ArrowLeft': angle = 180; break;
                case 'ArrowRight': angle = 0; break;
            }
            cells[pacmanIndex].style.transform = `rotate(${angle}deg)`;
        }

        rotatePacman(e.key);
    });






});