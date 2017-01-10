// let userRef = firebase.database().ref("users");
import React from 'react';
import ReactDOM from 'react-dom';
import {NavigationBar} from "./navigationBar.jsx";
import {SearchInput} from "./searchInput.jsx";
import {ChapterView} from "./chapterView.jsx";
import {MangaView} from "./mangaView.jsx";

class Main extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            mangaList: [],
            searchList: [],
            mangaData: null,
            chapterData: null,
            currentChapter: null
        }
    }
    componentWillMount() {
        this.fetchMangaList();
    }
    searchHandler(data) {
        this.setState({ mangaData: null});
        this.setState({ chapterData: null});
        this.setState({ searchList: data});
        this.setState({ currentChapter: null})
    }
    fetchMangaList() {
        fetch("http://www.mangaeden.com/api/list/0/", {
            method: "get"
        }).then((response) => {
            response.json().then((responseData) => {
                this.setState({ mangaList: responseData});
            });
        }).catch((error) => {
            debugger
        });
    }
    selectMangaHandler(manga) {
        let url = `http://www.mangaeden.com/api/manga/${manga.i}/`
        fetch(url, {
            method: "get"
        }).then((response) => {
            response.json().then((responseData) => {
                this.setState({ mangaData: responseData});
            });
        }).catch((error) => {
            debugger
        });
    }
    selectChapter(chapter) {
        let url = `http://www.mangaeden.com/api/chapter/${this.state.mangaData.chapters[chapter][3]}/`;
        this.setState({ currentChapter: chapter})
        this.fetchChapterData(url);
    }
    nextChapter() {
        let url = `http://www.mangaeden.com/api/chapter/${this.state.mangaData.chapters[this.state.currentChapter - 1][3]}/`;
        this.setState({ currentChapter: this.state.currentChapter - 1});
        this.fetchChapterData(url);
    }
    previousChapter() {
        let url = `http://www.mangaeden.com/api/chapter/${this.state.mangaData.chapters[this.state.currentChapter + 1][3]}/`;
        this.setState({ currentChapter: this.state.currentChapter + 1});
        console.log(":DFFDFD")
        this.fetchChapterData(url);
    }
    fetchChapterData(url) {
        fetch(url, {
            method: "get"
        }).then((response)=> {
            response.json().then((responseData) => {
                console.log(responseData)
                this.setState({ chapterData: responseData});
            });
        }).catch((err) => {
            debugger
        });
    }
    render() {
        return <div>
            <NavigationBar/>

            <SearchInput  mangaList={this.state.mangaList} searchHandler={this.searchHandler.bind(this)}/>
            {(this.state.searchList.length && !this.state.mangaData) ? <SearchList dataList={this.state.searchList} selectMangaHandler={this.selectMangaHandler.bind(this)}/> : null}
            {(this.state.mangaData && !this.state.chapterData) ? <MangaView mangaData={this.state.mangaData} selectChapter={this.selectChapter.bind(this)}/> : null}
            {(this.state.chapterData) ? <ChapterView previousChapter={this.previousChapter.bind(this)} nextChapter={this.nextChapter.bind(this)} chapterData={this.state.chapterData} showPrev={this.state.mangaData.chapters.length - 1 === this.state.currentChapter ? false : true} showNext={(this.state.currentChapter < 0) ? false: true} /> : null }
        </div>;
    }
}

ReactDOM.render(<Main/>, document.getElementById('main'));
