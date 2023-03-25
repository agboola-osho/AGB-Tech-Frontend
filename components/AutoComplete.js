import { useNavigate } from "react-router-dom"

const AutoComplete = ({ data, setSearch }) => {
  const navigate = useNavigate()
  const handleClick = (title) => {
    setSearch(title)
    navigate(`/search?q=${title}`)
  }
  let content
  if (data?.length) {
    content = (
      <ul className='autocomplete'>
        {data.map((product) => (
          <li key={product._id} className='autocomplete-item'>
            <button
              onClick={() => handleClick(product.title)}
              className='autocomplete-btn'
            >
              {product.title}
            </button>
          </li>
        ))}
      </ul>
    )
  } else if (!data?.length) {
    content = <p className='autocomplete search-err'>No results were found</p>
  }
  return content
}

export default AutoComplete
