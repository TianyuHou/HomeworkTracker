import React, { Component } from "react";
import { UnmountClosed, Collapse } from "react-collapse";
import { connect } from "react-redux";
import PayWindow from "./PayWindow";
import autosize from "autosize";

class DonorFinancialItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isDesOpen: false,
            isPayOpen: false,
            showReadIcon: "show-icon",
            hideReadIcon: "hide-icon",
            showPayIcon: "show-icon",
            hidePayIcon: "hide-icon",
            display: "hide-window"
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

    onClick = () => {
        this.setState({
            display: "show-window"
        });
    };

    closeWindow = () => {
        this.setState({
            display: "hide-window"
        });
    };

    render() {
        return (
            <div>
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
                            <div>
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
                            </div>
                        ) : (
                                <span className="pay-btn" onClick={this.onClick}>
                                    <i className="fab fa-paypal" />Pay
              </span>
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
                <PayWindow
                    display={this.state.display}
                    close={this.closeWindow}
                    requestAmount={this.props.requestAmount}
                    requestUser={this.props.requestName}
                    requestUid={this.props.requestUid}
                    id={this.props.id}
                    closeWindow={this.closeWindow}
                />
            </div>
        );
    }
}

export default DonorFinancialItem;
