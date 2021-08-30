import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import ReactLoading from 'react-loading';
import MaterialTable from 'material-table';
import Search from '@material-ui/icons/Search';
import SaveAlt from '@material-ui/icons/SaveAlt';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Check from '@material-ui/icons/Check';
import FilterList from '@material-ui/icons/FilterList';
import Remove from '@material-ui/icons/Remove';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Clear from '@material-ui/icons/Clear';

export default class Leaderboard extends React.Component{

    intervalId;

    constructor(props){
        super(props);
        this.state ={
            hasLoaded: false,
            data: undefined,
            columns: undefined
        };
    }

    getData(){
        const url = "/leaderboard";
        setTimeout(() => {fetch(url)
        .then(response => response.json())
        .then(json => {
            json.sort((a,b) => (b.val_acc - a.val_acc));
            const columnsLoad = [
                {title: "Rank", render: rowData => rowData.tableData.id + 1, headerStyle: {
                    backgroundColor: 'aqua',
                  }},
                {title: "Username", field: "username", headerStyle: {
                    backgroundColor: 'aqua',
                  }},
                {title: "Algorithm", field: "algorithm", headerStyle: {
                    backgroundColor: 'aqua',
                  }, lookup: {2: "Neural Network", 3: "K-nearest Neighbours", 4: "Random Forest"}},
                {title: "Validation Accuracy", field: "val_acc", defaultSort: "desc", headerStyle: {
                    backgroundColor: 'aqua',
                  }},
                {title: "Training Accuracy", field: "train_acc", defaultSort: "desc", headerStyle: {
                    backgroundColor: 'aqua',
                  }}
                
            ];
            this.setState({hasLoaded: true, data: json, columns: columnsLoad});
            console.log(this.state.data);
            this.intervalId = setTimeout(this.getData.bind(this), 5000);
        });
    }, 3000);
    }

    componentDidMount(){
        this.getData();        
    }

    componentWillUnmount(){
        clearTimeout(this.intervalId);
    }

    render(){
        return (
            <div>
                {!this.state.hasLoaded ? (
                    <ReactLoading type = {"bars"} color = {"black"} />
                ): (
                    <MaterialTable title = "Submissions"
                    icons = {{ 
                        Check: Check,
                        DetailPanel: ChevronRight,
                        Export: SaveAlt,
                        Filter: FilterList,
                        FirstPage: FirstPage,
                        LastPage: LastPage,
                        NextPage: ChevronRight,
                        PreviousPage: ChevronLeft,
                        Search: Search,
                        ThirdStateCheck: Remove,
                        SortArrow: ArrowDownward,
                        ResetSearch: Clear
                      }}
                    columns = {this.state.columns}
                    data = {this.state.data} 
                    options = {{ sorting: true}}
                    style = {{width: "80vw"}}/>
                )}
            </div>
        );
    }
}