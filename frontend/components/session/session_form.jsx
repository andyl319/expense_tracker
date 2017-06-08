import React from 'react';
import { Link, withRouter } from 'react-router';

class SessionForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = { username: "", password: "", admin: "" };

		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleRadio = this.handleRadio.bind(this);
	}

	componentDidUpdate() {
		this.redirectIfLoggedIn();
	}

	redirectIfLoggedIn() {
		if (this.props.loggedIn) {
			this.props.router.push("/");
		}
	}

	update(field) {
		return e => this.setState({
			[field]: e.currentTarget.value
		});
	}

	handleSubmit(e) {
		e.preventDefault();

		const user = this.state;
		this.props.processForm({user});
	}

	navLink() {
		if (this.props.formType === "login") {
			return <Link onClick={this.clearErrors} className="auth-form-toggle" to="/signup">sign up instead</Link>;
		} else {
			return <Link onClick={this.clearErrors} className="auth-form-toggle" to="/login">log in instead</Link>;
		}
	}

	clearErrors(){
		let errors = document.getElementsByClassName("auth-errors");
		if(errors){
				errors[0].innerHTML = "";
				errors[1].innerHTML = "";
		}
	}

	title(){
		if (this.props.formType === "login") {
			return <div className="login-title">Log In</div>;
		} else {
			return <div className="login-title">Sign Up</div>;
		}
	}

	renderErrors() {
		return(
			<ul className="auth-err-container">
				{this.props.errors.map((error, i) => (
					<li className="auth-errors" key={`error-${i}`}>
						{error}
					</li>
				))}
			</ul>
		);
	}

	handleRadio(e){
		if(e.target.value === "true"){
			this.setState({admin: true});
		} else {
			this.setState({admin: false});
		}

	}

	toggleRadioButtons() {
		if (this.props.formType === 'login') {
			return ;
		} else {
			return (
				<div className="radio-buttons">
					<div className="account-type">Type of account: </div>
					<div className="account-type-label">
						<input type="radio" onChange={this.handleRadio} name="admin" value="true"/>
						<div className="type-label">Admin</div>
					</div>
					<div className="account-type-label">
						<input type="radio" onChange={this.handleRadio} name="admin" value="false"/>
						<div className="type-label">Basic</div>
					</div>
				</div>
			);
		}
	}

	render() {

		return (
			<div className="login-form-container">
				<form onSubmit={this.handleSubmit} className="login-form-box">
					{this.title()}
					{this.renderErrors()}
					<div className="login-form">
						{this.toggleRadioButtons()}
						<input type="text"
							value={this.state.username}
							onChange={this.update("username")}
							className="login-input"
							placeholder="Username"/>
						<input type="password"
							value={this.state.password}
							onChange={this.update("password")}
							className="login-input"
							placeholder="Password"/>
						<input className="login-submit" type="submit" value="Submit" />
					</div>
					<div className="auth-question-toggle">
						<div>Please {this.props.formType} or</div>
						{this.navLink()}
					</div>
				</form>
			</div>
		);
	}

}

export default withRouter(SessionForm);
