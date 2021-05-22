import React from 'react';
import Footer from '../components/Footer.js';
import Navbar from '../components/Navbar.js'
import SearchBar from '../components/SearchBar.js';
import Card1 from '../components/Card1.js';
import Card2 from '../components/Card2'


function Home() {
    return (
        <div>
            <Navbar/>
            <SearchBar/>
            <Card1/>
            <Card2/>
            <Footer/>
           
        </div>
    )
}

export default Home
