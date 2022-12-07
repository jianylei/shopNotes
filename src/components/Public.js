import { Link } from "react-router-dom";

const Public = () => {
  return (
    <section className="public">
        <header>
            <h1>Welcome to <span className="nowrap">JYL Repairs</span></h1>
        </header>
        <main className="public__main">
            <p>Located in downtown Toronto, JYL Repairs provides a trained staff ready to meet your tech repair needs.</p>
            <address className="public__addr">
                JYL Repairs<br />
                555 Foo Drive<br />
                Toronto, ON A1A 1A1<br />
                <a href="tel:+15555555555">(555) 555-5555</a>
            </address>
            <br />
            <p>Owner: Jian Lei</p>
        </main>
        <footer>
            <Link to="/login">Employee Login</Link>
        </footer>
    </section>
  )
}

export default Public