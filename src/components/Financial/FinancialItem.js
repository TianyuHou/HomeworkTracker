import React, { Component } from "react";
import { UnmountClosed, Collapse } from "react-collapse";
import { connect } from "react-redux";
import { startDeleteTransaction } from "../../actions/transaction";
import autosize from "autosize";

class FinancialItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isDesOpen: false,
            isPayOpen: false,
            showReadIcon: "show-icon",
            hideReadIcon: "hide-icon",
            showPayIcon: "show-icon",
            hidePayIcon: "hide-icon"
        };
    }

    componentDidMount() {
        autosize(this.textarea);
    }

    toggleShowReadIcon = () => {
        this.setState(prevState => {
            return {
                showReadIcon:
                    prevState.showReadIcon === "show-icon" ? "hide-icon" : "show-icon",
                hideReadIcon:
                    prevState.hideReadIcon === "hide-icon" ? "show-icon" : "hide-icon"
            };
        });
    };

    toggleShowPayIcon = () => {
        this.setState(prevState => {
            return {
                showPayIcon:
                    prevState.showPayIcon === "show-icon" ? "hide-icon" : "show-icon",
                hidePayIcon:
                    prevState.hidePayIcon === "hide-icon" ? "show-icon" : "hide-icon"
            };
        });
    };

    onDesClick = () => {
        this.setState({
            isDesOpen: !this.state.isDesOpen
        });
        this.toggleShowReadIcon();
    };

    onPayClick = () => {
        this.setState({
            isPayOpen: !this.state.isPayOpen
        });
        this.toggleShowPayIcon();
    };

    onDelete = async () => {
        const warnmsg = await this.props.startDeleteTransaction(this.props.id);
        if (warnmsg) {
            this.props.renderWarn(warnmsg);
        } else {
            this.props.hideWarn();
        }
    };

    render() {
        return (
            <li className="table-content table-financial">
                <div>
                    <div className="avator">
                        <img src={this.props.requestAvatar} />
                        <h4>{this.props.requestName}</h4>
                    </div>
                    <h4>{this.props.requestAmount}</h4>
                    <h4>{this.props.requestTime}</h4>
                    {this.props.complete ? (
                        <h4 className="paid-money-des">Paid</h4>
                    ) : (
                            <h4 className="request-money-des">Request</h4>
                        )}
                    <span
                        className={`read-icon ${this.state.hideReadIcon}`}
                        onClick={this.onDesClick}
                    >
                        <i className="fas fa-caret-up" />Collapse
          </span>
                    <span
                        className={`read-icon ${this.state.showReadIcon}`}
                        onClick={this.onDesClick}
                    >
                        <i className="fas fa-caret-down" />Read More
          </span>
                    {this.props.complete ? (
                        <div className="student-paid-operation">
                            <span
                                className={`read-icon ${this.state.hidePayIcon}`}
                                onClick={this.onPayClick}
                            >
                                <i className="fas fa-caret-up" />Collapse
              </span>
                            <span
                                className={`read-icon ${this.state.showPayIcon}`}
                                onClick={this.onPayClick}
                            >
                                <i className="fas fa-caret-down" />Pay Info
              </span>
                            <div className="delete-icon">
                                <span onClick={this.onDelete}>
                                    <i className="fas fa-trash-alt" />Delete
                </span>
                            </div>
                        </div>
                    ) : (
                            <div className="delete-icon">
                                <span onClick={this.onDelete}>
                                    <i className="fas fa-trash-alt" />Delete
              </span>
                            </div>
                        )}
                </div>
                <Collapse
                    className="collapsible-content"
                    isOpened={this.state.isDesOpen}
                >
                    <textarea
                        ref={c => (this.textarea = c)}
                        value={this.props.des}
                        className="financial-des"
                        disabled
                    />
                </Collapse>
                <UnmountClosed
                    className="collapsible-content"
                    isOpened={this.state.isPayOpen}
                >
                    <div className="table-donor-financial">
                        <div className="avator">
                            <img src={this.props.payAvatar} />
                            <h4>{this.props.payName}</h4>
                        </div>
                        <div>
                            <h4>Paid:</h4>
                            <h4>{this.props.payAmount}</h4>
                        </div>
                        <div>
                            <h4>Date:</h4>
                            <h4>{this.props.payTime}</h4>
                        </div>
                    </div>
                </UnmountClosed>
            </li>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    startDeleteTransaction: id => dispatch(startDeleteTransaction(id))
});

export default connect(null, mapDispatchToProps)(FinancialItem);
