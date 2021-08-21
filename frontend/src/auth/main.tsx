import React from 'react';
import './main.scss';
import Header from '../components/header';
import SideBar from '../components/sideBar';

function Main() {
	return (
		<>
			<Header/>
			<section>
				<SideBar/>
			</section>
		</>
	);
}

export default Main;