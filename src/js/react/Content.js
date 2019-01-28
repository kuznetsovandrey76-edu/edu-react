import React, {Component} from 'react';
import ContentCard from './ContentCard';

class Test extends Component {
    constructor() {
        super();

        this.state = {
            name: "Andrey",
            age: 28
        }
    }

    render() {
        return `Hello ${this.state.name}`;
    }
}

function Content() {
    return (
        <div class="content__list">
            <ContentCard 
                data={{
                    title: "Алгоритм", 
                    description: "Алгоритм - некая последовательность действий"
                }}
            />
            <ContentCard 
                data={{
                    title: "Структура данных", 
                    description: "Некий способ хранения и обработки данных"
                }}
            />
            <ContentCard 
                data={{
                    title: "Оценка алгоритмов", 
                    addition: "Эффективность (время исполнения, потребляемая память), понятность"
                }}
            />
            <ContentCard 
                data={{
                    title: "Сложность алгоритма", 
                    addition: "Зависимость объема работы, которая выполняется алгоритмом, от размера входных данных, выраженная математической функцией"
                }}
            />
            <Test />
        </div>
    )
}

export default Content;