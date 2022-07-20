import React, { Component } from 'react';
import './App.css';
import GuestList from './GuestList';
import Counter from './Counter';

class App extends Component {

    state = {
        isFiltered: false,
        pendingGuest: "",
        guests: [
            /*{
                name: 'Treasure',
                isConfirmed: false,
                isEditing: false
            },
            {
                name: 'Nic',
                isConfirmed: true,
                sEditing: false
            },
            {
                name: 'Matt K',
                isConfirmed: true,
                sEditing: true
            }*/
        ]
    };

    lastGuestId = 0;

    newGuestId = () => {
        const id = this.lastGuestId;
        this.lastGuestId += 1;
        return id;
    }

    toggleGuestProperty = (property, id) =>
        this.setState({
            guests: this.state.guests.map(guest => {
                if (id === guest.id) {
                    return{
                        ...guest,
                        [property]: !guest[property]
                    };
                }
                return guest;
            })
        });

    toggleConfirmation = id =>
        this.toggleGuestProperty("isConfirmed", id);

    toggleEditing = id =>
        this.toggleGuestProperty("isEditing", id);

    removeGuest = id =>
        this.setState({
            guests: this.state.guests.filter(guest => id !== guest.id)
            
        });

    setName = (name, id) =>
        this.setState({
            guests: this.state.guests.map((guest, index) => {
                if (id === guest.id) {
                    return{
                        ...guest,
                        name
                    };
                }
                return guest;
            })
        });

    toggleFilter = () =>
        this.setState({ isFiltered: !this.state.isFiltered });

    handleNameInput = e =>
        this.setState({pendingGuest: e.target.value });
    
    newGuestSubmitHandler = e => {
        e.preventDefault();
        const id = this.newGuestId();
        this.setState({
            guests: [
                {
                    name: this.state.pendingGuest,
                    isConfirmed: false,
                    isEditing: false,
                    id
                },
                ...this.state.guests
            ],
            pendingGuest: ''
        });
    }

    getTotalInvited = () => this.state.guests.length;
    getAttendingGuests = () =>
        this.state.guests.reduce(
            (total, guest) => guest.isConfirmed ? total + 1 : total,
            0
        );
    //getUnconfirmedGuests = () =>
    
    render(){
        const totalInvited = this.getTotalInvited();
        const numberAttending = this.getAttendingGuests();
        const numberUnconfirmed = totalInvited - numberAttending;
        return (
            <div className="App">
            <header>
                <h1>RSVP</h1>
                <p>A Treehouse App</p>
                <form onSubmit={this.newGuestSubmitHandler}>
                    <input type="text" onChange={this.handleNameInput} value={this.state.pendingGuest} placeholder="Invite Someone" />
                    <button type="submit" name="submit" value="submit">Submit</button>
                </form>
            </header>
            <div className="main">
                <div>
                <h2>Invitees</h2>
                <label>
                    <input type="checkbox" onChange={this.toggleFilter} checked={this.state.isFiltered} /> Hide those who haven't responded
                </label>
                </div>
                <Counter 
                    totalInvited={totalInvited}
                    numberAttending={numberAttending}
                    numberUnconfirmed={numberUnconfirmed} />
                
                <GuestList 
                    guests={this.state.guests}
                    toggleConfirmation={this.toggleConfirmation} 
                    toggleEditing={this.toggleEditing} 
                    setName={this.setName}
                    isFiltered={this.state.isFiltered}
                    removeGuest={this.removeGuest}
                    pendingGuest={this.state.pendingGuest}
                />  
            </div>
            </div>
        );
    }
}

export default App;
