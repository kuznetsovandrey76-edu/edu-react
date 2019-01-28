import React from 'react';

function ContentCard(props) {
    return (
        <div class="content__item">
            <h3>{props.data.title}</h3>
            <p>{props.data.description}</p>
            <p>{props.data.addition}</p>
        </div>
    )
}

export default ContentCard;