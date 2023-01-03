import React, { useEffect, useState } from 'react';
// Stylesheet
import '../Styling/Navigation.css';
import '../Styling/LoginModal.css';
// Import axios
import axios from 'axios';

// Import Icons
import { BsEnvelope, BsFillEyeSlashFill, BsFillEyeFill } from "react-icons/bs";


// React-bootstrap
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

// Login Google
import { GoogleLogin } from '@react-oauth/google';

export default function LoginModal({ setToken }) {

	// State for showpassword
	const [showPasswords, setShowPassword] = useState(false)

	// 
	const initialValues = { email: '', password: '' }
	const [formValues, setFormValues] = useState(initialValues)
	const [formError, setFormError] = useState({})



	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormValues({ ...formValues, [name]: value })
	}


	// show modal 
	const [show, setShow] = useState(false);
	const handleShow = () => setShow(true);
	const handleClose = () => setShow(false);
	//show click icon
	const clickIcon = () => setShowPassword(!showPasswords)



	const handleSubmit = async (e) => {
		e.preventDefault()
		// Validate error
		setFormError(validate(formValues))
		try {
			const request = await axios.post('https://notflixtv.herokuapp.com/api/v1/users/login', formValues)
			const responseToken = request.data.data.token
			const dataUser = request.data.data
			//get token
			localStorage.setItem('token', responseToken)
			//get user data
			localStorage.setItem('user', JSON.stringify(dataUser))
			setFormValues({ email: "", password: "" })
			//check token
			const token = localStorage.getItem('token');
			if (token) {
				setToken(true);
			} else {
				setToken(false);
			}
			handleClose()
		} catch (error) {
			console.log(error)
		}
	}
	useEffect(() => {
	}, [formError])

	const validate = (values) => {
		const error = {}
		const reg = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
		// Check email input
		if (!values.email) {
			error.email = "Email is required!";
		} else if (!reg.test(values.email)) {
			error.email = 'Input a valid email !!!'
		}
		// Check Password input
		if (!values.password) {
			error.email = "Email is required!";
		} else if (values.password.length < 3) {
			error.password = 'Password must be more than 3 characters'
		} else if (values.password.length > 10) {
			error.password = 'Password cannot be longer than 10 characters'
		}
		return error;
	}



	return (
		<>
			<div className=''>
				<Button className='auth login' onClick={handleShow}>Login</Button>
				<Modal
					className='modal_container'
					show={show}
					onHide={handleClose}
					backdrop="static"
					keyboard={false} >
					<div className='modal_body'>
						<Modal.Header closeButton>
							<Modal.Title>Log in to your account</Modal.Title>
						</Modal.Header>
						<Modal.Body>
							{/* Form Start */}
							<Form onSubmit={handleSubmit}>
								<Form.Group className="mb-3 form-group" controlId="email">
									<Form.Control type="email" placeholder="Enter email" onChange={handleChange} name='email' value={formValues.email} />
									<BsEnvelope className='icon' />
									<p className='text-danger'>{formError.email}</p>
								</Form.Group>
								<Form.Group className="mb-3 form-group" controlId="password">
									<Form.Control type={(showPasswords === false) ? 'password' : 'text'} placeholder="Password" onChange={handleChange} name='password' value={formValues.password} />
									<div>
										{(showPasswords === false) ? <BsFillEyeSlashFill className='icon' onClick={clickIcon} /> : <BsFillEyeFill className='icon' onClick={clickIcon} />}
									</div>
									<p className='text-danger'>{formError.password}</p>
								</Form.Group>
								<div className='buttonWrapper'>
									<div className="auth-login">
										<Button className='buttonLogin ' variant="danger" type="submit">
											Login
										</Button>
									</div>
									<div className='auth-google'>
										<GoogleLogin
											onError={() => {
												console.log('Login Failed');
											}}
											onSuccess={responseGoogle => {
												localStorage.setItem('google_user', responseGoogle.credential)
												const token = localStorage.getItem('google_user');
												if (token) {
													setToken(true);
												} else {
													setToken(false);
												}
												handleClose();
											}}
										/>
									</div>
								</div>
							</Form>
							{/* Form End */}
						</Modal.Body>
					</div>
				</Modal>
			</div>
		</>
	)
}
