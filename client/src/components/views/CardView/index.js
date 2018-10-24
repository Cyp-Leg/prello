import React from 'react';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Card from '../../../models/Card';

import './style.css';

const CardView = props => (
    <div className="card" key={props.card.id}>
        <div className="cardContent">
            <div>
                <b>
                    #
                    {props.card.id}
                    {' '}
                    -
                    {' '}
                    {props.card.name}
                </b>
                <p className="cardDescription">{props.card.description}</p>
                <div>
                    {(props.deleteCard)
                        ? (
                            <button type="button" className="btn btn-sm btn-danger" onClick={() => props.deleteCard(props.card.id)}>
                                <i className="fas fa-trash-alt" />
                            </button>
                        )
                        : ''
                    }

                </div>
            </div>
        </div>
    </div>
);

CardView.propTypes = {
    card: PropTypes.instanceOf(Card).isRequired,
    deleteCard: PropTypes.func,
};

CardView.defaultProps = {
    deleteCard: undefined,
};

// Put info from the store state in props (None)
const mapStateToProps = () => ({});

// Put actions in props (None)
const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(CardView);
