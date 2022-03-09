import React from 'react'

const List = ({ id, title, completed, todoData, setTodoData }) => {

    const handleClick = (id) => {
        let newTodoData = todoData.filter((data) => data.id !== id);
        setTodoData(newTodoData);
    };

    const handleCompleteChange = (id) => {
        let newTodoData = todoData.map((data) => {
            if (data.id === id) {
                data.completed = !data.completed;
            }
            return data;
        });
        setTodoData(newTodoData);
    };

    return (
        <div
            className={`flex items-center justify-between w-full px-4 py-1 my-2 text-gray-600  border rounded`}>
            <div className="items-center">
                <input
                    type="checkbox"
                    onChange={() => handleCompleteChange(id)}
                    defaultChecked={completed}
                />{" "}
                <span className={completed ? "line-through" : undefined}>{title}</span>
            </div>
            <div className="items-center">
                <button className="float-right px-4 py-2" onClick={() => handleClick(id)}>
                    x
                </button>
            </div>
        </div>
    )
}

export default List

