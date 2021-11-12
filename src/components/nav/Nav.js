import {useHistory,Link} from 'react-router-dom';
import {AuthContext} from "../../context/AuthContext";
import Button from "../buttons/Button";
import {useContext} from "react";
import {useForm} from 'react-hook-form';
import './Nav.css';
import {FaSearch, FaPlus, FaUser, FaUserCheck,FaUserTimes,FaUserPlus} from 'react-icons/fa';
/*import images*/
import moviestarslogo from '../../assets/img/moviestarslogo.png';


function Nav({setSearchvalue}) {
    const history=useHistory();
    const {isAuth, logout,isAdmin} = useContext(AuthContext);
    const {register, handleSubmit} = useForm();


    function onFormSubmit(data){
        const{search}=data
      setSearchvalue(search)

    }
console.log(isAdmin);

    return (
        /* nav-element holds all the navigation elements*/
        <nav className="navcontainer">
            {/* nav-beam created for the shape of the beam */}
            <div className="navbeam">
                <Link to="/movies" className="linklogonav"><img src={moviestarslogo} className="logonav" alt="logo"/></Link>
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
                        <Button name="searchbutton" className="navbutton searchbutton" type="submit">
                                    <FaSearch className="icon search"/>
                                    <span className="buttontextspan">search</span>
                        </Button>
                    </form>
                </div>

                {/*buttons with navlinks*/}
                <div id="navbuttons">
                    {!isAuth ?
                        <>
                        <button
                            type="button"
                            onClick={() => history.push('/signin')}
                            name="login"
                            className="navbutton loginbutton">
                            <FaUser className="icon login"/>
                            <span className="buttontextspan logintext">Login</span>
                        </button>
                        <button
                            name="signup"
                            onClick={() => history.push('/signup')}
                            className="navbutton signupbutton">
                            <FaUserPlus className="icon signup"/>
                            <span className="buttontextspan signuptext">signup</span>
                        </button>
                    </>
                    :
                    <>
                        <button
                            name="add-movie"
                            onClick={() => history.push('/addmovie')}
                            className="navbutton addmoviebutton">
                            <FaPlus className="icon search"/>
                            <span className="buttontextspan addmovietext">Add Movie</span>
                        </button>
                        <button
                            name="myprofile"
                            className="navbutton myprofilebutton"
                            onClick={()=>{isAuth && !isAdmin ? history.push('/user/profile'):history.push('/admin/profile')}}>
                            <FaUserCheck className="icon myprofile"/>
                            <span className="buttontextspan myprofiletext">My Profile</span>
                        </button>
                        <button
                            onClick={logout}
                            name="logout"
                            className="navbutton logoutbutton">
                            <FaUserTimes className="icon logout"/>
                            <span className="buttontextspan logouttext">logout</span>
                        </button>
                        </>
                    }
                </div>
            </div>
        </nav>)
}

export default Nav;