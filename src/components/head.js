import React, { Component } from 'react';
import AutoComplete from '@vickram/react-auto-complete';
import cities from 'cities.json';
import { highlight } from './Helper'
import { getEmojiFlag } from 'countries-list'


class Head extends Component {

  submitLocal = () => {
    this.props.getGeoPos();
    this.props.getWeather(true); 
  } 

  submitData = (data) => {
    this.props.position.lat = data.item.lat; 
    this.props.position.lon = data.item.lng; 
    this.props.getWeather(false);
    this.props.position.name = data.item.name;
    document.querySelector(".cityInput").value = ""; 
  }

  getData = (searchText) => {
    searchText = searchText.toLowerCase();
    return cities.filter(x => x.name.toLowerCase().startsWith(searchText));
  }

  renderItem(args) {
    const data = args.data;

    return ({
      value: data.name,
      label: <table className='auto-complete'>
        <tbody>
          <tr>
            <td style={{ width: '60%' }} dangerouslySetInnerHTML={highlight(data.name, args.searchText)}></td>
            <td style={{ width: '40%' }}>{getEmojiFlag(data.country)}</td>
          </tr>
        </tbody>
      </table>
    });
  }


  
  render() {
    return (
      <div className="head">
        <h3 className="city">{this.props.position.name}</h3>
        <form>
          <AutoComplete
            containerCssClass="color-codes"
            selectedTextAttr="name"
            data={this.getData}
            renderItem={this.renderItem}
            maxItemsToRender={5}
            itemSelected={this.submitData}
          >
            <input className="cityInput" type="text" placeholder="City name..." />
          </AutoComplete>
          <span id="geo" onClick={this.submitLocal}></span>
        </form>
      </div>
    );
  }
}

export default Head;
