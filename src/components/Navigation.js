import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import '../Styling/Navigation.css'
import '../Styling/app.css'
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import LoginModal from './LoginModal'
import RegistrasiModal from './RegistrasiModal';



export default function Navigation() {
	const [token, setToken] = useState(false)
	const [search, setSearch] = useState('')
	const navigate = useNavigate()

	const usernameGoogle = 'Google_User'

	const handleSubmit = () => {
		navigate(`/search/${search}`)
	}

	const handleLogout = (e) => {
		e.preventDefault()
		setToken(false)
		localStorage.clear()
		window.location.reload()
	}

	const userData = JSON.parse(localStorage.getItem('user'))
	const tokenGoogle = localStorage.getItem('google_user')
	console.log(userData)


	useEffect(() => {
		if (userData || tokenGoogle) {
			setToken(true)
		}
		// eslint-disable-next-line
	}, [])


	return (
		<div className=''>
			<Navbar className='wrapper-nav'>
				<Container className='navbar-container'>
					<Nav className="navbar-nav w-100 d-flex justify-content-between align-items-center">
						<Navbar.Brand href="/" className="mt-3">
							<img
								src="/logomovie.svg"
								width="180"
								className="align-top"
								style={{ marginTop: '-10px' }}
								alt="Movie List" />
						</Navbar.Brand>
						<div className='nav-link'>
							<Form onSubmit={handleSubmit}>
								<InputGroup className='input-group'>
									<Form.Control
										className="input-search"
										placeholder="What do you want to watch?"
										aria-label="Recipient's username"
										aria-describedby="basic-addon2"
										onChange={(e) => setSearch(e.target.value)}
									/>
								</InputGroup>
							</Form>
						</div>
						<div className='nav-link'>
							{token ? (
								<>
									<div className='profil'>
										<img className='image' src={userData ? `https://ui-avatars.com/api/?name=${userData.first_name} + ${userData.last_name}` : 'https://ui-avatars.com/api/?name=Google&User'} width="40" height="40" alt="" />
										<span className='name' style={{ color: 'white' }}>{userData ? userData.first_name : usernameGoogle}</span>
										<Button className='logout' variant='danger' size='sm' onClick={handleLogout}>Logout</Button>
									</div>
								</>
							) :
								<>
									<div className='nav-link buttonAuth'>
										<LoginModal setToken={setToken} />
										<RegistrasiModal setToken={setToken} />
									</div>
								</>}
						</div>
					</Nav>
				</Container>
			</Navbar>
		</div>
	)
}
