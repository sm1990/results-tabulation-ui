import React, {Component, useEffect, useState} from "react";
import {Link} from 'react-router-dom';
import {getElections} from "../services/tabulation-api";
import {MessagesProvider, MessagesConsumer} from "../services/messages.provider";
import {
    PATH_ELECTION,
    PATH_ELECTION_BY_ID,
    PATH_ELECTION_DATA_ENTRY,
    PATH_ELECTION_REPORT, PATH_ELECTION_RESULTS_RELEASE,
    TALLY_SHEET_CODE_CE_201,
    TALLY_SHEET_CODE_CE_201_PV,
    TALLY_SHEET_CODE_PRE_30_ED,
    TALLY_SHEET_CODE_PRE_30_PD,
    TALLY_SHEET_CODE_PRE_41,
    TALLY_SHEET_CODE_PRE_ALL_ISLAND_RESULTS,
    TALLY_SHEET_CODE_PRE_ALL_ISLAND_RESULTS_BY_ELECTORAL_DISTRICTS
} from "../App";
import BreadCrumb from "../components/bread-crumb";


export default function Election(props) {
    const {election} = props;


    const {electionId, electionName} = election;
    //return <p></p>

    return <div className="page">
        <BreadCrumb
            links={[
                {label: "elections", to: PATH_ELECTION()},
                {label: electionName, to: PATH_ELECTION_BY_ID(electionId)}
            ]}
        />
        <div className="page-content">
            <h3>{electionName}</h3>

            <h4>Data Entry</h4>
            <ul className="tally-sheet-code-list">
                <li>
                    <Link
                        className="tally-sheet-code-list-item"
                        to={PATH_ELECTION_DATA_ENTRY(electionId, TALLY_SHEET_CODE_PRE_41)}
                    >
                        PRE 41
                    </Link>
                </li>
                <li>
                    <Link
                        className="tally-sheet-code-list-item"
                        to={PATH_ELECTION_DATA_ENTRY(electionId, TALLY_SHEET_CODE_CE_201)}
                    >
                        CE 201
                    </Link>
                </li>
                <li>
                    <Link
                        className="tally-sheet-code-list-item"
                        to={PATH_ELECTION_DATA_ENTRY(electionId, TALLY_SHEET_CODE_CE_201_PV)}
                    >
                        CE 201 PV
                    </Link>
                </li>
            </ul>


            <h4>Reports</h4>
            <ul className="tally-sheet-code-list">
                <li>
                    <Link
                        className="tally-sheet-code-list-item"
                        to={PATH_ELECTION_REPORT(electionId, TALLY_SHEET_CODE_PRE_30_PD)}
                    >
                        PRE 30 PD
                    </Link>
                </li>
                <li>
                    <Link
                        className="tally-sheet-code-list-item"
                        to={PATH_ELECTION_REPORT(electionId, TALLY_SHEET_CODE_PRE_30_ED)}
                    >
                        PRE 30 ED
                    </Link>
                </li>
                <li>
                    <Link
                        className="tally-sheet-code-list-item"
                        to={PATH_ELECTION_REPORT(electionId, TALLY_SHEET_CODE_PRE_ALL_ISLAND_RESULTS_BY_ELECTORAL_DISTRICTS)}
                    >
                        All Island ED
                    </Link>
                </li>
                <li>
                    <Link
                        className="tally-sheet-code-list-item"
                        to={PATH_ELECTION_REPORT(electionId, TALLY_SHEET_CODE_PRE_ALL_ISLAND_RESULTS)}
                    >
                        All Island
                    </Link>
                </li>
            </ul>


            <h4>Release</h4>
            <ul className="tally-sheet-code-list">
                <li>
                    <Link
                        className="tally-sheet-code-list-item"
                        to={PATH_ELECTION_RESULTS_RELEASE(electionId, TALLY_SHEET_CODE_PRE_30_PD)}
                    >
                        PRE 30 PD
                    </Link>
                </li>
                <li>
                    <Link
                        className="tally-sheet-code-list-item"
                        to={PATH_ELECTION_RESULTS_RELEASE(electionId, TALLY_SHEET_CODE_PRE_30_ED)}
                    >
                        PRE 30 ED
                    </Link>
                </li>
                <li>
                    <Link
                        className="tally-sheet-code-list-item"
                        to={PATH_ELECTION_RESULTS_RELEASE(electionId, TALLY_SHEET_CODE_PRE_ALL_ISLAND_RESULTS_BY_ELECTORAL_DISTRICTS)}
                    >
                        All Island ED
                    </Link>
                </li>
                <li>
                    <Link
                        className="tally-sheet-code-list-item"
                        to={PATH_ELECTION_RESULTS_RELEASE(electionId, TALLY_SHEET_CODE_PRE_ALL_ISLAND_RESULTS)}
                    >
                        All Island
                    </Link>
                </li>
            </ul>
        </div>
    </div>
}