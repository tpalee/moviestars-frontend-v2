import {useHistory, Link} from 'react-router-dom';
import {AuthContext} from "../../context/AuthContext";
import Button from "../buttons/Button";
import {useContext} from "react";
import {useForm} from 'react-hook-form';
import './Nav.css';
import {FaSearch, FaPlus, FaUser, FaUserCheck, FaUserTimes, FaUserPlus} from 'react-icons/fa';
/*import images*/
import moviestarslogo from '../../assets/img/moviestarslogo.png';


function Nav({setSearchvalue}) {
    const history = useHistory();
    const {isAuth, user, logout, isAdmin} = useContext(AuthContext);
    const {register, handleSubmit} = useForm();


    function onFormSubmit(data) {
        const {search} = data
        setSearchvalue(search)

    }

    console.log(isAdmin);

    return (
        /* nav-element holds all the navigation elements*/
        <nav className="navcontainer">
            {/* nav-beam created for the shape of the beam */}
            <div className="navbeam">
                <Link to="/movies" className="linklogonav"><img src={moviestarslogo} className="logonav"
                                                                alt="logo"/></Link>
            </div>
            {/*  holds all the navigation forms and buttons*/}
            <div className="navigation">

                {/* search form*/}
                <div id="search-sort-container">
                    <form id="searchcontainer" onSubmit={handleSubmit(onFormSubmit)}>
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
                </div>

                {/*buttons with navlinks*/}
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
                            <Button
                                handleClick={() => history.push('/addmovie')}
                                className="green-btn">
                                <FaPlus className="icon plus"/>
                                <span className="btn-txt add-txt">Add Movie</span>
                            </Button>
                            <Button
                                className="orange-btn"
                                handleClick={() => {
                                    isAuth && !isAdmin ? history.push(`/user/userdetails/${user.username}`) : history.push('/admin/profile')
                                }}>
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