import React, {useCallback, useEffect, useState} from "react";
import './App.css';
import Web3 from 'web3';
import 'foundation-sites/dist/css/foundation.min.css';
import {Menu} from "react-foundation";

function App() {
    const [data, setData] = useState({account: null, events: []});
    const [web3Instance, setWeb3Instance] = useState(null);
    const loginAddress = useCallback(async () => {
        const web3 = new Web3(Web3.givenProvider || "http://localhost:8545");
        setWeb3Instance(web3);
        const accounts = await web3.eth.getAccounts();
        setData({account: accounts[0], events: []});
    }, [setData, setWeb3Instance]);

    const logout = useCallback(async () => {
        setWeb3Instance(null);
        setData({account: null, events: []});
    }, [setData, setWeb3Instance]);

    const createEvent = useCallback(async () => {
        //web3Instance
        setData({account: null, events: []});
    }, [setData, web3Instance]);


    return (
        <div>
            <meta charSet="utf-8"/>
            <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
            <title>Foundation | Welcome</title>
            <link rel="stylesheet" href="https://dhbhdrzi4tiry.cloudfront.net/cdn/sites/foundation.min.css"/>
            {/* Navigation */}
            <div className="title-bar" data-responsive-toggle="realEstateMenu" data-hide-for="small">
                <button className="menu-icon" type="button" data-toggle/>
                <div className="title-bar-title">Menu</div>
            </div>
            <div className="top-bar" id="realEstateMenu">
                <div className="top-bar-left">
                    <ul className="menu" data-responsive-menu="accordion">
                        <li className="menu-text">Event Organiser</li>
                        <li><a href="#">One</a></li>
                        <li><a href="#">Two</a></li>
                        <li><a href="#">Three</a></li>
                    </ul>
                </div>
                <div className="top-bar-right">
                    <ul className="menu">
                        {data.account ? (<>
                                <li className="menu-text">Address: {data.account}</li>
                                <li><a className="button" onClick={() => {
                                    logout();
                                }}>Log out</a></li>
                            </>) :
                            (<>
                                <li><a href="#">No address logged in</a></li>
                                <li><a className="button" onClick={() => {
                                    loginAddress();
                                }}>Login</a></li>
                            </>)}

                    </ul>
                </div>
            </div>
            {/* /Navigation */}
            <br/>
            <div className="row">
                <div className="medium-7 large-6 columns">
                    <h1>Create NFT events</h1>
                    <p className="subheader">There is beauty decentralising an event organiser. Lorem ipsum.</p>
                    <button className="button">Take a Tour</button>
                    <button className="button">Start a free trial</button>
                </div>
                <div className="show-for-large large-3 columns">
                    <img src="https://placehold.it/400x370&text=PSR1257 + 12 C" alt="picture of space"/>
                </div>
                <div className="medium-5 large-3 columns">
                    <div className="callout secondary">
                        <form>
                            <div className="row">
                                <div className="small-12 columns">
                                    <label>When is the event?
                                        <input id="event-date" type="date" placeholder="When is the event?"/>
                                    </label>
                                </div>
                                <div className="small-12 columns">
                                    <label>Available slots
                                        <input id="event-date" type="number" placeholder="Moons required"/>
                                    </label>
                                    <button type="button" onClick={() => {
                                        createEvent();
                                    }} className="button">Create now!
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <div className="row column">
                <hr/>
            </div>
            <div className="row column">
                <p className="lead">All available future events</p>
            </div>
            <div className="row small-up-1 medium-up-2 large-up-3">
                <div className="column">
                    <div className="callout">
                        <p>Pegasi B</p>
                        <p><img src="https://placehold.it/400x370&text=Pegasi B"
                                alt="image of a planet called Pegasi B"/></p>
                        <p className="lead">Copernican Revolution caused an uproar</p>
                        <p className="subheader">Find Earth-like planets life outside the Solar System</p>
                    </div>
                </div>

            </div>
            <footer>
                <div className="row expanded callout secondary">
                    <div className="small-6 large-3 columns">
                        <p className="lead">Offices</p>
                        <ul className="menu vertical">
                            <li><a href="#">One</a></li>
                            <li><a href="#">Two</a></li>
                            <li><a href="#">Three</a></li>
                            <li><a href="#">Four</a></li>
                        </ul>
                    </div>
                    <div className="small-6 large-3 columns">
                        <p className="lead">Solar Systems</p>
                        <ul className="menu vertical">
                            <li><a href="#">One</a></li>
                            <li><a href="#">Two</a></li>
                            <li><a href="#">Three</a></li>
                            <li><a href="#">Four</a></li>
                        </ul>
                    </div>
                    <div className="small-6 large-3 columns">
                        <p className="lead">Contact</p>
                        <ul className="menu vertical">
                            <li><a href="#"><i className="fi-social-twitter"/> Twitter</a></li>
                            <li><a href="#"><i className="fi-social-facebook"/> Facebook</a></li>
                            <li><a href="#"><i className="fi-social-instagram"/> Instagram</a></li>
                            <li><a href="#"><i className="fi-social-pinterest"/> Pinterest</a></li>
                        </ul>
                    </div>
                    <div className="small-6 large-3 columns">
                        <p className="lead">Offices</p>
                        <ul className="menu vertical">
                            <li><a href="#">One</a></li>
                            <li><a href="#">Two</a></li>
                            <li><a href="#">Three</a></li>
                            <li><a href="#">Four</a></li>
                        </ul>
                    </div>
                </div>
                <div className="row">
                    <div className="medium-6 columns">
                        <ul className="menu">
                            <li><a href="#">Legal</a></li>
                            <li><a href="#">Partner</a></li>
                            <li><a href="#">Explore</a></li>
                        </ul>
                    </div>
                    <div className="medium-6 columns">
                        <ul className="menu float-right">
                            <li className="menu-text">Decentralised</li>
                        </ul>
                    </div>
                </div>
            </footer>
        </div>
    );
}

export default App;
