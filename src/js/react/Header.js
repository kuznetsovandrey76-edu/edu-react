import React from 'react';

function Header() {
    const name = 'Andrey Kuznetsov';

    return (
        <div class="header">
            <h1 class="header__title">Hello, World</h1>
            <p>My name is {name}</p>
        </div>
    )
}

export default Header;