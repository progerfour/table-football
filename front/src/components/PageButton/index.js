import React from 'react';
import './PageButton.scss';
import classNames from 'classnames';

const PageButton = ({children, className, image}) => {
    return (
       <div className={classNames("pageButton",className)} >
           <div className={classNames("image",image)}></div>
           <p>{children} </p> 
       </div>
    )
};

export default PageButton;