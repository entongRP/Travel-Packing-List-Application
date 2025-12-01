import { useState } from "react";

// Initial packing items (starting data)
const initialItems = [
  { id: 1, description: "Shirt", quantity: 5, packed: true },
  { id: 2, description: "Pants", quantity: 2, packed: false },
];

// ------------ Logo Component ------------
function Logo() {
  return <h1>My Travel List</h1>;
}

// ------------ Form Component ------------
function Form({ onAddItem }) {
  // form states
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);

  // handle form submit
  function handleSubmit(e) {
    e.preventDefault();

    if (!description) return;

    // create new item object
    const newItem = {
      id: Date.now(),
      description,
      quantity,
      packed: false,
    };

    // send item up to App component
    onAddItem(newItem);

    // reset form fields
    setDescription("");
    setQuantity(1);
  }

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>What do you need to pack?</h3>

      {/* quantity dropdown */}
      <select
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value))}
      >
        <option value={1}>1</option>
        <option value={2}>2</option>
        <option value={3}>3</option>
      </select>

      {/* description input */}
      <input
        type="text"
        placeholder="Item..."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      {/* add button */}
      <button>Add</button>
    </form>
  );
}

// ------------ Packing List Component ------------
function PackingList({ items, onToggleItem, onDeleteItem }) {
  return (
    <div className="list">
      <ul>
        {/* loop through items and render Item component */}
        {items.map((item) => (
          <Item
            key={item.id}
            item={item}
            onToggleItem={onToggleItem}
            onDeleteItem={onDeleteItem}
          />
        ))}
      </ul>
    </div>
  );
}

// ------------ Single Item Component ------------
function Item({ item, onToggleItem, onDeleteItem }) {
  return (
    <li style={{ textDecoration: item.packed ? "line-through" : "none" }}>
      {/* toggle checkbox */}
      <input
        type="checkbox"
        checked={item.packed}
        onChange={() => onToggleItem(item.id)}
      />

      {/* item text */}
      {item.quantity} - {item.description}

      {/* delete button */}
      <button onClick={() => onDeleteItem(item.id)}>❌</button>
    </li>
  );
}

// ------------ Stats Component (footer) ------------
function Stats({ items }) {
  // if list empty
  if (items.length === 0)
    return (
      <footer className="stats">
        <em>Start adding some items to your packing list</em>
      </footer>
    );

  // calculations
  const numItems = items.length;
  const packedItems = items.filter((item) => item.packed).length;
  const percentage = Math.round((packedItems / numItems) * 100);

  return (
    <footer className="stats">
      <em>
        You have {numItems} items in the list. You already packed {packedItems} (
        {percentage}%).
      </em>
    </footer>
  );
}

// ------------ Main App Component ------------
function App() {
  // main state storing all items
  const [items, setItems] = useState(initialItems);

  // add new item
  function handleAddItem(item) {
    setItems([...items, item]);
  }

  // toggle item packed/unpacked
  function handleToggleItem(id) {
    setItems(
      items.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );
  }

  // delete item
  function handleDeleteItem(id) {
    setItems(items.filter((item) => item.id !== id));
  }

  return (
    <div className="app">
      <Logo />

      {/* pass add handler to form */}
      <Form onAddItem={handleAddItem} />

      {/* pass items + handlers to packing list */}
      <PackingList
        items={items}
        onToggleItem={handleToggleItem}
        onDeleteItem={handleDeleteItem}
      />

      {/* pass items to stats */}
      <Stats items={items} />
    </div>
  );
}

export default App;
