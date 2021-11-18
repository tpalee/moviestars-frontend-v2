import {useState} from "react";
import './App.css';
import PrivateRoute from "./components/privateroute/PrivateRoute";
import PrivateAdminRoute from "./components/privateroute/PrivateAdminRoute";
import {
    Switch,
    Route,
} from 'react-router-dom';
import Nav from "./components/nav/Nav";

import Movies from "./pages/movies/Movies";
import Signin from "./pages/login/Signin";
import Signup from "./pages/signup/Signup";
import AddMovie from "./pages/addmovie/AddMovie";
import UserProfile from "./pages/profile/UserProfile";
import AdminProfile from "./pages/profile/AdminProfile";
import MovieDetails from "./pages/movieDetails/MovieDetails";
import AddReview from "./pages/addReview/AddReview";
import UpdateReview from "./pages/updateReview/UpdateReview";
import UserDetails from "./pages/userdetails/UserDetails";
import UpdateUser from "./pages/updateUser/UpdateUser";
import UpdateMovie from "./pages/updateMovie/UpdateMovie";



function App() {
    const [searchvalue, setSearchvalue] = useState(null);

    return (
        <div className="App">
            <header>
                <Nav searchvalue={searchvalue} setSearchvalue={setSearchvalue}/>
            </header>
            <main>
                <Switch>
                    <Route exact path="/movies"><Movies/></Route>
                    <Route path="/movies/:movieId"><MovieDetails/></Route>
                    <Route path="/signin"><Signin/></Route>
                    <Route path="/signup"><Signup/></Route>
                    <PrivateRoute path="/addmovie"><AddMovie/></PrivateRoute>
                    <PrivateRoute path="/profile"><UserProfile/></PrivateRoute>
                    <PrivateRoute path="/addreview"><AddReview/></PrivateRoute>
                    <PrivateRoute path="/updatereview/:reviewId"><UpdateReview/></PrivateRoute>
                    <PrivateRoute path="/user/profile"><UserProfile/></PrivateRoute>
                    <PrivateRoute path="/updateuser/:userId"><UpdateUser/></PrivateRoute>
                    <PrivateRoute path="/updatemovie/:updateMovieId"><UpdateMovie/></PrivateRoute>
                    <PrivateAdminRoute path="/admin/profile"><AdminProfile/></PrivateAdminRoute>
                        <PrivateRoute path="/user/userdetails/:userId"><UserDetails/></PrivateRoute>
                </Switch>
            </main>


        </div>

    );
}

export default App;
