import React, { Component } from "react";
import { startAddTransaction } from "../../actions/transaction";
import { connect } from "react-redux";

class RequestBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            requestAmount: "",
            des: ""
        };
    }

    checkInput = () => {
        if (this.checkEmpty()) {
            this.props.renderWarn("Please Fill All Input Please!");
            return false;
        } else if (Number(this.state.requestAmount) <= 0) {
            this.props.renderWarn("Please Type A valid Request Amount");
            return false;
        } else {
            this.props.hideWarn();
            return true;
        }
    };

    checkEmpty = () => {
        return this.state.requestAmount.length === 0 || this.state.des.length === 0;
    };

    click = async () => {
        if (this.checkInput()) {
            const date = new Date().toString().split(" ");
            date[4] = date[4].substring(0, 5);
            const transaction = {
                requestTime: `${date[1]} ${date[2]} ${date[3]} ${date[4]}`,
                requestUser: this.props.name,
                requestUid: this.props.uid,
                requestAvatar: this.props.avatar,
                requestAmount: `$${this.state.requestAmount}`,
                des: this.state.des,
                payAmount: 0,
                payUser: "",
                payUid: "",
                payTime: "",
                payAvatar: "",
                complete: false
            };

            const warnmsg = await this.props.startAddTransaction(transaction);
            if (!warnmsg) {
                this.reset();
                this.props.hideWarn();
            } else {
                this.props.renderWarn(warnmsg);
            }
        }
    };

    reset = () => {
        this.setState({
            requestAmount: "",
            des: ""
        });
    };

    onAmountChange = e => {
        this.setState({
            requestAmount: e.target.value
        });
    };

    onDesChange = e => {
        this.setState({
            des: e.target.value
        });
    };

    render() {
        return (
            <div className="request-form">
                <div className="request-form-title">
                    <input
                        type="Number"
                        placeholder="Amount..."
                        value={this.state.requestAmount}
                        onChange={this.onAmountChange}
                    />
                </div>
                <div className="request-form-des">
                    <input
                        type="text"
                        placeholder="Description..."
                        value={this.state.des}
                        onChange={this.onDesChange}
                    />
                </div>
                <button className="request-money-btn" onClick={this.click}>
                    Request Money
        </button>
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
    startAddTransaction: transaction => dispatch(startAddTransaction(transaction))
});

export default connect(mapStateToProps, mapDispatchToProps)(RequestBar);
