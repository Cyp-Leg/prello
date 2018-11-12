/* eslint-disable no-nested-ternary */
import React from 'react';
import PropTypes from 'prop-types';


// Component
import NewPasswordForm from './NewPasswordForm';
import DeleteAccountForm from './DeleteAccountForm';

// ===================
import './style.css';

const settingsDisplay = (isDeleteVisible, visible, hidden) => {
    if (isDeleteVisible) {
        return visible;
    }
    return hidden;
};

const SettingsTab = props => (
    <div className="settingsPanel">
        {(props.isPasswordVisible) ? (
            <div className="settings">
                <div className="changePassword">
                    <div>
                        <button className="btn btn-primary closeForm" type="button" onClick={() => props.displayPasswordForm(false)}>X</button>
                        <NewPasswordForm handleUpdatePassword={props.handleModifyingPassword} />
                    </div>
                </div>
            </div>
        ) : (
            settingsDisplay(props.isDeleteVisible,
                (
                    <div className="deleteAccountForm">
                        <DeleteAccountForm
                            displayDeleteForm={props.displayDeleteForm}
                            handleDeleteAccount={props.handleDeletingAccount}
                        />
                    </div>
                ), (
                    <div className="settingsList">
                        <div className="settingBlock">
                            <h5>
                                <button className="btn btn-primary" type="button" onClick={() => props.displayPasswordForm(true)}>Change</button>
                                {' '}
                                your password
                            </h5>
                        </div>

                        <div className="settingBlock">
                            <h5 style={{ marginBottom: 0 }}>
                                <button className="btn btn-danger" type="button" onClick={() => props.displayDeleteForm(true)}>Delete</button>
                                {' '}
                                your account
                            </h5>
                            <p className="text-danger">(Careful, this is definitive)</p>
                        </div>
                    </div>
                ))
        )

            /**

            props.isUpdateVisible ? (

            <div className="settings">
                <div className="changePassword">
                    <div>
                        <button className="btn btn-primary closeForm" type="button" onClick={() => props.displayPasswordForm(false)}>X</button>
                        <NewPasswordForm handleUpdatePassword={props.handleModifyingPassword} />
                    </div>
                </div>
            </div>


        ) : (
            props.isDeleteVisible ? (
                <div className="settings">
                    <div className="changePassword">
                        <h5>Delete</h5>
                        <button className="btn btn-primary" type="button" onClick={() => props.displayDeleteForm(true)}>Close</button>

                        <button className="btn btn-danger" type="button" onClick={() => props.handleDeletingAccount(true)}>Delete</button>
                    </div>
                </div>
            ) : (
                <div className="settings">
                    <div className="changePassword">
                        <h5>Change your password</h5>
                        <button className="btn btn-primary" type="button" onClick={() => props.displayPasswordForm(false)}>Change</button>
                    </div>

                    <br />
                    <hr />
                    <br />

                    <div className="deleteAccount">
                        <div>
                            <h5>Delete your account</h5>
                            <p>(Careful, this is definitive)</p>
                        </div>

                        <button className="btn btn-danger" type="button" onClick={() => props.displayDeleteForm(false)}>Delete</button>
                    </div>
                </div>
            )
            */


        }
    </div>
);

SettingsTab.propTypes = {
    isDeleteVisible: PropTypes.bool.isRequired,
    displayDeleteForm: PropTypes.func.isRequired,
    handleDeletingAccount: PropTypes.func.isRequired,

    isPasswordVisible: PropTypes.bool.isRequired,
    displayPasswordForm: PropTypes.func.isRequired,
    handleModifyingPassword: PropTypes.func.isRequired,
};
SettingsTab.defaultProps = {
};

export default SettingsTab;
