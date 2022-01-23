import React, {FunctionComponent, useCallback, useState} from "react";
import './App.css';
import {ethers} from 'ethers';
import 'foundation-sites/dist/css/foundation.min.css';
import {Icon, Tag} from "@blueprintjs/core";
import {getRandomIcon} from "./helper";

declare global {
    interface Window {
        ethereum: any;
        web3: any;
    }
}

function App() {
    const [name, updateName] = useState<any>('');
    const [date, updateDate] = useState<any>('');
    const [value, updateValue] = useState<any>('');
    const [data, setData] = useState<any>({account: null, balance: null, events: []});
    const [provider, setProvider] = useState<any>(null);


    const loginAddress = useCallback(async () => {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        await provider.send("eth_requestAccounts", []);
        const signer = provider.getSigner();
        const address = await signer.getAddress();
        const balanceWei = await signer.getBalance();
        setProvider(provider);

        setData({
            account: address,
            balance: ethers.utils.formatUnits(balanceWei, 'ether'),
            events: []
        });
    }, [setData, setProvider]);
    const logout = useCallback(async () => {
        setProvider(null);
        setData({account: null, events: []});
    }, [setData, setProvider]);

    const resetForm = useCallback(async () => {
        updateName('');
        updateDate('');
        updateValue('');
    }, [updateDate, updateName, updateValue]);
    const handleSubmit = useCallback(async () => {
        //web3Instance
        const newEvent: any = {
            name: name,
            date: date,
            value: value,
            address: data.account,
        };
        newEvent.type = getRandomIcon(JSON.stringify(newEvent));

        setData({
            ...data,
            events: (data.events || []).concat([newEvent])
        });

        resetForm();
    }, [data, date, name, value, setData, provider]);

    return (
        <div>
            <link rel="stylesheet" href="https://dhbhdrzi4tiry.cloudfront.net/cdn/sites/foundation.min.css"/>
            {/* Navigation */}
            <div className="title-bar" data-responsive-toggle="realEstateMenu" data-hide-for="small">
                <button className="menu-icon" type="button" data-toggle/>
                <div className="title-bar-title">Menu</div>
            </div>
            <div className="top-bar" id="realEstateMenu">
                <div className="top-bar-left">
                    <ul className="menu" data-responsive-menu="accordion">
                        <li className="menu-text">NiftyPass</li>
                    </ul>
                </div>
                <div className="top-bar-right">
                    <ul className="menu">
                        {data.account ? (<>
                                <li className="menu-text top">
                                    <Address address={data.account}/>{' '}
                                    <Currency value={data.balance}/>
                                </li>
                                <li><a className="button" onClick={() => {
                                    logout();
                                }}>Disconnect</a></li>
                            </>) :
                            (<>
                                <li className="menu-text">No address logged in</li>
                                <li><a className="button" onClick={() => {
                                    loginAddress();
                                }}>Connect Wallet</a></li>
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
                    {/*<button className="button">Take a Tour</button>*/}
                    {/*<button className="button">Start a free trial</button>*/}
                </div>
                <div className="show-for-large large-3 columns">
                    <img src="https://placehold.it/400x370&text=PSR1257 + 12 C" alt="picture of space"/>
                </div>
                <div className="medium-5 large-3 columns">
                    {data.account && (
                        <div className="callout secondary">
                            <form onSubmit={handleSubmit}>
                                <div className="row">
                                    <div className="small-12 columns">
                                        <label>What's the name?
                                            <input id="event-name"
                                                   required
                                                   type="text"
                                                   placeholder="Event name?"
                                                   value={name}
                                                   onChange={e => updateName(e.target.value)}
                                            />
                                        </label>
                                    </div>
                                    <div className="small-12 columns">
                                        <label>When is the event?
                                            <input id="event-date"
                                                   required
                                                   type="date"
                                                   placeholder="When is the event?"
                                                   value={date}
                                                   onChange={e => updateDate(e.target.value)}/>
                                        </label>
                                    </div>
                                    <div className="small-12 columns">
                                        <label>Available slots
                                            <input id="event-value"
                                                   required
                                                   type="number"
                                                   placeholder="Value"
                                                   value={value}
                                                   onChange={e => updateValue(e.target.value)}/>
                                        </label>
                                        <button type="submit" className="button">Create now!
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    )}
                </div>
            </div>
            <div className="row column">
                <hr/>
            </div>
            <div className="row column">
                <p className="lead">All available future events</p>
            </div>
            <div className="row small-up-1 medium-up-2 large-up-3">
                {data.events?.map((event: any, index: number) => (
                    <div className="column" key={index}>
                        <div className="callout">
                            <h3 style={{textTransform: 'capitalize'}}>{event.name}</h3>
                            <p><Icon icon={event.type} iconSize={40}/></p>
                            <p className="lead">{new Date(event.date).toLocaleDateString()}</p>
                            <p className="subheader">Event under the address <Address
                                address={event.address}/></p>
                        </div>
                    </div>
                ))}
            </div>
            <footer>
                <div className="row expanded callout secondary">
                    <div className="small-6 large-3 columns">
                        <p className="lead">Offices</p>
                        <ul className="menu vertical">
                            <li><a href="#">Fully Remote</a></li>
                        </ul>
                    </div>

                    <div className="small-6 large-3 columns">
                        <p className="lead">Contact</p>
                        <ul className="menu vertical">
                            <li><a href="#"><i className="fi-social-twitter"/> Twitter</a></li>
                            <li><a href="#"><i className="fi-social-facebook"/> Facebook</a></li>
                            <li><a href="#"><i className="fi-social-instagram"/> Instagram</a></li>
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

const Address: FunctionComponent<{ address: string | undefined }> = ({address}) => {
    if (!address) {
        return null;
    }

    return (
        <Tag title={`Full Address: ${address}`}>
            {address.substr(0, 6)}...{address.substr(-4)}
        </Tag>
    );
};

const Currency: FunctionComponent<{ value: any | undefined }> = ({value}) => {
    if (!value) {
        return null;
    }

    return (
        <span title={`Full ETH: ${value}`}>
            {Math.floor(value * 1000) / 1000} ETH
        </span>
    );
};

export default App;
