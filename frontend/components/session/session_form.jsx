import React from 'react';
import { Link, withRouter } from 'react-router';

class SessionForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = { username: "", password: "" };
		this.handleSubmit = this.handleSubmit.bind(this);
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

	render() {
		return (
			<div className="login-form-container">
				<h1 className="auth-header">Rate My Employer</h1>
				<form onSubmit={this.handleSubmit} className="login-form-box">
					{this.title()}
					{this.renderErrors()}
					<div className="login-form">
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
					<Link className="login-home" to="/home">Continue to site!</Link>
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
