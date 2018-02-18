import React, { Component } from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import { Constants } from 'expo';


class Workflow extends React.Component {
  constructor() {
    super();
    this.state = {
      workflows: [
        {
          name: "Dev",
          duration: 15,
          completed: false,
          id: 0
        }
      ]
    };

    this.id = 0;
  }

  addWorkflow() {
    let id = ++this.id;
   // const text = prompt("What is your new workflow?");
  //  const duration = prompt("What is the duration?");
    const text = "Todo " + id
    const duration = 15
    this.setState({
      workflows: [
        ...this.state.workflows,
        { name: text, duration: duration, completed: false, id: id }
      ]
    });
  }

  removeWorkflow(id) {
    this.setState({
      workflows: this.state.workflows.filter(workflow => workflow.id !== id)
    });
  }

  toogleTodo(id) {
    this.setState({
      workflows: this.state.workflows.map(workflow => {
        if (workflow.id !== id) return workflow;
        else
          return {
            id: id,
            name: workflow.name,
            duration: workflow.duration,
            completed: !workflow.completed
          };
      })
    });
  }

  toogleAll() {
    const workflows = this.state.workflows;
    console.log(workflows);
    if (this.allDone()) {
      for (let i in workflows) workflows[i].completed = false;
    } else {
      for (let i in workflows) workflows[i].completed = true;
    }
    this.setState({ workflows: workflows });
  }

  allDone() {
    for (let i = 0; i < this.state.workflows.length; i++)
      if (!this.state.workflows[i].completed) return false;
    return true;
  }

  update() {
    //const index = prompt("update position: ") - 1;
    //const text = prompt("text");
    const index  = 0
    const text = 'Workflow 0'

    const workflows = this.state.workflows;
    workflows[index].name = text;
    this.setState({ workflows: workflows });
  }

  render() {
    return (
      <View>
        <View>
            {this.state.workflows.map(workflow => (
              <View>
                {workflow.completed ? (
                  <Text>
                    {" "}
                    {workflow.name} {workflow.duration}{" "}
                  </Text>
                ) : (
                  <Text>
                    {workflow.name} {workflow.duration}{" "}
                  </Text>
                )}
                <Button title='toogle' onPress={() => this.toogleTodo(workflow.id)} />
                {" "}
                <Button title='delete' onPress={() => this.removeWorkflow(workflow.id)} />
              </View>
            ))}
        </View>
         
          <Button title='Add' onPress={() => this.addWorkflow()} />
          <Button title='Toogla All' onPress={() => this.toogleAll()} />
          <Button title='update' onPress={() => this.update()} />

      </View>
    );
  }
}

export default class App extends Component {
  render () {
    return (
      <Workflow />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#34495e',
  },
});
