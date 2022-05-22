import React from 'react'
var moment = require('moment'); // require
moment().format(); 

function NewsItem(props) {
  return (
    <div className="my-3">
      <div className="card"  >
        <img className="card-img-top" src={props.imgUrl} alt="..."/>
          <div className="card-body">
            <h5 className="card-title">{props.title}
            <span className="position-absolute top-0 start-50 translate-middle badge rounded-pill bg-danger">
            {props.source}
            <span className="visually-hidden">unread messages</span></span>
            </h5>
            <p className="card-text">{props.discription}</p>
            <p className="card-text"><small className="text-muted">Last updated {moment(props.yourdate).fromNow()} by {props.writer?props.writer:'Unknown'}</small></p>
            <a rel="noopener noreferrer" href={props.newsUrl} target='_blank' className="btn btn-sm clearbtn-primary">Read More</a>
          </div>
      </div>

    </div>
  )
}



export default NewsItem