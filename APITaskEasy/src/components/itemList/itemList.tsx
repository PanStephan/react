import * as React from 'react';
import './itemList.scss';
import Spinner from './../spinner/spinner'
import ErrorMessage from './../errorMessage/errorMessage'

interface IPropState {
	itemList: null,
	error: boolean
}
export default class ItemList extends React.Component<any, IPropState> {

	state = {
		itemList: null,
		error: false
	}

	componentDidMount() {
		const {getData} = this.props

		getData()
			.then(itemList => {
				this.setState({itemList})
			})
	}

	componentDidCatch() {
		this.setState({error: true})
	}		

	renderItem = (arr) => {
		return arr.map((item) => {
			const {renderData, onItemSelected} = this.props
			const label = renderData(item)
			return (
				<li key={item.id}
					className="list-group-item" 
					onClick={() => {this.props.onItemSelected(item.id)}}
					>
					{label}
				</li>
			)
		})
	}

	render() {

	const {itemList, error} = this.state
	if(!itemList) return <Spinner/>
	if(error) return <ErrorMessage/>

	return (
		<ul className="item-list list-group">
			{this.renderItem(itemList)}
		</ul>
	);
	}
}