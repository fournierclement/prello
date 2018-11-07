// Modules
import React from 'react';
import { connect } from 'react-redux';
import{Card , CardHeader,  CardText, Popover, PopoverHeader, PopoverBody} from 'reactstrap';


// Action builder
import { setListName, moveCardInList, addCardToList} from '../../action/actionList';


// Components
import MyCard from '../MyCard/MyCard';
import CardCreator from './../../Component/Creator/CardCreator';
import InputText from '../Input/InputText';

// Style 
import '../../style/App.css';
import '../../style/list.css';


class List extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editNameOn : false,
      popoverOpen: false
    };
    this.handleEditClick = this.handleEditClick.bind(this);
    this.togglePopover = this.togglePopover.bind(this);
}

  handleEditClick() {
    this.setState({
      editNameOn: !this.state.editNameOn
    });
  }

  togglePopover() {
    this.setState({
      popoverOpen: !this.state.popoverOpen
    });
  }

  addingCard(event){
    this.props.dispatchAddCardToList(event);
    this.togglePopover();
  }

  render() {
  const {
      idList,
      name,
      cards,
      setListName
  } = this.props;
  return (
    <Card className="list">
      <CardHeader>

      {this.state.editNameOn === true ? 
         <span className="ListCreator">
          <InputText
          className="changeName"
            value={name}
            placeHolder="List Name"
            resetable
            onChange={(value) => {
              setListName(value);
              this.handleEditClick();
            } 
            }
          />
         </span>
      :
        <span onClick={this.handleEditClick} className="list-title">{name}</span>
      }

      <i onClick = {this.handleEditClick} 
        class = { this.state.editNameOn === true ? "fa fa-edit editmod" : "fa fa-edit" }
      />
      </CardHeader>

      {cards.map((card, index) => (
        <MyCard idList={card.idList} id={card.id}></MyCard>
        ))}
            
      <CardText>

      <div>
          <button className="add-card-link" id= {"list" +idList} onClick={this.togglePopover}>
              <span className="fa fa-plus-circle"> Add Card</span>  
          </button>
          <Popover placement="left" isOpen={this.state.popoverOpen} target={`list${idList}`} toggle={this.togglePopover}>
            <PopoverHeader>Add Card</PopoverHeader>
            <PopoverBody>
              <CardCreator closeToggle={this.togglePopover} handleSubmit={this.addingCard.bind(this)} />
            </PopoverBody>
          </Popover>
        </div>
      </CardText>

      </Card>
    );
  }
}
 
const mapStateToProps = ( state, props ) => ({
  cards: state.cards.filter(card => card.idList == props.idList)
});

const mapDispatchToProps = ( dispatch, props ) => {
  return {
    dispatch,
    dispatchOnDragEnd: ({source, destination}) => (
      destination &&
      dispatch(moveCardInList(source.index, destination.index))
    ),
    setListName: (name) => dispatch(setListName( props.idlist, name )),
    dispatchAddCardToList: (event) => {
      event.preventDefault();
      const data = new FormData(event.target);
      dispatch(addCardToList( props.idList, data.get('cardName'), data.get('dueDate'))) 
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(List); 