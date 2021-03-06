import React, { Fragment } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { push } from 'connected-react-router';

// ===== Actions
import { signOut } from '../../actions/auth';

// ===== Others
import logoPrello from '../../assets/logo_prello_white.png';
import './style.css';

class Header extends React.Component {
    constructor(props) {
        super(props);
        this.handleLogOut = this.handleLogOut.bind(this);
    }

    handleLogOut() {
        this.props.signOut();
        this.props.goHome();
    }

    render() {
        const {
            goBoards, goHome, goProfile, goRegister, goSignIn, isLoggedIn,
        } = this.props;
        const element = (
            <div className="header-bar">
                <div className="leftHeader-div">
                    {isLoggedIn
                        ? (
                            <Fragment>
                                <button className="btn btn-header" type="button" onClick={goHome}><i className="fas fa-home" /></button>
                                <button className="btn btn-header" type="button" onClick={goBoards}><i className="fas fa-chalkboard" /></button>
                            </Fragment>
                        ) : (
                            ''
                        )
                    }
                </div>
                <div className="centerHeader-div">
                    <span onClick={goHome} onKeyPress={goBoards} role="link" tabIndex={0}>
                        <img className="prello-logo" src={logoPrello} alt="Logo Prello" />
                    </span>
                </div>
                <div className="rightHeader-div">
                    {isLoggedIn
                        ? (
                            <Fragment>
                                <button className="btn btn-header" type="button" onClick={goProfile}><i className="fas fa-user" /></button>
                                <button className="btn btn-header btn-logout" type="button" onClick={this.handleLogOut}>
                                    <i className="fas fa-sign-out-alt" />
                                </button>
                            </Fragment>
                        ) : (
                            <span style={{ marginRight: '5px' }}>
                                <button
                                    className="btn btn-light"
                                    type="button"
                                    onClick={goRegister}
                                    style={{ height: '40px', margin: '5px 0' }}
                                >
                                Register
                                </button>
                                <button
                                    className="btn btn-dark"
                                    type="button"
                                    onClick={goSignIn}
                                    style={{ height: '40px', margin: '5px 0' }}
                                >
                                Sign In
                                </button>
                            </span>
                        )}
                </div>
            </div>
        );
        return element;
    }
}
Header.propTypes = {
    goBoards: PropTypes.func.isRequired,
    goHome: PropTypes.func.isRequired,
    goProfile: PropTypes.func.isRequired,
    goRegister: PropTypes.func.isRequired,
    goSignIn: PropTypes.func.isRequired,
    isLoggedIn: PropTypes.bool.isRequired,
    signOut: PropTypes.func.isRequired,
};

// Put info from the store state in props
const mapStateToProps = ({ auth }) => ({
    isLoggedIn: auth.isLoggedIn,
});

// Put actions in props
const mapDispatchToProps = dispatch => bindActionCreators(
    {
        goBoards: () => push('/boards'),
        goHome: () => push('/'),
        goProfile: () => push('/profile'),
        goRegister: () => push('/register'),
        goSignIn: () => push('/signin'),
        signOut,
    }, dispatch,
);

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Header);
