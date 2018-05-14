import React, { Component } from "react";
import { connect } from "react-redux";
import Header from "../Header";
import Footer from "../Footer";
import RequestBar from "./RequestBar";
import FinancialList from "./FinancialList";
import ErrorMessage from "../ErrorMessage";

class Financial extends Component {
    constructor(props) {
        super(props);
        this.state = {
            warn: "",
            display: "none"
        };
    }

    renderWarn = msg => {
        this.setState({
            warn: msg,
            display: "block"
        });
        window.scrollTo(0, 0);
    };

    hideWarn = () => {
        this.setState({
            warn: "",
            display: "none"
        });
    };

    render() {
        return (
            <div className="financial-container">
                <Header />
                <div className="financial">
                    <ErrorMessage
                        message={this.state.warn}
                        display={this.state.display}
                    />
                    {this.props.identity === "STUDENT" ? (
                        <RequestBar renderWarn={this.renderWarn} hideWarn={this.hideWarn} />
                    ) : (
                            ""
                        )}
                    <div className="table-container">
                        <div className="table-title table-title-financial">
                            <h3>From</h3>
                            <h3>Amount</h3>
                            <h3>Date</h3>
                            <h3>Status</h3>
                            <h3>Description</h3>
                        </div>
                        <ul>
                            <FinancialList
                                renderWarn={this.renderWarn}
                                hideWarn={this.hideWarn}
                            />
                        </ul>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }
}

const mapStateToProps = state => ({
    identity: state.profile.info.identity.toUpperCase()
});

export default connect(mapStateToProps)(Financial);
