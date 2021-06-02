import React from "react"

class Like extends React.Component {
	constructor (props) {
		super (props)
		this.state = {
		count : 0
		}
	
		this.go = this.go.bind(this)
	}

	go () {
	 
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
				<p> {this.state.count}  
                <button onClick= {this.go} > like! </button> </p>
				</center>
			</div>
		)
	}
}
export default Like