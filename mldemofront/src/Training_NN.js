import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.css';
import { Row,Col,Form, Button, Spinner, Collapse } from "react-bootstrap";
import * as tf from '@tensorflow/tfjs';
import { readRemoteFile } from 'react-papaparse';
import { feature_list, incomplete_columns, mapProps } from './GlobalState';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';

const csvUrl = 'http://localhost:3000/uci-steel-plate-faults.csv'
let dataset = [];
let labels = [];
let model = [];
let isTraining = false;
let epoch = 0;
let run = 0;
let settings = -1;

export default function Train_NN(props){

    const blankDisp = {run: 0, settings: 0, epoch:0, acc: 0, val_acc: 0};
    const [load_data, setLoad] = useState(<Form.Label style = {{marginTop:"5px"}}>Click to load training and test data</Form.Label>);
    const [preproc_data, setPreproc] = useState(<Form.Label style = {{marginTop:"5px"}}>Click to preprocess the data</Form.Label>);
    const [trainCont, setTrainCont] = useState(<Col>Click to start training</Col>);
    const [trainDisp, setTrainDisp] = useState([{...blankDisp}]);
    const [usernameCard, setUsernameCard] = useState(false);
    const [availabilityButtonValue, setAvailabilityButtonValue] = useState(<>Check availability</>);
    const [username, setUsername] = useState('');
    const [submitCard, setSubmitCard] = useState(false);
    const [train_acc, setTrainAcc] = useState(0);
    const [val_acc, setValAcc] = useState(0);
    const [submit_btn_val, setSubmitBtnVal] = useState(<>Submit</>);
    const [successCard, setSuccessCard] = useState(false);
    const [success_card_val, setSuccessCardVal] = useState(<h5><CheckCircleIcon/> Done!</h5>);
    
    const getDataset = () => {
        dataset = [];
        labels = [];
        
        readRemoteFile(csvUrl, {
            header: true,
            complete: (results) => {
                console.log("Results:", results);
                const csvDataset = [...results.data];
                for(let i = 0; i<csvDataset.length; i++){
                    let arr = []
                    for(let feature in csvDataset[i]){
                        arr.push(parseFloat(csvDataset[i][feature]));
                    }
                    dataset.push(arr);
                    labels.push(dataset[i].splice(27));
                }
                console.log(dataset);
                console.log(labels);
                setLoad(<Form.Label style = {{marginTop:"5px"}}>Loaded {dataset.length} data points with {dataset[0].length} features each </Form.Label>);
                document.getElementById('preproc_row').removeAttribute('hidden');
            }
        });
    }

    const loadData = () => {
        document.getElementById('load_btn').setAttribute("disabled", "true");
        setLoad(<Spinner animation="border" style = {{marginTop:"5px"}}/>);
        getDataset();
    }

    const preProc = async () => {
        return new Promise((resolve, reject) => {
            switch(props.state.preprocessing.fill_col){
            case '2':
                for(let i = 0; i<incomplete_columns.length; i++){
                    let sum = 0;
                    let count = 0;
                    for(let j = 0; j<dataset.length; j++){
                        if(dataset[j][incomplete_columns[i]]){
                            sum = sum + dataset[j][incomplete_columns[i]];
                            count = count + 1;
                        }
                    }
                    const mean = sum/count;
                    for(let j = 0; j<dataset.length; j++){
                        if(!dataset[j][incomplete_columns[i]]){
                            dataset[j][incomplete_columns[i]] = mean;
                        }
                    }
                }
                break;
            case '3':
                for(let i = 0; i<incomplete_columns.length; i++){
                    let arr = [];
                    for(let j = 0; j<dataset.length; j++){
                        if(dataset[j][incomplete_columns[i]])
                            arr.push(dataset[j][incomplete_columns[i]]);
                    }
                    arr.sort((a,b) => a-b);
                    const mid = Math.floor(arr.length/2);
                    const median = (arr.length%2 !== 0) ? (arr[mid]) : ((arr[mid - 1] + arr[mid])/2);
                    for(let j = 0; j<dataset.length; j++){
                        if(!dataset[j][incomplete_columns[i]])
                            dataset[j][incomplete_columns[i]] = median;
                    }
                }
                break;
            case '4':
                for(let i = 0; i<incomplete_columns.length; i++){
                    for(let j = 0; j<dataset.length; j++){
                        dataset[j].splice(incomplete_columns[i], 1);
                    }
                }
                break;
            case '5':
                for(let i = 0; i<dataset.length; i++){
                    for(let j = 0; j<dataset[i].length; j++){
                        if(!dataset[i][j]){
                            dataset.splice(i, 1);
                            labels.splice(i, 1);
                            break;
                        }
                    }
                }
                break;
            case '6':
                for(let i = 0; i<dataset.length; i++){
                    for(let j = 0; j<dataset[i].length; j++){
                        if(!dataset[i][j]){
                            dataset.splice(i, 1);
                            labels.splice(i, 1);
                            break;
                        }
                    }
                }
                for(let i = 0; i<incomplete_columns.length; i++){
                    for(let j = 0; j<dataset.length; j++){
                        dataset[j].splice(incomplete_columns[i], 1);
                    }
                }
                break;

        }
        let dataset_select = [];
        for(let i = 0; i<dataset.length; i++){
            let arr = [];
            for(let j = 0; j<props.state.preprocessing.features.length; j++){
                arr.push(dataset[i][feature_list.indexOf(props.state.preprocessing.features[j])]);
            }
            dataset_select.push([...arr]);
        }
        dataset = [...dataset_select];
        if(props.state.preprocessing.data_normalization){
            const len = dataset.length;
            for(let i = 0; i<dataset[0].length; i++){
                let arr = [];
                for(let j = 0; j<dataset.length; j++){
                    arr.push(dataset[j][i]);
                }
                for(let j = 0; j<dataset.length; j++){
                    dataset[j][i] = (dataset[j][i] - Math.min(...arr))/(Math.max(...arr) - Math.min(...arr));
                }
            }
            for(let i = 0; i<props.state.preprocessing.data_augmentation; i++){
                const num = Math.random();
                const operator = Math.random();
                if(operator < 0.5){
                    for(let j = 0; j<len; j++){
                        dataset.push(dataset[j].map(x => x + num));
                        labels.push(labels[i]);
                    }
                }
                else{
                    for(let j = 0; j<len; j++){
                        dataset.push(dataset[j].map(x => x - num));
                        labels.push(labels[j]);
                    }
                }
            }
        }
        resolve();
    });
    }

    const preprocData = async () => {
        document.getElementById('preproc_btn').setAttribute("disabled", "true");
        setPreproc(<Spinner animation="border" style = {{marginTop:"5px"}}/>);
        let ret = await preProc();
        setPreproc(<Form.Label style = {{marginTop:"5px"}}>Processed dataset contains {dataset.length} data points with {dataset[0].length} features each</Form.Label>);
        console.log(dataset);
        document.getElementById('train_row').removeAttribute("hidden");
        document.getElementById('trainCont').removeAttribute("hidden");
    }
    
    const startOrStopTrain = () => {
        if(!isTraining){
            document.getElementById("submitRow").setAttribute("hidden", "true");
            document.getElementById("train_btn").innerHTML = "Stop Training";
            isTraining = true;
            if(props.state.arch_changed){
                run++;
                settings++;
                epoch = 0;
                props.state.arch_changed = false;
                initializeModel();
            }
            startTraining();
        }
        else{
            isTraining = false;
            document.getElementById("submitRow").removeAttribute("hidden");
            document.getElementById("train_btn").innerHTML = "Start Training";
            let addTrain = (<><Col xs = {6}>Training will stop after epoch {epoch} ends</Col><Col xs = {6}><Spinner animation = "border"/></Col></>);
            setTrainCont(addTrain);
            document.getElementById("train_btn").setAttribute("disabled", "true");
        }
    }

    const initializeModel = () => {
        const layers = props.state.architecture.layers;
        model = {};
        model = tf.sequential();
        let regularizer = null;
        let ds = {};
        if(props.state.regularization === "L1")
            regularizer = mapProps('regularization', props.state.regularization)({l1 : parseFloat(props.state.regularization_rate)});
        else if(props.state.regularization === "L2")
            regularizer = mapProps('regularization', props.state.regularization)({l2 : parseFloat(props.state.regularization_rate)});
        const initializer = (mapProps('initializer', props.state.initializer))(props.state.initializer_config);
        for(let i = 0; i<layers.length; i++){
            {/*const layer = mapProps('layer', layers[i].type);*/}
            const layer = tf.layers.dense;
            if(i === 0){
                if(layers[i].activation)
                    model.add(layer({units: parseInt(layers[i].units), inputShape: [dataset[0].length], activation: layers[i].activation, kernelRegularizer: regularizer, kernelInitializer: initializer, biasInitializer: initializer}));
                else
                    model.add(layer({units: parseInt(layers[i].units), inputShape: [dataset[0].length], kernelRegularizer: regularizer, kernelInitializer: initializer, biasInitializer: initializer}));
            }
            else{
                if(layers[i].activation)
                    model.add(layer({units: parseInt(layers[i].units), activation: layers[i].activation, kernelRegularizer: regularizer, kernelInitializer: initializer, biasInitializer: initializer}));
                else
                    model.add(layer({units: parseInt(layers[i].units), kernelRegularizer: regularizer, kernelInitializer: initializer, biasInitializer: initializer}));
            }
        }
        model.add(tf.layers.dense({units: 7, activation: 'softmax'}));
        model.summary();
        console.log("Network generated");
        const opt = mapProps('optimizer', props.state.optimizer);
        const optimizer = opt(props.state.learning_rate);
        console.log(props.state.loss_function);
        console.log(mapProps('loss_function', props.state.loss_function));
        model.compile({
            optimizer: optimizer,
            loss: mapProps('loss_function', props.state.loss_function),
            metrics: ['accuracy']
        });
    }

    const startTraining = async () => {
        const inputs = tf.tensor2d(dataset);
        const outputs = tf.tensor2d(labels);  
        while(isTraining){
            epoch++;
            let addTrain = (<><Col xs = {6}>Epoch {epoch}</Col><Col xs = {6}><Spinner animation = "border"/></Col></>);
            setTrainCont(addTrain);
            document.getElementById("trainCont").removeAttribute("hidden");
            let info = await trainModel(inputs, outputs);
            console.log('Final accuracy', info.history.val_acc);
            setTrainAcc(info.history.acc[0]);
            setValAcc(info.history.val_acc[0]);
            const newTrainDisp = [...trainDisp];
            newTrainDisp[newTrainDisp.length - 1].run = run;
            newTrainDisp[newTrainDisp.length - 1].settings = settings;
            newTrainDisp[newTrainDisp.length - 1].epoch = epoch;
            newTrainDisp[newTrainDisp.length - 1].acc = info.history.acc;
            newTrainDisp[newTrainDisp.length - 1].val_acc = info.history.val_acc[0];
            newTrainDisp.push({...blankDisp});
            setTrainDisp(newTrainDisp);
            console.log(trainDisp);
            if(!isTraining){
                document.getElementById("train_btn").removeAttribute("disabled");
                document.getElementById("trainCont").setAttribute("hidden", "true");
            }
        }
    }

    const onBatchEnd = (batch, logs) => {
        console.log("Accuracy", logs.acc);
    }

    const trainModel = (inputs, outputs) => {
        console.log("Training starting");
        console.log(props.state.test_proportion);
        return model.fit(inputs, outputs, {
            epochs: 1,
            batchSize: parseInt(props.state.batch_size),
            validationSplit: props.state.test_proportion,
            shuffle: ((props.state.shuffle === "No") ? false : true),
            callbacks: {onBatchEnd}
        });
    }

    const submitLeaderboard = async () => {
        setSubmitBtnVal(<><Spinner animation = 'border' size = "sm"/> Submitting ...</>);
        document.getElementById('submitBtn').setAttribute('disabled', 'true');
        const url = "/leaderboard/";
        const data = {
            "username": username,
            "algorithm": props.state.algorithm,
            "train_acc": train_acc,
            "val_acc": val_acc,
            "config_object": props.state
        };
        console.log(data);
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        if(response.status === 201){
            setSubmitCard(false);
            setUsernameCard(false);
            setSuccessCard(true);
        }
        else{
            setSuccessCardVal(<>There was an error. Please try again.</>);
            setSuccessCard(true);
            document.getElementById('submitBtn').removeAttribute('disabled');
        }
    }

    const check_username_availability = async () => {
        if(username){
            setAvailabilityButtonValue(<><Spinner animation = 'border' size = "sm"/> Checking ...</>); 
            document.getElementById('checkAvailabilityButton').setAttribute("disabled", "true");        
            const url = "/leaderboard/" + username;
            const response = await fetch(url);
            const body = await response.json();
            if(body.status === "User not found"){
                setAvailabilityButtonValue(<>Good to go!</>);
                setSubmitCard(true);
            }
            else{
                setAvailabilityButtonValue(<>Try again</>);
                document.getElementById("checkAvailabilityButton").removeAttribute("disabled");
            }
        }
        else
            window.alert('Set a username first');
    }

    return(
        <>
        <Form>
            <Row>
                <Col xs = {6}>
                    <Button variant = "primary" id = 'load_btn' onClick = {loadData} block>Load</Button>
                </Col>
                <Col xs = {6}>
                    {load_data}
                </Col>
            </Row>
            <Row hidden style = {{marginTop: "20px"}}  id = 'preproc_row'>
                <Col xs = {6}>
                    <Button variant = "primary" id = 'preproc_btn' onClick = {preprocData} block>Preprocess</Button>
                </Col>
                <Col xs = {6}>
                    {preproc_data}
                </Col>
            </Row>
            <Row style = {{marginTop: "20px"}} id = 'train_row' hidden>
                <Col>
                    <Button variant = "primary" id = "train_btn" onClick = {startOrStopTrain}>Start Training</Button>
                </Col>
            </Row>
            <Row id = "trainCont" style = {{marginTop: "20px"}} hidden>
                {trainCont}
            </Row>
            {
                trainDisp.map((val, idx) => {
                    if(trainDisp[idx].epoch !== 0)
                        return(
                            <Row style = {{marginTop: "20px"}} key = {idx}>
                                <Col xs = {3}>
                                    {
                                        (() => {
                                            if(trainDisp[idx].settings === 0)
                                                return (<>Run {trainDisp[idx].run} with initial settings</>);
                                            else
                                                return (<>Run {trainDisp[idx].run} with changed settings</>);
                                        })()
                                    }
                                </Col>
                                <Col xs = {3}>
                                    Epoch: {trainDisp[idx].epoch}
                                </Col>
                                <Col xs = {3}>
                                    Training accuracy: {parseFloat(trainDisp[idx].acc).toFixed(4)}
                                </Col>
                                <Col xs = {3}>
                                    Validation accuracy: {parseFloat(trainDisp[idx].val_acc).toFixed(4)}
                                </Col>
                            </Row>
                        );
                })
            }
            <Row style = {{marginTop: "50px"}} id = 'submitRow' hidden>
                <Col xs = {12}>
                    <Button variant = "primary" align = "center" id = 'submitToLeaderboard' onClick = {() => {setUsernameCard(true); document.getElementById('submitRow').setAttribute("hidden", "true"); document.getElementById("train_btn").setAttribute("hidden", "true");}}>Submit to leaderboard</Button>
                </Col>                
            </Row>
            <Collapse in = {usernameCard}>
                <Row style = {{marginTop: "50px"}}>
                    <Col xs = {4}>
                        <Form.Label style = {{marginTop: "5px"}}>Set a username:</Form.Label>
                    </Col>
                    <Col xs = {4}>
                        <Form.Control type = 'text' onChange = {(e) => {setUsername(e.target.value);}} />
                    </Col>
                    <Col xs = {4}>
                        <Button variant = "light" id = "checkAvailabilityButton" onClick = {check_username_availability}>{availabilityButtonValue}</Button>
                    </Col>
                </Row>
            </Collapse>
            <Collapse in = {submitCard}>
            <Row style = {{marginTop: "50px"}}>
                    <Col xs = {12}>
                        <Button variant = "primary" id = "submitBtn" onClick = {submitLeaderboard}>{submit_btn_val}</Button>
                    </Col>
                </Row>
            </Collapse>
            <Collapse in = {successCard}>
                <Row style = {{marginTop: "50px"}}>
                    <Col xs = {12}>
                        {success_card_val}
                    </Col>
                </Row>
            </Collapse>
        </Form>
        </>
    )
}