export const Modal = ({children, closeModal, size = "90%"}) => {
  return (
    <section style={{zIndex: 10}}>
    <div className="modalMyl">
      
      <div className="modalMyl-content bg-dark position-relative p-4 border border-primary rounded overflow-auto" style={{minHeight: size, width: size}} >
        <div className="close text-right position-absolute top-0 end-0 " style={{zIndex: 10}}>
          <span className="me-3" onClick={() => closeModal()}>&times;</span>
        </div>

        {children}
    
        </div>
          </div>
    </section>
  )
}
