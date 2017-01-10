import React from "react";

export class MangaView extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            mangaData: props.mangaData
        }
        // debugger
    }
    componentWillReceiveProps(props) {
        this.setState({
            mangaData: props.mangaData
        })
    }
    render() {
        return <div>
            <img style={{display: "block"}} src={`http://cdn.mangaeden.com/mangasimg/${this.state.mangaData.image}`}/>
            <h1>Title: {this.state.mangaData.title}</h1>
            <h2>Author: {this.state.mangaData.author}</h2>
            <p>{this.state.mangaData.description}</p>
            <ul>
                {
                    this.state.mangaData.chapters.map((chapter, i) => {
                        return <li key={i} onClick={this.props.selectChapter.bind(null, i)} >{chapter[2]}</li>
                    })
                }
            </ul>

        </div>
    }
}
