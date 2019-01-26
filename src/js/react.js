class App extends React.Component {
    render() {
        return (
            <div>
                <p>Hello World!</p>   
                <p>My name is Andrey</p>   
            </div>
        );
    }
}

ReactDOM.render(
    <App />,
    document.getElementById('content')
);