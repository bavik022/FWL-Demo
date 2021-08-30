import React from 'react';
import './App.css';
import Preprocessing from './Preprocessing.js';
import 'bootstrap/dist/css/bootstrap.css';
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import {Navbar, NavbarBrand} from "react-bootstrap";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Algorithm from "./Algorithm";
import Hyper_NN from "./Hyper_Neural_net";
import KNN_Hyper from "./kNN_Hyper";
import defaultGlobalState from "./GlobalState";
import Training from "./Training";

/*const useStyles = makeStyles({
    root: {
        flexGrow: 1,
    },
});*/

const state = defaultGlobalState;

function TabPanel(props){
    const { children, value, index, ...other } =  props;

    return(
        <Typography
            component = "div"
            role = "tabpanel"
            hidden = {value !== index}
            {...other}
            >
            {value === index && <Box p={3}>{children}</Box>}
        </Typography>
    );
}

function App() {
    
    const blankLayer = {type: '0', units: 1, filter_size: 0, activation: ''};    
    //const classes = useStyles();
    const [value, setValue] = React.useState(0);
    const [state, setState] = React.useState(defaultGlobalState);
    let train_state = {};
    
    const handleStateChange = (newState) => {
        setState(newState);
    }

    const handleAlgoChange = (newAlgo) => {
        const newState = {...state};
        newState.algorithm = newAlgo;
        if(newAlgo === '2')
            newState.architecture = {
                layers: [{...blankLayer}]
            };
        else
            newState.architecture = {};
        handleStateChange(newState);
    }

    const handleChange = (event, newValue) => {
    setValue(newValue);
    }
    return (
    <html>
    <Navbar bg = "dark" variant = "dark">
    <NavbarBrand style = {{alignContent: 'center'}}>Try your own ML algorithm</NavbarBrand>
    </Navbar>
    <Paper>
    <Tabs
        value = {value}
        onChange = {handleChange}
        indicatorColor = "primary"
        textColor = "primary"
        centered
        style = {{backgroundColor: 'powderblue'}}
        >
        <Tab label = "Preprocessing" />
        <Tab label = "Algorithm" />
        <Tab label = "Hyperparameters" />
        <Tab label = "Training" />
    </Tabs>
    </Paper>
    <TabPanel value = {value} index = {0}>
    <div align = "center">
        <Preprocessing state = {state} onPreChange = {handleStateChange} />
    </div>
    </TabPanel>
    <TabPanel value = {value} index = {1}>
    <div align = "center">
        <Algorithm state = {state} onAlgoChange = {handleAlgoChange} />
    </div>
    </TabPanel>
    <TabPanel value = {value} index = {2}>
        <div align = "center">
            {(() => {
                switch(state.algorithm){
                    case '2':
                        train_state = <Training state = {state} onTrainChange = {handleStateChange}/>;
                        return <Hyper_NN state = {state} onHyperChange = {handleStateChange}/>;
                    case '3':
                        train_state = <Training state = {state} onTrainChange = {handleStateChange}/>;
                        return <KNN_Hyper state = {state} onHyperChange = {handleStateChange}/>;
                    default:
                        train_state = <p>Please select an algorithm first</p>
                        return <p>Please select an algorithm first</p>
                }
            })()}
        </div>
    </TabPanel>
    <TabPanel value = {value} index = {3}>
        <div align = "center">
            {train_state}
        </div>
    </TabPanel>
    </html>
    );
}

export default App;
