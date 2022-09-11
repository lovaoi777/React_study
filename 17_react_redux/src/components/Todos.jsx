import React from 'react';

const TodosItem = ({ todo, onToggle, onRemove }) => {
  return (
    <div>
      <input
        type="checkbox"
        onClick={() => onToggle(todo.id)}
        checked={todo.done}
        readOnly={true}
      />
      <span style={{ textDecoration: todo.done ? 'line-through' : ' none' }}>
        {todo.text}
      </span>
      <button onClick={() => onRemove(todo.id)}>삭제</button>
    </div>
  );
};
const Todos = ({
  input, //인풋에 입력되는 텍스트
  todos, //할 일 목록이 들어 있는 객체
  onChangeInput,
  onInsert,
  onTogle,
  onRemove,
}) => {
  const onSubmit = (e) => {
    e.preventDefault();
    onInsert(input);
    onChangeInput(''); // 등록 후 input 초기화
  };
  const onChange = (e) => onChangeInput(e.target.value);
  return (
    <div>
      <form onSubmit={onSubmit}>
        <input value={input} onChange={onChange} />
        <button type="submit">등록</button>
      </form>
      <div>
        {todos.map((todo) => (
          <TodosItem
            todo={todo}
            key={todo.id}
            onToggle={onTogle}
            onRemove={onRemove}
          />
        ))}
      </div>
    </div>
  );
};

export default Todos;
