
const Footer = () => {
    const date=new Date();

  return (
    <div className="footer">
    <p>Created By <span>&lt;3 Nour Aldeen Bakleh</span> | All Rights Reserved! <span>{date.getFullYear()}</span></p>
    </div>
  )
}

export default Footer;