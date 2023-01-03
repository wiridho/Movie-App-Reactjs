import React, { useState } from 'react';
import '../Styling/RegistrasiModal.css'
import '../Styling/Navigation.css'
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

// Import icon 
import { BsFillEyeSlashFill, BsFillEyeFill, BsEnvelope } from 'react-icons/bs'
import { CiUser } from "react-icons/ci";

export default function RegistrasiModal({ setToken }) {

	const [show, setShow] = useState(false);
	const handleShow = () => setShow(true);
	const handleClose = () => setShow(false);

	// State for showpassword
	const [showPasswords, setShowPassword] = useState(false)
	const [showPasswordsConfirm, setShowPasswordConfirm] = useState(false)

	//function click icon
	const clickIcon = () => setShowPassword(!showPasswords)

	const clickIconPassConf = () => {
		setShowPasswordConfirm(!showPasswordsConfirm)
	}

	// initial values
	const initialValues = { first_name: '', last_name: '', email: '', password: '', password_confirmation: '' }
	const [formValues, setFormValues] = useState(initialValues)
	const [formError, setFormError] = useState({})

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormValues({ ...formValues, [name]: value })
	}

	const handleSubmit = async (e) => {
		e.preventDefault()
		setFormError(validate(formValues))
		try {
			const request = await axios.post('https://notflixtv.herokuapp.com/api/v1/users', formValues)
			// const responseToken = request.data.data.token
			const dataUser = request.data.data
			localStorage.setItem('token', JSON.stringify(request.data.data.token))
			localStorage.setItem('user', JSON.stringify(dataUser))
			setFormValues({ first_name: "", last_name: "", email: "", password: "", password_confirmation: "" })
			//check token
			const token = localStorage.getItem('token');
			if (token) {
				setToken(true);
			} else {
				setToken(false);
			}
		} catch (error) {
			console.log(error)
		}
	}


	const validate = (values) => {
		const error = {}
		const reg = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
		if (!values.first_name) {
			error.first_name('First Name is required')
		}
		if (!values.last_name) {
			error.last_name('Last Name is required')
		}
		// Check email input
		if (!values.email) {
			error.email = "Email is required!";
		} else if (!reg.test(values.email)) {
			error.email = 'Input a valid email !!!'
		}
		// Check Password input
		if (!values.password) {
			error.password = "Password is required!";
		} else if (values.password.length < 3) {
			error.password = 'Password must be more than 3 characters'
		} else if (values.password !== values.password_confirmation) {
			error.password_confirmation('Password doesnt match')
			error.password('Password doesnt match')
		}
		if (!values.password_confirmation) {
			error.password_confirmation('Password confirmation is required !!!')
		}
		return error;
	}

	return (
		<div>
			<Button className='auth regist	' onClick={handleShow}>Register</Button>
			<Modal
				className='modal_container'
				show={show}
				onHide={handleClose}
				backdrop="static"
				keyboard={false} >

				<div className='modal_body'>
					<Modal.Header closeButton>
						<Modal.Title>Register to your account</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						<Form onSubmit={handleSubmit} >
							{/* FirstName */}
							<Form.Group className="mb-3 form-group" controlId="firstName">
								<Form.Control type="text" placeholder="First Name" name='first_name' value={formValues.first_name} onChange={handleChange} />
								<CiUser className='icon' />
								<p className='text-danger'>{formError.first_name}</p>
							</Form.Group>
							{/* LastName */}
							<Form.Group className="mb-3 form-group" controlId="lastName">
								<Form.Control type="text" placeholder="Last Name" name='last_name' value={formValues.last_name} onChange={handleChange} />
								<CiUser className='icon' />
								<p className='text-danger'>{formError.last_name}</p>
							</Form.Group>
							<Form.Group className="mb-3 form-group" controlId="email">
								<Form.Control type="email" placeholder="Email Adress" name='email' value={formValues.email} onChange={handleChange} />
								<BsEnvelope className='icon' />
								<p className='text-danger'> {formError.email}</p>
							</Form.Group>
							<Form.Group className="mb-3 form-group" controlId="password">
								{(showPasswords === false) ? <BsFillEyeSlashFill className='icon' onClick={clickIcon} /> : <BsFillEyeFill className='icon' onClick={clickIcon} />}
								<Form.Control type={(showPasswords === false) ? 'password' : 'text'} placeholder="Password" onChange={handleChange} name='password' value={formValues.password} />
								<p className='text-danger'> {formError.password}</p>
							</Form.Group>
							<Form.Group className="mb-3 form-group" controlId="passwordConfirmation">
								{(showPasswordsConfirm === false) ? <BsFillEyeSlashFill className='icon' onClick={clickIconPassConf} /> : <BsFillEyeFill className='icon' onClick={clickIconPassConf} />}
								<Form.Control type={(showPasswordsConfirm === false) ? 'password' : 'text'} placeholder="Password Confirmation" onChange={handleChange} name='password_confirmation' value={formValues.password_confirmation} />
								<p className='text-danger'> {formError.password_confirmation}</p>
							</Form.Group>
							<Button variant="danger" type="submit">
								Register
							</Button>
						</Form>
					</Modal.Body>
				</div>
			</Modal>
		</div>
	)
}
