import React, { Component } from "react";
import { connect } from "react-redux";
import { startEditTransaction } from "../../actions/transaction";
import ErrorMessage from "../ErrorMessage";

class PayWindow extends Component {
    constructor(props) {
        super(props);
        this.state = {
            creditCard: "",
            password: "",
            warn: "",
            display: "none"
        };
    }

    checkInput = () => {
        return (
            this.state.creditCard.length === 0 || this.state.password.length === 0
        );
    };

    renderWarn = msg => {
        this.setState({
            warn: msg,
            display: "block"
        });
    };

    hideWarn = () => {
        this.setState({
            warn: "",
            display: "none"
        });
    };

    onCreditCardChange = e => {
        this.setState({
            creditCard: e.target.value
        });
    };

    onPwdChange = e => {
        this.setState({
            password: e.target.value
        });
    };

    onSubmit = async () => {
        if (this.checkInput()) {
            this.renderWarn("Please Fill All Input!");
        } else {
            const date = new Date().toString().split(" ");
            date[4] = date[4].substring(0, 5);
            const transaction = {
                payAmount: this.props.requestAmount,
                payUser: this.props.name,
                payUid: this.props.uid,
                payTime: `${date[1]} ${date[2]} ${date[3]} ${date[4]}`,
                payAvatar: this.props.avatar,
                complete: true
            };

            const warnmsg = await this.props.startEditTransaction(
                this.props.requestUid,
                this.props.id,
                transaction
            );
            if (!warnmsg) {
                this.props.closeWindow();
                this.hideWarn();
            } else {
                this.renderWarn(warnmsg);
            }
        }
    };

    render() {
        return (
            <div className={`pay-window login-window ${this.props.display}`}>
                <div className="pay-window-content window-content">
                    <div className="pay-window-header window-header">
                        <ErrorMessage
                            message={this.state.warn}
                            display={this.state.display}
                        />
                        <div>
                            <h1>Pay To {this.props.requestUser}</h1>
                            <h2 className="close" onClick={this.props.close}>
                                &times;
              </h2>
                        </div>
                        <h4>
                            *IMPORTANT: THIS IS A FAKE VERSION, SO DON'T TYPE ANY REAL
                            CREDITCARD OR PASSWORD, JUST TYPE ANYTHING YOU WANT, IT WILL WORK
            </h4>
                    </div>
                    <div className="pay-window-body window-body">
                        <div className="window-body-item">
                            <label>Amount:</label>
                            <input
                                placeholder="Amount"
                                value={this.props.requestAmount}
                                readOnly
                            />
                        </div>
                        <div className="window-body-item">
                            <label>CreditCard Number:</label>
                            <input
                                placeholder="CreditCard Number"
                                onChange={this.onCreditCardChange}
                            />
                        </div>
                        <div className="window-body-item">
                            <label>Password:</label>
                            <input
                                placeholder="Password"
                                type="password"
                                onChange={this.onPwdChange}
                            />
                        </div>
                    </div>
                    <div className="pay-window-footer window-footer">
                        <button onClick={this.onSubmit}>Pay</button>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    name: `${state.profile.info.firstName} ${state.profile.info.lastName}`,
    uid: state.auth.uid,
    avatar: state.avatar.url
});

const mapDispatchToProps = dispatch => ({
    startEditTransaction: (uid, id, transaction) =>
        dispatch(startEditTransaction(uid, id, transaction))
});

export default connect(mapStateToProps, mapDispatchToProps)(PayWindow);
