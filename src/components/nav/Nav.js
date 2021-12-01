import {useHistory, Link} from 'react-router-dom';
import Button from "../buttons/Button";
import {useContext} from "react";
import {useForm} from 'react-hook-form';
import {AuthContext} from "../../context/AuthContext";
import './Nav.css';
import {FaSearch, FaPlus, FaUser, FaUserCheck, FaUserTimes, FaUserPlus,FaHome} from 'react-icons/fa';
import moviestarslogo from '../../assets/img/moviestarslogo.png';


function Nav() {
    const history = useHistory();
    const {isAuth, user, logout, isAdmin} = useContext(AuthContext);
    const {register, handleSubmit} = useForm();

    function onFormSubmit(data) {
        const {search} = data;
        history.push('/movies/search',{search});
    }


    return (
        <nav className="navcontainer">
            {/* nav-beam created for the shape of the beam */}
            <div className="navbeam">
                <Link
                    to="/movies"
                    className="linklogonav">

                    <img
                        src={moviestarslogo}
                        className="logonav"
                        alt="logo"/>

                </Link>

            </div>

            <div className="navigation">

                <div id="search-home-cont">

                    <form id="searchcontainer"
                          onSubmit={handleSubmit(onFormSubmit)}>

                        <label htmlFor="search">

                            <input type="text"
                                   id="searchmovieinput"
                                   name="search"
                                   placeholder="search movietitle"
                                   {...register("search")}
                            />

                        </label>

                        <Button
                            type="submit"
                            className="orange-btn search-btn">

                            <FaSearch className="icon search"/>

                            <span className="btn-txt search-txt">search</span>

                        </Button>

                    </form>

                    <Button
                        type="button"
                        className="orange-btn home-btn"
                        handleClick={()=>{history.push('/movies')}}
                    >
                        <FaHome className="icon home"/>

                        <span className="btn-txt home-txt">home</span>

                    </Button>

                </div>

                {/*buttons with navlinks, only showing when user is signed in*/}
                <div id="navbuttons">

                    {!isAuth ?
                        <>
                            <Button
                                type="button"
                                handleClick={() => history.push('/signin')}
                                className="orange-btn">

                                <FaUser className="icon signin"/>

                                <span className="btn-txt signin-txt">Sign in</span>

                            </Button>

                            <Button
                                type="button"
                                handleClick={() => history.push('/signup')}
                                className="green-btn">

                                <FaUserPlus className="icon signup"/>

                                <span className="btn-txt signup-txt">Sign up</span>

                            </Button>
                        </>
                        :
                        <>

                            {/*buttons with navlinks, only showing when user is NOT signed in*/}
                            <Button
                                handleClick={() => history.push('/addmovie')}
                                className="green-btn">

                                <FaPlus className="icon plus"/>

                                <span className="btn-txt add-txt">Add Movie</span>

                            </Button>

                            <Button
                                className="orange-btn"
                                handleClick={() => {
                                    isAuth && !isAdmin ? history.push(`/user/userdetails/${user.username}`)
                                        :
                                        history.push('/admin/profile')
                                }}
                            >

                                <FaUserCheck className="icon myprofile"/>

                                <span className="btn-txt profile-txt">My Profile</span>

                            </Button>

                            <Button
                                className="orange-btn"
                                handleClick={logout}>

                                <FaUserTimes className="icon logout"/>

                                <span className="btn-txt logout-txt">logout</span>

                            </Button>

                        </>
                    }

                </div>

            </div>

        </nav>)
}

export default Nav;