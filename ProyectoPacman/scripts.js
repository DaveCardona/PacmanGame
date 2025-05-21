document.addEventListener('DOMContentLoaded', () => {
    const grid  = document.querySelector('.grid');
    const cells = Array.from(grid.querySelectorAll('div'));
    const width = 10;
    let pacmanIndex = 11;

    // CLASS DE FANTASMA

    class Ghost {
        constructor(name, startIndex, className, speed = 500){
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

    erase () {
        cells[this.currentIndex].classList.remove('ghost', this.className);
    }

    move () {
        const moveGhost = () => {
            const direction = this.directions[Math.floor(Math.random() * this.directions.length)];
            const nextIndex = this.currentIndex +  direction;

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

    const blinky = new Ghost('blinky',32, 'red', 500);
    const pinky = new Ghost('pinky',37, 'pink', 700);
    const greenky = new Ghost('greenky',38, 'green', 600);
    const ghosts = [blinky,pinky,greenky];

    ghosts.forEach(ghost => {
        ghost.draw();
        ghost.move();
    });
    
})