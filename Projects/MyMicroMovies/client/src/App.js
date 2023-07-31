import React, {Fragment, Component} from 'react';
import Movies from "./components/movies";
import {Route, Redirect, Switch} from "react-router-dom";
import Customers from "./components/customers";
import Rentals from "./components/rentals";
import NotFound from "./components/notFound";
import NavBar from "./components/navbar";
import MovieForm from "./components/movieForm";
import Loginform from "./components/loginform";
import RegisterForm from "./components/registerForm";
import "react-toastify/dist/ReactToastify.css";
import './App.css';
import {ToastContainer} from "react-toastify";
import Logout from "./components/logout";
import auth from "./services/authService";
import ProtectedRoute from "./components/common/protectedRoute";

class App extends Component {

    state = {};

    componentDidMount() {
        const user = auth.getCurrentUser();
        this.setState({user});
    }

    render() {
        const {user} = this.state;
        return (
            <Fragment>
                <ToastContainer/>
                <NavBar user={user}/>
                <main className='container'>
                    <Switch>
                        <Route path="/login" component={Loginform}/>
                        <Route path="/register" component={RegisterForm}/>
                        <Route path="/logout" component={Logout}/>
                        <Route path="/movies/:id" component={MovieForm}/>
                        // <ProtectedRoute path="/movies/:id" component={MovieForm}/>
                        <Route
                            path="/movies"
                            render={props => <Movies {...props} user={this.state.user}/>}
                        />
                        <Route path="/customers" component={Customers}/>
                        <Route path="/rentals" component={Rentals}/>
                        <Route path="/not-found" component={NotFound}/>
                        <Redirect from="/" exact to="/movies"/>
                        <Redirect to="/not-found"/>
                    </Switch>
                </main>
            </Fragment>
        );
    }
}

export default App;
