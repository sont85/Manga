import React from "react";


export class SearchInput extends React.Component {
    constructor(props) {
        super(props);
    }
    onSearch(e) {
        e.preventDefault();
        let searchValue = this.refs.searchInput.value.trim().toLowerCase().replace(/\s/g, "-");
        let filterdList = this.filterSearchValue(searchValue);
        filterdList.sort((a, b)=> b.h - a.h) // sort by hits
        this.props.searchHandler(filterdList);
    }
    filterSearchValue(searchValue) {
        let mangaList = this.props.mangaList.manga;
        let filteredList = []
        let find = array => {
            for (let i = 0; i < array.length; i ++) {
                let current = array[i];
                if ((current.a && current.a.includes(searchValue)) || (current.t && current.i.includes(searchValue))) {
                    filteredList.push(current);
                } else if (current.length){
                    find(current);
                }
            }
        }
        find(mangaList);
        return filteredList
    }
    render() {

        return (
            <div className="row">
                <div className="col-8-xs col-xs-offset-2">
                    <form className="navbar-form navbar-left" role="search" onSubmit={this.onSearch.bind(this)}>
                        <div className="form-group">
                            <div className="input-group">
                                <input type="text" id="searchBox" className="form-control" ref="searchInput" placeholder="Search"/>
                                <span className="input-group-btn">
                                    <button type="submit" className="btn btn-primary">Submit</button>
                                </span>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}
