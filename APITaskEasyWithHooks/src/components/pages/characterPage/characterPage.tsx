import * as React from 'react'
import ItemList from '../../itemList/itemList';
import Details, {Field} from '../../details/details';
import ErrorMessage from '../../errorMessage/errorMessage'
import gotService from '../../../services/gotService'
import RowBlock from '../../rowBlock/rowBlock'

interface IPropState{
  selected: number,
  error: boolean
}

export default class CharacterPage extends React.Component<any, IPropState> {

  gotService = new gotService()

  state = {
    selected: null,
    error: false
  }

  componentDidCatch() {
    this.setState({error: true})
  } 

  onItemSelected = (id) => {
    this.setState({selected: id})
  }

  render() {

    if(this.state.error) return <ErrorMessage/>

    const itemList = (
      <ItemList 
        onItemSelected = {this.onItemSelected}
        getData = {this.gotService.getAllCharacters}
        renderData = {(item) => `${item.name}(${item.gender})`}/>
    )

    const detailses = (
      <Details id={this.state.selected} data={this.gotService.getCharacter} text="choose character">
        <Field field='gender' label='Gender'></Field>
        <Field field='born' label='Born'></Field>
        <Field field='died' label='Died'></Field>
        <Field field='culture' label='Culture'></Field>
      </Details>
    )

    return (
      <RowBlock itemList={itemList} details={detailses} />
    )
  }
}