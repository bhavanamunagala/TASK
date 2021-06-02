import React from "react"

class like extends React.Component {
	constructor (props) {
		super (props)
		// create a state with a property count set to 0
		this.state = {
		count : 0
		}
		// bind the method to the class component 
		this.go = this.go.bind(this)
	}

	// event handler function 
	go () {
		// set the new state by getting previous state 
		// using (prevState) and increase by 1 
		this.setState (  prevState => {
			return {
				count : prevState.count + 1
			}
		})
	} 

	render() {
		return (
			<div> 
				<center>
				<p> {this.state.count}  <button onClick= {this.go} > like! </button> </p>
				</center>
			</div>
		)
	}
}
export default like