import React from "react";
import FinancialItem from "./FinancialItem";
import DonorFinancialItem from "./DonorFinancialItem";
import { connect } from "react-redux";

const FinancialList = ({ transactions, identity, renderWarn, hideWarn }) => {
    if (identity === "STUDENT") {
        return (
            <ul>
                {transactions.map(n => {
                    return (
                        <FinancialItem
                            id={n.id}
                            key={n.id}
                            requestAvatar={n.transaction.requestAvatar}
                            requestName={n.transaction.requestUser}
                            requestAmount={n.transaction.requestAmount}
                            requestTime={n.transaction.requestTime}
                            des={n.transaction.des}
                            payAvatar={n.transaction.payAvatar}
                            payAmount={n.transaction.payAmount}
                            payName={n.transaction.payUser}
                            payTime={n.transaction.payTime}
                            complete={n.transaction.complete}
                            renderWarn={renderWarn}
                            hideWarn={hideWarn}
                        />
                    );
                })}
            </ul>
        );
    } else if (identity === "DONOR") {
        return (
            <ul>
                {transactions.map(n => {
                    return (
                        <DonorFinancialItem
                            id={n.id}
                            key={n.id}
                            requestAvatar={n.transaction.requestAvatar}
                            requestName={n.transaction.requestUser}
                            requestUid={n.transaction.requestUid}
                            requestAmount={n.transaction.requestAmount}
                            requestTime={n.transaction.requestTime}
                            des={n.transaction.des}
                            payAvatar={n.transaction.payAvatar}
                            payAmount={n.transaction.payAmount}
                            payName={n.transaction.payUser}
                            payTime={n.transaction.payTime}
                            complete={n.transaction.complete}
                            renderWarn={renderWarn}
                            hideWarn={hideWarn}
                        />
                    );
                })}
            </ul>
        );
    }
};

const mapStateToProps = state => ({
    identity: state.profile.info.identity.toUpperCase(),
    transactions: state.transaction
});

export default connect(mapStateToProps)(FinancialList);
