import React from "react";

class SearchList extends React.Component {
    constructor(props) {
        super(props)
    }
    selectManga(manga) {
        this.props.selectMangaHandler(manga)
    }
    render() {
        return <div>{
                this.props.dataList.map((item, i)=>{
                    return <div key={i}>
                        <div>
                            <a onClick={this.selectManga.bind(this, item)}>
                                <h1>{item.t}</h1>
                                <img src={`http://cdn.mangaeden.com/mangasimg/${item.im}`}/>
                            </a>
                        </div>
                    </div>
                })
            }
        </div>

    }
}
