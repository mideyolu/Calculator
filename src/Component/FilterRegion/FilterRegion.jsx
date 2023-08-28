import './FilterRegion.css'

const FilterRegion = ({onSelect}) => {
    const selectHandler = (e)=>{
        const regionName = e.target.value;
        onSelect(regionName);
    }
  return (
    <select onChange={selectHandler} className="select-region">
      <option className='option'>Filter by Region</option>
      <option className='option' value="Africa">Africa</option>
      <option className='option' value="America">America</option>
      <option className='option' value="Asia">Asia</option>
      <option className='option' value="Europe">Europe</option>
      <option className='option' value="Ocenia">Oceania</option>
    </select>
  );
}

export default FilterRegion;