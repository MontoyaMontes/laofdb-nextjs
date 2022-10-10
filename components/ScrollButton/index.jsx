import React, { useState, useEffect } from 'react';

export default function ScrollButton() {

    const [visible, setVisible] = useState(false)

    useEffect(function mount() {
        function onScroll() {
            console.log("scroll!");
        }

        window.addEventListener("scroll", toggleVisible);

        return function unMount() {
            window.removeEventListener("scroll", toggleVisible);
        };
    });

    const toggleVisible = () => {
        if (document !== undefined) {
            const scrolled = document.documentElement.scrollTop;
            if (scrolled > 200) {
                setVisible(true)
            }
            else if (scrolled <= 200) {
                setVisible(false)
            }
        }

    };

    const scrollToTop = () => {
        if (window !== undefined) {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        }
    };

    return (
        <button
            className="btn btn-danger"
            onClick={scrollToTop}
            style={{ display: visible ? 'inline' : 'none' }}
        >
            Llevame arriba!
        </button>
    );
}
