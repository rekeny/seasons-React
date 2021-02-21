import React from 'react';
import ReactDOM from 'react-dom';
import SeasonDisplay from './SeasonDisplay';
import Spinner from './Spinner';

class App extends React.Component {
    state = { lat: null, errorMessage: '' }

    componentDidMount() {
        window.navigator.geolocation.getCurrentPosition(
            // refactoring code
            // position => this.setState({ lat: position.coords.latitude });
            position => {
                // we called setState
                this.setState({ lat: position.coords.latitude });

                // we did not
                // this.state.lat = position.coords.latitude;
            },
            // refactoring code
            // err => this.setState({ errorMessage: err.message });
            err => {
                this.setState({ errorMessage: err.message });
            }
        );
    }

    renderContent() {
        if (this.state.errorMessage && !this.state.lat) {
            return <div>Error: { this.state.errorMessage }</div>;
        }

        if (!this.state.errorMessage && this.state.lat) {
            return <SeasonDisplay lat={this.state.lat} />;
        }

        return <Spinner message = "PLease accept location request" />;
    }

    // React says we have to define render!!
    render() {
        return (
            <div className = 'border red'>
                { this.renderContent() }
            </div>
        );
    }
}

ReactDOM.render(
    <App />, 
    document.getElementById('root')
);
