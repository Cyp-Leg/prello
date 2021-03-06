import React from 'react';
import PropTypes from 'prop-types';

// ===== Others
import './style.css';


const DueDate = props => (
    props.isEditingDueDate
        ? (
            <form onSubmit={props.editDate} style={{ marginTop: '5px' }}>
                <div className="row" style={{ marginBottom: '3px' }}>
                    <div className="col-sm-12">
                        <input
                            type="date"
                            name="duedate"
                            className="datepicker form-control form-control-sm"
                        />
                    </div>
                </div>
                <div className="row" style={{ marginBottom: '3px' }}>
                    <div className="col-sm-12">
                        <input
                            type="text"
                            name="time"
                            placeholder="hh:mm"
                            className="timePicker form-control form-control-sm"
                        />
                    </div>
                </div>
                <div className="btn-group">
                    <button type="submit" className="btn btn-sm btn-success">
                        <i className="fas fa-check" />
                    </button>
                    <button
                        className="btn btn-secondary btn-sm"
                        type="reset"
                        onClick={() => props.changeIsEditingDueDate(false)}
                        onKeyPress={() => props.changeIsEditingDueDate(false)}
                    >
                        <i className="fas fa-times updateIcon" />
                    </button>

                </div>
                <small><i className="text-secondary float-right"> 24h format</i></small>
            </form>
        )
        : (
            <button
                className="btn btn-link btn-addElement"
                type="button"
                onClick={() => props.changeIsEditingDueDate(true)}
            >
            Add a due date...
            </button>
        )
);

DueDate.propTypes = {
    isEditingDueDate: PropTypes.bool,
    changeIsEditingDueDate: PropTypes.func.isRequired,
    editDate: PropTypes.func.isRequired,
};

DueDate.defaultProps = {
    isEditingDueDate: false,
};

export default DueDate;
