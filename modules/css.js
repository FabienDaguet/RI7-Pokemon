"use-strict";

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