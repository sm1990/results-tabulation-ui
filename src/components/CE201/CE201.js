import React, {Component} from 'react'
import Grid from '@material-ui/core/Grid';
import axios from '../../axios-base';
import {
    Typography,
    Button,
    FormControl,
    InputLabel,
    Select,
    Breadcrumbs,
    Link
} from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import MenuItem from '@material-ui/core/MenuItem';

class CE201 extends Component {
    constructor(props) {
        super(props);
        this.handleClose = this.handleClose.bind(this);
        this.handleClickOpen = this.handleClickOpen.bind(this);
        this.state = {
            open: false,
            offices: [],
            selectedDistrictCentre: '',
            selectedCountingCenter: '',
            selectedPollingStation: '',
            countingCenter: [],
            pollingStation: [],
            polling: 0,
            // url params
            counting:0,
            tallySheetId:0
        };
    }

    handleClickOpen() {
        if (this.state.selectedCountingCenter === '') {
            alert("Please select the necessary fields !")
        } else {
            axios.get('/tally-sheet?limit=1000&offset=0&officeId='+this.state.counting+'&tallySheetCode=CE-201', {
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': 'GET',
                    'Access-Control-Allow-Headers': 'Content-Type',
                    'X-Requested-With': 'XMLHttpRequest'
                }
            }).then(res => {
                if (res.data.length === 0) {
                    alert("No TallySheets Allocated for here !")
                } else {
                    this.setState({
                        tallySheetId: res.data[0].tallySheetId
                    })
                    console.log("ID :" + res.data[0].tallySheetId)
                    this.props.history.replace('/CE201-Entry/' + this.state.tallySheetId + '/'+ this.state.counting)
                }
            })
                .catch((error) => console.log(error));

        }
    }

    // modal controllers
    handleClose() {
        console.log("close")
        this.setState({open: false});
    }

    handleChange = event => {
        this.setState({selectedDistrictCentre: event.target.value, name: event.target.name});
        console.log(event.target.value)
        axios.get('/office?limit=1000&offset=0&parentOfficeId=' + event.target.value + '&officeType=CountingCentre', {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET',
                'Access-Control-Allow-Headers': 'Content-Type',
                'X-Requested-With': 'XMLHttpRequest'
            }
        }).then(res => {
            console.log("Election" + res.data[0])
            this.setState({
                countingCenter: res.data.sort(function (a,b) {
                    if (parseInt(a.officeName) > parseInt(b.officeName)) {
                        return 1;
                    } else {
                        return -1;
                    }
                })
            })
        })
            .catch((error) => console.log(error));

    };


    handleCounting = event => {
        this.setState({
            selectedCountingCenter: event.target.value,
            name: event.target.name
        });

        this.setState({counting: event.target.value});
    };

    handleCounting1 = event => {
        this.setState({selectedCountingCenter: event.target.value, name: event.target.name});
        axios.get('/office?limit=1000&offset=0&parentOfficeId=' + event.target.value + '&officeType=PollingStation', {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET',
                'Access-Control-Allow-Headers': 'Content-Type',
                'X-Requested-With': 'XMLHttpRequest'
            }
        }).then(res => {
            console.log("Election" + res.data[0])
            this.setState({
                pollingStation: res.data
            })
        })
            .catch((error) => console.log(error));

    };

    handlePolling = event => {
        this.setState({
            selectedPollingStation: event.target.value,
            name: event.target.name
        });

        this.setState({polling: event.target.value});

    };

    componentDidMount() {
        axios.get('/office?limit=1000&offset=0&officeType=DistrictCentre', {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET',
                'Access-Control-Allow-Headers': 'Content-Type',
                'X-Requested-With': 'XMLHttpRequest'
            }
        }).then(res => {
            console.log("Election" + res.data[0])
            this.setState({
                offices: res.data
            })
        })
            .catch((error) => console.log(error));
    }


    render() {
        return (
            <div style={{margin: '3%'}}>
                <div>
                    <Breadcrumbs  style={{marginLeft:'0.2%',marginBottom: '2%',fontSize:'14px'}} separator="/" aria-label="breadcrumb">
                        <Link color="inherit" href="/Home" >
                            Home
                        </Link>
                        <Link color="inherit" href="/Home" >
                            Counting Centre
                        </Link>
                        <Link color="inherit" href="/CE201">
                            Data Entry
                        </Link>
                        <Link color="inherit" href="/CE201">
                            Votes - CE 201
                        </Link>
                        {/*<Typography color="textPrimary"></Typography>*/}
                    </Breadcrumbs>
                    <div style={{marginBottom: '3%'}}>
                        <Typography variant="h4" gutterBottom>
                            Presidential Election 2019
                        </Typography>
                        <Typography variant="h6" gutterBottom>
                           CE - 201
                        </Typography>
                    </div>

                    <Grid container spacing={3} style={{marginBottom: '2%'}}>
                        <Grid item xs={5} sm={4}>
                            <FormControl variant="outlined" margin="dense">
                                <InputLabel>
                                    District Centre
                                </InputLabel>
                                <Select className="width50" value={this.state.selectedDistrictCentre}
                                        onChange={this.handleChange}>
                                    {this.state.offices.map((districtCentre, idx) => (
                                        <MenuItem value={districtCentre.officeId}>{districtCentre.officeName}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={5} sm={4}>
                            <FormControl variant="outlined" margin="dense">
                                <InputLabel>
                                    Counting Centre
                                </InputLabel>
                                <Select className="width50" value={this.state.selectedCountingCenter}
                                        onChange={this.handleCounting}>
                                    {this.state.countingCenter.map((countingCenter, idx) => (
                                        <MenuItem value={countingCenter.officeId}>{countingCenter.officeName}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                        {/*<Grid item xs={5} sm={4}>*/}
                        {/*<FormControl variant="outlined" margin="dense">*/}
                        {/*<InputLabel>*/}
                        {/*Polling Station*/}
                        {/*</InputLabel>*/}
                        {/*<Select className="width50" value={this.state.selectedPollingStation}*/}
                        {/*onChange={this.handlePolling}>*/}
                        {/*{this.state.pollingStation.map((pollingStation, idx) => (*/}
                        {/*<MenuItem value={pollingStation.officeId}>{pollingStation.officeName}</MenuItem>*/}
                        {/*))}*/}
                        {/*</Select>*/}
                        {/*</FormControl>*/}
                        {/*</Grid>*/}
                    </Grid>
                </div>

                <div style={{marginLeft: '76%', marginTop: '4%'}}>
                    <Button style={{borderRadius: 18, color: 'white', marginRight: '4%'}} onClick={this.handleClickOpen}
                            className="button">Next</Button>
                </div>

                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">{"Invalid Ballot Count Confirmation "}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            Are you sure you that all the necessary data entered correctly ?
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button color="primary">
                            Confirm
                        </Button>
                        <Button onClick={this.handleClose} color="primary" autoFocus>
                            Cancel
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        )
    }
}

export default CE201;
