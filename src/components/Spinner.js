const Spinner = () => {
  return (
    <div className='position-relative spinner'>
      <div
        className='spinner-border spinner-border-lg text-danger position-absolute top-50 start-50 translate-middle'
        role='status'
      >
        <span className='visually-hidden'>Loading...</span>
      </div>
    </div>
  )
}

export default Spinner
