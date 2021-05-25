import React from 'react';
import Footer from '../components/Footer.js';
import Navbar from '../components/Navbar.js'
import SearchBar from '../components/SearchBar.js';
import Card1 from '../components/Card1.js';
import Card2 from '../components/Card2'
import DoctorCarousel from '../components/DoctorCarousel.js';


function Home(props) {
    console.log(props)
    return (
        <div>
            <Navbar loggedIn={false} />
            <SearchBar/>
            <Card1/>
            <Card2/>
            <DoctorCarousel/>
            <Footer/>
           
        </div>
    )
}

export default Home
