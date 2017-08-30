import React from 'react';
import ReactDom from 'react-dom';
import {Toolbar, Tabs, Tab, Drawer,Popover,ToolbarTitle,TextField,FlatButton, } from 'material-ui';
import IconButton from 'material-ui/IconButton';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import Chart from 'chart.js';
import jQuery from "jquery";
window.$ = window.jQuery = jQuery;


class Task{
  constructor(title, weight, coloR){
    this.title=title;
    this.weight=weight;
    this.isSelected=false;
    this.coloR = coloR;
  }
}

export default class Course extends React.Component {
  constructor(props) {
    super(props);
    this.state=
      {
        charts: [],
        tasks: [],
        createTaskMenuOpen:false,
      };

  }

  renderChart(task, index){
    $("#" + this.props.chartid).remove();
    $("#" + this.props.containerid).append('<canvas id="' + this.props.chartid + '" width="400" height="400"></canvas>');

    var label = [];
    var weight = [];
    var amtDone = 0;
    var amtTODO = 0;
    var totalWeight;
    var color = [];
    for(var i = 0; i < this.state.tasks.length; i++){
      if (this.state.tasks[i].isSelected){
        amtDone += parseFloat(this.state.tasks[i].weight);
      }
      else{
        amtTODO += parseFloat(this.state.tasks[i].weight);
      }
      // label[i] = this.state.tasks[i].title;
      // weight[i] = this.state.tasks[i].weight;
      // color[i] = this.state.tasks[i].coloR;

    }
    var ctx = document.getElementById(this.props.chartid);
    var data = {
        labels: [ "DONE",
                "TODO" ],
        datasets: [
            {
                data: [amtDone,
                      amtTODO],
                backgroundColor:[ "#08ed1f",
                                 "#6e6e6e"],
                hoverBackgroundColor: ["#08ed1f",
                                      "#6e6e6e"]
            }]
    };
    var myChart = new Chart(ctx, {
        type: 'doughnut',
        data: data,
        options: {
            animation:{
                animateScale:true
            }
          }
    });
  }

  render(){
    return (
      <div style={{margin:8}}>
      <Toolbar>
        <ToolbarTitle text={this.props.name}/>
        <IconButton iconClassName="material-icons" id ={this.props.name}
        onClick={() => {
          this.setState({createTaskMenuOpen:true});
          // this.state.tasks.push("test");
        }}
        >add</IconButton>
        <Popover
          open={this.state.createTaskMenuOpen}
          anchorEl={document.getElementById(this.props.name)}
          anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}
          targetOrigin={{horizontal: 'right', vertical: 'top'}}
          onRequestClose={() => this.setState({createTaskMenuOpen:!this.state.createTaskMenuOpen})}
        >
          <TextField id={this.props.name+"_add_title"} hintText="Name of Task" /><br/>
          <TextField id={this.props.name+"_add_weight"} hintText="Weight of Task" /><br/>
          <FlatButton label="add" fullWidth={true} onClick={()=>{
            var tempTask= new Task(document.getElementById(this.props.name+"_add_title").value,
                                    document.getElementById(this.props.name+"_add_weight").value,
                                  '#'+Math.floor(Math.random()*16777215).toString(16));
            this.state.tasks.push(tempTask);
            this.setState({createTaskMenuOpen:false});
          }}/>
        </Popover>
      </Toolbar>
      <Table multiSelectable={true} deselectOnClickaway={false}>
        <TableHeader displaySelectAll={false} enableSelectAll={false}>
          <TableRow >
            <TableHeaderColumn>Task Name</TableHeaderColumn>
            <TableHeaderColumn>Weight(# of hours)</TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody deselectOnClickaway={false}>
          {this.state.tasks.map((task,index)=>{
            this.renderChart(task, index);

            return(
              <TableRow selected={task.isSelected} onTouchTap={()=>{
                this.state.tasks[index].isSelected=!this.state.tasks[index].isSelected;
                this.renderChart(task, index);

                // alert(JSON.stringify(this.state.tasks));
              }}>
                <TableRowColumn>{task.title}</TableRowColumn>
                <TableRowColumn>{task.weight}</TableRowColumn>
              </TableRow>
            );

          })}
        </TableBody>
      </Table>
      </div>

    );
  }
}
