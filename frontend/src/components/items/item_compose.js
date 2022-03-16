import React from 'react';
import BasicRating from './item_rate';
import ItemRate from './item_rate';


class ItemCompose extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            itemName: "",
            itemRate: 0
        }

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ itemRate: nextProps.newItem.itemName });
    }

    handleSubmit(e) {
        e.preventDefault();
        let item = {
            itemName: this.state.itemName
        };

        this.props.composeItem(item);
        this.setState({ itemName: '', itemRate: 0 })
    }


    update(field) {
        return e => this.setState({
            [field]: e.currentTarget.value
        });
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <div>
                        <input type="itemNamearea"
                            value={this.state.itemName}
                            onChange={this.update("itemName")}
                            placeholder="Write your book title"
                        />
                        {/* <input type="number"
                            value={this.state.itemRate}
                            onChange={this.update("itemRate")}
                            placeholder="Rate this book..."
                        /> */}

                        {/* <ItemRate rate={this.state.itemRate} /> */}
                        <BasicRating />

                        <input type="submit" value="Submit" />
                    </div>
                </form>
                <br />
            </div>
        )
    }
}

export default ItemCompose;