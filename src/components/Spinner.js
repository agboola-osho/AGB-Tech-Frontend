const Spinner = () => {
  return (
    <div className='spinner'>
      <div
        className='spinner-border spinner-border-xxl text-danger'
        role='status'
      >
        <span className='visually-hidden'>Loading...</span>
      </div>
    </div>
  )
}

export default Spinner
