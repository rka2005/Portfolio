import React from 'react';

const HamburgerButton = ({ isOpen, toggle }) => {
    return (
        <>
            <div className="hamburger-wrapper">
                <div className="container">
                    <input
                        className="label-check"
                        id="label-check"
                        type="checkbox"
                        checked={isOpen}
                        onChange={toggle}
                    />
                    <label htmlFor="label-check" className="hamburger-label">
                        <div className="line1" />
                        <div className="line2" />
                        <div className="line3" />
                        <label />
                    </label>
                </div>
            </div>

            <style>{`
                .hamburger-wrapper {
                    /* Scale down the button slightly to fit the navbar */
                    transform: scale(0.6); 
                    display: flex;
                    align-items: center;
                }

                .container {
                    position: relative;
                }

                .label-check {
                    display: none;
                }

                .hamburger-label {
                    width: 50px;
                    height: 38px;
                    display: block;
                    cursor: pointer;
                    position: relative;
                }

                .hamburger-label div {
                    width: 50px;
                    height: 4px;
                    background-color: #00ffbf;
                    position: absolute;
                    border-radius: 5px;
                }

                .line1 {
                    top: 0;
                    transition: all .3s;
                }

                .line2 {
                    top: 18px; /* Original margin logic converted to absolute positioning for stability */
                    transition: 0.3s;
                    width: 45px; /* Default length */
                }

                .line3 {
                    top: 36px;
                    transition: 0.3s;
                }

                /* Checked States */

                #label-check:checked + .hamburger-label .line1 {
                    transform: rotate(35deg) scaleX(.55) translate(39px, -4.5px);
                    border-radius: 50px 50px 50px 0;
                }

                #label-check:checked + .hamburger-label .line3 {
                    transform: rotate(-35deg) scaleX(.55) translate(39px, 4.5px);
                    border-radius: 0 50px 50px 50px;
                }

                #label-check:checked + .hamburger-label .line2 {
                    border-top-right-radius: 50px;
                    border-bottom-right-radius: 50px;
                    width: 45px;
                }`
            }</style>
        </>
    );
};

export default HamburgerButton;