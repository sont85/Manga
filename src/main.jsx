import React from 'react';
import ReactDOM from 'react-dom';
let userRef = firebase.database().ref("users");

class NavigationBar extends React.Component {
    render() {
        return <nav className="navbar navbar-default">
            <div className="container-fluid">
                <div className="navbar-header">
                    <a className="navbar-brand" href="#">
                        <img alt="Brand" src="assets/goku.jpg"/>
                    </a>
                </div>
            </div>
        </nav>
      }
}

class SearchInput extends React.Component {
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
                if (current.a && current.a.includes(searchValue)) {
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
        return <div>
            <form className="navbar-form navbar-left" role="search" onSubmit={this.onSearch.bind(this)}>
                <div className="form-group">
                    <input type="text" id="searchBox" className="form-control" ref="searchInput" placeholder="Search"/>
                </div>
                <button type="submit" className="btn btn-default">Submit</button>
            </form>
        </div>
    }
}

class ContentList extends React.Component {
    render() {
        return <div>Hellow
        </div>

    }
}

class Main extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            mangaList: [],
            searchList: []
        }
    }
    componentWillMount() {
        fetch("http://www.mangaeden.com/api/list/0/", {
            method: "get"
        }).then((response) =>{
            response.json().then((data) => {
                console.log(data);
                this.setState({mangaList: data});
            });
        }).catch((error) => {
            debugger
        });
    }
    searchHandler(data) {
        this.setState({ searchList: data});
    }
    render() {
        if (this.state.searchList.length) {
            return <div>
                <NavigationBar/>
                <SearchInput mangaList={this.state.mangaList} searchHandler={this.searchHandler.bind(this)}/>
                <ContentList dataList={this.state.searchList}/>
            </div>
        } else {
            return <div>
                <NavigationBar/>
                <SearchInput mangaList={this.state.mangaList} searchHandler={this.searchHandler.bind(this)}/>
            </div>
        }
    }
}

ReactDOM.render(<Main/>, document.getElementById('main'));
