const Filter = ({ value, onChange }) => {
    return (
      <div>
        Search for name: <input value={value} onChange={onChange} />
      </div>
    );
  };
  
  export default Filter;
  