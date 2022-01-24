import React, {FunctionComponent, useCallback, useState} from "react";
import './App.css';
import {ethers} from 'ethers';
import 'foundation-sites/dist/css/foundation.min.css';
import {Icon, Tag} from "@blueprintjs/core";
import {getRandomIcon} from "./helper";
import {NiftyPassFactoryABI, NiftyPassFactoryAddress} from "./NiftyPassFactory.helper";
import {NiftyPassABI, NiftyPassAddress} from "./NiftyPass.helper";


declare global {
    interface Window {
        ethereum: any;
        web3: any;
    }
}

export type DataState = { account: any, balance: any, events: EventType[] };
export type EventType = {
    address?: any;
    name?: any;
    symbol?: any;
    price?: any;
    supply: any;
    date?: any;
    type?: any;
};

function App() {
    const [name, updateName] = useState<any>('');
    const [date, updateDate] = useState<any>('');
    const [supply, updateSupply] = useState<any>('');
    const [symbol, updateSymbol] = useState<any>('');
    const [price, updatePrice] = useState<any>('');
    const [data, setData] = useState<DataState>({
        account: null,
        balance: null,
        events: []
    });
    const [provider, setProvider] = useState<any>(null);
    const [signer, setSigner] = useState<any>(null);
    const [contract, setContract] = useState<any>(null);


    const loginAddress = useCallback(async () => {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        await provider.send("eth_requestAccounts", []);
        const signer = provider.getSigner();
        const address = await signer.getAddress();
        const balanceWei = await signer.getBalance();
        setProvider(provider);
        setSigner(signer);

        let newData: DataState = {
            account: address,
            balance: ethers.utils.formatUnits(balanceWei, 'ether'),
            events: []
        };

        const factoryContract = new ethers.Contract(NiftyPassFactoryAddress, NiftyPassFactoryABI, provider);
        setContract(factoryContract);
        const activeEvents: string[] = (await factoryContract.getActiveEvents() || []);

        for (let index = 0; index < activeEvents.length; index++) {
            const eventAddress = activeEvents[index];
            //Call the contract event address
            // const eventDetailsContract: any = new ethers.Contract(activeEvents[i], NiftyPassABI, provider);
            // let name = await eventDetailsContract.name();
            // let ticketCounts = await eventDetailsContract.ticketCounts();
            //or Call the factory contract
            const [name, symbol, price, supply]: any = await factoryContract.getEventDetails(eventAddress);


            const newEvent: EventType = {
                name: name,
                symbol: symbol,
                date: '2022-01-01',
                price: price.toString(),
                supply: supply.toString(),
                address: eventAddress,
                type: getRandomIcon(symbol)
            };

            newData.events.push(newEvent);
        }

        setData(newData);
    }, [setData, setProvider, setSigner, setContract]);

    const logout = useCallback(async () => {
        setProvider(null);
        setData({account: null, balance: null, events: []});
    }, [setData, setProvider]);

    const resetForm = useCallback(() => {
        updateName('');
        updateDate('');
        updateSymbol('');
        updateSupply('');
        updatePrice('');
    }, [updateDate, updateName, updateSymbol, updateSupply, updatePrice]);

    const handleSubmit = useCallback(async () => {

        const newEvent: EventType = {
            name: name,
            date: date,
            symbol: symbol,
            price: price,
            supply: supply,
            address: data.account,
        };
        // newEvent.type = getRandomIcon(JSON.stringify(newEvent));


        // setData({
        //     ...data,
        //     events: (data.events || []).concat([newEvent])
        // });
        const signer = provider.getSigner();
        const factoryContract = new ethers.Contract(NiftyPassFactoryAddress, NiftyPassFactoryABI, signer);

        const result = await factoryContract.createNewEvent(
            newEvent.name,
            newEvent.symbol,
            ethers.BigNumber.from(newEvent.price),
            ethers.BigNumber.from(newEvent.supply)
        );
        console.log(result);
        resetForm();
    }, [data, date, name, supply, price, symbol, setData, provider]);

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
                                    <Address address={data.account} type="address"/>{' '}
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
                    <p className="subheader">There is beauty decentralising an event organiser.</p>
                    <p><Address address={NiftyPassFactoryAddress} type="code"/> NiftyPass Factory Contract</p>
                    <p><Address address={NiftyPassAddress} type="code"/> NiftyPass Contract</p>
                    {/*<button className="button">Take a Tour</button>*/}
                    {/*<button className="button">Start a free trial</button>*/}
                </div>
                <div className="show-for-large large-3 columns">

                </div>
                <div className="medium-6 large-5 columns">
                    {data.account && (
                        <div className="callout secondary row">
                            <form onSubmit={handleSubmit}>
                                <div className="medium-6 large-6 columns">
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
                                            <label>What's the symbol?
                                                <input id="event-symbol"
                                                       required
                                                       type="text"
                                                       placeholder="Symbol?"
                                                       value={symbol}
                                                       onChange={e => updateSymbol(e.target.value)}
                                                />
                                            </label>
                                        </div>
                                    </div>
                                </div>
                                <div className="medium-6 large-6 columns">
                                    <div className="row">
                                        {/*<div className="small-12 columns">*/}
                                        {/*    <label>When is the event?*/}
                                        {/*        <input id="event-date"*/}
                                        {/*               required*/}
                                        {/*               type="date"*/}
                                        {/*               placeholder="When is the event?"*/}
                                        {/*               value={date}*/}
                                        {/*               onChange={e => updateDate(e.target.value)}/>*/}
                                        {/*    </label>*/}
                                        {/*</div>*/}
                                        <div className="small-12 columns">
                                            <label>Supply
                                                <input id="event-supply"
                                                       required
                                                       type="number"
                                                       placeholder="Supply"
                                                       value={supply}
                                                       onChange={e => updateSupply(e.target.value)}/>
                                            </label>
                                        </div>
                                        <div className="small-12 columns">
                                            <label>Price
                                                <input id="event-price"
                                                       required
                                                       type="number"
                                                       placeholder="Price"
                                                       value={price}
                                                       onChange={e => updatePrice(e.target.value)}/>
                                            </label>
                                            <button type="submit" className="button">Create now!
                                            </button>
                                        </div>
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
                            <h3 style={{textTransform: 'capitalize'}} title="Event name">{event.name}</h3>
                            <p title="Available tickets"><span className="ticket-count">{event.supply}</span> <Icon
                                icon={event.type}
                                iconSize={40}/>
                                {' '}<small title="Price per ticket">({event.price})</small>

                            </p>
                            {/*<p className="lead">{new Date(event.date).toLocaleDateString()}</p>*/}
                            <p className="subheader">Event under the address <Address
                                type="contract"
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

const Address: FunctionComponent<{
    address: string | undefined,
    type: 'address' | 'tx' | 'contract' | 'code'
}> = ({
          address,
          type
      }) => {
    if (!address) {
        return null;
    }

    let href;

    if (type === 'address') {
        href = `https://rinkeby.etherscan.io/address/${address}`;
    } else if (type === 'contract') {
        href = `https://rinkeby.etherscan.io/address/${address}#internaltx`;
    } else if (type === 'code') {
        href = `https://rinkeby.etherscan.io/address/${address}#code`;
    } else {
        href = `https://rinkeby.etherscan.io/tx/${address}`;
    }

    return (
        <a href={href} target="_blank" className="address-link">
            <Tag title={`Full Address: ${address}`}>
                {address.substr(0, 6)}...{address.substr(-4)}
            </Tag>
        </a>
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
