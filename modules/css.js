"use-strict";
let buttons = document.querySelectorAll('.button-header');
let pokedex = document.querySelector('.card-container');
let arena = document.querySelector('.arenaContainer');

export function appear(card) {
    let fader = card;
    let appearOptions = {
        rootMargin: '0px',
        threshold: 1
    };

    let setItemActive =(entries => {
        //console.log(entries)
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('appear')
            } 
        })
    });

    let observer = new IntersectionObserver(setItemActive, appearOptions);

    observer.observe(fader);
}

export function zoom(event) {
    let myTarget = event.currentTarget;
    myTarget.classList.add('up')
}

export function translateCard(event) {
    let myTarget = event.currentTarget
    let rect = myTarget.getBoundingClientRect();
    let vh = rect.top / window.innerHeight;
    let vw = rect.left / window.innerWidth;
    let y = vh.toPrecision(2) * 100
    let x = vw.toPrecision(2) * 100
    let dynamicStyles = null;

    myTarget.style.animation = 'up 0.5 ease forward';
    myTarget.style.top = y;
    myTarget.style.left = x;

    function addAnimation(body) {
        if (!dynamicStyles) {
            dynamicStyles = document.createElement('style');
            dynamicStyles.type = 'text/css';
            document.head.appendChild(dynamicStyles);
        }
    
        dynamicStyles.sheet.insertRule(body, dynamicStyles.length);
    }

    addAnimation(`
        @keyframes up { 
            0% {
                transform-origin: center; 
            }
            50% {
                box-shadow: 10px 10px 10px rgba(69, 69, 69, 0.817);
            }
            100% {
                transform: perspective(200px) translate3d(-1rem, -1rem, 1rem); 
                z-index: 3;
            }
        }
    `);
    
    addAnimation(`
        @keyframes translate { 
            0% {
                top: `+y+`%; 
                left: `+x+`%; 
            }
            50% {
                position: fixed; 
                z-index: 5
            }
            100% {
                position: fixed; 
                top: 50%; 
                left: 50%; 
                transform: translate(-50%, -50%);
                z-index: 5;
            }
        }
    `);

    addAnimation(`
        @keyframes translateBack { 
            0% {
                position: absolute; 
                top: 50%; 
                left: 50%; 
                transform: translate(-50%, -50%);
                z-index: 5;
            }
            50% {
                position: absolute; 
                z-index: 5
            }
            100% {
                top: `+y+`%; 
                left: `+x+`%; 
            }
        }
    `);
}

/* function view(event) {
    myTarget = event.currentTarget;
    if(myTarget.classList.contains('button-arena')) {
        pokedex.classList.add('hidden');
        arena.classList.remove('hidden');
    } else if(myTarget.classList.contains('button-poke')) {
        arena.classList.add('hidden');
        pokedex.classList.remove('hidden');
    }
}

buttons.addEventListener('click', view) */